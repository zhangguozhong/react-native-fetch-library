
const DEFAULT_REQUEST_TIME_OUT = 15000;
export default (url, headers, body) => {

    let timeout = headers&&headers.timeout ? headers.timeout : DEFAULT_REQUEST_TIME_OUT;
    let request_timer = null;

    let timeout_promise = new Promise((resolve, reject) => {
        request_timer = setTimeout(() => {
            reject(new Error('request time out'));
        }, timeout);
    });

    let fetch_promise = new Promise((resolve, reject) => {
        fetch(url, headers, body).then(response => {
            if (response.status >= 200 && response.status < 300) {
                clearTimeout(request_timer);
                resolve(response);
            }
        }).catch((error) => {
            clearTimeout(request_timer);
            reject(error);
        })
    });

    return Promise.race([fetch_promise, timeout_promise]);
}