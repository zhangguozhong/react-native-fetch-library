# react-native-fetch-library
简单的二次封装react native的fetch网络请求，支持设置单个网络请求的timeout网络超时时间，同时可取消fetch请求。



## 配置网络请求

```javascript

const RequestUrl = {
    fetchList(pageIndex, pageSize){
      return {
          url:'https://facebook.github.io/react-native/movies.json',
          timeout:10000,
          method:'GET',
          params:{
              pageIndex,
              pageSize
          }
      }
    }
};

export default RequestUrl;

```


## 发起请求

```javascript

import RequestTask from './Pages/Utils/RequestTask'
import RequestUrl from './Pages/Utils/RequestUrl'


RequestTask.startTask(this,'',RequestUrl.fetchList(pageIndex,pageSize), true,true,(data)=>{
          console.log(`result ${JSON.stringify(data)}`);
      },(message)=>{

      });

```
