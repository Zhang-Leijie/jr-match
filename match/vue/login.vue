<template>
	<div class="login absolute">
		<div class="login-head relative">
			<img src="image/logo.png" class="absolute" style="top:55px;left:39px;">
			<div class="absolute f1" style="top:57px;left:347px;">欢迎登录</div>
		</div>
		<div class="login-box backimg absolute" style="background-image:url('image/denglubeijing.png')">
			<div class="log absolute top p1" >
				<div class="warn f2 relative">
					<i class="flaticon-technology absolute" style="top:1px;left:8px;color:#ffcf5c"></i>
					请注意周围环境安全
				</div>
				<div class="login-input relative">
					<i class="flaticon-user absolute" style="top:4px;left:15px;color:#999"></i>
					<input style="width:100%;height:100%;" placeholder="学号" v-model="cardnum">
				</div>
				<div class="login-input relative">
					<i class="flaticon-unlocked absolute" style="top:4px;left:15px;color:#999"></i>
					<input style="width:100%;height:100%;" placeholder="密码" v-model="password" type="password" @key.enter="login">
				</div>
				<!-- <router-link :to="{name: 'm-index'}"> -->
					<div class="login-btn center f3" @click="login">
						登 录
					</div>
				<!-- </router-link> -->
			</div>
		</div>
	</div>
</template>
<script>
	import {login, logout} from '~/ajax/post.js'
	import router from '~/router.js'
	import {routerState} from '~/router.js'
	import 'whatwg-fetch'

	export default {
		data(){
			return {
				cardnum:'',
				password:''
			}
		},
		methods:{
			login(){
				var self = this
				login({
					account: self.cardnum,
					password: self.password
				}).then(()=>{
					if (routerState.previous == null || routerState.previous == router.currentRoute.name) {
						router.push({name: 'm-index'})
					} else {
						router.back()
					}
				}, (e) => {
					console.dir(e)
				})
				// fetch('http://jr.xiyoukeji.com/index.php/match/log/Login', {
				// 	method: 'POST',
		
				// 	body: JSON.stringify({
				// 	    account: self.cardnum,
				// 	    password:self.password
				// 	})
				// }).then(function(response){
				// 	return response.json()
				// }).then((res)=>{
				// 	console.log(res)
				// 	router.push({name:'m-index'})
				// })
			}
		},
		beforeRouteEnter(to, from, next){
			logout().then(()=>{
				return Promise.reject(new Error())
			}).catch((e)=>{
				next()
			})
		}
	}
</script>
<style lang="less">
	.login{
		position: absolute;
		min-width: 1200px;
		top: 0px;
		bottom: 0px;
		left: 0px;
		right: 0px;
		.login-head{
			width: 100%;
			height: 100px;
		}
	}
	.login-box{
		top: 100px;
		bottom: 0px;
		left: 0px;
		right: 0px;
		.log{
			left: 129px;
			width: 340px;
			height: 236px;
			background-color: #fff;
			.warn{
				padding-left: 34px;
				width: 100%;
				height: 28px;
				background:#fff8dc;
				border:1px solid #ffea94;
				line-height: 26px;
			}
			.login-input{
				height: 40px;
				border:1px solid #d8d8d8;
				margin-top: 10px;
				padding-left: 50px;
			}
			.login-btn{
				height: 40px;
				margin-top: 20px;
				background:#3386fe;
				line-height: 40px;
			}
		}
	}
</style>