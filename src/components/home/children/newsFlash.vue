<!-- home 页面的 最新促销、尾货清仓 到 垂直跑马灯轮播公告 -->
<template>
    <div class="flash-wrap">
        <ul class="flash-dd clearfix">
            <li class="fl" v-for="(n,index) in nav" :key="n.id" @click="link(index)">
                    <img v-lazy="newdata.imgSrc[index]">
                <p>{{n.nav_titile}}</p>
            </li>
        </ul>
        <div v-if="false" class="flash-dt clearfix">
            <div class="flash-news fl text-center">公告</div>
            <div class="flash-content fl">
            <em></em>
            <ul class="scroll_box" ref="scroll_box">
                    <li  class="text-single-hidden" v-for="(item,index) in data" :key="item.id">{{item.title}}</li>
            </ul>
            </div>
            <router-link to="/Notice" class="flash-more fr">更多</router-link>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'newsflash',
        data() {
            return {
                newdata:{
                    imgSrc:['/static/navIcon1.png','/static/navIcon2.png','/static/navIcon3.png','/static/navIcon4.png']
                }
            }
        },
        props:{
            data:null,
            nav:null
        },
        mounted(){
            this.scroll_box();
        },
        methods: {
            scroll_box(){
                var count = 0,
                    clear = null;
                clear = setInterval(() => {
                    count ++;
                    if(count >= this.$store.state.home_data.announcement.length){
                        count = 0;
                    }
                    if(this.$refs.scroll_box){
                        this.$refs.scroll_box.style.top = -count * 0.55 +'rem';
                    }
                    
                },2000);
            }, 
            link(index){
                switch(index){
                    case 0:
                        this.$router.push({
                            path:'/latestProm'
                        });
                        break;
                    case 1:
                        this.$router.push({
                            path:'/poopClearance'
                        });
                        break;
                    case 2:
                        this.$router.push({
                            path:'/brandList'
                        });
                        break;
                    case 3:
                        // this.$router.push({
                        //     path:'/IntegralMall'
                        // });
                        break;
                    case 4:
                        this.$router.push({
                            name:'comList',
                            params:{
                                status:'office'
                            }
                        });
                        break;
                    case 5:
                        this.$router.push({
                            path:'/Integral',
                            // params:{
                            //     status:'mobile'
                            // }
                        });
                        break;
                    case 6:
                        // this.$router.push({
                        //     name:'comList',
                        //     params:{
                        //         status:'office'
                        //     }
                        // });
                        break;
                    case 7:
                        this.$router.push('/home');
                        break;
                }
            }
        }
    };
</script>
<style lang="less" scoped>
    .flash-wrap{
        background:#f2f2f2;
        .flash-dt{
            width:100%;
            height:.59rem;
            padding:.1rem 0;
            border-bottom:1px solid #eaf0f4;
            background:#fff;
            .flash-news{
                width:1.3rem;
                height:100%;
                position:relative;
                border-right:2px dotted #ccc;
                line-height: .59rem;
                font-size:.32rem;
                color:#111;
            }
            .flash-content{
                position: relative;
                width:4.8rem;
                height:100%;
                padding:0 .2rem;
                line-height:.59rem;
                font-size:.28rem;
                color:#333;
                white-space:nowrap; 
                overflow:hidden; 
                text-overflow:ellipsis; 
                border-right:1px dotted #ccc;
                em{
                    display:inline-block;
                    width: .28rem;
                    height: .28rem;
                    background:url(../../../assets/icon1.png) no-repeat;
                    background-size:100% 100%;
                    margin-right:.2rem;
                    margin-top: .16rem; 
                }
                .scroll_box{
                    width: 4.5rem;
                    height: .59rem;
                    position: absolute;
                    left:.7rem;
                    top:-.1rem;
                    transition: 1s all ease;
                    li{
                        font-size: .2rem;
                        line-height: .59rem;
                    }
                }
            }
            .flash-more{
                width:.8rem;
                height:.59rem;
                text-align:center;
                line-height:.59rem;
                font-size:.28rem;
                color:#797979;
            }
        }
        .flash-dd{
            width:100%;
            padding-top:.27rem;
            background:#fff;
            border-bottom:1px solid #eaf0f4;
            li{
                width:25%;
                text-align:center;
                img{
                    width:1.26rem;
                    height:1.26rem;
                }
                p{
                    font-size:.28rem;
                    color:#8C8C8C;
                    padding:.2rem 0;
                    line-height:100%;
                    font-weight:400;
                    font-size:.28rem;
                }
            }
        }
        .container-main{
            width:100%;
            height:2.33rem;
            background:#fff;
        }
    }
</style>