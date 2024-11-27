import {TrashBin} from '@gravity-ui/icons';
import {Button, Icon, Loader, Table, TableColumnConfig} from '@gravity-ui/uikit';
import React from 'react';
import {RefreshToken, RefreshTokenResponse} from 'shared/schema/auth/types';

import {User} from '../../types';
import {block, callWithRefresh, sdk} from '../../utils';

import './styles.scss';

const b = block('refresh-tokens');

type DataItem = RefreshToken & {deleteButton: React.ReactNode};

const columns: TableColumnConfig<DataItem>[] = [
    {
        id: 'deleteButton',
        name: '',
    },
    {
        id: 'refreshTokenId',
        name: 'Refresh token ID',
    },
    {
        id: 'sessionId',
        name: 'Session ID',
    },
    {
        id: 'createdAt',
        name: 'Created at',
    },
    {
        id: 'expiredAt',
        name: 'Expired at',
    },
];

type Props = {
    user: User | null;
};

export const RefreshTokens: React.FC<Props> = ({user}) => {
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [refreshTokens, setRefreshTokens] = React.useState<RefreshTokenResponse | null>(null);

    React.useEffect(() => {
        callWithRefresh(() => sdk.root.auth.getRefreshTokens())
            .then((res) => {
                setRefreshTokens(res);
                setIsLoading(false);
            })
            .catch(() => {});
    }, []);

    const data = React.useMemo(() => {
        const result: DataItem[] = [];
        if (refreshTokens && refreshTokens.length > 0) {
            refreshTokens.forEach((refreshToken) => {
                result.push({
                    ...refreshToken,
                    deleteButton: (
                        <Button
                            onClick={() => {
                                callWithRefresh(() =>
                                    sdk.root.auth
                                        .deleteRefreshToken({
                                            refreshTokenId: refreshToken.refreshTokenId,
                                        })
                                        .then(() => {
                                            setIsLoading(true);
                                            callWithRefresh(() => sdk.root.auth.getRefreshTokens())
                                                .then((res) => {
                                                    setRefreshTokens(res);
                                                    setIsLoading(false);
                                                })
                                                .catch(() => {});
                                        }),
                                ).catch(() => {});
                            }}
                        >
                            <Icon data={TrashBin} size={18} />
                        </Button>
                    ),
                });
            });
        }
        return result;
    }, [refreshTokens]);

    return (
        <div className={b()}>
            <h2>Refresh tokens</h2>
            {isLoading ? (
                <Loader size="m" className={b('loader')} />
            ) : (
                <Table
                    className={b('table')}
                    columns={columns}
                    data={data}
                    getRowDescriptor={(item) => {
                        if (item.sessionId === user?.sessionId) {
                            return {
                                classNames: [b('row', {active: true})],
                            };
                        }
                        return {};
                    }}
                />
            )}
        </div>
    );
};
