const endpoint = process.env.AUTH_ENDPOINT as string;

export const endpoints = {
    demo: {
        development: {
            endpoint,
        },
        preprod: {
            endpoint,
        },
        prod: {
            endpoint,
        },
    },
};
