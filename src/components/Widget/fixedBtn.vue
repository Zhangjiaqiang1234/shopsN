<template>
  <div>
      <footer>
          <button :text="text" @click="tolink">{{text}}</button>
      </footer>
  </div>
</template>
<script>
    import qs from 'qs';
    import { Toast } from 'mint-ui';
    export default {
        name : 'fixedBtn',
        props:{
            text:null,
            id:'',
            to:'',
            data:'',
            prov:'',
            city:'',
            district:'',
        },
        methods:{
            tolink(){
                switch(this.to){
                    case '/address':
                        if(this.prov){
                            this.axios.post(API_URL + 'Home/Pcenter/addressSave',qs.stringify({
                                address_id:this.$route.params.status,
                                receiver:this.data.realname,
                                mobile:this.data.mobile,
                                prov:this.prov,
                                city:this.city,
                                address:this.data.address,
                                status:this.data.value,
                                dist:this.district
                            })).then((res) => {
                                Toast('修改成功');
                                this.$router.push({
                                    name:'address',
                                    params:{
                                        status:2
                                    }
                                });
                            }).catch((err) => {
                                console.log(err);
                            });
                        }else{
                            this.axios.post(API_URL + 'Home/Pcenter/addressSave',qs.stringify({
                                address_id:this.$route.params.status,
                                receiver:this.data.realname,
                                mobile:this.data.mobile,
                                prov:this.data.prov,
                                city:this.data.city,
                                address:this.data.address,
                                status:this.data.value,
                                dist:this.data.dist
                            })).then((res) => {
                                Toast('修改成功');
                                this.$router.push({
                                    name:'address',
                                    params:{
                                        status:2
                                    }
                                });
                            }).catch((err) => {
                                console.log(err);
                            });
                        }
                        break;
                    case '/address1':
                        if(this.data.realname == ''){
                            Toast('收货人姓名不能为空');
                            return;
                        }
                        if(this.data.mobile == ''){
                            Toast('手机号不能为空');
                            return;
                        }
                        if(this.prov == ''){
                            Toast('请选择地址');
                            return;
                        }
                        if(this.data.address == ''){
                            Toast('请填写详细地址');
                            return;
                        }
                        this.axios.post(API_URL + 'Home/Pcenter/addressadd',qs.stringify({
                            app_user_id:sessionStorage.getItem('user_ID'),
                            realname:this.data.realname,
                            mobile:this.data.mobile,
                            prov:this.prov,
                            city:this.city,
                            dist:this.district,
                            address:this.data.address,
                            default:this.data.value,
                        })).then((res) => {
                            Toast('添加成功');
                            this.$router.push({
                                name:'address',
                                params:{
                                    status:this.$route.params.status
                                }
                            });
                        }).catch((err) => {
                            console.log(err);
                        });
                        break;
                    case '/IntegralMall':
                        this.$router.push('/IntegralMall');
                        break;
                    case '/order':
                        this.$router.go(-1);
                        break;
                        default:;
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    footer{
        width: 100%;
        height: .9rem;
        button{
            position:fixed;
            bottom:0;
            left:0;
            border:none;
            font-size:.32rem;
            color:#fff;
            width: 100%;
            height: .9rem;
            background:#4591f2;
            outline: none;
        }
        button:active{
            box-shadow: 0 -2px 5px #ccc;
        }
    }
</style>