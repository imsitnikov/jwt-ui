import {Request, Response} from '@gravity-ui/expresskit';
import getGatewayControllers, {GatewayConfig} from '@gravity-ui/gateway';
import {AppContext, AppError} from '@gravity-ui/nodekit';
import {AUTHORIZATION_HEADER} from 'shared/constants';
import {schema} from 'shared/schema';

const config: GatewayConfig<AppContext, Request, Response> = {
    installation: process.env.APP_INSTALLATION as string,
    env: process.env.APP_ENV as string,
    timeout: 25000,
    ErrorConstructor: AppError,
    caCertificatePath: null,
    proxyHeaders: [],
    getAuthArgs: (req: Request) => ({
        accessToken: req.ctx.get('user')?.accessToken,
    }),
    getAuthHeaders: ({authArgs}) => {
        if (authArgs && authArgs.accessToken) {
            return {
                [AUTHORIZATION_HEADER]: `Bearer ${authArgs.accessToken}`,
            };
        }
        return undefined;
    },
};

const {api: gatewayApi, controller: gatewayController} = getGatewayControllers(
    {root: schema},
    config,
);

export {gatewayApi, gatewayController};
