
const DEFAULT_REQUEST_TIME_OUT = 15000;
export default (url, headers, body) => {

    let timeout = headers&&headers.timeout ? headers.timeout : DEFAULT_REQUEST_TIME_OUT;
    let reqTimer = null;
    let abort = null;

    //请求超时
    let timeoutPromise = new Promise((resolve, reject) => {
        reqTimer = setTimeout(() => {
            reject({ok: false, text: 'timeout', title: '服务器超时！请重试！'});
        }, timeout);
    });

    let fetchPromise = new Promise((resolve, reject) => {
        //用于取消网络请求
        abort = () => {
            reject({ok: false, text: 'timeout', title: '请求被取消'});
        };

        fetch(url, headers, body).then(response => {
            if (response.ok || response.status >= 200 && response.status < 300) {
                clearTimeout(reqTimer);
                resolve(response);
            }
        }).catch((error) => {
            clearTimeout(reqTimer);
            reject(error);
        });
    });

    let promise = Promise.race([fetchPromise, timeoutPromise]);
    promise.abort = abort;
    global.fetchPromises.push(promise);//保存所有的网络请求

    return promise;
}