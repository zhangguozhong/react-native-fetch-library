
import FetchWithTimeout from './FetchWithTimeout'

export default async (baseUrl, urlParams) => {

    let { url, method, timeout } = urlParams;
    let sessionToken = '';
    method = method.toUpperCase();
    let requestUrl = checkUrl(url) ? url : (baseUrl + url);
    requestUrl = method === 'GET' ? makeUrl(requestUrl, urlParams) : requestUrl;

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
        body: urlParams.type === 'POST' ? JSON.stringify(urlParams.params) : null
    };

    return FetchWithTimeout(requestUrl, headers).then(result => result.json());
}

const makeUrl = (url, urlParams) => {

    let { params } = urlParams;
    let reqUrl = url;
    reqUrl = (reqUrl.indexOf('?') !== -1) ? reqUrl + '&' : reqUrl + '?';

    if (params) {

        let queryItems = Object.keys(params).map(key => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
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