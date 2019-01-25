<template>
    <div class="shopsn">
        <div class="z_shopsn" v-html="datas">
          {{datas}}
        </div>
    </div>
</template>
<script>
    export default {
        name : 'shopsn',
        data(){
           return {
                datas:'power by shopsn'
           }
        }
    }
</script>
<style lang="less" scoped>
   .shopsn{
     width: 100%;
     height: 1.5rem;
     font-size:6px;
     .z_shopsn{
       text-align: center;
       color: #666;
       line-height: 1.5rem;
       font-size:0.01em;
     }
   }
</style>