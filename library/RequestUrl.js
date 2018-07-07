
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