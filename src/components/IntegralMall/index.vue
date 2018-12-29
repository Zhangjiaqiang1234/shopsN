<template>
    <div class="integral-wrap">
        <div v-title data-title="积分兑换">积分兑换</div>
        <integral-header :title="title" :popupVisible="popupVisible" @screen="screen"></integral-header>
        <list-lop :data="data" :integral="integral" :load="load"></list-lop>
        <mt-popup
            v-model="popupVisible"
            position="bottom">
            <div class="picker-toolbar">  
                <span class="mint-datetime-action mint-datetime-cancel" @click="cancel">取消</span>  
                <span class="mint-datetime-action mint-datetime-confirm" @click="determine">确定</span>  
              </div> 
            <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
        </mt-popup>

        <Shopsn></Shopsn>
        <div class="load-wrap" v-show="load_wrap" @touchmove.prevent><mt-spinner type="triple-bounce" color="rgb(38, 162, 255)"></mt-spinner></div>
    </div>
</template>
<script>
    import integralHeader from '@/components/page/children/header';
    import listLop from '@/components/Widget/searchList';
    import Shopsn from '@/components/page/Shopsn.vue';
    import qs from 'qs';
    import { Popup,Picker,Field } from 'mint-ui';
    export default {
        name : 'IntegralMall',
        data(){
            return {
                title:'积分筛选',
                num:'',
                data:'',
                integral:'',
                popupVisible:false,
                load:false,
                load_wrap:'load_wrap',
                slots: [
                    {
                        flex: 1,
                        values: ['1-999', '1000-1999', '2000-2999', '3000-3999', '4000-4999', '5000-5999','6000-6999','7000-7999','8000-8999','9000-9999'],
                        className: 'slot1',
                        textAlign: 'right'
                    }
                ]
            }
        },
        methods: {
            onValuesChange(picker, values) {
                this.num = values[0];
                console.log(this.num)
            },
            cancel(){
                this.popupVisible = false;
            },
            determine(){
                this.popupVisible = false;
                this.load = true;
                this.axios.post(API_URL + 'Home/Integral/integral_goods',qs.stringify({
                    num:this.num
                })).then((res) => {
                    this.data = res.data.data;
                    this.load = false;
                }).catch((err) => {
                    console.log(err);
                });
                if(this.num == ''){
                    this.num = '1-999'
                }
            },
            screen(){
                this.popupVisible = true;
            }
        },
        mounted(){
            this.axios.post(API_URL + 'Home/Integral/integral_goods',qs.stringify({
                num:this.num
            })).then((res) => {
                this.data = res.data.data;
                this.integral = res.data.data[0].integral;
            }).catch((err) => {
                console.log(err);
            });
        },
        updated(){
            var that = this;
            setTimeout(function(){
                that.load_wrap = false;
            },1000);
        },
        components:{
            integralHeader,
            listLop,
            Shopsn
        }
    }
</script>
<style lang="less" scoped>

</style>
<style lang="less">
    .integral-wrap{
        .mint-popup-bottom{
            width: 100%;
            .picker{
                .picker-items{
                    text-align:center;
                    .picker-slot.picker-slot-right{
                        text-align:center;
                    }
                }
            }
        }
    }
</style>