<template>
    <div>
        <order-header :text="$store.state.order_title" :search="search"></order-header>
        <div class="nav-wrap">
            <ul class="nav">
                <li class="fl" v-for="(name,index) in datas.name" :key="name.id" :class="{active:$store.state.status == index}" @click="addClass(index)"><span>{{name}}</span></li>
            </ul>
        </div>
    </div>
</template>
<script>
    import orderHeader from '@/components/page/children/header.vue';
    export default {
        name : 'orderNav',
        data(){
            return {
                datas:{
                    name:['全部','待付款','待处理','待收货','已完成','已取消','待评论']
                },
                search:true
            }
        },
        components:{
            orderHeader
        },
        methods:{
            stateSwitch(res){
                document.body.scrollTop = 0;
                this.$store.state.slidingSwitch = true;
                this.$store.state.moreLoading = false;
                this.$store.state.allLoaded = false;
                this.$store.state.loading = false;
                if(res.data.status == 0){
                    this.$store.state.no_data = true;
                }else{
                    this.$store.state.no_data = false;
                };
                if(res.data.data.length<10){this.$store.state.no_data = true;}
            },
            addClass(index){
                this.$store.commit('clear_page',this.$store.state.page); //初始化page
                this.$store.state.order_load = true;
                this.title = this.datas.name[index]+'订单';
                this.$store.state.status = index;
                switch(index){
                    case 0:
                        this.$store.state.order_title = '全部订单';
                        this.$store.state.order_status = '';
                        this.axios({
                            url:API_URL + 'Home/Order/myOrder',
                            method:'get',
                            params:{
                                app_user_id:sessionStorage.getItem('user_ID'),
                                order_status:this.$store.state.order_status,
                                p:this.$store.state.page
                            }
                        }).then((res) => {
                            this.stateSwitch(res);
                            this.$store.state.order = res.data.data;
                            this.$store.state.order_load_wrap = false;
                            this.$store.state.order_load = false;
                        }).catch((err) => {
                            console.log(err);
                        });
                        break;
                    case 1:
                        this.$store.state.order_title = '待付款订单';
                        this.$store.state.order_status = 0;
                        this.axios({
                            url:API_URL + 'Home/Order/myOrder',
                            method:'get',
                            params:{
                                app_user_id:sessionStorage.getItem('user_ID'),
                                order_status:this.$store.state.order_status,
                                p:this.$store.state.page
                            }
                        }).then((res) => {
                            this.stateSwitch(res);
                            this.$store.state.order = res.data.data;
                            this.$store.state.order_load_wrap = false;
                            this.$store.state.order_load = false;
                        }).catch((err) => {
                            console.log(err);
                        });
                        break;
                    case 2:
                        this.$store.state.order_title = '待处理订单';
                        this.$store.state.order_status = 1;
                        this.axios({
                            url:API_URL + 'Home/Order/myOrder',
                            method:'get',
                            params:{
                                app_user_id:sessionStorage.getItem('user_ID'),
                                order_status:this.$store.state.order_status,
                                p:this.$store.state.page
                            }
                        }).then((res) => {
                            this.stateSwitch(res);
                            this.$store.state.order = res.data.data;
                            this.$store.state.order_load_wrap = false;
                            this.$store.state.order_load = false;
                        }).catch((err) => {
                            console.log(err);
                        });
                        break;
                    case 3:
                        this.$store.state.order_title = '待收货订单';
                        this.$store.state.order_status = 3;
                        this.axios({
                            url:API_URL + 'Home/Order/myOrder',
                            method:'get',
                            params:{
                                app_user_id:sessionStorage.getItem('user_ID'),
                                order_status:this.$store.state.order_status,
                                p:this.$store.state.page
                            }
                        }).then((res) => {
                            this.stateSwitch(res);
                            this.$store.state.order = res.data.data;
                            this.$store.state.order_load_wrap = false;
                            this.$store.state.order_load = false;
                        }).catch((err) => {
                            console.log(err);
                        });
                        break;
                    case 4:
                        this.$store.state.order_title = '已完成订单';
                        this.$store.state.order_status = 4;
                        this.axios({
                            url:API_URL + 'Home/Order/myOrder',
                            method:'get',
                            params:{
                                app_user_id:sessionStorage.getItem('user_ID'),
                                order_status:this.$store.state.order_status,
                                p:this.$store.state.page
                            }
                        }).then((res) => {
                            this.stateSwitch(res);
                            this.$store.state.order = res.data.data;
                            this.$store.state.order_load_wrap = false;
                            this.$store.state.order_load = false;
                        }).catch((err) => {
                            console.log(err);
                        });
                        break;
                    case 5:
                        this.$store.state.order_title = '以取消订单';
                        this.$store.state.order_status = -1;
                        this.axios({
                            url:API_URL + 'Home/Order/myOrder',
                            method:'get',
                            params:{
                                app_user_id:sessionStorage.getItem('user_ID'),
                                order_status:this.$store.state.order_status,
                                p:this.$store.state.page
                            }
                        }).then((res) => {
                            this.stateSwitch(res);
                            this.$store.state.order = res.data.data;
                            this.$store.state.order_load_wrap = false;
                            this.$store.state.order_load = false;
                        }).catch((err) => {
                            console.log(err);
                        });
                        break;
                    case 6:
                        this.$store.state.order_title = '待评论订单';
                        this.$store.state.order_status = 6;
                        this.axios({
                            url:API_URL + 'Home/Order/notEvaluate',
                            method:'get',
                            params:{
                                app_user_id:sessionStorage.getItem('user_ID')
                            }
                        }).then((res) => {
                            this.stateSwitch(res);
                            this.$store.state.order = res.data.data;
                            this.$store.state.order_load_wrap = false;
                            this.$store.state.order_load = false;
                        }).catch((err) => {
                            console.log(err);
                        });
                        break;
                };
            }
        }
    }
</script>
<style lang="less" scoped>
    .nav-wrap{
        position:fixed;
        width:100%;
        overflow-x:auto;
        background:#fff;
        height:.94rem;
        .nav{
            position: absolute;
            z-index: 99;
            height: 100%;
            width:12.39rem;
            border-bottom:1px solid #dfdfdd;
            li{
                width:1.77rem;
                height:100%;
                text-align:center;
                overflow:hidden;
                box-sizing:border-box;
                span{
                    display:block;
                    color:#676767;
                    font-size:.3rem;
                    line-height:.54rem;
                    height:.54rem;
                    margin:.2rem 0;
                    border-right:1px solid #dfdfdd;
                }
            }
            li.active{
                border-bottom:3px solid #fd4f4b;
                span{
                    color:#ff781a;
                }
            }
        }
    }
</style>