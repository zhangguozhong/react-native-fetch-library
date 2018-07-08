# react-native-fetch-library
简单的二次封装react native的fetch网络请求，支持设置单个网络请求的timeout网络超时时间，同时可取消fetch请求。

中断fetch（Promise）方案思路：每个组件都绑定有pageId，所有的fetchPromise存储到GlobalFetchPromises字典对象，key为当前组件的pageId，其实原理和原生的网络请求一致，当组件将要被移除时，将整个组件（pageId）的fetch请求reject，从而当前组件的所有fetch被中止。

设计缺陷：

（1）把组件所有的fetch取消，并不能针对某个fetch进行处理；
 
（2）单独使用Fetch、FetchWithTimeout文件可以实现对单一fetch的操作，开发者可执行实现封装。



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


## 取消请求

```javascript

RequestTask.cancelTaskInPage(pageId);

```
