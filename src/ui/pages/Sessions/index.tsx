import {TrashBin} from '@gravity-ui/icons';
import {Button, Icon, Loader, Table, TableColumnConfig} from '@gravity-ui/uikit';
import React from 'react';
import {Session, SessionsResponse} from 'shared/schema/auth/types';

import {User} from '../../types';
import {block, callWithRefresh, sdk} from '../../utils';

import './styles.scss';

const b = block('sessions');

type DataItem = Session & {deleteButton: React.ReactNode};

const columns: TableColumnConfig<DataItem>[] = [
    {
        id: 'deleteButton',
        name: '',
    },
    {
        id: 'sessionId',
        name: 'Session ID',
    },
    {
        id: 'userId',
        name: 'User ID',
    },
    {
        id: 'userAgent',
        name: 'User agent',
    },
    {
        id: 'userIp',
        name: 'User IP',
    },
    {
        id: 'createdAt',
        name: 'Created at',
    },
    {
        id: 'updatedAt',
        name: 'Updated at',
    },
    {
        id: 'expiredAt',
        name: 'Expired at',
    },
];

type Props = {
    user: User | null;
};

export const Sessions: React.FC<Props> = ({user}) => {
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [sessions, setSessions] = React.useState<SessionsResponse | null>(null);

    React.useEffect(() => {
        callWithRefresh(() => sdk.root.auth.getSessions())
            .then((res) => {
                setSessions(res);
                setIsLoading(false);
            })
            .catch(() => {});
    }, []);

    const data = React.useMemo(() => {
        const result: DataItem[] = [];
        if (sessions && sessions.length > 0) {
            sessions.forEach((session) => {
                result.push({
                    ...session,
                    deleteButton: (
                        <Button
                            onClick={() => {
                                callWithRefresh(() =>
                                    sdk.root.auth
                                        .deleteSession({sessionId: session.sessionId})
                                        .then(() => {
                                            setIsLoading(true);
                                            callWithRefresh(() => sdk.root.auth.getSessions())
                                                .then((res) => {
                                                    setSessions(res);
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
    }, [sessions]);

    return (
        <div className={b()}>
            <h2>Sessions</h2>
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
                        if (item.userId === user?.userId) {
                            return {
                                classNames: [b('row', {['current-user']: true})],
                            };
                        }
                        return {};
                    }}
                />
            )}
        </div>
    );
};
