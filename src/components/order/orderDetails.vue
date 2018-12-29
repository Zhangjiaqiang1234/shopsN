<template>
    <div>
        <div v-title :data-title="title">{{title}}</div>
        <order-header :text="title"></order-header>
        <div class="order-number">
            <span class="fl title">订单编号：<em>{{$store.state.order_details.order_sn_id}}</em></span>
            <span class="fr status">{{$store.state.order_title}}</span>
        </div> 
        <div class="address-wrap">
            <div class="bg-top"></div>
            <div class="con-center" v-if="$store.state.order_details.address_id">
                <div class="personalInf clearfix">
                    <span class="name fl"><em></em>{{$store.state.order_details.address_id.realname}}</span>
                    <span class="number fl">{{$store.state.order_details.address_id.mobile}}</span>
                </div>
                <div class="address">{{$store.state.order_details.address_id.prov + $store.state.order_details.address_id.city + $store.state.order_details.address_id.dist + $store.state.order_details.address_id.address}}</div>
                <div class="icon"></div>
            </div>
            <div class="bg-bottom"></div>
        </div>
        <div class="market-wrap">
            <h2 class="title">ShopsN商场</h2>
            <ul class="content-main">
                <li v-for="(item,index) in $store.state.order_details.child" :key="item.id" class="clearfix">
                    <img :src="URL + item.img" class="fl">
                    <div class="explain-wrap fr">
                        <p class="details">{{item.goods_title}}</p>
                        <p class="clearfix product">
                            <span class="fl name" >{{item.attribute[0].name +' : '+ item.attribute[0].item}}</span>
                            <span class="fr number">x{{item.goods_num}}</span>
                        </p>
                        <p class="clearfix price-main" v-if="$route.params.order_type == 2">
                            <span class="fl price">￥{{item.goods_price}}</span>
                            <button class="fr btn" v-if="$route.params.status == 1" @click="toService('refund',index)">退款</button>
                            <button class="fr btn" v-if="$route.params.status == 4" @click="toService('rGoods',index)">申请售后</button>
                        </p>
                        <p class="clearfix price-main" v-if="$route.params.order_type == 1">
                            <span class="fl price">{{item.integral}}&nbsp;积分</span>
                        </p>
                    </div>
                </li>
            </ul>
            <!--<div class="status"><span>还有1件</span><em></em></div>-->
        </div>
        <div class="sundry-wrap">
            <p class="mode clearfix" v-if="$route.params.order_type == 2">
                <span class="title fl">支付方式：</span>
                <span class="answer fr">{{$store.state.order_details.pay_type}}</span>
            </p>
            <p class="mode clearfix" v-if="$route.params.order_type == 2">
                <span class="title fl">配送方式：</span>
                <span class="answer fr">{{$store.state.order_details.shipping}}</span>
            </p>
            <p class="mode clearfix" v-if="$route.params.order_type == 2">
                <span class="title fl">开具发票：</span>
                <span class="answer fr">{{$store.state.order_details.invoice}}</span>
            </p>
            <div class="clearfix msg-wrap" v-if="$route.params.order_type == 2">
                <span class="title">买家留言：</span><br>
                <textarea class="answer" placeholder="买家没有留下备注哦！" readonly="readonly" v-model="$store.state.order_details.remarks"></textarea>
            </div>
            <div class="money-wrap" v-if="$route.params.order_type == 2">
                <p class="clearfix">
                    <span class="fl name">商品总额</span>
                    <span class="fr price">￥{{$store.state.order_details.price_sum}}</span>
                </p>
                <p class="clearfix">
                    <span class="fl name">优惠</span>
                    <span class="fr price">- <em>￥0</em></span>
                </p>
                <p class="clearfix">
                    <span class="fl name">运费</span>
                    <span class="fr price">- <em>￥{{$store.state.order_details.shipping_monery}}</em></span>
                </p>
                <p class="clearfix">
                    <span class="fl name">优惠券</span>
                    <span class="fr price">- ￥{{$store.state.order_details.coupon_money}}</span>
                </p>
                <p class="clearfix">
                    <span class="fl name">实付款</span>
                    <span class="fr price">￥{{Number($store.state.order_details.price_sum ) - Number($store.state.order_details.shipping_monery) - Number($store.state.order_details.coupon_money)}}</span>
                </p>
            </div>
            <p class="timer-main">创建时间：{{new Date($store.state.order_details.create_time * 1000).getFullYear()+'/'+(new Date($store.state.order_details.create_time * 1000).getMonth()+1)+'/'+new Date($store.state.order_details.create_time * 1000).getDate()+' '+new Date($store.state.order_details.create_time * 1000).getHours()+':'+new Date($store.state.order_details.create_time * 1000).getMinutes()+':'+new Date($store.state.order_details.create_time * 1000).getSeconds()}}</p>
            <p class="timer-main">付款时间：{{new Date($store.state.order_details.pay_time * 1000).getFullYear()+'/'+(new Date($store.state.order_details.pay_time * 1000).getMonth()+1)+'/'+new Date($store.state.order_details.pay_time * 1000).getDate()+' '+new Date($store.state.order_details.pay_time * 1000).getHours()+':'+new Date($store.state.order_details.pay_time * 1000).getMinutes()+':'+new Date($store.state.order_details.pay_time * 1000).getSeconds()}}</p>
            <p class="timer-main">发货时间：{{new Date($store.state.order_details.delivery_time * 1000).getFullYear()+'/'+(new Date($store.state.order_details.delivery_time * 1000).getMonth()+1)+'/'+new Date($store.state.order_details.delivery_time * 1000).getDate()+' '+new Date($store.state.order_details.delivery_time * 1000).getHours()+':'+new Date($store.state.order_details.delivery_time * 1000).getMinutes()+':'+new Date($store.state.order_details.delivery_time * 1000).getSeconds()}}</p>
        </div>
        <footer>
            <div class="btn-wrap">
                <button class="fr" v-if="$route.params.status == 3" @click="conReceipt">确认收货</button>
                <button class="fr" v-if="$route.params.status == 3 || $route.params.status == 2" @click="toLogis">查看物流</button>
                <button class="fr" v-if="$route.params.status == 4 || $route.params.status == -1" @click="gobay">再次购买</button>
                <button class="fr" v-if="$route.params.status == 0" @click="pay">马上付款</button>
            </div>
        </footer>
        <Shopsn></Shopsn>
        <div class="load-wrap" v-show="load_wrap" @touchmove.prevent><mt-spinner type="triple-bounce" color="rgb(38, 162, 255)"></mt-spinner></div>
    </div>
</template>
<script>
    import orderHeader from '@/components/page/children/header.vue';
    import qs from 'qs';
    import { Toast } from 'mint-ui';
    import Shopsn from '@/components/page/Shopsn.vue';
    export default {
        name :'orderPending',
        data(){
            return {
                title : '订单详情',
                scrollWatch:true,
                status:'',
                load_wrap:true
            }
        },
        components:{
            orderHeader,
            Shopsn
        },
        methods:{
            toService(str,index){
                this.$store.commit('setvuce',this.$store.state.order_details);
                this.$router.push({
                    name:'serviceBack',
                    params:{
                        status:str,
                        index:index
                    }
                });
            },
            toLogis(){
                this.$router.push({
                    name:'logis',
                    params:{
                        status:3,
                        id:this.$store.state.order_details.id
                    }
                });
            },
            gobay(){
                const goods = [];
                for(let i = 0; i < this.$store.state.order_details.child.length; i++){
                    goods.push({goods_id:this.$store.state.order_details.child[i].goods_id,goods_num:this.$store.state.order_details.child[i].goods_num})
                }
                this.axios.post(API_URL + 'Home/Order/buyAgain',qs.stringify({
                    app_user_id:sessionStorage.getItem('user_ID'),
                    goods:JSON.stringify(goods)
                })).then((res) => {
                    console.log(res)
                    Toast({
                        message: res.data.msg,
                        position: 'bottom'
                    });
                    this.$router.push('/Cart');
                }).catch((err) => {
                    console.log(err);
                });
            },
            conReceipt(){
                this.axios.post(API_URL + 'Home/Afterbuy/goods_receipt',qs.stringify({
                    order_id:this.$route.params.order
                })).then((res) => {
                    Toast({
                        message: res.data.msg,
                        position: 'bottom'
                    });
                    this.$router.push({
                        name:'orderWrap',
                        params:{
                            status:3
                        }
                    });
                }).catch((err) => {
                    console.log(err);
                });
            },
            pay(){//马上付款
                this.$store.state.order_number = this.$store.state.order_details.id;
                this.$store.state.price = this.$store.state.order_details.price_sum;
                this.$router.push({
                    name:'cashier',
                    params:{
                        id:2
                    }
                });
            }
        },
        mounted() {
            const Id = this.$route.params.order;
            document.body.scrollTop = 0;
            this.axios.post(API_URL + 'Home/Order/orderDetail',qs.stringify({
                app_user_id:sessionStorage.getItem('user_ID'),
                order_id:Id
            })).then((res) => {
                if(res.data.data.child.length <= 0)return;
                this.$store.state.order_details = res.data.data;
                this.load_wrap = false;
            }).catch((err) => {
                console.log(err);
            });
        },
        destroyed(){
            this.scrollWatch = false;
        },
        created(){
            
        }
    }
</script>
<style lang="less" scoped>
    .order-number{
        width:7.1rem;
        height:.9rem;
        background:#fff;
        padding:0 .2rem;
        line-height:.9rem;
        .title{
            font-size:.32rem;
            color:#666;
            em{
                font-style:normal;
                font-size:.32rem;
                color:#282828;
            }
        }
        .status{
            font-size:.32rem;
            color:#d0111b;
            width: 1rem;
            overflow:hidden;
            height: 100%;
        }
    }
    .address-wrap{
        .bg-top,.bg-bottom{
            width:100%;
            height:.06rem;
            background:url(../../assets/bottom-bj.jpg) no-repeat;
            background-size:100% 100%;
        }
        .con-center{
            width:7.1rem;
            height:1.5rem;
            padding:0 .2rem;
            position:relative;
            background:#fff;
            .personalInf{
                padding-top:.3rem;
                .number{
                    font-size:.32rem;
                    color:#555;
                }
                .name{
                    padding:0 .45rem;
                    font-size:.32rem;
                    color:#555;
                    position:relative;
                    em{
                        width:.28rem;
                        height:.41rem;
                        position:absolute;
                        left:0;
                        top:0;
                        background:url(../../assets/userIcon.png) no-repeat;
                        background-size:100% 100%;
                    }
                }
            }
            .address{
                width:6.4rem;
                padding-top:.2rem;
                font-size:.28rem;
                color:#999;
                white-space:nowrap; 
                overflow:hidden; 
                text-overflow:ellipsis;
            }
            .icon{
                position:absolute;
                right:.2rem;
                bottom:.22rem;
                width:.18rem;
                height:.3rem;
                background:url(../../assets/icon-right.jpg) no-repeat;
                background-size:100% 100%;
            }
        }
    }
    .market-wrap{
        padding:.2rem 0;
        background:#f1f1f1;
        .title{
            background:#fff;
            padding:0 .2rem;
            height:.9rem;
            line-height:.9rem;
            font-size:.32rem;
            color:#d0111b;
            border-bottom:1px solid #dfdfdd;
        }
        .content-main{
            padding:0 .2rem;
            background:#fff;
            li{
                padding:.25rem 0;
                border-bottom:1px solid #dfdfdd;
                img{
                    width:1.55rem;
                    height:1.55rem;
                }
                .explain-wrap{
                    width:5.25rem;
                    .details{
                        font-size:.24rem;
                        line-height:.32rem;
                        color:#333;
                    }
                    .product{
                        padding-top:.1rem;
                        padding-bottom:.1rem;
                        .name{
                            font-size:.22rem;
                            color:#999;
                        }
                        .number{
                            font-size:.22rem;
                            color:#999;
                        }
                    }
                    .price-main{
                        .price{
                            font-size:.28rem;
                            color:#333;
                            line-height:.62rem;
                        }
                        .btn{
                            width:1.67rem;
                            height:.62rem;
                            border:1px solid #979797;
                            background:#fff;
                            border-radius:20px;
                            outline:none;
                            font-size:.28rem;
                            color:#333;
                            box-sizing:border-box;
                        }
                        .btn:active{
                            background-color:#fd5149;
                            color:#fff;
                            box-shadow:0 0 10px #fd5149;
                            border-color:#fd5149;
                        }
                    }
                }
            }
        }
        .status{
            height:.8rem;
            text-align:center;
            line-height:.8rem;
            background:#fff;
            span,em{
                display:inline-block;
                font-size:.28rem;
                color:#555;
            }
            em{
                width:.34rem;
                height:.2rem;
                background:url(../../assets/icon-bottom.jpg) no-repeat;
                background-size:100% 100%;
                margin-left:.28rem;
            }
        }
    }
    .sundry-wrap{
        padding:0 .2rem .2rem;
        background:#fff;
        .mode{
            height:1.1rem;
            line-height:1.1rem;
            border-bottom:1px solid #d1d1d1;
            .title{
                font-size:.25rem;
                color:#777;
            }
            .answer{
                font-size:.28rem;
                color:#333;
                padding-right:.3rem;
            }
        }
        .money-wrap{
            padding-top:.4rem;
            border-bottom:1px solid #ccc;
            .name{
                font-size:.25rem;
                color:#777;
                height: .5rem;
                line-height: .5rem;
            }
            .price{
                font-size:.28rem;
                color:#d0111b;
                em{
                    font-size:.28rem;
                    color:#666;
                    font-style: normal;
                }
            }
        }
        .msg-wrap{
            .title{
                padding-top:.5rem;
                display:block;
            }
            textarea{
                background:#f1f1f1;
                border:none;
                width: 100%;
                height: 1rem;
                resize:none;
                padding:.2rem;
                outline: none;
                box-sizing: border-box;
            }
        }
        .timer-main{
            padding-top:.3rem;
            font-size:.22rem;
            color:#797979;
        }
    }
    footer{
        width:100%;
        height:.8rem;
        .btn-wrap{
            height:.5rem;
            width:7.1rem;
            padding:.13rem .2rem;
            position:fixed;
            left:0;
            bottom:0;
            background:rgba(0,0,0,.4);
            button{
                width:1.71rem;
                height:.54rem;
                border-radius:5px;
                box-sizing:border-box;
                border:none;
                outline:none;
                color:#fff;
                background: #f97620;
                font-size:.28rem;
            }
            button:nth-child(2){
                margin-right:.15rem;
                background:#666;
                
            }
        }
    }
</style>