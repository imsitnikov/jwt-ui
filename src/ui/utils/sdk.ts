import sdkFactory, {SdkConfig} from '@gravity-ui/sdk';
import {schema} from 'shared/schema';

const config: SdkConfig = {
    endpoint: '/gateway',
};

const sdk = sdkFactory<{root: typeof schema}>(config);

export {sdk};
