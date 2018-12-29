<template>
    <div class="Search-header">
        <div v-title data-title="主页">商品搜索</div>
        <div class="Search-wap clearfix">
            <div class="Search-input-main fl">
                <input type="search" v-model="value" @input="get" placeholder="搜索宝贝、课程、讲师...">
            </div>
            <span @click="remove" class="return-btn fl">取消</span>
        </div>
        <div class="Search-content" v-show="!value">
            <div class="hot">
                <div class="title"><span></span>热门搜索</div>
                <ul class="clearfix">
                    <li class="fl" v-for="(item,index) in hot_data" :key="item.id" @click="tolist('/list',index)">{{item.hot_words}}</li>
                </ul>
                <div class="def" v-if="hot_data.legnth <= 0">热门搜索为空!</div>
            </div>
            <div class="hit">
                <div class="title">历史搜索</div>
                <ul class="clearfix">
                    <li class="fl" v-for="(item,index) in hit" :key="item.id" @click="toHit('/list',index)">{{item}}</li>
                </ul>
                <div class="def" v-show="hit.length <= 0">你还没浏览过任何商品哦，快去逛逛吧！</div>
            </div>
            <button class="btn" @click="clear" v-show="hit.length > 0">清空历史记录</button>
        </div>
        <ul class="list-item-wrap" v-show="value">
            <li v-for="(item,index) in search_data" :key="item.id" class="text1-hidden" @click="toLink('/list',index)">{{item.title}}</li>
        </ul>

        <div class="load-wrap" v-show="load_wrap" @touchmove.prevent><mt-spinner type="triple-bounce" color="rgb(38, 162, 255)"></mt-spinner></div>
    </div>
</template>
<script>
    import qs from 'qs';
    import { MessageBox,Toast } from 'mint-ui';
    var clear = null;
    export default {
        name: 'search',
        data() {
            return {
                value: null,
                hit:[],
                hot:[],
                search_data:'',
                hot_data:'',
                load_wrap:true,
                status:'search'
            }
        },
        created(){
            if(localStorage.getItem('hit') != '' && localStorage.getItem('hit') != 'undefined' && localStorage.getItem('hit') != null){
                this.hit = localStorage.getItem('hit').split(',');
            }
        },
        methods: {
            get() {
                clearTimeout(clear);
                clear = setTimeout(() => {
                    this.axios.get(API_URL + 'Home/Index/keyWordSearch?keyword='+this.value).then((res) => {
                        this.search_data = res.data.data;
                    }).catch((err) => {
                        console.info('FailtrueErr', err);
                    });
                },300);
            },
            remove(){
                this.$router.go(-1);
            },
            toLink(link,index){
                this.hit.push(this.value);
                for(var i = 0;i<this.hit.length;i++){
                    if(this.hot.indexOf(this.hit[i]) == -1){  
                        this.hot.push(this.hit[i]);
                    }
                }
                localStorage.setItem('hit',this.hot.join(','));
                this.$router.push({
                    name:'list',
                    params:{
                        id:this.value,
                        status:this.status
                    }
                });
            },
            tolist(link,index){
                this.$router.push({
                    name:'list',
                    params:{
                        id:this.hot_data[index].hot_words,
                        status:this.status
                    }
                });
            },
            toHit(link,index){
                this.$router.push({
                    name:'list',
                    params:{
                        id:this.hit[index],
                        status:this.status
                    }
                });
            },
            clear(){
                MessageBox.confirm('确定执行此操作?').then(action => {
                    this.hit = [];
                    localStorage.setItem('hit',this.hit);
                });
            }
        },
        updated(){
            var that = this;
            setTimeout(function(){
                that.load_wrap = false;
            },1000);
        },
        mounted(){
            this.axios({
                url:API_URL + 'Home/Index/hot_search',
                method:'post'
            }).then((res) => {
                this.hot_data = res.data.data;
            }).catch((err) => {
                console.log(err);
            });
        }
    }
</script>
<style lang="less" scoped>
.Search-header{
    background:#f2f2f2;
    .Search-wap {
        height: .6rem;
        padding: .1rem .2rem;
        background: #d0111b;
        .return-btn {
            width: .8rem;
            height: .6rem;
            text-align: center;
            line-height: .6rem;
            font-size: .28rem;
            color: #fff;
            em{
                position:absolute;
                left:.45rem;
                top:.06rem;
                i{
                    border-right:10px solid #fff;
                    border-top:10px solid transparent;
                    border-bottom:10px solid transparent;
                    position:absolute;
                    right:0;
                    top:0;
                }
                b{
                    border-right:10px solid #0097fa;
                    border-top:10px solid transparent;
                    border-bottom:10px solid transparent;
                    position:absolute;
                    right:-.04rem;
                    top:0;
                }
            }
        }
        .Search-input-main {
            width: 6.3rem;
            height: .6rem;
            border-radius: 100px;
            background: rgba(250,250,250,.5);
            line-height:100%;
            input {
                width: 6.2rem;
                padding-right: .1rem;
                height: 100%;
                border: none;
                border-radius: 100px;
                background: url(../../assets/search.png) no-repeat .2rem .15rem;
                background-size:.26rem .27rem;
                outline: none;
                text-indent: .6rem;
                font-size: .25rem;
            }
            input::-webkit-input-placeholder, textarea::-webkit-input-placeholder { 
                color: #fff; 
            } 
            input:-moz-placeholder, textarea:-moz-placeholder { 
                color: #fff; 
            } 
            input::-moz-placeholder, textarea::-moz-placeholder { 
                color: #fff; 
            } 
            input:-ms-input-placeholder, textarea:-ms-input-placeholder { 
                color: #fff; 
            } 
        }
    }
    .Search-content {
        .hot,
        .hit{
            padding:.14rem .2rem 0;
            .title{
                font-size:.3rem;
                color:#999;
                padding:.3rem 0;
            }
            .def{
                font-size:.3rem;
                color:#999;
                text-align:center;
            }
            li{
                height:.73rem;
                width:1.75rem;
                padding:0 .25rem;
                font-size:.3rem;
                color:#757575;
                line-height:.73rem;
                text-align:center;
                background:#fff;
                border-radius:5px;
                margin-right:.17rem;
                margin-top:.2rem;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
            li:nth-child(3n){
                margin-right:0;
            }
        }
        .hit{
            padding-bottom:.3rem;
        }
        .hot{
            .title{
                padding-left:.4rem;
                position:relative;
                span{
                    width:.25rem;
                    height:.31rem;
                    position:absolute;
                    left:0;
                    top:50%;
                    margin-top:-.155rem;
                    background:url(../../assets/hot.png) no-repeat;
                    background-size:100% 100%;
                }
            }
        }
        .btn{
            width:7.1rem;
            height:.78rem;
            margin:0 auto;
            display:block;
            font-size:.3rem;
            color:#b3b3b3;
            border:1px solid #b3b3b3;
            border-radius:5px;
            background:#fff;
        }
    }
}

.Search-header{
    .list-item-wrap{
        background:#fff;
        li{
            font-size:.25rem;
            height: .8rem;
            line-height: .8rem;    
            color: #888;
            font-weight: normal;
            border-bottom:1px solid #ccc;
            padding:0 .2rem;
            background:url(../../assets/btn-right.png) 7.2rem center no-repeat;
            background-size:.14rem .24rem;
        }
        li:active{
            background:url(../../assets/btn-right.png) 7.2rem center no-repeat #f5f5f5;
            background-size:.14rem .24rem;
        }
    }
}
</style>