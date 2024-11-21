import {createLayoutPlugin, createRenderFunction, createUikitPlugin} from '@gravity-ui/app-layout';
import {Request, Response} from '@gravity-ui/expresskit';

import {gatewayApi} from '../components/gateway';
import {uiManifest} from '../ui-manifest';

export default {
    main: async (req: Request, res: Response) => {
        const renderLayout = createRenderFunction([
            createLayoutPlugin({manifest: uiManifest, publicPath: '/build/'}),
            createUikitPlugin(),
        ]);

        const data: {user: {userId: string; sessionId: string; displayName: string} | null} = {
            user: null,
        };

        const user = req.ctx.get('user');

        if (user) {
            const {responseData} = await gatewayApi.auth.getUser({
                ctx: req.ctx,
                headers: {},
                authArgs: {
                    accessToken: user.accessToken,
                },
                requestId: req.ctx.get('requestId') ?? '',
                args: undefined,
            });

            data.user = {
                userId: user.userId,
                sessionId: user.sessionId,
                displayName: responseData.displayName,
            };
        }

        res.send(
            renderLayout({
                title: 'Auth PoC',
                data,
                pluginsOptions: {
                    layout: {name: 'main'},
                    uikit: {
                        theme: 'system',
                        direction: 'ltr',
                    },
                },
            }),
        );
    },
};
