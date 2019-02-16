<template>
    <div ref="wrap" class="classif-wrap">
        <div v-title data-title="分类">分类</div>
        <cation-header ref="hd" :logoImg="logoImg"></cation-header>
        <div class="content-wrap clearfix" ref="content">
            <ul class="nav-left fl">
                <li v-for="(item,index) in data" :key="item.id" :class="{active:lcassif.status[index]}" @click="tab(item,index)">{{item.class_name}}</li>
            </ul>
            <div class="content fr">
                <div class="tab-content-wrap">
                    <div class="item-one" v-for="(item,index) in condata" :key="item.id" >
                        <div  @click="link(item)">
                             <h2 class="title">{{item.class_name}}</h2>
                        </div>
                         <img v-lazy="URL+item.pic_url" v-if="item.pic_url" @click="tolink(item)">
                        <ul class="con clearfix" v-if="item.child">
                            <li class="fl" v-for="(con,index) in item.child" :key="con.id"  @click="to(con)">
                                <img v-lazy="URL + con.pic_url">
                                <p class="text1-hidden">{{con.class_name}}</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <Shopsn></Shopsn>
        <div class="footer" ref="nav"></div>
        <div class="load" v-show="load" @touchmove.prevent><mt-spinner type="triple-bounce" color="rgb(38, 162, 255)"></mt-spinner></div>
        <div class="load-wrap" v-show="$store.state.class_load" @touchmove.prevent><mt-spinner type="triple-bounce" color="rgb(38, 162, 255)"></mt-spinner></div>
    </div>
</template>
<script>
    import cationHeader from './children/Header';
    import Shopsn from '@/components/page/Shopsn.vue'
    export default {
        name : 'classification',
        data(){
            return {
                scrollWatch:true,
                logoImg:require('@/assets/logo.png'), 
                data:'',
                lcassif:{
                    status:[true,false,false,false]
                },
                condata:'',
                status:'',
                load_wrap:true,
                load:false
            }
        },
        components:{
            cationHeader,
            Shopsn
        },
        methods:{
            tab(item,index){
                for(var i = 0; i < this.lcassif.status.length; i++){
                    this.$set(this.lcassif.status,i,false);
                }
                this.$set(this.lcassif.status,index,true);
                this.status = this.data[index].id;
                this.load = true;
                this.succ(item);
            },
            succ(item){
                this.axios({
                    url:API_URL + 'Home/class/category',
                    method:'get',
                    params:{
                        'fid':this.status
                    }
                }).then((suc) => {
                    if(!suc){
                        this.$router.push({
                            name:'comList',
                            params:{
                                status:item.id
                            }
                        });
                    }
                    this.condata = suc.data.data;
                    this.load = false;
                }).catch((err) => {
                    console.log(err);
                });
            },
            link(item){
                if(!item.child.length == 0||!item.child){
                    return false;
                }else{
                    this.$router.push({
                    name:'comList',
                    params:{
                        status:item.id
                    }
                });
                }
                
            },
            tolink(item){
                if(item.pic_url){
                    this.$router.push({
                    name:'comList',
                    params:{
                        status:item.id
                    }
                });
                }
                
            },
            to(con){
                this.$router.push({
                name:'comList',
                params:{
                    status:con.id
                    }
                }); 
            }
        },
        mounted() {
            document.body.scrollTop = 0;
            const hdH = this.$refs.hd.$el.offsetHeight;
            const navH = this.$refs.nav.offsetHeight;
            const clHeight = document.body.clientHeight;
            this.$refs.content.style.height = `${clHeight - hdH - navH}px`;
            this.axios({
                url:API_URL + 'Home/class/navigation',
                method:'get',
            }).then((res) => {
                this.data = res.data.data;
                this.status = res.data.data[0].id;
                this.succ();
            }).catch((err) => {
                console.log(err);
            });
        },
        updated(){
            var that = this;
            setTimeout(function(){
                that.$store.state.class_load = false;
            },1000);
        },
        destroyed(){
            this.scrollWatch = false;
        },
    }
</script>
<style lang="less">
    .classif-wrap{
        background:#fff;
        .mint-tab-item{
            display:inline-block;
            flex:none;
            .mint-tab-item-label{
                font-size:.26rem;
                line-height:.7rem;
            }
        }
    }
</style>
<style lang="less" scoped>
    .footer{
        height:1rem;
        border-top:3px solid #fff;
        position:fixed;
        bottom:0;
        left:0;
        z-index:-1;
    }
    .content-wrap{
        background:#f2f2f2;
        .nav-left{
            height:100%;
            width:1.8rem;
            overflow-y:auto;
            background:#fff;
            li{
                width: 100%;
                height:1rem;
                line-height:1rem;
                text-align:center;
                overflow:hidden;
                font-size:.24rem;
                color:#333;
            }
            li.active{
                border-left:3px solid #c94444;
                box-sizing:border-box;
                background:#f2f2f2;
                color:#c94444;
            }
        }
        .content{
            overflow-y:auto;
            width:5.7rem;
            height:100%;
            background:#f2f2f2;
            
            .tab-content-wrap{
                img{
                    width:1.52rem;
                    height:1.52rem;
                }
            }
            .item-one{
                .title{
                    height:.73rem;
                    line-height:.73rem;
                    font-size:.26rem;
                    color:#666;
                    text-indent:.16rem;
                }
                .con{
                    li{
                        width: 1.72rem;
                        height: 2.24rem;
                        text-align:center;
                        margin-left:.16rem;
                        background:#fff;
                        padding-top:.12rem;
                        box-sizing:border-box;
                        margin-bottom:.12rem;
                        img{
                            width:1.52rem;
                            height:1.52rem;
                        }
                        p{
                            font-size:.24rem;
                            color:#797979;
                            height:.64rem;
                            line-height:.64rem;
                            padding:0 .2rem;
                        }
                    }
                }
            }
            .item-tab{
                margin-top:.1rem;
                .mint-navbar{
                    border-bottom:1px solid #f2f2f2;
                }
                .mint-tab-item{
                    padding:0;
                    color:#666;
                    border-color:#f9781e;
                    margin:0;
                    height:.7rem;
                    line-height:.7rem;
                    margin-left:.4rem;
                }
                .mint-tab-item.is-selected{
                    color:#f9781e;
                }
            }
            .ification-wrap{
                .title{
                    height:1rem;
                    line-height:1rem;
                    font-size:.26rem;
                    color:#333;
                    font-weight:bold;
                }
                .tab-content{
                    li{
                        margin-left:.3rem;
                        margin-right:.1rem;
                        text-align:center;
                        img{
                            width:1.24rem;
                            height:1.24rem;
                            border-radius:100%;
                            box-sizing:border-box;
                        }
                        p{
                            font-size:.24rem;
                            color:#797979;
                            line-height:.7rem;
                            width:1.24rem;
                            overflow:hidden;
                        }
                    }
                }
            }
        }
    }
</style>