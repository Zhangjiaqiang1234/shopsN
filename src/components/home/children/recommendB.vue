<template>
	<div class="box">
		<img class="title" v-lazy="'static/recom_b_title.png'">
		<ul class="list">
			<li v-for="(item,index) in list" :key="item.id" @click="toLink(index)">
				<img class="cover" v-lazy="URL+item.pic_url">
				<h1 class="title text1-hidden">{{item.title}}</h1>
				<span class="price">&yen;{{item.price_market}}</span>
			</li>
		</ul>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				list:[] // 存放数据的数组列表
			};
		},
		created(){
			this.axios.post(API_URL + 'Home/index/recommendGoods').then((res) => {
				if(res.status == 200){
					this.list = res.data.data;
				}
            }).catch((err) => {
                console.log(err)
            });
		},
		methods:{
			toLink(index){
				this.$router.push({
					name:'product',
					params:{
						id:this.list[index].id,
                        status:1
					}
				});
			}
		}
	};
</script>
<style lang="less" scoped>
.box{
	.title{
		display:block;
		width:100%;
	}
	.list{
		display:flex;
		flex-wrap:wrap;
	}
	.list li{
		width:50%;
		height:4.2rem;
		box-sizing:border-box;
    	background-clip: content-box;
    	background-color:#fff;
    	margin-top:.1rem;
		&:nth-of-type(odd){
			padding-right:.06rem;
		}
		&:nth-of-type(even){
			padding-left:.06rem;
		}
		.cover{
			display:block;
			max-width:100%;
			height:2.7rem;
			margin:.26rem auto .16rem;
		}
		.title{
			color:#202020;
			font-size:14px;
			width:3.2rem;
			margin-left:.24rem;
		}
		.price{
			display:block;
			margin-top:.1rem;
			color:#FF3737;
			margin-left:.24rem;
		}
	}
}
</style>