import axios from 'axios'

const showLog = false; // 是否输出调试信息

const ERR_MSG = '用户访问权限认证失败';

// create an axios instance
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000 // request timeout
})

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
            // console.log('isJson error：'+str+'!!!'+e);
            return false;
        }
    }
    console.log('It is not a string!');
};

// 请求拦截器
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

// 响应拦截器
axios.interceptors.response.use(
    response => {
        if (response.data.msg == ERR_MSG) {
          Toast({
            message: '请重新登录',
            type: 'error',
            duration: 5 * 1000
          })
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


export default service