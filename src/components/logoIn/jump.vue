<template>
	<div class="register-wrap">
		<div v-title data-title="请下载abo app 进行操作">请下载abo app 进行操作</div>
		<header class="logoIn-header">
           <span @click="remove" class="btn-back">取消</span>{{title}}
        </header>
        <div class="tips-wrap">
            <img class="tips-image" src="static/dog.png">
        	<span class="tips">关于账号的注册/密码找回操作</span>
            <span class="tips"> 请客官先下载ABO APP后在APP上操作哟</span>
            <div class="download">
                <button @click="download(1)" class="download">IOS下载</button>
                <button @click="download(2)" class="download">安卓下载</button>
            </div>
        </div>	
	</div>
</template>
<script>
	export default {
		name : 'register',
		data(){
			return {
				title: '注册/密码找回'
			}
		},
        methods: {
            remove(){//路由回退一步
                this.$router.push('/LogoIn')
            },
            download (type) { // 跳转对应下载地址
                if(type === 1){
                    location.href = 'https://itunes.apple.com/cn/app/id1443708821';
                }else{
                    location.href = 'http://www.abochain.io/ABO_v1.4.2.apk';
                }
            }
        }
	}
</script>
<style lang="less" scoped>
	.register-wrap{
		padding:0 .6rem;
        background:#fff;
        .logoIn-header{
            width:100%;
            height:.9rem;
            line-height:.9rem;
            text-align:center;
            font-size:.36rem;
            color:#4591f2;
            position:relative;
            .btn-back{
                width:1.3rem;
                height:100%;
                font-size:.28rem;
                color:#999;
                position:absolute;
                left:-.6rem;
                top:0;
            }
        }
        .tips-image{
            display:block;
            margin: .38rem auto .26rem;
        }
        .tips{
            display:block;
            text-align:center;
            color:#848484;
            font-size:14px;
        }
        .download{
            margin-top:.2rem;
            display:flex;
            justify-content: space-around;
            button{
                border:none;
                height:40px;
                border-radius:20px;
                background:#3073ED;
                color:#fff;
                font-size:12px;
                padding:0 1rem;
            }
        }
	}
</style>