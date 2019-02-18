import Vue from 'vue'
import App from '@/App'
import Router from 'vue-router'
const Home = r => require(['@/components/home/home'], r); //主页
const brandList = r => require(['@/components/brandMuseum/list'], r); //品牌列表
const braDetails = r => require(['@/components/brandMuseum/listDetails'], r); //品牌详情页
const latestProm = r => require(['@/components/latestProm/latestProm'], r); //最新促销
const poopClearance = r => require(['@/components/poopClearance/index'], r); //尾货清仓
const list = r => require(['@/components/page/list'], r); //商品列表
const IntegralMall = r => require(['@/components/IntegralMall/index'], r); //积分商城-列表
const myIntegral = r => require(['@/components/myWallet/myIntegral'], r); //我的积分
const coupon = r => require(['@/components/page/coupon'], r); //优惠券
const footprint = r => require(['@/components/page/footprint'], r); //我的足迹
const myComment = r => require(['@/components/page/myComment'], r); //我的评论
const feedback = r => require(['@/components/page/Feedback'], r); //意见反馈
const myNews = r => require(['@/components/page/news-list'], r); //我的消息
const newsConent = r => require(['@/components/page/news_content'], r); //我的消息-内容
const invoice = r => require(['@/components/page/invoice'], r); //发票信息
const repair = r => require(['@/components/page/returnRepair'], r); //退货返修
const Search = r => require(['@/components/search/Search'], r); //首页热搜
const LogoIn = r => require(['@/components/logoIn/logoIn'], r); //登录
const Register = r => require(['@/components/logoIn/register'], r); //注册
const Jump = r => require(['@/components/logoIn/jump'], r); //提醒跳转至 ABO 下载页
const Sms = r => require(['@/components/logoIn/SMSLogin'], r); //短信登录
const bachWord = r => require(['@/components/logoIn/retrievePassword'], r); //找回密码
const logoInBind = r => require(['@/components/logoIn/logoInBind'], r); //绑定
const Notice = r => require(['@/components/page/Notice'], r); //公告
const product = r => require(['@/components/page/product'], r); //商品详情
const prTab = r => require(['@/components/page/children/tab'], r); //商品详情图
const Cart = r => require(['@/components/page/Cart'], r); //购物车
const Order = r => require(['@/components/page/confirmOrder'], r); //确认订单
const cashier = r => require(['@/components/page/Cashier'], r); //收银台
const subject = r => require(['@/components/subject'], r); //主页-分类-购物车-个人中心入口
const Class = r => require(['@/components/home/classification'], r); //分类
const person = r => require(['@/components/home/PersonalCenter'], r); //个人中心
const seetin = r => require(['@/components/page/settings'], r); //账户设置
const personalData = r => require(['@/components/page/personalData'], r); //个人资料
const modifyPassword = r => require(['@/components/page/modifyPassword'], r); //修改密码
const wholeOrder = r => require(['@/components/order/whole'], r); //订单入口
const orderWrap = r => require(['@/components/order/order'], r); //订单
const orderDetails = r => require(['@/components/order/orderDetails'], r); //订单详情
const intOrder = r => require(['@/components/page/integral_order'], r); //积分订单
const serviceBack = r => require(['@/components/page/serviceBack'], r); //申请售后
const evaluate = r => require(['@/components/order/evaluate'], r); //商品评价
const logis = r => require(['@/components/page/logistics'], r); //物流查询
const myCollection = r => require(['@/components/page/myCollection'], r); //我的收藏
const address = r => require(['@/components/page/address'], r); //收货地址
const payment = r => require(['@/components/page/payment'], r); //付款
const EdiAddress = r => require(['@/components/page/EditDelAddress'], r); //管理收货地址
const newAddress = r => require(['@/components/page/newAddress'], r); //新建收货地址
const customer = r => require(['@/components/page/customerService'], r); //客户服务
const progress = r => require(['@/components/page/progressQuery'], r); //进度查询
const reset = r => require(['@/components/logoIn/resetPassword'], r); //重置密码
const goodsDetails = r => require(['@/components/page/goods'], r); //显示图文详情的h5页面
const payResult = r => require(['@/components/page/payResult'], r); //显示支付结果的回调页面


const theTeacher = r => require(['@/components/page/theTeacher'], r); //名师专栏
const pickWeek = r => require(['@/components/page/pickweek'], r); //名师推荐
const limitedbuy = r => require(['@/components/page/LimitedBuy'], r); //限时团购
const phone = r => require(['@/components/page/ModifyPhone'], r); //修改手机号绑定
const myWallet = r => require(['@/components/myWallet/myWallet'], r); //我的钱包
const recharge = r => require(['@/components/myWallet/recharge'], r); //充值
const withdr = r => require(['@/components/myWallet/Withdrawals'], r); //提现
const shares = r => require(['@/components/myWallet/shares'], r); //我的股币

const getInfo = r => require(['@/components/getInfo/getInfo'], r); //接受请求 --青菜新增
const wxapppay = r => require(['@/components/getInfo/wxapppay'], r); //接受请求 
Vue.use(Router)

const router = new Router({
    mode: 'history', // 设置路由模式，页面路径就不会出现 # 了
    routes: [{
        path: '/',
        component: App, //顶层路由，对应index.html
        children: [ //二级路由。对应App.vue
            //地址为空时跳转home页面
            {
                path: '',
                redirect: '/subject'
            },
            {
                path: '/subject',
                name: 'subject',
                component: subject,
                children: [ //地址为/subject跳转home
                    {
                        path: '/subject',
                        redirect: '/home'
                    },
                    { //主页
                        path: '/home',
                        name: 'home',
                        component: Home
                    },
                    { //分类
                        path: '/class',
                        name: 'class',
                        component: Class
                    },
                    { //购物车
                        path: '/Cart',
                        name: 'Cart',
                        component: Cart
                    },
                    { //个人中心
                        path: '/person',
                        name: 'person',
                        component: person
                    }
                ]
            },
            { //登录
                path: '/LogoIn',
                name: 'LogoIn',
                component: LogoIn
            },
            { //短信验证登录
                path: '/sms',
                name: 'sms',
                component: Sms
            },
            { //注册
                path: '/Register',
                name: 'register',
                component: Register
            },
            { //提醒跳转至 ABO 下载页
                path: '/Jump',
                name: 'jump',
                component: Jump
            },
            { //找回密码
                path: '/bachWord',
                name: 'bachWord',
                component: bachWord
            },
            { //登录绑定
                path: '/logoInBind',
                name: 'logoInBind',
                component: logoInBind
            },
            { //公告
                path: '/Notice',
                name: 'Notice',
                component: Notice
            },
            { //品牌馆列表
                path: '/brandList',
                name: 'brandList',
                component: brandList
            },
            { //品牌馆详情
                path: '/braDetails/:ID',
                name: 'braDetails',
                component: braDetails
            },
            { //最新促销
                path: '/latestProm',
                name: 'latestProm',
                component: latestProm
            },
            { //尾货清仓
                path: '/poopClearance',
                name: 'poopClearance',
                component: poopClearance
            },
            { //热搜商品列表
                path: '/list/:id/:status',
                name: 'list',
                component: list
            },
            { //商品列表
                path: '/comList/:status',
                name: 'comList',
                component: list
            },
            { //积分商城-列表
                path: '/IntegralMall',
                name: 'IntegralMall',
                component: IntegralMall
            },
            { //优惠券
                path: '/coupon',
                name: 'coupon',
                component: coupon
            },
            { //我的足迹
                path: '/footprint',
                name: 'footprint',
                component: footprint
            },
            { //我的评论
                path: '/myComment',
                name: 'myComment',
                component: myComment
            },
            { //意见反馈
                path: '/feedback',
                name: 'feedback',
                component: feedback
            },
            { //商品详情Tbg
                path: '/tab/:id',
                name: 'tab',
                component: prTab
            },
            { //显示图文详情的h5页面
                path: '/goods/:id',
                name: 'goods',
                component: goodsDetails
            },
            { //显示图文详情的h5页面
                path: '/payResult/:order_sn_id',
                name: 'payResult',
                component: payResult
            },
            { //我的消息
                path: '/myNews',
                name: 'myNews',
                component: myNews
            },
            { //我的消息-内容
                path: '/newsConent/:id/:status',
                name: 'newsConent',
                component: newsConent
            },
            { //搜索页
                path: '/search',
                name: 'search',
                component: Search
            },
            { //商品详情
                path: '/product/:id/:status',
                name: 'product',
                component: product
            },
            { //积分订单
                path: '/intOrder',
                name: 'intOrder',
                component: intOrder
            },
            { //确认订单
                path: '/order/:id',
                name: 'order',
                component: Order
            },
            // 付款
            {
                path: '/payment',
                name: 'payment',
                component: payment
            },
            { //支付
                path: '/cashier/:id',
                name: 'cashier',
                component: cashier
            },
            { //账户管理
                path: '/seetin',
                name: 'seetin',
                component: seetin
            },
            { //积分
                path: '/Integral',
                name: 'myIntegral',
                component: myIntegral
            },
            { //我的收藏
                path: '/Collection',
                name: 'myCollection',
                component: myCollection
            },
            { //收货地址
                path: '/address/:status',
                name: 'address',
                component: address
            },
            { //编辑收货地址
                path: '/EdiAddress/:status',
                name: 'EdiAddress',
                component: EdiAddress
            },
            { //新增收货地址
                path: '/newAddress/:status',
                name: 'newAddress',
                component: newAddress
            },
            { //客服服务
                path: '/customer',
                name: 'customer',
                component: customer
            },
            { //修改密码
                path: '/mPassword',
                name: 'mPassword',
                component: modifyPassword
            },
            { //发票信息
                path: '/invoice',
                name: 'invoice',
                component: invoice
            },
            { //订单
                path: '/orderWrap/:status',
                name: 'orderWrap',
                component: orderWrap
            },
            { //物流查询
                path: '/logis/:id',
                name: 'logis',
                component: logis
            },
            { //订单详情
                path: '/details/:status/:order/:order_type',
                name: 'orderDetails',
                component: orderDetails
            },
            { //退货返修
                path: '/repair',
                name: 'repair',
                component: repair
            },
            { //进度查询
                path: '/progress/:id',
                name: 'progress',
                component: progress
            },
            { //重置密码
                path: '/reset/:user_id',
                name: 'reset',
                component: reset
            },



            { //名师专栏
                path: '/theTeacher',
                name: 'theTeacher',
                component: theTeacher
            },
            { //名师推荐商品
                path: '/pickWeek',
                name: 'pickWeek',
                component: pickWeek
            },
            { //限时团购
                path: '/limitedbuy',
                name: 'limitedbuy',
                component: limitedbuy
            },
            { //个人资料
                path: '/personal',
                name: 'personalData',
                component: personalData
            },
            { //修改手机号绑定
                path: '/phone',
                name: 'phone',
                component: phone
            },
            { //申请售后
                path: '/service/:status/:index',
                name: 'serviceBack',
                component: serviceBack
            },
            { //评价商品
                path: '/evaluate/:id',
                name: 'evaluate',
                component: evaluate
            },
            { //我的钱包
                path: '/myWallet',
                name: 'myWallet',
                component: myWallet
            },
            { //充值
                path: '/recharge',
                name: 'recharge',
                component: recharge
            },
            { //提现
                path: '/withdr',
                name: 'withdr',
                component: withdr
            },
            { //我的股票
                path: '/shares',
                name: 'shares',
                component: shares
            },
            { //接受微信请求  ------青菜新增
                path: '/getInfo',
                name: 'getInfo',
                component: getInfo
            },
            { //接受微信app请求  ------三千新增
                path: '/wxapppay/:userId',
                name: 'wxapppay',
                component: wxapppay
            },
        ]
    }]
});
export default router;