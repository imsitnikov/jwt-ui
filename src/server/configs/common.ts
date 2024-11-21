import {AuthPolicy} from '@gravity-ui/expresskit';
import {AppConfig} from '@gravity-ui/nodekit';

const getEnvCert = (envCert: string) => envCert.replace(/\\n/g, '\n');

const config: Partial<AppConfig> = {
    appName: 'jwt-ui',
    appSocket: 'dist/run/server.sock',
    appAuthPolicy: AuthPolicy.required,

    accessTokenPublicKey: getEnvCert(process.env.ACCESS_TOKEN_PUBLIC_KEY as string),
};

export default config;
