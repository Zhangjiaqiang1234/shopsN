<template>
  <div class="logist-wrap">
      <div v-title :data-title="title">{{title}}</div>
      <logis-header :text="title"></logis-header>
      <div v-if="search_data" class="status-wrap">
          <div class="list-hide-top"></div>
          <div class="list-hide-bottom"></div>
          <div class="list-item" :class="{active:index == 0}" v-for="(item,index) in $store.state.logis_data" :key="index">
                <div class="status-icon-wrap">
                    <span class="icon"></span>
                </div>
                <div class="hd clearfix">
                    <span class="fl time">{{item.time}}</span>
                    <span class="icon"><i></i></span>
                </div>
                <p class="con">{{item.context}}</p>
          </div>
      </div>
      <div v-if="!search_data" class="comm-null">
        <div class="con-wrap text-center">
            <img src="../../assets/null_com.png">
            <p>暂无物流信息</p>
        </div>
    </div>
  </div>
</template>
<script>
    import logisHeader from '@/components/page/children/header.vue';
    import qs from 'qs';
    export default {
        name : 'logistics',
        data(){
            return {
                title: '物流查询',
                search_data: ''
            }
        },
        components:{
            logisHeader
        },
        mounted(){
            this.axios.post(API_URL + 'Home/Afterbuy/express',qs.stringify({
                order_id:this.$route.params.id
            })).then((res) => {
                this.$store.commit('logis',res.data.data.online.data);
            }).catch((err) => {
                console.log(err);
            });
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
    .status-wrap{
        margin:0 .2rem 0 .35rem;
        border-left:1px solid #bbb;
        position:relative;
        padding-bottom:1rem;
        .list-item{
            padding:.2rem;
            margin-top:.4rem;
            margin-left:.35rem;
            border:1px solid #d2d2d2;
            border-radius:5px;
            width: 6.16rem;
            position:relative;
            background:#fff;
            .status-icon-wrap{
                position:absolute;
                left:-.74rem;
                top:0;
                width: .74rem;
                height: 100%;
                .icon{
                    position:absolute;
                    left:.253rem;
                    top:.2rem;
                    width: .21rem;
                    height: .21rem;
                    background:#fff;
                    border:.05rem solid #b5b5b5;
                    box-sizing: border-box;
                    border-radius:50%;
                }
            }
            .hd{
                span{
                    color:#999;
                    font-size:.25rem;
                }
                position:relative;
                span.icon{
                    position:absolute;
                    left:-.3rem;
                    top:.1rem;
                    width: .2rem;
                    height: .2rem;
                    border:1px solid #ccc;
                    transform: rotate(45deg);
                    background:#fff;
                    box-sizing: border-box;
                    i{
                        position:absolute;
                        top:-4px;
                        right:-4px;
                        width: .2rem;
                        height: .2rem;
                        border:1px solid #fff;
                        background:#fff;
                    }
                }
            }
            .con{
                font-size:.3rem;
                color:#333;
                padding:.2rem 0;
                line-height: .4rem;
            }
        }
        .list-item.active{
            .con{
                color:#4591f2;
            }
            .status-icon-wrap{
                .icon{
                    background:#4591f2;
                    border-color: #4591f2;
                    box-shadow: 0 0 .1rem .05rem rgba(224, 40, 40, .5);
                }
            }
        }
        .list-hide-top{
            width: .6rem;
            height: .22rem;
            background:#f1f1f1;
            position:absolute;
            top:0%;
            left:-.35rem;
        }
        .list-hide-bottom{
            position:absolute;
            bottom:0;
            left:-.35rem;
            width: .6rem;
            height: 2.2rem;
            background:#f1f1f1;
        }
    }
</style>