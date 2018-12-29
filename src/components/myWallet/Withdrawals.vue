<template>
  <div>
      <div v-title :data-title="title">{{title}}</div>
      <with-header :text="title"></with-header>
      <div class="from-glup">
        <div class="input-wrap clearfix">
            <span class="fl icon">￥</span>
            <input type="number" class="fl" placeholder="可提现金额45.15元">
        </div>
        <div class="status clearfix">
            <span class="danger fl">转出金额超限</span>
            <span class="turnOut fr">全部转出</span>
        </div>
      </div>
      <with-btn :text="text"></with-btn>
  </div>
</template>
<script>
    import withHeader from '@/components/page/children/header.vue';
    import withBtn from '@/components/Widget/maxBtn.vue';
    export default {
        name : 'Withdrawals',
        data(){
            return {
                title:'提现',
                text:'确认提现'
            }
        },
        components:{
            withHeader,
            withBtn
        }
    }
</script>
<style lang="less" scoped>
    .from-glup{
        padding:0 .2rem;
        width: 7.1rem;
        height: 1.9rem;
        background:#fff;
        border-bottom:1px solid #dfdfdd;
        .input-wrap{
            height: .6rem;
            line-height:.6rem;
            padding:.3rem 0;
            .icon{
                font-size:.6rem;
                color:#333;
            }
            input{
                width: 6.4rem;
                height: 100%;
                border:none;
                text-indent: .2rem;
                font-size:.42rem;
                outline: none;
            }
        }
    }
    .status{
        .danger{
            font-size:.28rem;
            color:#d0111b;
        }
        .turnOut{
            font-size:.32rem;
            color:#1caceb;
        }
    }
</style>