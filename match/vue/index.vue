<template>
	<div class="index absolute backimg" style="background-image:url('image/beijing.png');">
		<div class="index-intro relative">
			团队名称：富贵队
			<span class="absolute" style="right:40px;">总分：100</span>
		</div>
		<div class="index-intro">
			学校名称：浙江金融职业技术学院
		</div>
		<div class="index-box absolute left" style="top:140px;">
			<router-link :to="{name: 'm-obj'}">
				 <div class="index-col">
				 	<div class="main-box" style="width:100%">
				 		<div class="main-word">
				 			<span class="f3">客观考察</span><br>
				 			<span style="line-height:30px;">得分</span>
				 		</div>
				 	</div>
				 </div>
			 </router-link>		 
			 <div class="index-col" style="margin-top:40px;">
			 	<div class="index-title absolute f4" style="left:10px;top:40px;">
			 		P2P
			 	</div>
			 	<router-link :to="{name: 'm-p2praise'}">
				 	<div class="main-box" style="width:120px;float:left">
				 		<div class="main-word">
				 			<span class="f3">项目发标</span><br>
				 			<span style="line-height:30px;">得分</span>
				 		</div>
				 	</div>
			 	</router-link>
			 	<router-link :to="{name: 'm-p2pinvest'}">
				 	<div class="main-box" style="width:120px;float:left;margin-left:20px;">
				 		<div class="main-word">
				 			<span class="f3">审标操作</span><br>
				 			<span style="line-height:30px;">得分</span>
				 		</div>
				 	</div>
			 	</router-link>
			 	<router-link :to="{name: 'm-p2pbid'}">
				 	<div class="main-box" style="width:120px;float:left;margin-left:20px;">
				 		<div class="main-word">
				 			<span class="f3">投标操作</span><br>
				 			<span style="line-height:30px;">得分</span>
				 		</div>
				 	</div>
			 	</router-link>
			 	<div class="clear"></div>
			 </div>
			 <div class="index-col" style="margin-top:40px;">
			 	<div class="index-title absolute f4" style="left:10px;top:40px;">
			 		众筹
			 	</div>
			 	<router-link :to="{name: 'm-cfcase'}">
				 	<div class="main-box" style="width:120px;float:left">
				 		<div class="main-word">
				 			<span class="f3">案例分析</span><br>
				 			<span style="line-height:30px;">得分</span>
				 		</div>
				 	</div>
			 	</router-link>
			 	<router-link :to="{name: 'm-cfcharity'}">
				 	<div class="main-box" style="width:120px;float:left;margin-left:20px;">
				 		<div class="main-word">
				 			<span class="f3">公益设计</span><br>
				 			<span style="line-height:30px;">得分</span>
				 		</div>
				 	</div>
			 	</router-link>
			 	<router-link :to="{name: 'm-cfitem'}">
				 	<div class="main-box" style="width:120px;float:left;margin-left:20px;">
				 		<div class="main-word">
				 			<span class="f3">项目设计</span><br>
				 			<span style="line-height:30px;">得分</span>
				 		</div>
				 	</div>
			 	</router-link>
			 	<div class="clear"></div>
			 </div>
		</div>
		<router-link :to="{name: 'm-login'}">
			<div class="logout absolute">
				<img src="image/guanbi.png">
			</div>
		</router-link>
		<!-- <div>首页</div>
		客观考察
		p2p-项目发标
		p2p-审标操作
		p2p-投标操作
		众筹-案例分析
		众筹-公益设计
		众筹-项目设计
		<div>
			退出
		</div> -->
	</div>
</template>

<style lang="less">
	.index{
		min-width: 1200px;
		top:0px;
		bottom:0px;
		left:0px;
		right:0px;
		padding:60px 40px;
	}
	.index-intro{
		width: 100%;
		font-size:24px;
		color:#ffffff;
	}
	.index-box{
		width: 500px;
		.index-col{
			position: relative;
			width: 100%;
			padding-left: 100px;
		}
	}
	.main-box{
		height: 120px;
		padding-top: 33px;
		background:#405c84;
		border-radius:8px;
		-webkit-box-shadow:0px 0px 5px 5px rgba(0, 0, 0, .2);  
 		-moz-box-shadow:0px 0px 5px 5px rgba(0, 0, 0, .2);  
  		box-shadow:0px 0px 5px 5px rgba(0, 0, 0, .2); 
  		&:hover{
  			-webkit-box-shadow:0px 0px 5px 5px rgba(0, 0, 0, .5);  
	 		-moz-box-shadow:0px 0px 5px 5px rgba(0, 0, 0, .5);  
	  		box-shadow:0px 0px 5px 5px rgba(0, 0, 0, .5);
  		}
  		.main-word{
  			color: #fff;
  			width: 80px;
  			height: 54px;
  			margin: 0px auto;
  		}
	}
	.logout{
		bottom:60px;
		right: 40px;
		img{
			width: 80px;
			height: 80px;
		}
	}
</style>
