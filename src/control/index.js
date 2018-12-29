import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = { //创建数据仓库
    /*
        数据
    */
    goods: '', //结算商品信息
    price: '', //结算价格
    order_number: '', //订单号
    page:1, //订单分页
    no_data:false,
    footprint: '', //我的足迹
    order: [], //我的订单
    home_data: '', //主页
    braDetails: '', //品拍馆详细
    news_data: '', //我的消息
    news_con: '', //我的消息-内容
    my_wallet:'', //我的钱包
    user_Imag:'', //用户头像
    commodity_val: 1, //商品购买选择个数 默认为1
    commodity_number: '', //商品购买选择个数
    commodity_data: '', //商品详情
    catr_number: true, //购物车数量
    transformation_num:null, //转换后的购物车数量
    cart_data: '', //购物车
    cart_computer: '', //感兴趣的物品
    dataLeave: '', //猜你喜欢

    /*
        状态
    */
                // 加载相关参数
    slidingSwitch:true, //滑动开关
    queryLoading: false,
    moreLoading: false,
    allLoaded: false,
    loading:false,
    const_join: false, //商品详情按钮状态
    load_wrap: true, //home页面加载动画开关
    cart_load: true, //购物车load
    class_load: true, //分类load
    order_load_wrap: true, //订单load动画
    invoice: false, //发票信息 默认为不开发票
    type: 0, //发票状态
    rise: 0, //发票状态
    content: 0, //发票状态
    type_data: ['普通发票', '增值发票'], //发票类型
    res_data: ['个人', '单位'], //发票抬头
    content_data: ['办公用品', '耗材', '电脑配件', '明细'], //发票内容
    invoice_switch: [{ invoice_title: '普通发票', invoice_type: '个人', content: '办公用品' }], //发票信息 设置默认为个人


    /*
        订单
    */
    order_title: '', //订单头部
    order_load: false, //订单ajax切换状态
    order_status: '', //订单状态 空为全部订单，-1：已取消；0 待付款，1，待处理，3待收货，4已完成
    status: '', //头部展示状态
    order_ommodity: '', //评论商品-商品信息储存
    order_details: '', //订单详情
    logis_data: '', //物流信息
    repair: '', //退货返修

    /*
        退款
    */
    setvuce_data: '', //申请退货数据
    /*
        我的评论
    */
    my_comment: '', //我的评论
    chart_review: '', //有图评论
}
const mutations = {
    logis(state, inf) { //变更物流信息
        state.logis_data = inf;
    },
    setvuce(state, inf) { //变更退货数据
        state.setvuce_data = inf;
    },
    my_comment(state, inf) { //我的评论
        state.my_comment = inf;
    },
    chart_review(state, inf) { //有图评论
        state.chart_review = inf;
    },
    value(state, inf) { //默认商品购买数量
        state.commodity_val = 1;
    },
    shops_switch(state, inf){ //商品详情按钮开关
        state.const_join = false;
    },
    clear_page(state, inf){ //
        state.page = 1;
    },
}
const store = new Vuex.Store({
    state,
    mutations
});
export default store;