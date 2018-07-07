
import RequestHandler from './RequestHandler'
import NetworkErrorCode from './NetworkErrorCode'
import Listener from './Listener'
import { InteractionManager, DeviceEventEmitter } from 'react-native'

export default class RequestTask {

    static startTask(fromPage, baseUrl, urlParams, isLoading, isShowWifi, successCallback, errorCallback, cancelCallback) {

        let requestSuccessCallback = (data) => {
            InteractionManager.runAfterInteractions(() => {
                if (successCallback) {
                    successCallback(data);
                }
            });
        };

        let requestErrorCallback = (code, message) => {
            if (code === NetworkErrorCode.SESSION_EXPIRED) {
                DeviceEventEmitter.emit(Listener.userLogout,'logout');
            }else
            {
                InteractionManager.runAfterInteractions(() => {
                    if (errorCallback) {
                        errorCallback(code, message);
                    }
                });
            }
        };


        let requestAction = {
            fromPage,
            baseUrl,
            urlParams,
            isLoading,
            isShowWifi,
            'successCallback':requestSuccessCallback,
            'errorCallback':requestErrorCallback
        };

        RequestHandler.request(requestAction).done();
    }

    /**
     * 取消网络请求
     */
    static cancelTask() {

        for (let cancelPromise of global.fetchPromises) {
            cancelPromise.abort();
        }
        global.fetchPromises.splice(0,global.fetchPromises.length);
    }
}