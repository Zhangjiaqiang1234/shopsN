<template>
    <transition>
        <div class="detail-wrap" @touchmove.prevent v-show="$store.state.const_join">
            <div class="content-main">
                <div class="padd">
                    <div class="contet-item clearfix" v-if="$store.state.commodity_data">
                        <img :src="URL + $store.state.commodity_data.goods_img[0]" v-if="$store.state.commodity_data.goods_img">
                        <img :src="URL + $store.state.commodity_data.pic_url[0]" v-if="$store.state.commodity_data.pic_url">
                        <p class="item">{{$store.state.commodity_data.title || $store.state.commodity_data.goods.title}}</p>
                        <p class="price" v-if="$route.params.status == 1">￥<span>{{$store.state.commodity_data.price_member}}</span></p>
                        <p class="price" v-if="$store.state.commodity_data.goods"><span>{{$store.state.commodity_data.goods.integral}}</span> 积分</p>
                        <span class="delete-btn" @click="remove">×</span>
                    </div>
                    <dl class="gui clearfix" v-if="$store.state.commodity_data.allattrcha">
                        <dt class="fl">{{$store.state.commodity_data.allattrcha[0].name}}</dt>
                        <dd class="fl" v-for="(item,index) in $store.state.commodity_data.allattrcha[0].value" :key="item.id" @click="addClass(index)" :class="{active:status == index}">{{item.attr}}</dd>
                    </dl>
                    <dl class="gui clearfix" v-for="items in $store.state.commodity_data.spec" :key="items.id">
                        <dt class="fl">{{items.name}}</dt>
                        <dd class="fl" v-for="(item,index) in items" :key="item.id" @click="addClass(index)" :class="{active:status == index}">{{item}}</dd>
                    </dl>
                    <div class="addSub clearfix">
                        <span class="pull-left fl">数量</span>
                        <div class="pull-right fr clearfix">
                            <span class="stock fl" v-if="$store.state.commodity_data.minStock">库存：{{$store.state.commodity_data.minStock}}件</span>
                            <div class="input-main fl clearfix">
                                <button class="fl" @click="reduce">-</button>
                                <input type="number" class="fl" v-model="$store.state.commodity_val" @input="min">
                                <button class="fl" @click="plus">+</button>
                            </div>
                        </div>
                    </div>
                    <div class="com">
                        共<span>{{Number($store.state.commodity_val)}} </span>件&nbsp;&nbsp;
                        共计<span v-if="$store.state.commodity_data.price_member"><i>￥</i>{{$store.state.commodity_val * $store.state.commodity_data.price_member}}</span>
                        <span v-if="$store.state.commodity_data.goods"> {{$store.state.commodity_val * $store.state.commodity_data.goods.integral}} <i>积分</i></span>
                    </div>
                </div>
                
                <div class="btn-join clearfix" v-if="$route.params.status == 1">
                    <button class="fl join" @click="join">加入购物车</button>
                    <button class="fl imm" @click="toOrder">立即购买</button>
                </div>
                <div class="btn-join clearfix" v-if="$route.params.status == 2">
                    <button class="fr imm" @click="toExchange">立即兑换</button>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
    import qs from 'qs';
    import { Toast } from 'mint-ui';
    export default {
        name : 'detailOptions',
        data(){
            return {
                status:''
            }
        },
        methods:{
            reduce(){
                if(this.$store.state.commodity_val <= 1)return;
                this.$store.state.commodity_val--;
            },
            plus(){
                if(this.$store.state.commodity_val >= this.$store.state.commodity_data.minStock) return;
                this.$store.state.commodity_val++;
            },
            min(){
                let val = parseInt(this.$store.state.commodity_val);
                if(val==0){this.$store.state.commodity_val = 0}
                let reg = /(^[1-9]([0-9]*)$|^[0-9]$)/;
                if(!reg.test(this.$store.state.commodity_val)){this.$store.state.commodity_val = ''}
                if(val >= this.$store.state.commodity_data.minStock)this.$store.state.commodity_val = this.$store.state.commodity_data.minStock;
            },
            remove(){
                this.$store.state.const_join = false;
            },
            addClass(index){
                this.status = index;
            },
            toOrder(){
                if(this.$store.state.commodity_val==''||this.$store.state.commodity_val==0){
                    Toast("购买商品数量错误");return 
                }else if(this.$store.state.commodity_data.minStock == 0){
                     Toast("库存不足");return 
                }else if(!sessionStorage.getItem('user_ID')){
                    this.$router.push('/LogoIn');
                    return;
                };
                this.$store.state.goods = JSON.stringify([{num:this.$store.state.commodity_val,id:this.$route.params.id,goods_price:this.$store.state.commodity_data.price_member}]);
                this.$store.state.const_join = false;
                this.$router.push({
                    name:'order',
                    params:{
                        id:2
                    }
                });
            },
            toExchange(){
                if(!sessionStorage.getItem('user_ID')){
                    this.$router.push('/LogoIn');
                    return;
                };
                this.$store.state.goods = JSON.stringify([{num:this.$store.state.commodity_val,id:this.$route.params.id,goods_price:this.$store.state.commodity_data.price_member}]);
                this.$store.state.const_join = false;
                this.$router.push({
                    name:'order',
                    params:{
                        id:3
                    }
                });
            },
            join(){
                if(this.$store.state.commodity_val==''||this.$store.state.commodity_val==0){
                    Toast("购买商品数量错误");return false
                }else if(this.$store.state.commodity_data.minStock == 0){
                     Toast("库存不足");return false
                }else if(!sessionStorage.getItem('user_ID')){
                    this.$router.push('/LogoIn');
                    return;
                };
                this.axios.post(API_URL + 'Home/Cart/add_cart',qs.stringify({
                    app_user_id:sessionStorage.getItem('user_ID'),
                    goods_id:this.$route.params.id,
                    goods_num:this.$store.state.commodity_val,
                    price_new:this.$store.state.commodity_val * this.$store.state.commodity_data.price_member
                })).then((res) => {
                    Toast(res.data.msg);
                    if(res.data.status == 0){
                        this.$router.push('/LogoIn');
                    }
                    this.$store.state.catr_number += parseInt(this.$store.state.commodity_val);
                    this.$store.state.const_join = false;
                }).catch((err) => {
                    console.log(err);
                });
            }
        }
    }
</script>
<style lang="less" scoped>
    .detail-wrap{
        position:fixed;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background:rgba(0,0,0,.5);
        z-index:1;
        .content-main{
            position:absolute;
            left:0;
            bottom:0;
            width:100%;
            background:#fff;
            .padd{
                padding:0 .2rem;
                    .contet-item{
                    padding:0 0 .4rem;
                    position:relative;
                    border-bottom:1px solid #dfe3e4;
                    img{
                        width:1.77rem;
                        height:1.77rem;
                        border-radius:10px;
                        position:absolute;
                        top:-.2rem;
                        left:0;
                    }
                    .item{
                        padding-left:1.92rem;
                        padding-top:.36rem;
                        width:4.8rem;
                        height:.8rem;
                        font-size:.26rem;
                        color:#333;
                        line-height:.4rem;
                        overflow:hidden;
                    }
                    .price{
                        font-size:.26rem;
                        color:#ff7200;
                        padding-left:1.92rem;
                        padding-top:.1rem;
                        span{
                            font-size:.32rem;
                        }
                    }
                    .delete-btn{
                        position:absolute;
                        right:0;
                        top:.2rem;
                        width:.34rem;
                        line-height:.36rem;
                        height:.34rem;
                        border:1px solid #bfbfbf;
                        text-align:center;
                        font-size:.4rem;
                        color:#bfbfbf;
                        border-radius:100%;
                    }
                }
                .gui{
                    padding-bottom:.26rem;
                    border-bottom:1px solid #bfbfbf;
                    dt{
                        width:100%;
                        height:.8rem;
                        line-height:.8rem;
                        font-size:.32rem;
                        color:#757575;
                    }
                    dd{
                        height:.75rem;
                        line-height:.75rem;
                        padding:0 .3rem;
                        border:1px solid #d4d4d4;
                        border-radius:5px;
                        font-size:.3rem;
                        color:#333;
                        margin-right:.3rem;
                    }
                    dd.active{
                        background:#ff7200;
                        color:#fff;
                        border-color:#fff;
                    }
                }
                .addSub{
                    height:1.38rem;
                    border-bottom:1px solid #dfe3e4;
                    line-height:1.38rem;
                    .pull-left{
                        font-size:.32rem;
                        color:#757575;
                    }
                    .pull-right{
                        .stock{
                            font-size:.24rem;
                            color:#aeadad;
                        }
                        .input-main{
                            width:2.36rem;
                            height:.79rem;
                            border:1px solid #dfdfdd;
                            border-radius:5px;
                            margin-top:.3rem;
                            margin-left:.2rem;
                            overflow:hidden;
                            line-height:.79rem;
                            button{
                                width:.7rem;
                                border:none;
                                background:#fff;
                                color:#757575;
                                font-size:.5rem;
                                line-height:.79rem;
                                outline:none;
                                height:100%;
                            }
                            button:active{
                                background:#ff7200;
                                color:#fff;
                            }
                            input{
                                width:.95rem;
                                border:none;
                                height:100%;
                                border-left:1px solid #dfdfdd;
                                border-right:1px solid #dfdfdd;
                                text-align:center;
                                font-size:.4rem;
                                color:#757575;
                            }
                        }
                    }
                }
                .com{
                    height:1.2rem;
                    line-height:1.2rem;
                    text-align:right;
                    font-size:.32rem;
                    color:#666;
                    span{
                        font-size:.36rem;
                        color:#ff7200;
                        font-weight:bold;
                        i{
                            font-size:.32rem;
                            font-style:normal;
                        }
                    }
                }
            }
            .btn-join{
                button{
                    width:50%;
                    border:none;
                    height:1rem;
                    line-height:1rem;
                    color:#fff;
                    font-size:.32rem;
                }
                .join{
                    background:#ff7200;
                }
                .imm{
                    background:#d0111b;
                }
            }
        }
    }
</style>