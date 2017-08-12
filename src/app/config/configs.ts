import {environment} from '../../environments/environment';

const apiBaseUrl = environment.apiUrl;

export const config = {
    apiEndpoints: {
        loginEndpoint: `${apiBaseUrl}/account/login`,
        logoutEndpoint: `${apiBaseUrl}/account/logout`,
        artistsEndpoint: `${apiBaseUrl}/artists`,
        songsEndpoint: `${apiBaseUrl}/songs`
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
    },
    breadcrumb: {
        subSections: {
            add: 'add',
            edit: 'edit',
            list: 'list',
            view: 'view'
        },
        sections: {
            artists: 'Artists',
            songs: 'Songs'
        }
    },
    errorMessages: {
        403: 'Forbidden',
        404: 'Not Found',
        500: 'Internal Server Error'
    }
};
