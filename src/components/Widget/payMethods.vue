<!-- 支付方式组件 -->
<template>
  <div>
    <dl class="other">
        <dt>支付方式</dt>

        <!-- 支付宝支付 -->
        <dd v-if="payType.zfb" class="clearfix" @click="zfb">
            <img :src="require('@/assets/alipay.jpg')" class="fl">
            <div class="fl pull-right">
                <h6 class="title">支付宝支付</h6>
                <p class="con">支付宝安全支付</p>
            </div>
            <span class="icon"></span>
        </dd>
        <!-- 微信支付 -->
        <dd v-if="payType.zfb" class="clearfix" @click="wx2">
            <img :src="require('@/assets/wx.jpg')" class="fl">
            <div class="fl pull-right">
                <h6 class="title">微信支付</h6>
                <p class="con">微信安全支付</p>
            </div>
            <span class="icon"></span>
        </dd>

    </dl>
  </div>
</template>
<script>
    export default {
        name : 'payMethods',
        props:{
            payType:{ // 默认开启支付宝、微信支付
                type: Object,
                default: () => {
                    return {
                        'zfb': true,
                        'wx': true
                    }
                }
            }
        },
        data(){
            return {
                load: false
            }
        },
        methods:{
            zfb(){ // 支付宝支付
                this.load = true;
                this.axios({//支付宝支付
                    url: API_URL + 'Home/AlipayMobile/PayInfo',
                    method: 'get',
                    params: {
                        // order_id: this.$store.state.order_number
                    }
                }).then((res) => {
                    const oDiv = document.createElement('div');
                    oDiv.innerHTML = res.data;
                    document.body.appendChild(oDiv);
                    document.forms.alipaysubmit.submit();
                    this.load = false;
                }).catch((err) => {
                    console.log(err);
                });
            },
            wx2(){ // 微信支付
                let  user_id=localStorage.getItem('user_ID');
                let ua = window.navigator.userAgent.toLowerCase();
                this.load = true;
                this.axios({//h5微信支付
                    url: API_URL +'/home/Wxh5Pay/wxh5pay',
                    method: 'get',
                    params: {
                        // order_id: this.$store.state.order_number
                    }
                }).then((res) => {
                    var url = res.data.data;
                    // window.location.href=url;
                    this.load = false;   
                }).catch((err) => {
                    console.log(err);
                });
            }
        }
    };
</script>
<style lang="less" scoped>
    .other{
        padding:0 .2rem;
        background:#fff;
        dt{
            font-size:.3rem;
            color:#333;
            height:.7rem;
            line-height:.7rem;
            border-bottom:1px solid #dfdfdf;
        }
        dd{
            padding:.3rem 0;
            height:.83rem;
            border-bottom:1px solid #dfdfdf;
            position:relative;
            img{
                width:.83rem;
                height:.83rem;
            }
            .icon{
                position:absolute;
                top:50%;
                right:.2rem;
                width:.2rem;
                height:.35rem;
                background:url(../../assets/btn-right.png) no-repeat;
                background-size:100% 100%;
                margin-top:-.175rem;
            }
            .pull-right{
                padding-left:.3rem;
                .title{
                    font-size:.32rem;
                    color:#333;
                }
                .con{
                    padding-top:.15rem;
                    font-size:.26rem;
                    color:#999;
                }
            }
        }
    }
</style>
