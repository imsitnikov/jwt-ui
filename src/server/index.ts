import {ExpressKit, NextFunction, Request, Response} from '@gravity-ui/expresskit';
import {AppError} from '@gravity-ui/nodekit';
import dotenv from 'dotenv';
import expressHttpProxy from 'express-http-proxy';

dotenv.config();

import {apiAuth, uiAuth} from './components/auth';
import {nodekit} from './nodekit';
import {routes} from './routes';

nodekit.config.appFinalErrorHandler = async (error: AppError, req: Request, res: Response) => {
    req.ctx.logError('Error', error);
    res.status(500).send(error);
};

nodekit.config.appAuthHandler = async (req: Request, res: Response, next: NextFunction) => {
    if (req.routeInfo.ui) {
        uiAuth(req, res, next);
    } else {
        apiAuth(req, res, next);
    }
};

const authAllowList = [
    '/signup',
    '/signin',
    '/signin/saml',
    '/signin/saml/callback',
    '/signin/ldap',
    '/refresh',
    '/logout',
];

const app = new ExpressKit(nodekit, routes, {
    beforeParsers: (express) => {
        express.use(
            '/auth',
            expressHttpProxy(process.env.AUTH_ENDPOINT as string, {
                filter: (req) => {
                    if (authAllowList.includes(req.path)) {
                        return true;
                    }
                    return false;
                },
            }),
        );
    },
});

if (require.main === module) {
    app.run();
}

if (process.env?.['LOCAL_DEV_PORT']) {
    import('./local-dev');
}

export default app;
