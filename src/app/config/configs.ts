import {environment} from '../../environments/environment';

const apiBaseUrl = environment.apiUrl;

export const config = {
    apiEndpoints: {
        loginEndpoint: `${apiBaseUrl}/account/login`
    },
    headers: {
        tokenHeaderName: 'X-Auth-Token',
        contentTypeHeaderName: 'Content-Type',
        contentTypeHeader: 'application/json',
    },
    localStorageKeys: {
        userAuthorization: 'musicfy-authorization'
    },
    statusCodes: {
        unauthorized: 401,
        forbidden: 403,
        notFound: 404,
        internalServerError: 500
    }
};
