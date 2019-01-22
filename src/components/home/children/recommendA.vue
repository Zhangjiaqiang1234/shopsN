<!-- 这是移动端首页第一个推荐位组件 -->
<template>
	<div class="box">
		<div class="left con big">
			<div class="line">
				<h1 class="title text1-hidden">品牌吸氧机</h1>
				<span class="hot">新品</span>
			</div>
			<p class="text text1-hidden">医用级</p>
			<img src="static/goods.png">
		</div>
		<div class="right">
			<div class="top con small">
				<div class="con-left">
					<h1 class="title text1-hidden">进口奶粉</h1>
					<p class="text text1-hidden">澳洲A2</p>
					<span class="hot">特卖</span>
				</div>
				<img src="static/goods2.png">
			</div>
			<div class="bottom con small">
				<div class="con-left">
					<h1 class="title text1-hidden">保健药品</h1>
					<p class="text text1-hidden">健康生活</p>
					<span class="hot">精品</span>
				</div>
				<img src="static/goods3.png">
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		
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
				margin: .15rem auto 0;
			}
		}
		.small{
			.text{
				margin-top:.2rem;
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