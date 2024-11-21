import {User} from './types/user';

declare global {
    interface Window {
        __DATA__: {
            user: User | null;
        };
    }
}
