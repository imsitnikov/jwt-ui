import type {CtxUser} from './types';

declare module '@gravity-ui/nodekit' {
    interface AppContextParams {
        user: CtxUser;
    }

    interface AppConfig {
        accessTokenPublicKey: string;
    }
}

declare module '@gravity-ui/expresskit' {
    interface AppRouteParams {
        ui?: boolean;
    }
}