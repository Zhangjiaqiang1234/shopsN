<template>
    <div class="pr-tab-wrap">
        <pr-header :text="title" :number="number"></pr-header>
        <mt-navbar v-model="selected">
            <mt-tab-item id="1">图文详情</mt-tab-item>
            <mt-tab-item id="2">规格参数</mt-tab-item>
            <mt-tab-item id="3">商品评论</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">
                <div class="list-img-wrap" v-html="datas">
                    <!-- <img src="" alt=""> --> 
                    {{datas}}
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <ul class="list-wrap">
                    <li class="clearfix">
                        <span class="title fl">商品名称</span>
                        <p class="con fl">{{data.title}}</p>
                    </li>
                    <li class="clearfix">
                        <span class="title fl">品牌</span>
                        <p class="con fl">{{data.brand}}</p>
                    </li>
                    <li class="clearfix">
                        <span class="title fl">分类名称</span>
                        <p class="con fl">{{data.className}}</p>
                    </li>
                    <li class="clearfix">
                        <span class="title fl">类型</span>
                        <p class="con fl">{{data.typename}}</p>
                    </li>
                    <li class="clearfix">
                        <span class="title fl">单位</span>
                        <p class="con fl" v-if="data.attra">{{data.attra[0].item}}</p>
                    </li>
                </ul>
            </mt-tab-container-item>
            <mt-tab-container-item id="3">
                <div class="comment-wrap">
                    <h2>评论<span>({{dataItem.length}})</span></h2>
                    <div class="list-wrap" v-for="item in dataItem" :key="item.id">
                        <div class="list-hd clearfix">
                            <div class="pull-left fl">
                                <img src="../../../assets/user-d.jpg">
                                {{item.user_name}}
                            </div>
                            <div class="pull-right fr"></div>
                        </div>
                        <div class="list-com">{{item.content}}</div>
                        <div class="list-img-main clearfix">
                            <img :src="URL + item" class="fl" v-for="item in dataItem.img" :key="item.id">
                        </div>
                        <div class="list-purTimer">购买日期： {{new Date(item.create_time * 1000).getFullYear()+'.'+(new Date(item.create_time * 1000).getMonth() + 1)+'.'+new Date(item.create_time * 1000).getDate()}}</div>
                    </div>
                </div>
            </mt-tab-container-item>
        </mt-tab-container>
        <pr-foot></pr-foot>
        <Shopsn></Shopsn>
    </div>
</template>
<script>
    import PrHeader from './header.vue';
    import prFoot from './footBtn.vue';
    import Shopsn from '@/components/page/Shopsn.vue';
    export default {
        name : 'tab',
        data(){
            return {
                selected:'1',
                title:'商品详情',
                number:'12',
                data:'',
                datas:'',
                dataItem:'',
                scrollWatch:true
            }
        },
        methods:{
            
        },
        mounted() {
            document.body.scrollTop = 0;
            //商品规格
            this.axios({
                url:API_URL + 'Home/Goods/specifications',
                method:'get',
                params:{
                    goods_id:this.$route.params.id
                }
            }).then((res) => {
                this.data = res.data.data;
            }).catch((err) => {
                console.log(err);
            });
            //评论
            this.axios({
                url:API_URL + 'Home/Goods/commentList',
                method:'get',
                params:{
                    goods_id:this.$route.params.id
                }
            }).then((res) => {
                this.dataItem = res.data.data;
                new Date().getMonth
            }).catch((err) => {
                console.log(err);
            });
            //图文详情
            this.axios({
                url:API_URL + 'Home/Goods/goodsDetail',
                method:'get',
                params:{
                    goods_id:this.$route.params.id
                }
            }).then((res) => {
                this.datas=res.data.data;  
            }).catch((err) => {
                console.log(err);
            });
        },
        destroyed(){
            this.scrollWatch = false;
        },
        components:{
            PrHeader,
            prFoot,
            Shopsn
        }
    }
</script>
<style lang="less">
    .pr-tab-wrap{
        background:#f1f1f1;
        .list-main{
            padding-top:.1rem;
        }
        .mint-tab-item{
            .mint-tab-item-label{
                color:#333;
                font-size:.3rem;
                line-height:.75rem;
            }
        }
        .mint-tab-item.is-selected{
            .mint-tab-item-label{
                color:#333;
            }
        }
        .mint-navbar{
            height:.75rem;
            background:#fff;
            line-height:.75rem;
            .mint-tab-item{
                height:100%;
                padding:0;
                border-color:#d0111b;
                line-height:.75rem;
            }
        }
        .list-wrap{
            padding-top:.2rem;
            li{
                padding:.25rem .2rem;
                border-bottom:1px solid #e7e7e7;
                background:#fff;
                .title{
                    width:2.28rem;
                    font-size:.28rem;
                    color:#696969;
                }
                .con{
                    width:4.8rem;
                    font-size:.26rem;
                    color:#333;
                    line-height:.36rem;
                }
            }
            .list-com{
                height:.65rem;
                line-height:.65rem;
                font-size:.24rem;
                color:#333;
                overflow:hidden; 
                text-overflow:ellipsis; 
                white-space:nowrap
            }
        }
        .comment-wrap{
            h2{
                padding:0 .2rem;
                height:.88rem;
                font-size:.32rem;
                line-height:.88rem;
                background:none;
                color:#333;
                span{
                    font-size:.32rem;
                    color:#f9781e;
                }
            }
            .list-wrap{
                width:7.1rem;
                padding:0 .2rem;
                height:3rem;
                background:#fff;
                margin-bottom:.1rem;
                .list-hd{
                    padding:.2rem 0;
                    line-height:.32rem;
                    height:.3rem;
                    .pull-left{
                        padding-left:.46rem;
                        font-size:.2rem;
                        color:#b0b0b0;
                        position:relative;
                        img{
                            width:.32rem;
                            height:.32rem;
                            position:absolute;
                            left:0;
                            top:0;
                        }
                    }
                    .pull-right{
                        color:#999;
                        font-size:.26rem;
                    }
                }
                .list-img-main{
                    height:1rem;
                    img{
                        width:1rem;
                        height:1rem;
                        margin-right:.2rem;
                    }
                }
                .list-purTimer{
                    padding-top:.2rem;
                    font-size:.2rem;
                    color:#999;
                }
            }
        }
        .list-img-wrap{
            background:#ff;
            margin-top:.2rem;
            img{
                width:100%;
            }
        }
    }
</style>