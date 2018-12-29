<template>
    <div>
        <div v-title :data-title="title">{{title}}</div>
        <ev-header :text="title"></ev-header>
        <div class="evaluate-wrap">
            <div class="item-list">
                <div class="text-wrap clearfix">
                    <img :src="URL + $store.state.order_ommodity.selfImg" class="fl">
                    <textarea class="fl" v-model="msg" placeholder="长度在10-500字之间
写点什么吧，您的评论可以为其他用户
提供参考"></textarea>
                </div>
                <div class="img-wrap clearfix">
                    <div class="list-img fl" v-for="(imgas,index) in imgs" :key="imgas.id" v-show="imgs.length >= 1" @click="imgShow(index)">
                        <div class="del el-icon-circle-cross" @click="del(index)"></div>
                        <img :src="imgs[index].img">
                    </div>
                    <div class="input-btn fl" v-show="imgs.length < 5">
                        <input type="file" @change="add_img($event)" ref="int">
                    </div>
                </div>
            </div>
            <div class="max-img" v-show="maximg" @click="hideImg">
                <img :src="maximg">
            </div>
            <div class="com_grade clearfix text-center">
                <span class="fl" :class="{active:rev_data == 1}" @click="rev(1)"><em class="icon"></em>好评</span>
                <span class="fl" :class="{active:rev_data == 2}" @click="rev(2)"><em class="icon"></em>中评</span>
                <span class="fl" :class="{active:rev_data == 3}" @click="rev(3)"><em class="icon"></em>差评</span>
            </div>
        </div>

        <div class="btn-wrap"></div>
        <footer class="from-btn">
            <button @click="comment">马上评论</button>
        </footer>

        <div class="load" v-show="load" @touchmove.prevent><mt-spinner type="triple-bounce" color="rgb(38, 162, 255)"></mt-spinner></div>
    </div> 
</template>
<script>
    import evHeader from '@/components/page/children/header.vue';
    import { Toast } from 'mint-ui';
    import qs from 'qs';
    export default {
        name : 'evaluate',
        data(){
            return {
                title:'评价商品',
                imgs:[],
                maximg:null,
                msg:'',
                status:'',
                rev_data:1,//中评 差评 好评 如果不选择默认为好评
                load:false,
                img_type:'',
            }
        },
        methods:{
            add_img(ev){
                const reader = new FileReader(),
                      img1 = ev.target.files[0],
                      that = this;
                reader.readAsDataURL(img1);
                reader.onload = function(){
                    that.imgs.push({img:this.result,type:'data:'+img1.type+';base64,'})
                }
                this.$refs.int.value = '';
            },
            del(index){
                this.imgs.splice(index,1)
            },
            imgShow(index){
                this.maximg = this.imgs[index].img;
            },
            hideImg(){
                this.maximg = null;
            },
            comment(){
                this.load = true;
                this.axios.post(API_URL + 'Home/Order/commentAdd',qs.stringify({
                    app_user_id:sessionStorage.getItem('user_ID'),
                    order_id:this.$route.params.id,
                    mobileImage:JSON.stringify(this.imgs),
                    content:this.msg,
                    status:this.rev_data,
                    goods_id:this.$store.state.order_ommodity.goods_id
                })).then((res) => {
                    Toast({
                        message: res.data.msg,
                        position: 'bottom'
                    });
                    this.load = false;
                    this.$router.push({
                        name:'orderWrap',
                        params:{
                            status:6
                        }
                    });
                })
            },
            rev(index){//中评 差评 好评 如果不选择默认为好评
                this.rev_data = index;
            }
        },
        mounted(){
            
        },
        components:{
            evHeader
        }
    }
</script>
<style lang="less" scoped>
    .evaluate-wrap{
        background:#fff;
        margin-top:.2rem;
        .com_grade{
            span{
                width: 33.3333%;
                height: .8rem;
                line-height: .8rem;
                font-size:.26rem;
                color:#666;
                position:relative;
            }
            span:nth-child(1){
                background:url(../../assets/praise_active.png) .5rem center no-repeat;
                background-size:.39rem .39rem;
            }
            span:nth-child(2){
                background:url(../../assets/comments.png) .5rem center no-repeat;
                background-size:.39rem .39rem;
            }
            span:nth-child(3){
                background:url(../../assets/Bad.png) .5rem center no-repeat;
                background-size:.39rem .39rem;
            }
            span:nth-child(1).active{
                color:#6bc68b;
                background:url(../../assets/praise.png) .5rem center no-repeat;
                background-size:.39rem .39rem;
            }
            span:nth-child(2).active{
                color:#ff9921;
                background:url(../../assets/comments_active.png) .5rem center no-repeat;
                background-size:.39rem .39rem;
            }
            span:nth-child(3).active{
                color:#e02828;
                background:url(../../assets/Bad_active.png) .5rem center no-repeat;
                background-size:.39rem .39rem;
            }
        }
        .item-list{
            width:7.1rem;
            padding:0 .2rem .3rem;
            border-bottom:1px solid #dfdfdf;
            .text-wrap{
                padding:.56rem 0;
                img{
                    width:1.74rem;
                    height:1.74rem;
                }
                textarea{
                    width: 5.3rem;
                    height: 1.74rem;
                    padding:0 .2rem;
                    border:none;
                    resize:none;
                    outline: none;
                    font-size:.28rem;
                    color:#333;
                }
            }
            .img-wrap{
                .list-img{
                    margin-right:.3rem;
                    margin-top:.2rem;
                    position:relative;
                    img{
                        width:1.5rem;
                        height:1.5rem;
                    }
                    .del{
                        position:absolute;
                        top:-.15rem;
                        right:-.15rem;
                        font-size:.3rem;
                    }
                }
                .list-img:nth-child(4n){
                    margin-right:0;
                }
                .input-btn{
                    position:relative;
                    overflow:hidden;
                    width: 1.5rem;
                    height: 1.5rem;
                    background:url(../../assets/img-btn.jpg) no-repeat;
                    background-size:100% 100%;
                    margin-top:.2rem;
                    input{
                        width: 200%;
                        height: 200%;
                        position:absolute;
                        left:-100%;
                        top:-100%;
                        outline: none;
                    }
                }
            }
        }
        .max-img{
            width: 100%;
            height: 100%;
            position:fixed;
            top:0;
            left:0;
            background:rgba(0,0,0,.7);
            z-index:999;
            img{
                width: 100%;
                height: 80%;
                position:absolute;
                left:0;
                top:0;
                right:0;
                bottom:0;
                margin:auto;
            }
        }
    }

    .btn-wrap{
        width: 100%;
        height: 1.74rem;
    }
    .from-btn{
        position:fixed;
        bottom:0;
        left:0;
        width: 100%;
        height:1.74rem;
        background:#f1f1f1;
        text-align:center;
        button{
            width: 7.1rem;
            height: .9rem;
            background:#e02828;
            border:none;
            color:#fff;
            font-size: .32rem;
            outline: none;
            position:absolute;
            left:.2rem;
            top:.4rem;
        }
        button:active{
            box-shadow: 0 5px 5px #ccc;
        }
    }
</style>