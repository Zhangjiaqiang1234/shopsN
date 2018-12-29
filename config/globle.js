
window.API_URL='http://api.abochain.io/';
// window.API_URL='http://api.shopsn.cn/';

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