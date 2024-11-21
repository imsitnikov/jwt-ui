import fs from 'fs';
import http from 'http';

import httpProxy from 'http-proxy';
import requestIp from 'request-ip';
import {X_FORWARDED_FOR_HEADER} from 'shared/constants';

const proxy = httpProxy.createProxyServer({});

const port = process.env?.['LOCAL_DEV_PORT'];

http.createServer((req, res) => {
    // eslint-disable-next-line no-param-reassign
    req.headers[X_FORWARDED_FOR_HEADER] = requestIp.getClientIp(req) ?? undefined;

    const socketPath = req.url?.startsWith('/build')
        ? './dist/run/client.sock'
        : './dist/run/server.sock';

    if (fs.existsSync(socketPath)) {
        proxy.web(req, res, {
            // @ts-ignore
            target: {
                socketPath,
            },
        });
    } else {
        res.writeHead(500);
        res.write('Socket file missing');
        res.end();
    }
}).listen(port);
