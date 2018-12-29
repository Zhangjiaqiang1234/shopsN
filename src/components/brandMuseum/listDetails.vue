<template>
    <div>
        <div v-if="data.brand" v-title :data-title="data.brand.brand_name">{{data.brand.brand_name}}</div>
        <list-header  v-if="data.brand" :set="true" :text="data.brand.brand_name"></list-header>
        <div class="banner">
            <img v-lazy="URL + brand_banner">
        </div>
        <div class="list-header" v-if="data.brand">
            <div class="content">
                <div class="logo"><img v-lazy="URL + brand_logo"></div>
                <h6>{{data.brand.brand_name}}</h6>
                <p class="text2-hidden">{{brand_description}}</p>
            </div>
        </div>
        <ul class="sort-wrap clearfix text-center">
            <li class="fl" :class="{active:sort_status == 1}" @click="sort('xl')">销量
                <span class="icon">
                    <em class="top" :class="{active:sort_id == 1}"></em><br>
                    <em class="bottom" :class="{active:sort_id == 2}"></em>
                </span>
            </li>
            <li class="fl" :class="{active:sort_status == 2}" @click="sort('jg')">价格
                <span class="icon">
                    <em class="top" :class="{active:sort_id == 3}"></em><br>
                    <em class="bottom" :class="{active:sort_id == 4}"></em>
                </span>
            </li>
            <li class="fl" @click="sort('rq')" :class="{active:sort_status == 3}">人气</li>
        </ul>
        <list-lop :data="data.goods"></list-lop>
        <Shopsn></Shopsn>
        <div class="load" v-show="load" @touchmove.prevent><mt-spinner type="triple-bounce" color="rgb(38, 162, 255)"></mt-spinner></div>
        <div class="load-wrap" v-show="load_wrap" @touchmove.prevent><mt-spinner type="triple-bounce" color="rgb(38, 162, 255)"></mt-spinner></div>
    </div>
</template>
<script>
    import QS from 'qs';
    import listHeader from '@/components/page/children/header';
    import listLop from '@/components/Widget/searchList';
    import Shopsn from '@/components/page/Shopsn.vue';
    export default {
        name : 'listDetails',
        data(){
            return {
                data:'',
                brand_banner:'',
                brand_logo:'',
                brand_description:'',
                sort_id:null,
                sort_status:null,
                load:false,
                scrollWatch:true,
                load_wrap:true
            }
        },
        methods:{
            sort(index){
                switch(index){
                    case 'xl':
                        if(this.sort_id != 1){
                            this.sort_id = 1;
                            this.sort_status = 1;
                        }else{
                            this.sort_id = 2;
                            this.sort_status = 1;
                        }
                        this.load = true;
                        break;
                    case 'jg':
                        if(this.sort_id != 3){
                            this.sort_id = 3;
                            this.sort_status = 2;
                        }else{
                            this.sort_id = 4;
                            this.sort_status = 2;
                        }
                        this.load = true;
                        break;
                    case 'rq':
                        if(this.sort_id == 5)return;
                        this.sort_id = 5;
                        this.sort_status = 3;
                        this.load = true;
                        break;
                }
                this.axios.post(API_URL + 'Home/Brand/brandDetail',QS.stringify({
                    id:this.$route.params.ID,
                    sort:this.sort_id
                })).then(res => {
                    this.data = res.data.data;
                    this.brand_banner = res.data.data.brand.brand_banner;
                    this.brand_logo = res.data.data.brand.brand_logo;
                    this.brand_description = res.data.data.brand.brand_description;

                    this.$store.state.braDetails = res.data.data;
                    this.load = false;
                }).catch(err => {
                    console.log(err)
                });
            }
        },
        created(){
            this.sort();
        },
        mounted(){
            document.body.scrollTop = 0;
        },
        destroyed(){
            this.scrollWatch = false;
        },
        updated(){
            var that = this;
            setTimeout(function(){
                that.load_wrap = false;
            },1000);
        },
        components:{
            listHeader,
            listLop,
            Shopsn
        }
    }
</script>
<style lang="less">
    .load {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 999999;
    }

    .load .mint-spinner-triple-bounce {
        width: 100%;
        text-align: center;
        position: absolute;
        left: 0;
        top: 50%;
    }
</style>
<style lang="less" scoped>
    .banner{
        img{
            width: 100%;
        }
    }
    .list-header{
        height: 1.1rem;
        padding:0 .2rem;
        background:#f9f9f9;
        .content{
            padding-left:1.7rem;
            height: 100%;
            padding-top:.1rem;
            box-sizing:border-box;
            position:relative;
            h6{
                font-size:.28rem;
                color:#333;
            }
            p{
                font-size:.2rem;
                line-height:.28rem;
                color:#999;
                height: .56rem;
            }
            .logo{
                position:absolute;
                left:0;
                bottom:0;
                width: 1.42rem;
                height: 1.42rem;
                box-sizing:border-box;
                border-radius:100%;
                border:2px solid #fff;
                background:#000;
                img{
                    width: 90%;
                    position:absolute;
                    left:0;
                    top:0;
                    right:0;
                    bottom:0;
                    margin:auto;
                }
            }
        }
    }
    .sort-wrap {
        height: .9rem;
        background:#fff;
        box-sizing:border-box;
        padding:.2rem 0;
        border-bottom:1px solid #cbcbcb;
        line-height:.5rem;
        li{
            width: 33.3333333%;
            font-size:.26rem;
            color:#666;
            position:relative;
            .icon{
                position:absolute;
                left:1.6rem;
                top:0;
                height: 100%;
                .top{
                    position:absolute;
                    left:0;
                    top:.17rem;
                    width: .12rem;
                    height: .06rem;
                    background:url(../../assets/sort-top.png);
                    background-size:100% 100%;
                }
                .top.active{
                    background:url(../../assets/sort-top-active.png);
                    background-size:100% 100%;
                }
                .bottom{
                    position:absolute;
                    left:0;
                    bottom:.17rem;
                    width: .12rem;
                    height: .06rem;
                    background:url(../../assets/sort-bottom.png);
                    background-size:100% 100%;
                }
                .bottom.active{
                    background:url(../../assets/sort-bottom-active.png);
                    background-size:100% 100%;
                }
            }
        }
        li:nth-child(2){
            border-left:1px solid #cbcbcb;
            border-right:1px solid #cbcbcb;
            box-sizing:border-box;
        }
        li.active{
            color:#d0111b;
        }
    }
</style>
