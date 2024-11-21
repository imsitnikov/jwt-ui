import {AppRoutes} from '@gravity-ui/expresskit';

import {gatewayController} from './components/gateway';
import spa from './controllers/spa';

export const routes: AppRoutes = {
    'POST /gateway/:scope/:service/:action': {
        handler: gatewayController,
    },

    'GET /': {
        handler: spa.main,
        ui: true,
    },

    'GET /signin*': {
        handler: spa.main,
        ui: true,
    },
    'GET /signup*': {
        handler: spa.main,
        ui: true,
    },

    'GET /users': {
        handler: spa.main,
        ui: true,
    },
    'GET /sessions': {
        handler: spa.main,
        ui: true,
    },
    'GET /refresh-tokens': {
        handler: spa.main,
        ui: true,
    },
};
