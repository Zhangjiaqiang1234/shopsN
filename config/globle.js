
window.API_URL='http://api.aboshops.com/'; // 正式服商城 API 接口 正常的 的
window.JAVA_API_URL='http://39.108.217.205:8060/'; // 正式服商城 API 接口 特殊需要的 java 接口，用于请求一开始的 ABO 用户登录
// window.API_URL='http://api.abochain.io/';

(function (w){

    //截取当前访问者的url 参数
    this. split_url   = function (name) {
        var url = window.location.href;
        var index =  url.indexOf(name);

        if(index === -1) {
            return '';
        }
        var urlParam = url.substring(url.indexOf(name)+1);

        return urlParam;
    },

    window.getInfo = {
        split_url : this.split_url,
    };



})(window);

String.prototype.replaceAll = function(str, bystr)
{
    var regExp = new RegExp(str, "g");
    return this.replace(regExp, bystr);
}