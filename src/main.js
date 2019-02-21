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
import qs from 'qs';
import { Toast } from 'mint-ui';
Vue.use(VueLazyLoad,{
    preLoad:1.3,
    error:'./static/ggt@2x.png',
    loading:'./static/ggt@2x.png',
    try: 10
})

import * as filters from './filters' // 加载全局过滤器
// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// import { Spinner } from 'mint-ui'
import '../config/globle.js'  //常量
import './utils/request.js'
const user_id = localStorage.getItem('user_ID') || '',
    token = localStorage.getItem('token') || '',
    // URl = 'http://39.108.217.205:7788', // 测试服的图片的 baseUrl
    URl = 'http://aboshops.com',   // 正式服的图片 baseUrl
    client_type = 1,  //1浏览器，2 app

    load_wrap = true,
    isLogin = false; // 判断用户是否登录了
    
Vue.config.productionTip = false;
Vue.prototype.axios = axios;
Vue.prototype.URL = URl;
Vue.prototype.load_wrap = load_wrap;
Vue.prototype.user_id = user_id;// 保存用户id
Vue.prototype.token = token;// 保存token
Vue.prototype.isLogin = isLogin;// 用户是否登录的标志
Vue.prototype.isNotNullArray = (arr) => { // 定义全局方法，判断数组是否为空数组
    if(JSON.stringify(arr) === '[]' || typeof arr == 'undefined'){
        return false;
    }
    return true;
};
Vue.prototype.removeItemByAttr = (arr, attrName, attr) => { // 删除数组中某个属性等于某个值的键
    if(Array.isArray(arr)) {
        arr.map((item,index) => {
            if(item[attrName] == attr) {
                delete(arr.splice(index,1))
            }
        })
    }
};

Vue.use(MintUI);
import { Indicator } from 'mint-ui';
Vue.directive('title', {
    inserted: function(el, binding) {
        document.title = el.innerText
        el.remove()
    }
});


// 判断用户是否已经登录
if(user_id && token){
    axios.post(API_URL + 'Home/index/checkToken',qs.stringify({
        access_token: token
    })).then((res) => {
        if(res.status == 1){
            this.isLogin = true;
        }
    })
}


const verificationList = ['seetin','order','person','Cart','myIntegral','repair','newAddress','address','orderWrap','payResult','Integral']; // 设置登录验证路由，填写的是name。当跳转至这些页面没有登录信息的话，会跳转至登录页要求登录

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
    if(verificationList.indexOf(to.name)!==-1 && !(localStorage.getItem('user_ID') && localStorage.getItem('token'))){
        // 先保存当前路由，待登录成功后返回当前路由
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