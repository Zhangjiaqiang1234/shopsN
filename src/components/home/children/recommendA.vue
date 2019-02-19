<!-- 这是移动端首页第一个推荐位组件 -->
<template>
	<div v-if="data.length>0" class="box">
		<!-- 左侧分类 -->
		<div v-if="data[0]" class="left con big" @click="toLink(data[0].id)">
			<div class="line">
				<h1 class="title text1-hidden">{{data[0].class_name}}</h1>
				<span class="hot">热卖</span>
			</div>
			<p v-show="data[0].description" class="text text1-hidden">{{data[0].description}}</p>
			<img v-lazy="URL + data[0].pic_url">
		</div>
		<div class="right">
			<!-- 右上角分类 -->
			<div class="top con small" v-if="data[1]" @click="toLink(data[1].id)">
				<div class="con-left">
					<h1 class="title text1-hidden">{{data[1].class_name}}</h1>
					<p v-show="data[1].description" class="text text1-hidden">{{data[1].description}}</p>
					<span class="hot">热卖</span>
				</div>
				<img v-lazy="URL + data[1].pic_url">
			</div>
			<!-- 右下角分类 -->
			<div class="bottom con small" v-if="data[1]" @click="toLink(data[2].id)">
				<div class="con-left">
					<h1 class="title text1-hidden">{{data[2].class_name}}</h1>
					<p v-show="data[2].description" class="text text1-hidden">{{data[2].description}}</p>
					<span class="hot">热卖</span>
				</div>
				<img v-lazy="URL + data[2].pic_url">
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		props: {
			data: {
				type: Array,
				default: () => {
					return [];
				}
			}
		},
		methods:{
			toLink(id){
				this.$router.push({
                    name:'comList',
                    params:{
                        status:id
                    }
                });
			}
		}
	};
</script>
<style lang="less" scoped>
	.box{
		width:100%;
		height:auto;
		box-sizing:border-box;
		padding:.15rem .28rem 0;
		display:flex;
		justify-content: space-between;
		.title{
			color:#363636;
			font-size:14px;
			font-weight:bold;
		}
		img{
			max-width:100%;
			max-height:100%;
		}
		.hot{
    		display: inline-block;
			width:.7rem;
			height:.3rem;
			line-height:.3rem;
			background:#F71448;
			color:#fff;
			font-size:12px;
			text-align:center;
		}
		.con{
			overflow:hidden;
			box-sizing:border-box;
			padding-top:.45rem;
		}
		.small.con{
			padding-top:.33rem;
		}
		.small{
			display:flex;
    		justify-content: space-around;
		}
		.text{
			color:#B6B6B6;
			font-size:13px;
		}
		.big{
			padding-left:.28rem;
			.line{
				font-size:0;
			}
			.title,.hot{
				display:inline-block;
				vertical-align:middle;
				foint-size:14px;
			}
			.title{
				max-width:2rem;
			}
			.hot{
				font-szie:13px;
				margin-left:.1rem;
			}
			.text{
				margin-top:.22rem;
			}
			img{
				display:block;
				padding-top: .15rem;
				box-sizing: border-box;
				max-height: 3.1rem;
			}
		}
		.small{
			.title{
				margin-bottom:.2rem;
			}
			.text{
				margin-bottom:.2rem;
			}
			.con-left{
				max-width:2rem;
			}
		}
		.left{
			width:3.15rem;
			height:4.1rem;
			background:#fff;
		}
		.right{
			width: 3.6rem;
			height:4.1rem;
			display:flex;
			flex-direction: column;
			justify-content: space-between;
			.top,.bottom{
				background:#fff;
				width:100%;
				height:1.96rem;
			}
		}
	}
</style>