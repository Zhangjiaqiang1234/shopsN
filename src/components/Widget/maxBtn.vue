<template>
  <div>
      <button class="form-btn" @click="bypay">{{text}}</button>
  </div>
</template>
<script>
    import qs from 'qs';
    import { Toast } from 'mint-ui';
    export default {
        name : 'btn',
        props:{
            text:'',
            bt:''
        },
        methods:{
            bypay(){
                if(this.$route.params.id == 3){
                    this.axios.post(API_URL + 'Home/Integral/payIntegral',qs.stringify({
                        order_id: this.$store.state.order_number,
                        integral: this.$store.state.price
                    }))
                    .then(res => {
                        console.log(res)
                        if(res.data.status==1 && res.data.msg=='支付成功'){
                            this.$router.push({
                                name:'payResult',
                                params:{
                                    order_sn_id: res.data.data
                                }
                            });
                        }else{
                            Toast({
                                message: res.data.msg
                            });
                        }
                    })
                    .catch(err => {
                        Toast({
                            message: res.data.msg
                        });
                    });
                }else{
                    if(this.bt == false){
                        Toast({
                            message: "请使用余额支付",
                        });
                    }else{
                        this.axios.post(API_URL + 'Home/AlipayMobile/balancePay',qs.stringify({
                            order_id:this.$store.state.order_number
                        }))
                        .then((res) => {
                            if(res.data.msg == "支付成功"){
                                Toast("支付成功");
                                this.$router.push({
                                    name: 'orderWrap',
                                    params: {
                                        status: 0
                                    }
                                });
                            }else{
                                Toast({
                                    message: res.data.msg
                                });
                            }
                        }).catch((err) => {
                            console.log(err);
                        });
                    }
                } 
            }
        },
        mounted(){
            
        }
    }
</script>
<style lang="less" scoped>
    .form-btn{
        width:7.1rem;
        height:.9rem;
        background: #4591f2;
        border:none;
        border-radius:20px;
        color:#fff;
        display:block;
        margin:.62rem auto;
        box-sizing: border-box;
        font-size:.4rem;
        outline: none;
    }
    .form-btn:active{
        box-shadow: 0 5px 5px #ccc;
    }
</style>