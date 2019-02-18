<template>
	<div v-show="isShow" class="wrap">
		<div v-title :data-title="title">{{title}}</div>
		<div class="header">
			<!-- 背景图 -->
			<img class="bg" :src="list[state].bgImg">
			<!-- 顶部按钮 -->
			<div class="top">
				<span @click="tolink" class="back"><img :src="require('@/assets/arr-left.png')"></span>
				<span class="title">在线支付</span>
				<span class="back"><img></span>
			</div>
			<!-- 提示内容 -->
			<div class="tips">
				<h1>{{list[state].text.title}}</h1>
				<h2>{{list[state].text.tips}}</h2>
			</div>
		</div>
		<!-- 成功状态显示订单信息 -->
		<div class="succ-content" v-if="state==1">
			<div class="line">
				<span class="fl">收货地址</span>
				<span class="fr address">{{data.prov + data.city + data.dist + data.address}}</span>
			</div>
			<div class="line">
				<span class="fl">实付款</span>
				<span class="fr">&yen;{{data.price_sum}}元</span>
			</div>	
		</div>
		<div class="btn-wrap">
	        <div class="btn-main">
	        	<button @click="tolink" :style="{background:list[state].bgColor}">{{list[state].text.btnText}}</button>
	        </div>
	    </div>
	</div>
</template>
<script>
import { Indicator, Toast } from 'mint-ui';
import qs from 'qs';
export default{
	data () {
		return {
			title: '在线支付',
			load: true,
			isShow: false,
			state: 0, // 0->等待支付结果 1->支付成功 2->支付失败
			// list: [require('@/assets/succ_bg.png'),require('@/assets/succ_bg.png'),require('@/assets/fail_bg.png')],
			data : '',
			list: [
				{
					bgImg: require('@/assets/succ_bg.png'),
					bgColor: '#4891F2',
					text: {title: '请等待', tips: '等待支付结果', btnText: '返回'},
					link: ''
				},{
					bgImg: require('@/assets/succ_bg.png'),
					bgColor: '#4891F2',
					text: {title: '支付成功', tips: '感谢您对我们的信任与支持，欢迎下次再来！', btnText: '确认'},
					link: ''
				},{
					bgImg: require('@/assets/fail_bg.png'),
					bgColor: '#FE9E32',
					text: {title: '支付失败', tips: '确认后可重新支付', btnText: '返回'},
					link: ''
				}
			]

		}
	},
	created(){
		document.body.style.background = '#fff';
		// 发送请求，查询支付状态结果
		setTimeout(()=>{
			this.axios.post(API_URL + 'Home/order/checkorder',qs.stringify({
	            order_sn_id: this.$route.params.order_sn_id
	        })).then((res) => {
	            if(res.data.status == 1){
	            	this.state = 1;
	            	this.data = res.data.data;
	            }else{
	            	if (res.data.status==0 && res.data.msg == '失败'){
	            		this.state = 2;
	            	}else{
	            		Toast({
			                message: res.data.msg,
			                position: 'middle'
			            });
	            	}
	            }
	            this.isShow = true;
	        }).catch((err) => {
	        	this.isShow = true;
	            Toast({
	                message: '查询支付结果失败，请稍后再试',
	                position: 'middle'
	            });
	        });
		},1000)
	},
	methods:{
		tolink(){
			let status = this.state==1?1:0;
			// 根据状态来确定跳转到哪个页面
			this.$router.push({
				name:'orderWrap',
				params:{
					status: status
				}
			});
		}
	}
};
</script>
<style lang="less" scoped>
	.wrap{
		.bg{
			position: absolute;
			width:100%;
			height: 100%;
			left: 0;
			top: 0;
		}
		.header{
			padding-top:1px;
			height: 5.12rem;
			position: relative;
			color:#fff;
			.top{
				position: absolute;
				width:100%;
				top:.25rem;
				left:0;
				display:flex;
				box-sizing:border-box;
				padding: 0 .28rem;
				justify-content: space-between;
				span{
					font-size:15px;
				}
				.back{
					img{
						display: block;
						width: .4rem;
					}
				}
			}
			.tips{
				position: relative;
				margin-top: 1.4rem;
				h1{
					text-align: center;
					font-size: 28px;
  					font-weight: bold;
					margin-bottom: .3rem;
				}
				h2{
					font-size: 12px;
					text-align: center;
				}
			}
		}
		.succ-content{
			box-sizing: border-box;
			padding:0  .72rem;
			margin-top: 0rem;
			.line{
				overflow:hidden;
				width: 100%;
				height: auto;
				padding:.24rem 0;
				line-height: .3rem;
				font-size: 14px;
				color: #4C4C4C;
				border-bottom: 1px solid #ECECEC;
				.address{
					max-width:4.6rem;
				}
			}
		}
		.btn-main{
            position:fixed;
            bottom:.66rem;
            left:0;
            width: 100%;
            height: .92rem;
            padding: 0 .55rem;
            background:#fff;
            box-sizing:border-box;
            button{
                color:#fff;
                width: 100%;
                height: 100%;
                border:none;
                outline: none;
                box-sizing: border-box;
                text-align: center;
                font-size:16px;
                border-radius: 4px;
            }
            button:active{
                box-shadow: 0 5px 5px #ccc;
            }
        }
	}
</style>