<template>
    <div class="footer2017">
        <div class="seat"></div>
        <div class="btn-main clearfix" v-if="$route.params.status == 1">
            <div class="col fl" @click="col"><em>{{iconArr[type]}}</em>收藏</div>
            <div class="join fl" @click="hide">加入购物车</div>
            <div class="imm fl" @click="hide">立即购买</div>
        </div>
        <div class="btn-main clearfix" v-if="$route.params.status == 2">
            <!--<span class="fl ex">我的积分：<em>1000</em>积分</span>-->
            <div class="imm fr" @click="hide">立即兑换</div>
        </div>
    </div>
</template>
<script>
    import { Toast } from 'mint-ui';
    import qs from 'qs';
    export default {
        name : 'footBtn',
        data(){ 
            return {
                iconArr:['☆','★','☆']
            }
        },
        props:{
            data:'',
            msg:'',
            nb:'',
            type:{
                type: Number,
                default: 0 // 0->未收藏，1->已收藏，2->需要删除
            }
        },
        methods:{
            col(){//收藏
                console.log(sessionStorage.getItem('user_ID'))
                console.log(sessionStorage.getItem('token'))
                if(!sessionStorage.getItem('user_ID') || !sessionStorage.getItem('token')){
                    this.$router.push({
                        path:'/LogoIn'
                    });
                }
                if(this.type != 1){
                    this.type = 1;
                }else{
                    this.type = 2;
                }
                this.axios.post(API_URL + 'Home/Cart/add_collection',qs.stringify({
                    app_user_id:sessionStorage.getItem('user_ID'),
                    goods_id:this.$route.params.id,
                    type:this.type
                })).then((res) => {
                    let msg_2 = '';
                    if(res.data.status == 1){
                        if(res.data.msg === '已取消'){
                            msg_2 = '取消收藏成功！';
                        }else{
                            msg_2 = '恭喜，宝贝收藏成功！';
                        }
                    }else{
                        msg_2 = res.data.msg;
                    }
                    
                    Toast({
                        message: msg_2,
                        position: 'bottom',
                        duration: 800
                    });
                }).catch((err) => {
                    console.log(err);
                })
            },
            hide(){
                this.$store.state.const_join = true;
            },
        }
    }
</script>
<style lang="less" scoped>
    .footer2017{
        width:100%;
        height:1rem;
        .ex{
            font-size:.22rem;
            color:#999;
            padding-left:.2rem;
            line-height: .9rem;
            em{
                font-style:normal;
                font-size:.32rem;
                color:#4591f2;
            }
        }
        .seat{
            width:100%;
            height:100%;
            background:#f1f1f1;
        }
        .btn-main{
            width:100%;
            height:1rem;
            position:fixed;
            bottom:0;
            left:0;
            text-align:center;
            background:#fff;
            .col{
                width:2.5rem;
                height:100%;
                color:#333;
                font-size:.22rem;
                position:relative;
                line-height:1.5rem;
                position:relative;
                em{
                    width:.5rem;
                    height:.5rem;
                    position:absolute;
                    top:.1rem;
                    left:50%;
                    margin-left:-.25rem;
                    font-style:normal;
                    color:#d21923;
                    font-size:.5rem;
                    line-height:100%;
                }
            }
            .join{
                width:2.5rem;
                height:100%;
                background:#ff7200;
                color:#fff;
                font-size:.32rem;
                line-height:1rem;
            }
            .imm{
                width:2.5rem;
                height:100%;
                background:#4591f2;
                color:#fff;
                font-size:.32rem;
                line-height:1rem;
            }
        }
    }
</style>
<style lang="less">
    .mint-toast{
        .mint-toast-text{
            font-size:.3rem;
        }
    }
</style>