import cookies from 'js-cookie';
import {ACCESS_TOKEN_TIME_RESERVE, AUTH_EXP_COOKIE_NAME} from 'shared/constants';

let refreshPromise: Promise<unknown> | undefined;
const getRefreshPromise = () =>
    fetch('/auth/refresh', {method: 'POST'})
        .then((res) => {
            if (res.status === 401) {
                alert('Your session has expired!');
                window.location.reload();
            }
            return res;
        })
        .finally(() => {
            refreshPromise = undefined;
        });

export const callWithRefresh = async <T>(getData: () => Promise<T>): Promise<T> => {
    if (refreshPromise) {
        await refreshPromise;
    } else {
        const exp = Number(cookies.get(AUTH_EXP_COOKIE_NAME));
        const now = Math.floor(new Date().getTime() / 1000);

        if (!exp || now + ACCESS_TOKEN_TIME_RESERVE > exp) {
            refreshPromise = getRefreshPromise();
            await refreshPromise;
        }
    }

    return getData();
};
