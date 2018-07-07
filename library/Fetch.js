
import FetchWithTimeout from './FetchWithTimeout'

export default async (baseUrl, urlParams) => {

    let { url, method, timeout, params } = urlParams;
    let sessionToken = '';
    method = method.toUpperCase();
    let requestUrl = checkUrl(url) ? url : (baseUrl + url);
    requestUrl = method === 'GET' ? makeUrl(requestUrl, params) : requestUrl;

    let testUserAgent = {
      apiVersion:3,
        appCode:'weizhuang_jishi'
    };

    let headers = {
        method:method,
        timeout:timeout,
        headers:{
            'testUserAgent':JSON.stringify(testUserAgent),
            'sessionToken':sessionToken
        },
        body: urlParams.type === 'POST' ? JSON.stringify(params) : null
    };

    return FetchWithTimeout(requestUrl, headers).then(result => result.json());
}

const makeUrl = (url, urlParams) => {

    let reqUrl = url;
    reqUrl = (reqUrl.indexOf('?') !== -1) ? reqUrl + '&' : reqUrl + '?';

    if (urlParams) {

        let queryItems = Object.keys(urlParams).map(key => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(urlParams[key]);
        });
        reqUrl += queryItems.join('&');
    }

    return reqUrl;
};

const checkUrl = (url) => {

    let Expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
    let urlExp = new RegExp(Expression);
    return urlExp.test(url);
};