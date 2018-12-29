<template>
  <div class="header clearfix">
    <div class="logo fl"><img :src="logoImg"></div>
    <router-link class="input-main fl" to='/search'><input type="text" value="搜索商品..." disabled></router-link>
    <div class="scode fl">
        <span class="active" @click="tolink('/myNews')"></span>
    </div>
    <div class="logoIn fl" @click="toLogoIn" v-if="!user_name">登录</div>
    <div class="my fl" v-if="user_name"></div>
  </div>
</template>

<script>
    export default {
        name: 'heade',
        data() {
            return {
                userImg:require('@/assets/scode.png'),
                logoImg:require('@/assets/logo.png'),
                user_name:sessionStorage.getItem('user_ID')
            }
        },
        methods: {
            toLogoIn() {
                this.$router.push({
                    path:'/LogoIn'
                })
            },
            tolink(link){
                this.$router.push(link)
            }
        }
    }
</script>

<style lang="less" scoped>
    .header {
        width: 100%;
        height: .9rem;
        background:#fff;
        overflow: hidden;
        .logo {
            width: 1.66rem;
            height: 100%;
            position: relative;
            background:#ce0a14;
            img {
                width: 1.38rem;
                height: .31rem;
                margin: auto;
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                right: 0;
            }
        }
        .input-main {
            width: 3.75rem;
            height: .62rem;
            border-radius: 100px;
            background:#f7f7f7 url(../../../assets/search1.png) no-repeat .24rem center;
            background-size: .26rem .27rem;
            line-height:100%;
            margin:.14rem 0 0 .25rem;
            input {
                height: 100%;
                width: 100%;
                border: none;
                background: none;
                text-indent: .7rem;
                font-size: .26rem;
                color: #d6d6d6;
            }
        }
        .scode {
            width: .8rem;
            height: .64rem;
            text-align: center;
            margin-top:.26rem;
            margin-left:.1rem;
            position:relative;
            span{
                position:absolute;
                top:0;
                left:0;
                width:100%;
                height:.4rem;
                text-align:center;
                img{
                    width:.3rem;
                    height:.3rem
                }
            }
            span.active{
                background:url(../../../assets/news.png) no-repeat center;
                background-size:.38rem .37rem;
            }
            h3 {
                font-size: .15rem;
                color: #fff;
                padding-top: .05rem;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
        .logoIn{
            font-size:.28rem;
            color:#4f4f4f;
            line-height: .9rem;
        }
        .my{
            height: 100%;
            width: .4rem;
            margin-left:.2rem;
            background:url(../../../assets/code.png) center no-repeat;
            background-size:.4rem .4rem;
        }
    }
</style>