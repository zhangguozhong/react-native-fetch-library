
export default class Console {

    static redirect() {
        if (!__DEV__){
            global.console = {
                ...console,
                log:Console.log
            }
        }
    }

    static log(...args:Array<any>) {

    }
}