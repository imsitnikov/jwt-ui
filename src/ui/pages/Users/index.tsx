import {TrashBin} from '@gravity-ui/icons';
import {Button, Icon, Loader, Table, TableColumnConfig} from '@gravity-ui/uikit';
import React from 'react';
import {User as UserData, UsersResponse} from 'shared/schema/auth/types';

import {User} from '../../types';
import {block, callWithRefresh, sdk} from '../../utils';

import './styles.scss';

const b = block('users');

type DataItem = UserData & {deleteButton: React.ReactNode};

const columns: TableColumnConfig<DataItem>[] = [
    {
        id: 'deleteButton',
        name: '',
    },
    {
        id: 'userId',
        name: 'User ID',
    },
    {
        id: 'displayName',
        name: 'Display name',
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
        id: 'login',
        name: 'Login',
    },
    {
        id: 'password',
        name: 'Hashed password',
    },
];

type Props = {
    user: User | null;
};

export const Users: React.FC<Props> = ({user}) => {
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [users, setUsers] = React.useState<UsersResponse | null>(null);

    React.useEffect(() => {
        const getData = () => {
            callWithRefresh(() => sdk.root.auth.getUsers())
                .then((res) => {
                    setUsers(res);
                    setIsLoading(false);
                })
                .catch(() => {});
        };
        getData();
        getData();
        getData();
        getData();
        getData();
    }, []);

    const data = React.useMemo(() => {
        const result: DataItem[] = [];
        if (users && users.length > 0) {
            users.forEach((userItem) => {
                result.push({
                    ...userItem,
                    deleteButton: (
                        <Button
                            onClick={() => {
                                callWithRefresh(() =>
                                    sdk.root.auth.deleteUser({userId: userItem.userId}).then(() => {
                                        setIsLoading(true);
                                        callWithRefresh(() => sdk.root.auth.getUsers())
                                            .then((res) => {
                                                setUsers(res);
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
    }, [users]);

    return (
        <div className={b()}>
            <h2>Users</h2>
            {isLoading ? (
                <Loader size="m" className={b('loader')} />
            ) : (
                <Table
                    className={b('table')}
                    columns={columns}
                    data={data}
                    getRowDescriptor={(item) => {
                        if (item.userId === user?.userId) {
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
