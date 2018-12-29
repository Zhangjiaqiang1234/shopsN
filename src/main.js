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
Vue.use(VueLazyLoad,{
    preLoad:1.3,
    error:'./static/ggt@2x.png',
    loading:'./static/ggt@2x.png',
    try: 10
})
// import { Spinner } from 'mint-ui'
import '../config/globle.js'  //常量
const user_id = sessionStorage.getItem('user_ID') || '',
    URl = 'http://demo.shopsn.net',
    // URl = 'http://www.shopsn.cn',
    client_type = 1,  //1浏览器，2 app

    load_wrap = true;
    
Vue.config.productionTip = false;
Vue.prototype.axios = axios;
Vue.prototype.URL = URl;
Vue.prototype.load_wrap = load_wrap;
Vue.prototype.user_id = user_id;


Vue.use(MintUI);
import { Indicator } from 'mint-ui';
Vue.directive('title', {
    inserted: function(el, binding) {
        document.title = el.innerText
        el.remove()
    }
});

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