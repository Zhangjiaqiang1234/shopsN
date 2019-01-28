<template>
  <div>
    <div v-title :data-title="title">{{title}}</div>
    <address-header :text="title"></address-header>
    <div class="content-wrap">
        <!-- @click="to(index)" -->
        <div class="item-wrap clearfix" v-for="(item,index) in data" :key="item.id">
            <div class="hd clearfix">
                <span class="name fl">{{item.realname}}</span>
                <span class="phone fl">{{item.mobile}}</span>
            </div>
            <!-- 省份信息 -->
            <div class="con-text text2-hidden">{{item.prov+'&nbsp'+item.city +'&nbsp'+ item.dist +'&nbsp' + item.address}}</div>
            <div class="line"></div>
            <!-- 底部组件 -->
            <div class="bottom">
                <!-- 默认 -->
                <div class="default fl font-size-0" @click="setDefault(item.id)">
                    <div v-if="default_id==item.id">
                        <!-- 默认地址情况 -->
                        <img class="icon" :src="require('@/assets/chose.png')">
                        <span class="text red">已设为默认</span>
                    </div>
                    <div v-else>
                        <!-- 非默认地址情况 -->
                        <img class="icon" :src="require('@/assets/default.png')">
                        <span class="text">设为默认</span>
                    </div>
                </div>
                <div class="del fr font-size-0" @click="delAdress(item.id)">
                    <img class="icon" :src="require('@/assets/del.png')">
                    <span class="text">删除</span>
                </div>
                <div class="edit fr font-size-0" @click="to(index)">
                    <img class="icon" :src="require('@/assets/edit.png')">
                    <span class="text">编辑</span>
                </div>
            </div>
        </div>
    </div>
    <div v-if="!data" class="text-center status">收货地址为空，赶快添加吧！</div>
    <div class="btn-wrap">
        <div class="btn-main"><button @click="tolink('/newAddress')"><i class="icon fl clearfix"></i><span class="fl">新增收货地址</span></button></div>
    </div>
  </div>
</template>
<script>
    import { MessageBox,Toast,InfiniteScroll } from 'mint-ui';
    import qs from 'qs';
    import addressHeader from './children/header.vue';
    export default {
        name : 'address',
        data(){
            return {
                title:'收货地址',
                data:'',
                address:[],
                set_address:[],
                default_id: 0 // 默认地址的id
            }
        },
        methods:{
            to(index){ // 跳转至收货地址详情页
                if(this.$route.params.status == 2){
                    this.$router.push({
                        name:'EdiAddress',
                        params:{
                            status:this.data[index].id
                        }
                    });
                }else{
                 for (var i = 0; i < this.data.length; i++) {
                    if (index == i)
                        this.address.push(this.data[i]);
                }

                if (this.address.length === 0) {
                    return ;
                }
                // 选择的收货地址
                sessionStorage.setItem('set_address',JSON.stringify(this.address[0]))
                this.$router.push({
                        name:'order',
                        params:{
                            id:2
                        }
                    }); 
                }
            },
            setDefault(id){ // 设置为默认地址
                if(this.default_id != id) { // 如果是非默认地址才可以设置为默认地址
                    this.axios.post(API_URL + 'Home/Pcenter/addressSetDefault',qs.stringify({
                        status:1,
                        address_id:id
                    })).then((res) => {
                        Toast({
                            message: '设置默认地址成功',
                            position: 'bottom',
                            duration: 2000
                        });
                        // 修改状态
                        this.default_id = id;
                    }).catch((err) => {
                        Toast({
                            message: res.data.msg,
                            position: 'bottom',
                            duration: 2000
                        });
                    });
                }
            },
            delAdress(id){ // 删除地址
                MessageBox({
                    title: '提示',
                    message: '确定要删除收货地址？',
                    showCancelButton: true
                }).then((action) => {
                    if(action == 'confirm') { // 删除收货地址
                        this.axios.post(API_URL + 'Home/Pcenter/addressde',qs.stringify({
                            id:id
                        })).then((res) => {
                            if(res.data.status == 1) {
                                // 视图中删除被删除掉的收获地址
                                this.removeItemByAttr(this.data,'id',id);
                            }
                            Toast(res.data.msg);
                        }).catch((err) => {
                            console.log(err);
                        });
                    }
                });
            },
            tolink(link){
                if(link == '/newAddress'){
                    this.$router.push({
                        name:'newAddress',
                        params:this.$route.params.status
                    });
                }
            }
        },
        mounted(){
            this.axios.post(API_URL + 'Home/Pcenter/addresslist',qs.stringify({
                app_user_id:sessionStorage.getItem('user_ID')
            })).then((res) => {
                let that = this;
                this.data = res.data.data;
                if(res.data.status == 1) {
                    this.data.map((item) => {
                        if(item.status == '1'){
                            that.default_id = item.id;
                        }
                    });
                }
            }).catch((err) => {
                console.log(err);
            });
        },
        components:{
            addressHeader
        }
    }
</script>
<style lang="less" scoped>
    .content-wrap{
        background:#F8F8F8;
        .item-wrap{
            background:#fff;
            margin-top:.24rem;
            height: auto;
            border-bottom:1px solid #dfdfdf;
            position:relative;
            .icon-link{
                position:absolute;
                right:.2rem;
                top:50%;
                margin-top:-.15rem;
                width: .18rem;
                height: .3rem;
                background:url(../../assets/icon-right.jpg) no-repeat;
                background-size:100% 100%;
            }
            .con-text{
                width: 6.65rem;
                font-size:.32rem;
                color:#5F5F5F;
                line-height:.48rem;
                margin:.2rem;
                margin-left:.4rem;
                height: .85rem;
                font-weight:500;
            }
            .red{
                color:#FF6262;
            }
            .line{
                border-bottom:1px solid #F7F7F7;
            }
            .bottom{
                height:1rem;
                line-height:1rem;
                color:#8A857C;
                .font-size-0{
                    font-size:0;
                }
                .default{
                    margin-left:.63rem;
                }
                .del{
                    margin-right:.4rem;
                }
                .edit{
                    margin-right:.7rem;
                }
                .icon{
                    display:inline-block;
                    width:.38rem;
                    vertical-align:middle;
                }
                .text{
                    font-size:14px;
                    vertical-align:middle;
                    margin-left:.09rem;
                }
            }
        }
        .hd{
            height: .45rem;
            line-height:.45rem;
            overflow:hidden;
            padding:.43rem .2rem 0;
            width: 6.65rem;
            .name{
                font-size:20px;
                color:#1F1F1F;
                padding-left:.2rem;
                position:relative;
                .icon{
                    position:absolute;
                    left:0;
                    top:50%;
                    width: .28rem;
                    height: .41rem;
                    margin-top:-.205rem;
                    background:url(../../assets/userIcon1.png) no-repeat;
                    background-size:100% 100%;
                }
            }
            .phone{
                font-size:.36rem;
                color:#282828;
                padding-left:.44rem;
                position:relative;
                .icon{
                    position:absolute;
                    left:0;
                    top:50%;
                    width: .24rem;
                    height: .34rem;
                    margin-top:-.17rem;
                    background:url(../../assets/phone.png) no-repeat;
                    background-size:100% 100%;
                }
            }
        }
    }
    .btn-wrap{
        width: 7.5rem;
        height: 1rem;
        .btn-main{
            position:fixed;
            bottom:0;
            left:0;
            width: 7.1rem;
            height: .8rem;
            padding:.2rem;
            background:#fff;
            button{
                color:#fff;
                width: 100%;
                height: 100%;
                border:none;
                background:#4591f2;
                outline: none;
                padding-left:2.3rem;
                box-sizing: border-box;
                span{
                    font-size:16px;
                    margin-left:.2rem;
                }
                .icon{
                    display:inline-block;
                    width: .34rem;
                    height: .34rem;
                    background:url(../../assets/add.png) no-repeat;
                    background-size:100% 100%;
                    margin-top:.05rem;
                }
            }
            button:active{
                box-shadow: 0 5px 5px #ccc;
            }
        }
    }
    .status{
        color:#666;
        line-height: 1rem;
        font-size:.4rem;
    }
</style>