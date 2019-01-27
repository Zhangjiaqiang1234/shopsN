<template>
	<div class="list-img-wrap_2" v-html="datas">
        {{datas}}
    </div>
</template>
<script>
	export default{
		data() {
			return {
				datas: ''
			}
		},
		mounted() {
			//图文详情
			document.body.style.backgroundColor = '#fff'; // 用js控制页面样式
            this.axios({
                url:API_URL + 'Home/Goods/goodsDetail',
                method:'get',
                params:{
                    goods_id:this.$route.params.id
                }
            }).then((res) => {
            	if(res.data.status == 0){
                	this.datas='<p class="not-data">暂无图文详情</p>'
            	}else{
                	this.datas=res.data.data;  
            	}
            }).catch((err) => {
                console.log(err);
            });
		}
	};
</script>
<style>
.list-img-wrap_2{
    background:#fff;
    margin-top: .2rem;
}
.list-img-wrap_2 img{
	width: 100%;
}
.list-img-wrap_2 .not-data{
	text-align: center;
	padding-top: .2rem;
	font-size: .28rem;
    color: #666;
}
.list-img-wrap_2 p{
	line-height: normal;
}
</style>