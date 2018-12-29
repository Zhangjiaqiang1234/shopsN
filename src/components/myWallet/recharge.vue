<template>
  <div class="recharge-wrap">
      <rech-header :text="title"></rech-header>
      <div class="rech-amount clearfix">
          <span class="title fl">充值金额</span>
          <input type="number" class="fl" placeholder="建议充值100元以上金额">
      </div>
      <div class="choice" @click="theChecked">
        <input type="radio" class="radio-input" value="使用账户余额" :checked="disabled">
        <span class="radio-core"></span>
        <span class="radio-label">网银服务</span>
      </div>
      <div v-title :data-title="title">{{title}}</div>
      <btn :text="text"></btn>
      <other :otherdata="otherdata"></other>
  </div>
</template>
<script>
    import rechHeader from '@/components/page/children/header.vue';
    import btn from '@/components/Widget/maxBtn.vue';
    import other from '@/components/Widget/payMethods.vue';
    export default {
        name : 'recharge',
        data(){
            return {
                title:'shopsn充值',
                text:'立即充值',
                disabled:false,
                otherdata:{
                    img:[require('@/assets/alipay.jpg'),require('@/assets/wx.jpg')],
                    title:['支付宝支付','微信支付'],
                    content:['支付宝安全支付','微信安全支付']
                }
            }
        },
        methods:{
            theChecked(){
                this.disabled = true;
            }
        },
        components:{
            btn,
            other,
            rechHeader
        }
    }
</script>
<style lang="less" scoped>
    .recharge-wrap{
        background:#fff;
    }
    .rech-amount{
        height: 1.35rem;
        line-height:1.35rem;
        border-bottom:1px solid #dfdfdd;
        padding:0 .2rem;
        background:#fff;
        .title{
            font-size: .32rem;
            color:#333;
        }
        input{
            width: 5.8rem;
            height: 100%;
            border:none;
            text-indent: .4rem;
            font-size: .32rem;
            outline: none;
        }
    }
    .choice{
        height: 1rem;
        line-height:1rem;
        padding:0 .2rem;
        border-bottom:1px solid #dfdfdd;
        background:#fff;
        .radio-core{
            box-sizing: border-box;
            display: inline-block;
            background-color: #fff;
            border-radius: 100%;
            border: 1px solid #ccc;
            position: relative;
            width: .5rem;
            height: .5rem;
            vertical-align: middle;
        }
        .radio-input{
            display:none;
        }
        .radio-input:checked+.radio-core:after {
            background-color: #fff;
            -webkit-transform: scale(1);
            transform: scale(1);
        }
        .radio-input:checked+.radio-core {
            background-color: #26a2ff;
            border-color: #26a2ff;
        }
        .radio-core:after {
            box-sizing: border-box;
            content: " ";
            border-radius: 100%;
            position: absolute;
            left:0;
            top:0;
            bottom:0;
            right:0;
            margin:auto;
            width: .2rem;
            height: .2rem;
            -webkit-transition: -webkit-transform .2s;
            transition: -webkit-transform .2s;
            transition: transform .2s;
            transition: transform .2s,-webkit-transform .2s;
            -webkit-transform: scale(0);
            transform: scale(0);
        }
        .radio-label{
            display:inline-block;
            vertical-align: middle;
            margin-left: .23rem;
            width:6.2rem;
            overflow:hidden;
            font-size:.32rem;
            color:#333;
            .span-main{
                font-size:.28rem;
                color:#999;
                span{
                    font-size:.28rem;
                    color:#f23030;
                }
            }
        }
    }
</style>