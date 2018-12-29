<template>
  <div>
      <div v-title :data-title="title">{{title}}</div>
      <integ-header :text="title" :rule="rule" @addShow="addShow"></integ-header>
      <div class="myInte-banner text-center">
        <p class="title">可用积分</p>
        <p class="number">{{data.sum}}</p>
        <p class="link" @click="tolink('/intOrder')">我的兑换</p>
      </div>
      <integ-shares :rule="ruleCon" @addShow="addHide"></integ-shares>
      <integ-obvious :accDetails="accDetails"></integ-obvious>
      <integ-btn :text="btnText" :to="'/IntegralMall'"></integ-btn>

      <div class="load-wrap" v-show="load_wrap" @touchmove.prevent><mt-spinner type="triple-bounce" color="rgb(38, 162, 255)"></mt-spinner></div>
  </div>
</template>
<script>
    import integHeader from '@/components/page/children/header.vue';
    import integShares from '@/components/Widget/rule.vue';
    import integObvious from '@/components/Widget/obviousList.vue';
    import integBtn from '@/components/Widget/fixedBtn.vue';
    import qs from 'qs';
    export default {
        name : 'myIntegral',
        data(){
            return {
                title:'我的积分',
                rule:true,
                ruleCon:false,
                accDetails:{
                    title:'积分明细',
                    content:''
                },
                btnText:'马上兑换商品',
                data:'',
                load_wrap:true
            }
        },
        components:{
            integHeader,
            integShares,
            integObvious,
            integBtn
        },
        methods:{
            addShow(){
                this.ruleCon = true;
            },
            addHide(){
                this.ruleCon = false;
            },
            tolink(){
                this.$router.push('/intOrder')
            }
        },
        updated(){
            var that = this;
            setTimeout(function(){
                that.load_wrap = false;
            },1000);
        },
        mounted(){
            this.axios.post(API_URL + 'Home/Integral/integral',qs.stringify({
                app_user_id: sessionStorage.getItem('user_ID')
            })).then((res) => {
                this.data = res.data.data;
                this.accDetails.content = res.data.data.list;
            }).catch((err) => {
                console.log(err);
            });
        }
    }
</script>
<style lang="less" scoped>
    .myInte-banner{
        background:url(../../assets/integral_bg.png) no-repeat;
        background-size:100% 100%;
        width: 100%;
        height: 2.62rem;
        .title{
            font-size:.24rem;
            color:#80060c;
            padding-top:.7rem;
        }
        .number{
            font-size:.64rem;
            color:#fff;
            padding:.1rem 0;
        }
        .link{
            font-size:.3rem;
            color:#ffffa0;
        }
    }
</style>