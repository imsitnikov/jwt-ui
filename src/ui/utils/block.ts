import bemBlock from 'bem-cn-lite';

export type CnBlock = ReturnType<typeof bemBlock>;

export type CnMods = Record<string, string | boolean | undefined>;

export const NAMESPACE = 'jwt-ui-';

export const block = (name: string): CnBlock => {
    return bemBlock(`${NAMESPACE}${name}`);
};
