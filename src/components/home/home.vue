<template>
    <div class="home">
        <div v-title data-title="主页">主页</div>
        <home-header :userName="getData"></home-header>
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(item,index) in $store.state.home_data.banner" :key="item.id">
                <img v-lazy="URL + item.pic_url">
            </mt-swipe-item>
        </mt-swipe>
        <news-flash :data="$store.state.home_data.getTopGoodsClass" v-if="$store.state.home_data.getTopGoodsClass"></news-flash>

        <!-- 首页第一个分类 -->
        <recommend-a :data="this.$store.state.home_data.getRecommendGoodsClass"></recommend-a>


        <!-- 广告位 -->
        <div class="limit-banner" v-for="item in $store.state.home_data.poopClear_img" :key="item.id">
            <a :href="item.ad_link">
                <img v-lazy="URL + item.pic_url">
            </a>
        </div>
    
      
        <!-- 本月特卖 -->
        <recommend-b></recommend-b>


        <Shopsn></Shopsn>

        <div class="load-wrap" v-show="$store.state.load_wrap" @touchmove.prevent><mt-spinner type="triple-bounce" color="rgb(38, 162, 255)"></mt-spinner></div>
    </div>
</template>
<script>
    import HomeHeader from './children/Header';
    import recommendA from './children/recommendA'; // 首页第一个分类
    import recommendB from './children/recommendB'; // 首页第二个分类
    import NewsFlash from './children/newsFlash';
    import hotGoods from './children/hotGoods';
    // import limitedActivity from './children/limitedActivity';
    // import limitedHd from './children/conHeader';
    // import limitedDd from '@/components/Widget/moveCon';
    import brandMus from './children/BrandMus';
    import lateMall from './children/lateMall';
    import mallCon from '@/components/Widget/mallCon';
    import Shopsn from '@/components/page/Shopsn.vue';
    import { Indicator } from 'mint-ui';
    import QS from 'qs';
    export default {
        name: 'home',
        data() {
            return {
                continuous:true,
                defaultIndex:0,
                showIndicators:true,
                prevent:true,
                stopPropagation:true,
                data:'',
                getData:'',
                newsData:null,
                endtime:'',
                text:['最新促销','品牌馆','积分商城','家用电器','手机数码','电脑办公'],
                promotions:''
            }
        },
        created() {
             //是否登陆过
            let userid  =  localStorage.getItem('user_ID');
            if(userid){
                localStorage.setItem('user_ID', userid);
            }

            var userName = this.$route.params.userName;
            var HOME_URL_SASD = '';
            this.getData = userName;
            if(localStorage.getItem('user_ID')){
                HOME_URL_SASD = API_URL+'Home/Index/home?SDKFJSD='+localStorage.getItem('user_ID');
            }else{
                HOME_URL_SASD = API_URL+'Home/Index/home';
            }
            this.axios({
                url:HOME_URL_SASD,
                method:'post'
            }).then((res) => {
                var json_wx = JSON.parse(res.request.response);
                if(json_wx.status == 999){
                    window.location.href = json_wx.msg;
                    return;
                }
                this.$store.state.home_data = res.data.data;
            }).catch((err) => {
                console.log(err)
            });
        },
        updated(){
            var that = this;
            setTimeout(function(){
                that.$store.state.load_wrap = false;
            },1000);
        },
        components: {
            HomeHeader,
            NewsFlash,
            hotGoods,
            Shopsn,
            brandMus,
            lateMall,
            mallCon,
            recommendA,
            recommendB,
            // limitedActivity,
            // limitedDd,
            // limitedHd,
        }
    }
</script>
<style lang="less">
    .home{
        padding-top:.9rem;
        .mint-swipe-indicators{
            width: 100%;
            text-align: center;
        }
    }
</style>
<style lang="less" scoped>
.home{
    .mint-swipe{
        width:100%;
        height:3.28rem;
        img{
            width:100%;
            height:100%;
        }
        .mint-swipe-indicators{
            .mint-swipe-indicator{
                width:20px;
                height:20px;
            }
        }
    }
    .entranch-main{
        width:100%;
        height:2rem;
    }
    .home-banner{
        padding:.2rem;
        img{
            width: 100%;
        }
    }
    .banner{
        img{
            width: 100%;
        }
    }
    .banner-3{
        img{
            width: 7.5rem;
            height: 3.75rem;
        }
    }
    .limit-banner{
        padding:.2rem;
        img{
            width: 7.1rem;
            height: 1.66rem;
            border-radius:5px;
        }
    }
}
</style>