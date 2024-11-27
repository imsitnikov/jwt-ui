import {AuthPolicy} from '@gravity-ui/expresskit';
import {AppConfig} from '@gravity-ui/nodekit';

const getEnvCert = (envCert: string) => envCert.replace(/\\n/g, '\n');

const config: Partial<AppConfig> = {
    appName: 'jwt-ui',
    appSocket: 'dist/run/server.sock',
    appAuthPolicy: AuthPolicy.required,

    tokenPublicKey: getEnvCert(process.env.TOKEN_PUBLIC_KEY as string),
};

export default config;
