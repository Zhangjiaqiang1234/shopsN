<template>
    <div>
        <div v-title data-title="商品列表">商品列表</div>
        <list-header :sea="search"></list-header>
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
        <ul class="list-wrap">
            <li class="clearfix" v-for="(item,index) in search_data" :key="item.id" @click="tolink(index)">
                <img v-lazy="URL + item.img" class="fl">
                <div class="list-text fl">
                    <p class="text">{{item.title}}</p>
                    <p class="new-price">￥
                        <span v-if="item.price_market">{{item.price_market}}</span>
                    <!-- <span v-if="item.price_member">{{item.price_member}}</span> -->
                    </p>       
                    <p class="status"><span>已有{{item.count}}条评论</span><span>{{item.trade_num}}笔交易成功</span></p>
                </div>
            </li>
        </ul>
        <div v-if="!search_data" class="comm-null">
            <div class="con-wrap text-center">
                <img src="../../assets/null_com.png">
                <p>暂无商品</p>
            </div>
        </div>
        <Shopsn></Shopsn>
        <div class="load" v-show="load" @touchmove.prevent><mt-spinner type="triple-bounce" color="rgb(38, 162, 255)"></mt-spinner></div>

        <div class="load-wrap" v-show="load_wrap" @touchmove.prevent><mt-spinner type="triple-bounce" color="rgb(38, 162, 255)"></mt-spinner></div>
    </div>
</template>
    
<script>
    import listHeader from '@/components/page/children/header.vue';
    import qs from 'qs';
    import Shopsn from '@/components/page/Shopsn.vue';
    export default {
        name : 'list',
        data(){
            return {
                logoImg:require('@/assets/btn-return.png'),
                status:[true,false,false],
                search:true,
                sort_id:null,
                sort_status:null,
                load:false,
                scrollWatch:true,
                load_wrap:true,
                search_data:'',
                msg:'',
                api_url:''
            }
        },
        methods:{
            toback:function(){
                this.$router.go(-1);
            },
            addClass:function(index){
                for(var i = 0; i < this.status.length; i++){
                    this.$set(this.status,i,false);
                }
                this.$set(this.status,index,true);
            },
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
                if(this.$route.params.status == 'search'){
                    this.axios.get(this.api_url,{
                        params:{
                            'keyword':this.$route.params.id,
                            'sort':this.sort_id
                        }
                    }).then((res) => {
                        if(res.data.msg === '没有找到此商品'){
                            this.load_wrap = false;
                            this.msg = res.data.msg;
                        }
                        this.search_data = res.data.data;
                        this.load = false;
                        this.load_wrap = false;
                    }).catch((err) => {
                        console.info('FailtrueErr', err);
                    });
                }else{
                    this.axios.get(this.api_url,{
                    params:{
                            sort:this.sort_id,
                            class_id:this.$route.params.status
                        }
                        }).then((res) => {
                        if(res.data.msg === '没有找到此商品'){
                            this.load_wrap = false;
                            this.msg = res.data.msg;
                        }
                        this.search_data = res.data.data;
                        this.load = false;
                        this.load_wrap = false;
                    }).catch((err) => {
                        console.info('FailtrueErr', err);
                    });
                }
            },
            tolink(index){
                this.$router.push({
                    name:'product',
                    params:{
                        id:this.search_data[index].id,
                        status:1
                    }
                });
            }
        },
        created(){
            switch(this.$route.params.status){
                case 'search':
                    this.api_url = API_URL + 'Home/Index/keyWordSearch';
                    break;
                case 'appliance':
                    this.api_url = API_URL + 'Home/Index/appliances';
                    break;
                case 'mobile':
                    this.api_url = API_URL + 'Home/Index/phone_digital';
                    break;
                case 'office':
                    this.api_url = API_URL + 'Home/Index/computerOffice';
                    break;
                default:
                    this.api_url = API_URL + 'home/goods/listByclass';
                    this.axios({
                        url:API_URL + 'Home/Goods/getProduct',
                        method:'get',
                        params:{
                            class_id:this.$route.params.status
                        }
                    }).then((res) => {
                        this.search_data = res.data.data;
                        this.load_wrap = false;
                    }).catch((err) => {
                        console.log(err);
                    });
                    return;
                ;
            }
            this.sort();
        },
        components:{
            listHeader,
            Shopsn
        }
    }
</script>
<style lang="less" scoped>

    .comm-null{
        padding-top:.5rem;
        p{
            font-size:.28rem;
            color:#666;
            padding-top:.2rem;
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
    .list-wrap{
        padding-top:.3rem;
        background:#fff;
        li{
            padding:.13rem;
            height:2.2rem;
            border-bottom:1px solid #cbcbcb;
            img{
                width:2.2rem;
                height:2.2rem;
            }
            .list-text{
                width:4.3rem;
                padding-left:.25rem;
                .text{
                    font-size:.32rem;
                    color:#333;
                    line-height:.45rem;
                    padding-top:.1rem;
                    height:.9rem;
                    overflow:hidden; 
                    text-overflow:ellipsis;
                    display:-webkit-box; 
                    -webkit-box-orient:vertical;
                    -webkit-line-clamp:2; 
                }
                .new-price{
                    font-size:.32rem;
                    color:#f23030;
                    padding-top:.3rem;
                    span{
                        font-size:.4rem;
                        font-weight:bold;
                    }
                }
                .status{
                    color:#ddd;
                    padding-top:.1rem;
                    span{
                        font-size:.24rem;
                    }
                    span:nth-child(2){
                        padding-left:.3rem;
                    }
                }
            }
        }
    }
    .status{
        background:#fff;
        text-align:center;
        padding-bottom:.2rem;
        font-size:.3rem;
        color:#333;
    }
</style>
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