<template>
	<div class="login absolute">
		<div class="login-head relative">
			<img src="image/logo.png" class="absolute" style="top:55px;left:39px;">
			<div class="absolute f1" style="top:57px;left:347px;">欢迎登录</div>
		</div>
		<div class="login-box backimg absolute" style="background-image:url('image/denglubeijing.png')">
			<div class="log absolute top p1" >
				<div class="warn f2">请注意周围环境安全</div>
				<div class="login-input">
					<input style="width:100%;height:100%;" placeholder="学号">
				</div>
				<div class="login-input">
					<input style="width:100%;height:100%;" placeholder="密码">
				</div>
				<router-link :to="{name: 'm-index'}">
					<div class="login-btn center f3">
						登 录
					</div>
				</router-link>
			</div>
		</div>
	</div>
</template>
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