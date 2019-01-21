// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import store from './control/index'
import $ from 'jquery'
import './config/rem'
import './style/base.css'
import 'mint-ui/lib/style.css'
import MintUI from 'mint-ui'
import VueLazyLoad from 'vue-lazyload'
import QS from 'qs';
import { Toast } from 'mint-ui';
Vue.use(VueLazyLoad,{
    preLoad:1.3,
    error:'./static/ggt@2x.png',
    loading:'./static/ggt@2x.png',
    try: 10
})
// import { Spinner } from 'mint-ui'
import '../config/globle.js'  //常量
const user_id = sessionStorage.getItem('user_ID') || '',
    URl = 'http://aboshops.com', // 图片的 baseUrl
    // URl = 'http://demo.shopsn.net',
    // URl = 'http://www.shopsn.cn',
    client_type = 1,  //1浏览器，2 app

    load_wrap = true;
    
Vue.config.productionTip = false;
Vue.prototype.axios = axios;
Vue.prototype.URL = URl;
Vue.prototype.load_wrap = load_wrap;
Vue.prototype.user_id = user_id;

const showLog = false; // 是否输出调试信息

const ERR_MSG = '用户访问权限认证失败';


Vue.use(MintUI);
import { Indicator } from 'mint-ui';
Vue.directive('title', {
    inserted: function(el, binding) {
        document.title = el.innerText
        el.remove()
    }
});

let isJson = (str) => {
    if (typeof str == 'string') {
        try {
            var obj=JSON.parse(str);
            if(typeof obj == 'object' && obj ){
                return true;
            }else{
                return false;
            }
        } catch(e) {
            console.log('isJson error：'+str+'!!!'+e);
            return false;
        }
    }
    console.log('It is not a string!');
};

// 请求发出前
axios.interceptors.request.use(config => {
    if(showLog){
        console.log(config.url);
        console.log(config);
        console.log('前',config.data);
    }
    if(config.method == 'get' && config.params){ // 如果是用 get 请求并且参数是放到 url 中的话 直接添加
        config.params.app_user_id = sessionStorage.getItem('user_ID');
        config.params.access_token = sessionStorage.getItem('token');
    }else if(undefined === config.data || '' === config.data){ // 如果没有参数，直接加参数
        config.data = 'access_token='+sessionStorage.getItem('token')+'&app_user_id='+sessionStorage.getItem('user_ID');
    }else if(typeof config.data === 'string'){ // 如果是字符串
        if(isJson(config.data)){ // 如果是 JSON 形式的字符串
            config.data = JSON.parse(config.data);
            config.data.access_token = sessionStorage.getItem('token')
            config.data.app_user_id = sessionStorage.getItem('user_ID')
            config.data = JSON.stringify(config.data)
        }else{ // 如果只是普通的字符串
            if(config.data.length > 0){
                config.data += '&';
            }
            config.data += 'access_token='+sessionStorage.getItem('token')+'&app_user_id='+sessionStorage.getItem('user_ID');
        }
        
    }else{ // 如果是JSON对象
        config.data.access_token = sessionStorage.getItem('token')
        config.data.app_user_id = sessionStorage.getItem('user_ID')
    }

    if(showLog){
        console.log('后',config.data);
        console.log('---');
    }
    return config;
}, error => {
  // Do something with request error
  Promise.reject(error);
});

// 获得响应后
axios.interceptors.response.use(
    response => {
        if (response.data.msg == ERR_MSG) {
          Toast({
            message: '请重新登录',
            type: 'error',
            duration: 5 * 1000
          })
          console.log('返回接口 status == 0 url ==');
          console.log(response.config.url);
          // localStorage.clear();
          // sessionStorage.clear();
          // this.$router.push({ path: '/LogoIn' });
        }
        return response;
    },
    error => {
        console.log('err' + error) // for debug
        Toast({
          message: error.message,
          type: 'error',
          duration: 5 * 1000
        })
        return Promise.reject(error);
    }
);



const verificationList = ['seetin','order','person']; // 设置登录验证路由，当跳转至这些页面没有登录信息的话，会跳转至登录页要求登录

router.beforeEach((to, from, next) => {
    Indicator.open('初始化...');
    switch (to.path) {
        case '/home':
            sessionStorage.setItem('router_index', 0);
            break;
        case '/class':
            sessionStorage.setItem('router_index', 1);
            break;
        case '/Cart':
            sessionStorage.setItem('router_index', 2);
            break;
        case '/person':
            sessionStorage.setItem('router_index', 3);
            break;
        case '/getInfo'://新增----青菜
            sessionStorage.setItem('router_index', 4);
            break;
    };
    if(verificationList.indexOf(to.name)!==-1 && (!sessionStorage.getItem('user_ID') || !sessionStorage.getItem('token'))){
        next('/logoIn') // 需要用户信息的页面如果缺失 user_ID 或 token 则重定向到登录页登录
    }
    next();
});
router.afterEach(router => {
    setTimeout(function() {
        Indicator.close();
    }, 100)
});

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})