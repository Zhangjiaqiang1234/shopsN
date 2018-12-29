<template>
    <div class="foot2017">
        <ul class="footer clearfix">
            <li class="fl" :class="{isSelected:index == parseInt(isClass)}" v-for="(item,index) in tabbar.font" :key="item.id" @click="tab(index)">
                <div class="icon"><img :src="tabbar.Icon[index]"></div>
                <div class="icon active"><img :src="tabbar.isIcon[index]"></div>
                <div class="font">{{item}}</div>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        name: 'foote',
        data() {
            return {
                isClass:sessionStorage.getItem('router_index'),
                tabbar:{
                    isIcon:[require('@/assets/tab_icon_home-active.png'),require('@/assets/tab_icon_class_active.png'),require('@/assets/tab_icon_cart_active.png'),require('@/assets/tab_icon_per_active.png')],
                    Icon:[require('@/assets/tab_icon_home.png'),require('@/assets/tab_icon_class.png'),require('@/assets/tab_icon_cart.png'),require('@/assets/tab_icon_per.png')],
                    font:['首页','分类','购物车','我的']
                }
            }
        },
        methods:{
            tab:function(index){
                switch(index){
                    case 0:
                        this.$router.push({
                            path:'/home'
                        });
                        break;
                    case 1:
                        this.$router.push({
                            path:'/class'
                        });
                        break;
                    case 2:
                        if(!sessionStorage.getItem('user_ID')){
                                this.$router.push({
                                path:'/LogoIn'
                            });
                            return
                        }else{
                            this.$router.push({
                                path:'/Cart'
                            });
                        break;
                        };
                    case 3:
                       if(!sessionStorage.getItem('user_ID')){
                                this.$router.push({
                                path:'/LogoIn'
                            });
                            return
                        }else{
                            this.$router.push({
                                path:'/person'
                            });
                        break;
                        }
                    }
                }
            },
        watch:{
            '$route'(to,from){
                // if(to.path == '/person'){
                //     if(sessionStorage.getItem('user_ID')){
                //         this.$router.push({
                //             path:'/person'
                //         });
                //     }else{
                //         this.$router.push({
                //             path:'/LogoIn'
                //         });
                //     }
                // }
                this.isClass = sessionStorage.getItem('router_index');
            }
        },
        created(){
            
        }
    }
</script>
<style lang="less" scoped>
    .foot2017{
        width:100%;
        height:1rem;
        .footer{
            width:100%;
            height:1rem;
            position:fixed;
            bottom:0;
            left:0;
            background:#fff;
            border-top:3px solid #fa6a2d;
            z-index:2;
            background:#fff;
            box-shadow: border-box;
            z-index:99999999;
            li{
                width:25%;
                text-align:center;
                .font{
                    font-size:.2rem;
                    color:#333;
                }
                .icon{
                    height:.65rem;
                    position:relative;
                    display:block;
                    img{
                        position:absolute;
                        left:0;
                        top:0;
                        bottom:0;
                        right:0;
                        margin:auto;
                    }
                }
                .icon.active{
                    display:none;
                }
            }
            li.isSelected{
                .font{
                    color:#f9781e;
                }
                .icon.active{
                    display:block;
                }
                
                .icon{
                    display:none;
                }
            }
            li:nth-child(1){
                img{
                    width:.39rem;
                    height:.37rem;
                }
            }
            li:nth-child(2){
                img{
                    width:.43rem;
                    height:.32rem;
                }
            }
            li:nth-child(3){
                img{
                    width:.54rem;
                    height:.41rem;
                }
            }
            li:nth-child(4){
                img{
                    width:.35rem;
                    height:.4rem;
                }
            }
        }
    }
</style>