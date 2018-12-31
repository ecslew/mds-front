
class Util{

  // 时间戳转换日期 （秒）
  timestampToDate(timestamp) {
      var date = new Date(timestamp*1000);//时间戳为10位需*1000
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
      var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
      var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
      var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
      var s = date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds();
      return Y+M+D+h+m+s;
  }
  // 获取get参数
  getParams(){
      var url = window.document.location.href.toString();
      var u = url.split("?");
      if(typeof(u[1]) == "string"){
          u = u[1].split("&");
          var get = {};
          for(var i in u){
              var j = u[i].split("=");
              get[j[0]] = j[1];
          }
          return get;
      } else {
          return {};
      }
  };

}

let util = new Util;

export default util;