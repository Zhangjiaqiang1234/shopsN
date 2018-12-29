<template>
  <div class="wallet-wrap">
    <div v-title :data-title="title">{{title}}</div>
    <wal-header :text="title"></wal-header>
    <div class="balance-wrap">
      <div class="hd clearfix">
        <img :src="URL+$store.state.user_Imag" class="hd-port fl"> 
        <div class="amount fl">
          <div class="title">账户余额</div>
          <div class="number text-single-hidden">{{Number($store.state.my_wallet.balance)}}</div>
        </div>
      </div>
      <ul class="btn-wrap clearfix text-center">
        <!-- <li class="fl" @click="toRecharge('/withdr')">提现</li> -->
        <li class="fl" @click="toRecharge('/recharge')">我要充值</li>
      </ul>
    </div>
    <ul class="integral-wrap clearfix">
        <!-- <li class="fl clearfix" @click="toRecharge('/shares')">
          <span class="icon fl"></span>
          <div class="text fl">
            <div class="title">股票</div>
            <div class="number">1000</div>
          </div>
        </li> -->
        <li class="fl clearfix" @click="toRecharge('/Integral')">
          <span class="icon fl"></span>
          <div class="text fl">
            <div class="title">我的积分</div>
            <div class="number">{{Number($store.state.my_wallet.integral)}}</div>
          </div>
        </li>
    </ul>
    <!-- <wal-obvious :accDetails="accDetails"></wal-obvious> -->
  </div>
</template>
<script>
  import walHeader from '@/components/page/children/header.vue';
  import walObvious from '@/components/Widget/obviousList.vue';
  export default {
    name : 'myWallet',
    data(){
      return {
        title:'我的钱包',
        accDetails:{
          title:'账户明细',
          content:[
            {text:'分销奖励收益',time:'2017/04/15',pr:'+600.00',status:'1'},
            {text:'提现成功',time:'2017/04/15',pr:'-600.00',status:'2'},
            {text:'在线充值',time:'2017/04/15',pr:'+600.00',status:'1'}
          ]
        }
      }
    },
    methods:{
      toRecharge(link){
        this.$router.push({
          path:link
        });
      }
    },
    components:{
      walHeader,
      walObvious
    }
  }
</script>
<style lang="less" scoped>
  .wallet-wrap{
    background:#f1f1f1;
    .balance-wrap{
      background:#fff;
      .hd{
        padding:.6rem .2rem .73rem;
        height: 1.12rem;
        .hd-port{
          width: 1.12rem;
          height: 1.12rem;
          border-radius:100%;
          box-sizing: border-box;
        }
        .amount{
          padding-left:.2rem;
          .title{
            font-size:.24rem;
            color:#999;
            padding-bottom:.2rem;
          }
          .number{
            font-size:.8rem;
            color:#000;
            line-height: 100%;
            font-family: 'Arial';
            width: 5.7rem;
            height: .7rem;
          }
        }
      }
      .btn-wrap{
        height: 1.1rem;
        li{
          width: 100%;
          height: 100%;
          line-height:1.1rem;
          font-size:.32rem;
        }
        li:nth-child(1){
          background:#ffdcc3;
          color:#f9781e;
        }
        li:nth-child(2){
          background:#f9781e;
          color:#fff;
        }
        li:active{
          box-shadow: 5px 0 5px #ccc;
        }
      }
    }
    .integral-wrap{
      height: 1.64rem;
      padding:.2rem 0;
      li{
        padding:.3rem .2rem;
        width: 50%;
        height: 100%;
        background:#fff;
        box-sizing: border-box;
        .icon{
          width: 1.03rem;
          height: 1.03rem;
        }
        .text{
          padding-left:.3rem;
          .title{
            font-size:.24rem;
            color:#333;
            padding:.1rem 0;
          }
          .number{
            font-size: .4rem;
            color:#333;
            line-height:100%;
          }
        }
      }
      li:active{
        box-shadow: 0 0 5px #ccc;
      }
      li:nth-child(1){
        .icon{
          border-right:1px solid #f1f1f1;
          background:url(../../assets/integral1.png) no-repeat;
          background-size:100% 100%;
        }
      }
      li:nth-child(2){
        .icon{
          background:url(../../assets/integral2.png) no-repeat;
          background-size:100% 100%;
        }
      }
    }
  }
</style>