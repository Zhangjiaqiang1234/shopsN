<template>
    <div class="whole-wrap">
        <div v-title :data-title="$store.state.order_title" v-if="$store.state.order_title">{{$store.state.order_title}}</div>
        <div class="order-wrap">
            <div class="order-list" v-for="(item,index) in $store.state.order" :key="item.id">
                <div class="hd clearfix">
                    <span class="title fl">ShopsN商城</span>
                    <span class="status fr" v-if="item.order_status == 0">待付款</span>
                    <span class="status fr" v-if="item.order_status == 1">待发货</span>
                    <span class="status fr" v-if="item.order_status == 3">待收货</span>
                    <span class="status fr" v-if="item.order_status == 4 && item.order_state != '1'">已完成</span>
                    <span class="status fr" v-if="item.order_state == '1'">待评论</span>
                    <span class="status fr" v-if="item.order_status == -1">已取消</span>
                </div>
                <div class="describe clearfix" v-for="text in item.goods" :key="text.id">
                    <img :src="URL + text.selfImg" class="fl" @click="toDetails(item,text,index)">
                    <div class="fl words" @click="toDetails(item,text,index)">
                        <p class="text">{{text.title}}</p>
                        <p class="clearfix company">
                            <span class="fl" v-if="text.selfAttr[0]">{{text.selfAttr[0].name}}&nbsp;:&nbsp;</span>
                            <span class="fl" v-if="text.selfAttr[0]">{{text.selfAttr[0].item}}</span>
                        </p>
                    </div>
                    <button class="btn" @click="toRouter('/evaluate',item,text)" v-if="item.order_state == '1'">马上评论</button>
                </div>
                <div class="commod clearfix">
                    <span class="fl total">共{{item.count}}件商品</span> 
                    <span class="fl actual">实付款&nbsp;:&nbsp;<span>￥{{item.price_sum}}</span></span>
                    <!-- <span class="icon" @click="del(item,index)" v-if="item.order_status == 4 || item.order_status == -1"></span> -->
                </div>
                <div class="operation clearfix">
                    <span class="timer fl">下单时间：{{new Date(item.create_time * 1000).getFullYear()+'-'+(new Date(item.create_time * 1000).getMonth()+1)+'-'+new Date(item.create_time * 1000).getDate()+' '+new Date(item.create_time * 1000).getHours()+':'+new Date(item.create_time * 1000).getMinutes()+':'+new Date(item.create_time * 1000).getSeconds()}}</span>
                    <button class="btn fr" style="margin-left:.1rem;" @click="toRouter('/pay',item,false)" v-if="item.order_status == 0">马上付款</button>
                    <button class="btn fr" style="margin-left:.1rem;" @click="toRouter('/Cart',item,1)" v-if="item.order_status == 4 || item.order_status == -1" v-show="item.order_state != '1'">再次购买</button>
                    <button class="btn fr" @click="toCancel(item,'-2')" v-if="item.order_status == -1">删除订单</button>
                    <button class="btn fr" @click="toCancel(item,'-1')" v-if="item.order_status == 0">取消订单</button>
                    <button class="btn fr" @click="toRouter('/order',item,false)" v-if="item.order_status == 1">查看订单</button>
                    <button class="btn fr" @click="toRouter('/logis',item,false)" v-if="item.order_status == 3">查看物流</button>
                    
                </div>
            </div>
            <div class="comm-null" v-if="!$store.state.order">
                <div class="con-wrap text-center">
                    <img src="../../assets/null_com.png">
                    <p>暂时没有商品</p>
                </div>
            </div>
            <p class="page-infinite-loading" v-show="$store.state.queryLoading">
                <mt-spinner type="fading-circle" color="#666" :size="20" v-show="$store.state.moreLoading"></mt-spinner>
                <span style="font-size:.2rem;color:#666;" v-show="$store.state.allLoaded">暂无更多数据</span>
                <span style="font-size:.2rem;color:#666;" v-show="$store.state.loading">加载中...</span>
            </p>
        </div>
        <Shopsn></Shopsn>
        <div class="load" v-show="$store.state.order_load" @touchmove.prevent><mt-spinner type="triple-bounce" color="rgb(38, 162, 255)"></mt-spinner></div>
        <div class="load-wrap" v-show="$store.state.order_load_wrap" @touchmove.prevent><mt-spinner type="triple-bounce" color="rgb(38, 162, 255)"></mt-spinner></div>
    </div>
</template>
<script>
    import { MessageBox,Toast,InfiniteScroll } from 'mint-ui';
    import Shopsn from '@/components/page/Shopsn.vue';
    import qs from 'qs';
    export default {
        name : 'wholeOrder',
        data(){
            return {
                //初始化加载相关参数
                // queryLoading: false,
                // moreLoading: false,
                // allLoaded: false,
                // loading:false,
                search:true,
                scrollWatch:true,
                order_status:''
            }
        },
        components:{
            Shopsn
        },
        mounted() {
            document.body.scrollTop = 0;
            this.$store.commit('clear_page',this.$store.state.page); //初始化page
            this.$store.state.queryLoading = false; 
            this.$store.state.allLoaded = false;
            this.$store.state.moreLoading = false; 
            this.$store.state.loading = false;
            this.$store.state.no_data = false;
            this.$store.state.slidingSwitch = true;
            switch(Number(this.$route.params.status)){
                case 0:
                    this.$store.state.order_title = '全部订单';
                    this.$store.state.order_status = '';
                    this.getOrderList();
                    break;
                case 1:
                    this.$store.state.order_title = '待付款订单';
                    this.$store.state.order_status = 0;
                    this.getOrderList();
                    break;
                case 2:
                    this.$store.state.order_title = '待发货订单';
                    this.$store.state.order_status = 1;
                    this.getOrderList();
                    break;
                case 3:
                    this.$store.state.order_title = '已发货订单';
                    this.$store.state.order_status = 3;
                    this.getOrderList();
                    break;
                case 4:
                    this.$store.state.order_title = '已完成订单';
                    this.$store.state.order_status = 4;
                    this.getOrderList();
                    break;
                case 5:
                    this.$store.state.order_title = '以取消订单';
                    this.$store.state.order_status = -1;
                    this.getOrderList();
                    break;
            };
            let this_ = this;
            // 注册scroll事件并监听
            window.addEventListener('scroll',() =>{
                if(this_.scrollWatch){
                    // 判断是否滚动到底部
                    if(document.body.scrollTop + window.innerHeight >= document.body.offsetHeight) {
                        if(this_.$store.state.no_data === true){
                            return false;
                         }
                        // 如果开关打开则加载数据
                        if(this_.$store.state.slidingSwitch==true) {
                            this_.$store.state.slidingSwitch = false;
                            if(this_.$store.state.allLoaded === true){
                                    return false;
                            }else{
                                this_.$store.state.page ++;
                                this_.$store.state.queryLoading = true; 
                                this_.$store.state.moreLoading = true; 
                                this_.$store.state.loading = true;
                                this.axios({
                                    url:API_URL + 'Home/Order/myOrder',
                                    method:'get',
                                    params:{
                                        app_user_id:sessionStorage.getItem('user_ID'),
                                        order_status:this.$store.state.order_status,
                                        p:this_.$store.state.page
                                    }
                                }).then((res) => {
                                    this_.$store.state.slidingSwitch = true;
                                    if(res.data.status == 0){
                                        this_.$store.state.moreLoading = false;
                                        this_.$store.state.allLoaded = true;
                                        this_.$store.state.loading = false;
                                        return false;
                                    }
                                    res.data.data.forEach(function(val,index){
                                        this_.$store.state.order.push(val);
                                        });
                                }).catch((err) => {
                                    console.log(err);
                                });
                            }
                        
                        }
                    }
                }
                    
            });
        },
        destroyed(){
            this.scrollWatch = false;
        },
        methods:{
            getOrderList(){
                this.axios({
                        url:API_URL + 'Home/Order/myOrder',
                        method:'get',
                        params:{
                            app_user_id:sessionStorage.getItem('user_ID'),
                            order_status:this.$store.state.order_status,
                            p:this.$store.state.page
                        }
                    }).then((res) => {
                        this.$store.state.order = res.data.data;
                        if(res.data.data.length<10){this.$store.state.no_data = true;}
                        this.$store.state.order_load_wrap = false;
                    }).catch((err) => {
                        console.log(err);
                    });
            },
            toDetails(item,text,index){
                this.$router.push({
                    name:'orderDetails',
                    params:{
                        status:item.order_status,
                        order:item.id,
                        order_type:2 //1为积分订单 2 为商品订单
                    }
                });
            },
            toRouter(to,item,text){
                switch(to){
                    case '/evaluate':
                        this.$store.state.order_ommodity = text;
                        this.$router.push({
                            name:'evaluate',
                            params:{
                                id:item.id
                            }
                        });
                        break;
                    case '/Cart':
                        this.$router.push({
                            name:'orderDetails',
                            params:{
                                status:4,
                                order:item.id,
                                order_type:2 //1为积分订单 2 为商品订单
                            }
                        })
                        break;
                    case '/logis':
                        this.$router.push({
                            name:'logis',
                            params:{
                                status:3,
                                id:item.id,
                                order_type:2 //1为积分订单 2 为商品订单
                            }
                        });
                        break;
                    case '/order':
                        this.$router.push({
                            name:'orderDetails',
                            params:{
                                status:2,
                                order:item.id,
                                order_type:2 //1为积分订单 2 为商品订单
                            }
                        });
                        break;
                    case '/pay':
                        this.$router.push({
                            name:'orderDetails',
                            params:{
                                status:item.order_status,
                                order:item.id,
                                order_type:2 //1为积分订单 2 为商品订单
                            }
                        });
                        break;
                }
            },
            // del(item,index){
            //     MessageBox.confirm('确定执行此操作?').then(action => {
            //         this.axios.post(API_URL + 'Home/Order/deleteOrder',qs.stringify({
            //             app_user_id:sessionStorage.getItem('user_ID'),
            //             order_id:item.id
            //         })).then((res) => {
            //             this.$store.state.order.splice(index,1);
            //             Toast({
            //                 message: res.data.msg,
            //                 position: 'bottom'
            //             });
            //         }).catch((err) => {
            //             console.log(err);
            //         });
            //     }).catch((err) => {
            //         console.log(err);
            //     });
            // },
            toCancel(item,order_status){
                MessageBox.confirm('确定执行该操作?').then(action => {
                    this.axios.post(API_URL + 'Home/Order/setOrderStatus',qs.stringify({
                        app_user_id:sessionStorage.getItem('user_ID'),
                        order_id:item.id,
                        status:order_status
                    })).then((res) => {
                        if(res.data.status == 1){
                            Toast({
                                message: res.data.msg,
                                position: 'bottom'
                            });
                            this.$store.state.page = 1;
                            this.axios({
                                url:API_URL + 'Home/Order/myOrder',
                                method:'get',
                                params:{
                                    app_user_id:sessionStorage.getItem('user_ID'),
                                    order_status:this.$store.state.order_status,
                                    p:this.$store.state.page
                                }
                            }).then((res) => {
                                this.$store.state.order = res.data.data;
                                this.$store.state.order_load_wrap = false;
                            }).catch((err) => {
                                console.log(err);
                            });
                        }else{
                            if(order_status == -1){
                                Toast('取消失败'); 
                            }else if(order_status == -2){
                                Toast('删除失败'); 
                            }
                        }

                        
                    }).catch((err) => {
                        console.log(err);
                    });
                }).catch((err) => {
                    console.log(err);
                });
            }
        }
    }
</script>
<style lang="less">
     .page-infinite-loading{
        span{
            .mint-spinner-fading-circle {
                display: inline-block;
                vertical-align: middle;
                margin-right: 5px;
            }
        }
            
    }
</style>

<style lang="less" scoped>
    .whole-wrap{
        padding-top: .94rem;
        background:#f1f1f1;
        .order-wrap{
            padding-top:.1rem;
            .comm-null{
                padding-top:.5rem;
                p{
                    font-size:.28rem;
                    color:#666;
                    padding-top:.2rem;
                }
            }
            .page-infinite-loading{
                text-align: center;
                height: 30px;
                line-height: 30px;           
            }
            .order-list{
                background:#fff;
                line-height:.7rem;
                margin-bottom:.2rem;
                .hd{
                    margin:0 .2rem;
                    border-bottom:1px solid #dfdfdd;
                    height:.7rem;
                    .title{
                        font-size:.26rem;
                        color:#333;
                    }
                    .status{
                        font-size:.3rem;
                        color:#f9781e;
                    }
                    .status.light{
                        color:#adadad;
                    }
                    .status.ash{
                        color:#333;
                    }
                }
                .describe{
                    margin:0 .2rem;
                    height:1.46rem;
                    padding:.13rem 0;
                    border-bottom:1px solid #dfdfdd;
                    .company{
                        padding-top:.2rem;
                        padding-left:.2rem;
                        span{
                            font-size:.22rem;
                            color:#999;
                        }
                    }
                    .btn{
                        position:absolute;
                        right:0;
                        bottom:.1rem;
                        width: 1.5rem;
                        height: .5rem;
                        border:1px solid #ff881e;
                        background:#fff;
                        border-radius:20px;
                        color:#ff881e;
                    }
                    img{
                        width:1.46rem;
                        height:1.46rem;
                    }
                    .words{
                        width:5.24rem;
                        .text{
                            padding:0 .2rem;
                            font-size:.32rem;
                            color:#333;
                            line-height:.45rem;
                            overflow: hidden;
                            display: -webkit-box;
                            -webkit-line-clamp: 2;
                            -webkit-box-orient: vertical;
                        }
                    }
                }
                .commod{
                    padding:0 .2rem;
                    height:.9rem;
                    line-height:.9rem;
                    border-bottom:1px solid #dfdfdd;
                    span{
                        font-size:.3rem;
                        color:#333;
                    }
                    .actual{
                        padding-left:.7rem;
                        span{
                            color:#ff881e;
                        }
                    }
                    .icon{
                        position:absolute;
                        right:.35rem;
                        top:50%;
                        width:.38rem;
                        height:.47rem;
                        background:url(../../assets/trash.png) no-repeat;
                        background-size:100% 100%;
                        margin-top:-.235rem;
                    }
                }
                .operation{
                    height:.7rem;
                    padding:.1rem .2rem;
                    line-height:.7rem;
                    .timer{
                        font-size:.25rem;
                        color:#757575;
                    }
                    .btn{
                        padding:.1rem;
                        background:#fff;
                        border:1px solid #f9781e;
                        font-size:.1rem;
                        color:#f9781e;
                        border-radius:5px;
                        outline:none;
                    }
                }
            }
        }
    }
</style>