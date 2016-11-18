<template>
	<div class="background-image index-page">
		<div class="index-intro relative">
			团队名称：{{account}}
			<span class="absolute" style="right:40px;">总分：{{totalscore}}</span>
		</div>
		<div class="index-intro">
			学校名称：{{school_name}}
		</div>
		<div class="index-box absolute left" style="top:140px;">
			<router-link :to="{name: 'm-obj',query: {userid: muser_id}}">
				 <div class="index-col">
				 	<div class="main-box" style="width:100%">
				 		<div class="main-word">
				 			<span class="f3">客观考察</span><br>
				 			<span style="line-height:30px;">评分:{{filterScore(score.ObjectsScore)}}</span>
				 		</div>
				 	</div>
				 </div>
			 </router-link>		 
			 <div class="index-col clear" style="margin-top:40px;">
			 	<div class="index-title absolute f4" style="right:440px;top:40px;">
			 		P2P
			 	</div>
			 	<router-link :to="{name: 'm-p2praise', query: {userid: muser_id}}">
				 	<div class="main-box" style="width:120px;float:left">
				 		<div class="main-word">
				 			<span class="f3">项目发标</span><br>
				 			<span style="line-height:30px;">评分:{{filterScore(score.PeerDesignScore)}}</span>
				 		</div>
				 	</div>
			 	</router-link>
			 	<router-link :to="{name: 'm-p2pinvest'}">
				 	<div class="main-box" style="width:120px;float:left;margin-left:20px;">
				 		<div class="main-word">
				 			<span class="f3">审标操作</span><br>
				 			<span style="line-height:30px;">评分:{{filterScore(score.PeerVerifyScore)}}</span>
				 		</div>
				 	</div>
			 	</router-link>
			 	<router-link :to="{name: 'm-p2pbid'}">
				 	<div class="main-box" style="width:120px;float:left;margin-left:20px;">
				 		<div class="main-word">
				 			<span class="f3">投标操作</span><br>
				 			<span style="line-height:30px;">评分:{{filterScore(score.PeerInvestScore)}}</span>
				 		</div>
				 	</div>
			 	</router-link>
			 </div>
			 <div class="index-col clear" style="margin-top:40px;">
			 	<div class="index-title absolute f4" style="right:440px;top:40px;">
			 		众筹
			 	</div>
			 	<router-link :to="{name: 'm-cfcharity'}">
				 	<div class="main-box" style="width:190px;float:left;">
				 		<div class="main-word">
				 			<span class="f3">公益设计</span><br>
				 			<span style="line-height:30px;">评分:{{filterScore(score.CrowdfundingcScore)}}</span>
				 		</div>
				 	</div>
			 	</router-link>
			 	<router-link :to="{name: 'm-cfitem'}">
				 	<div class="main-box" style="width:190px;float:left;margin-left:20px;">
				 		<div class="main-word">
				 			<span class="f3">项目设计</span><br>
				 			<span style="line-height:30px;">评分:{{filterScore(score.CrowdfundingsDesignScore)}}</span>
				 		</div>
				 	</div>
			 	</router-link>
			 </div>
			  <div class="index-col clear" style="margin-top:40px;">
			  	<div class="index-title absolute f4" style="right:440px;top:40px;white-space:nowrap;">
			  		创新创业
			  	</div>
		  	 	<router-link :to="{name: 'm-cfcase',query: {userid: muser_id}}">
		  		 	<div class="main-box" style="width:190px;float:left">
		  		 		<div class="main-word">
		  		 			<span class="f3">案例分析</span><br>
		  		 			<span style="line-height:30px;">评分:{{filterScore(score.AnalysisScore)}}</span>
		  		 		</div>
		  		 	</div>
		  	 	</router-link>
		  	 	 	<router-link :to="{name: 'm-setup'}">
		  	 		 	<div class="main-box" style="width:190px;float:left;margin-left:20px;">
		  	 		 		<div class="main-word">
		  	 		 			<span class="f3">创业新天地</span><br>
		  	 		 			<span style="line-height:30px;">评分:{{filterScore(score.FieldScore)}}</span>
		  	 		 		</div>
		  	 		 	</div>
		  	 	 	</router-link>
			  </div>
		</div>
		<a class="logout" @click="logout">
			<img src="image/guanbi.png">
		</a>
	</div>
</template>
<script>
	import {logout} from '~/ajax/post.js'
	import {UserInfo,Score} from '~/ajax/get.js'
	import router from '~/router.js'

	export default{
		data(){
			return{
				account:'',
				school_name:'',
				totalscore:'',
				muser_id:'',
				score:{

				}
			}
		},
		methods:{
			logout(){
				logout({

				}).then(()=>{
					router.push({name:'m-login'})
				},(e)=>{
					console.dir(e)
				})
			},
			filterScore(score){
				return score ? score : '未评分'
			}
		},
		mounted:function(){
			var self = this	
			UserInfo().then((res) => {
				self.account = res.account
				self.school_name = res.school_name
				self.totalscore = res.totalscore
				self.muser_id = res.muser_id
			}),
			Score().then((res)=>{
				console.dir(res)
				self.score = res
			})
		}
	}
</script>
<style lang="less">
	.index-page.background-image {
		padding:60px 40px;
		padding-bottom: 0px;
	}
	.index-intro{
		width: 100%;
		font-size:24px;
		color:#ffffff;
	}
	.index-box{
		width: 500px;
		margin-bottom: 60px;
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

  		text-align: center;
  		.main-word{
  			color: #fff;
  			height: 54px;
  		}
	}
	.logout{
		position: fixed;
		bottom:60px;
		right: 40px;
		img{
			width: 80px;
			height: 80px;
		}
	}
</style>
