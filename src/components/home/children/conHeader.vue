<!-- 推荐位 的标题和更多部分 -->
<template>
    <div>
        <div class="hd clearfix">
            <div class="title fl">{{text}}</div>
            <span class="more fr" @click="tolin">更多<em><i></i><b></b></em></span>
        </div>
    </div>
</template>
<script>
    export default {
        name : 'conHeader',
        data(){
            return {

            }
        },
        props:{
            text:null,
            toLink:null,
            status:''
        },
        methods:{
            tolin(){
                if(this.toLink.indexOf('/') >= 0){
                    this.$router.push(this.toLink);
                }else{
                    this.$router.push({
                        name:this.toLink,
                        params:{
                            status:this.status
                        }
                    });
                }
            }
        }
    }
</script>
<style scoped lang="less">
    .hd{
        padding:.2rem;
        .title{
            border-left:3px solid #f02b2b;
            padding-left:.2rem;
            font-size:.32rem;
            color:#111111;

        }
        .more{
            line-height:.4rem;
            color:#999;
            font-size:.28rem;
            position:relative;
            padding-right:.2rem;
            em{
                position:absolute;
                right:0;
                top:.07rem;
                i{
                    border-left:6px solid #ccc;
                    border-top:6px solid transparent;
                    border-bottom:6px solid transparent;
                    position:absolute;
                    right:-.04rem;
                    top:0;
                }
                b{
                    border-left:6px solid #f2f2f2;
                    border-top:6px solid transparent;
                    border-bottom:6px solid transparent;
                    position:absolute;
                    right:0;
                    top:0;
                }
            }
        }
    }
</style>