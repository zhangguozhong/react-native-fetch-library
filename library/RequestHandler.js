
import Fetch from './Fetch'

export default class RequestHandler {

    static async request(requestAction) {

        let { fromPage, baseUrl, urlParams, isLoading, isShowWifi, successCallback, errorCallback } = requestAction;

        try {
            let result = await Fetch('testPageId', baseUrl, urlParams);

            if (result || result.code === 0) {
                if (successCallback) {
                    successCallback(result);
                }
            }else
            {
                if (errorCallback) {
                    errorCallback(result.code, result.message);
                }
            }

        } catch (error) {
            let response = {
                code:-100,
                message:'网络请求失败'
            };

            if (errorCallback) {
                errorCallback(response.code, response.message);
            }
        }
    }
}