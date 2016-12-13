<template>
	<div class="background-image index-page" style="min-width:1100px;">
		<div class="index-intro relative">
			团队名称：{{account}}
			<a class="logout" @click="logout">
				<img src="image/guanbi.png">
			</a>
			<span style="float:right;line-height:80px;">总分：{{totalscore}}</span>
		</div>
		<div class="index-intro">
			学校名称：{{school_name}}
		</div>
		<div class="modules-panel">
			<div class="index-box">
				<table>
					<tbody>
						<tr>
							<td></td>
							<td colspan="6">
								<div @click="select('obj')" class="main-box">
							 		<div class="main-word">
							 			<span class="f3">客观考察</span><br>
							 			<span style="line-height:30px;">评分:{{filterScore(score.ObjectsScore)}}</span>
							 		</div>
					 			</div>
					 		</td>
						</tr>
						<tr>
							<td><span class="index-title f4">P2P</span></td>
							<td colspan="2">
								<div @click="select('p2p-raise')" class="main-box">
							 		<div class="main-word">
							 			<span class="f3">项目发标</span><br>
							 			<span style="line-height:30px;">评分:{{filterScore(score.PeerDesignScore)}}</span>
							 		</div>
							 	</div>
							</td>
							<td colspan="2">
								<div @click="select('p2p-invest')" class="main-box">
							 		<div class="main-word">
							 			<span class="f3">审标操作</span><br>
							 			<span style="line-height:30px;">评分:{{filterScore(score.PeerVerifyScore)}}</span>
							 		</div>
							 	</div>
							</td>
							<td colspan="2">
								<div @click="select('p2p-bid')" class="main-box">
							 		<div class="main-word">
							 			<span class="f3">投标操作</span><br>
							 			<span style="line-height:30px;">评分:{{filterScore(score.PeerInvestScore)}}</span>
							 		</div>
							 	</div>
							</td>
						</tr>	
						<tr>
							<td>
								<span class="index-title f4">众筹</span>
							</td>
							<td colspan="3">
								<div @click="select('cf-raise')" class="main-box">
							 		<div class="main-word">
							 			<span class="f3">股权众筹</span><br>
							 			<span style="line-height:30px;">评分:{{filterScore(score.CrowdfundingsDesignScore)}}</span>
							 		</div>
							 	</div>
							</td>
							<td colspan="3">
								<div @click="select('charity')" class="main-box">
							 		<div class="main-word">
							 			<span class="f3">公益众筹</span><br>
							 			<span style="line-height:30px;">评分:{{filterScore(score.CrowdfundingcScore)}}</span>
							 		</div>
							 	</div>
							</td>
						</tr>
						<tr>
							<td><span class="index-title f4">创新创业</span></td>
							<td @click="select('case')" colspan="3">
								<div class="main-box">
					  		 		<div class="main-word">
					  		 			<span class="f3">案例分析</span><br>
					  		 			<span style="line-height:30px;">评分:{{filterScore(score.AnalysisScore)}}</span>
					  		 		</div>
					  		 	</div>
							</td>
							<td colspan="3">
								<div @click="select('creative')" class="main-box">
				  	 		 		<div class="main-word">
				  	 		 			<span class="f3">创业新天地</span><br>
				  	 		 			<span style="line-height:30px;">评分:{{filterScore(score.FieldScore)}}</span>
				  	 		 		</div>
				  	 		 	</div>
							</td>
						</tr>
					</tbody>
				</table>	 	
			</div>
			<div class="module-intro">
				<p>{{intro}}</p>
				<div class="button-group">
					<a class="btn blue" @click="begin">开始</a>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {logout} from '~/ajax/post.js'
	import {UserInfo,Score} from '~/ajax/get.js'
	import router from '~/router.js'

	var ajax_userinfo = {} 
	var ajax_score = {}

	const CFINTRO = `比赛须知：
本模块是众筹模块，占大赛总分权重的35%。
①现场操作、展示环节：占大赛总分权重30%。
现场操作环节：比赛时间10分钟，共1道股权众筹题。请仔细阅读题干和问题，并在答题页面内按照答题要求依次作答。提前做完可以点击提交，提交后不能修改、不能再进入本模块。请在本模块比赛时间截止之前主动提交答题记录。
现场展示环节：比赛时间每组5分钟。需要展示的内容包括：团队及团队成员介绍（约1分钟）和以上股权众筹的答题内容（约4分钟），每组选手须在5分钟内向专家评委进行展示、答辩。每组所有选手均需参加展示答辩。具体流程服从比赛安排。
②公益众筹环节：占大赛总分权重的5%。公益众筹环节在大赛开始前已经结束，分数根据各组微信投票结果综合判定。

点击“开始”进入股权众筹答题页面。
`
	const CREATIVEINTRO = `比赛须知：
本模块是创新创业模块，占大赛总分权重的10%。考试时间15分钟，共1道案例分析题。请仔细阅读案例分析题的题干和问题，并在答题框内按照答题要求依次作答。提前做完可以点击提交，提交后不能修改、不能再进入本模块。15分钟时间到后，系统会自动提交您的答题记录。
点击“开始”进入答题页面。
`

	const MODULES = {
		'obj': {
			route($vm){
				router.push({name: 'm-p2praise', query: {userid: $vm.muser_id}})
			},
			intro: `比赛须知：
本模块是客观题，占大赛总分权重的15%。考试时间15分钟，共36道客观题，其中单选题16题，多选题8题，判断题8题。提前做完可以点击提交，提交后不能修改、不能再进入本模块。请在本模块比赛时间截止之前主动提交答题记录。
点击“开始”进入答题页面。
`
		},
		'p2p-raise': {
			route($vm){
				router.push({name: 'm-p2praise', query: {userid: $vm.muser_id}})
			},
			intro: `比赛须知：
本模块是发标操作，占大赛总分权重的20%。比赛时间25分钟，共4道题，包括车贷标的发标操作、房贷标的发标操作、信用贷标的发标操作、小微企业贷标的发标操作。
允许提前提交，提交后不能修改、不能再进入本模块。请选手在本模块比赛时间截止前主动提交答题记录。
点击“开始”进入答题页面。
`
		},
		'p2p-invest': {
			route($vm){
				router.push({name: 'm-p2pinvest'})
			},
			intro: `比赛须知：
本模块是审标操作，占大赛总分权重的5%。比赛时间5分钟，共1道题，即审核题干给出的标的是否可以通过的结果并分析原因。
允许提前提交，提交后不能修改、不能再进入本模块。请选手在本模块比赛时间截止前主动提交答题记录。
点击“开始”进入答题页面。
`
		},
		'p2p-bid': {
			route($vm){
				router.push({name: 'm-p2pbid'})
			},
			intro: `比赛须知：
本模块是投标操作，占大赛总分权重的15%。比赛时间10分钟。
每队选手会获得10万元虚拟投资本金，需要将本金全部投出，投资的标的数量不做要求。如果在比赛规定时间内未将10万元完全投出，本模块成绩计为0分。
允许提前提交，提交后不能修改、不能再进入本模块。请选手在本模块比赛时间截止前主动提交答题记录。
点击“开始”进入答题页面。`
		},
		'cf-raise': {
			route($vm){
				router.push({name: 'm-cfitem'})
			},
			intro: CFINTRO
		},
		'charity': {
			route($vm){
				router.push({name: 'm-cfcharity'})
			},
			intro: CFINTRO
		},
		'case': {
			route($vm){
				router.push({name: 'm-cfcase',query: {userid: $vm.muser_id}})
			},
			intro: CREATIVEINTRO
		},
		'creative': {
			route($vm){
				router.push({name: 'm-setup'})
			},
			intro: CREATIVEINTRO
		}
	}

	export default{
		data(){
			return{
				account: ajax_userinfo.account,
				school_name: ajax_userinfo.school_name,
				totalscore: ajax_userinfo.totalscore,
				muser_id: ajax_userinfo.muser_id,
				score: ajax_score,
				intro: ""
			}
		},
		methods:{
			select(moduleName){
				var module = MODULES[moduleName] || {intro: "", route: ()=>{}}
				this.intro = module.intro 
				this.route = module.route 
			},
			begin(){
				this.route(this)
			},
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
		mounted(){
			this.select('obj')
		},
		beforeRouteEnter(to, from, next){
			ajax_userinfo = {}
			ajax_score = {}
			Promise.all([
					UserInfo({}, true),
					Score({}, true)
				]).then(([userinfo, score])=>{
					ajax_userinfo = userinfo
					ajax_score = score
					next()
				}).catch((e)=>{
					router.push({name: 'm-login'})
				})
		}
	}
</script>
<style lang="less">
	.index-page.background-image {
		padding:60px 40px;
	}
	.index-intro{
		width: 100%;
		font-size:24px;
		color:#ffffff;
	}
	.index-col{
		position: relative;
		width: 100%;
		padding-left: 100px;
	}
	.modules-panel {
		display: table;
		table-layout: fixed;
		width: 100%;
		border-collapse: collapse;
		> * {
			display: table-cell;
			vertical-align: top;
		}
	}

	.main-box{
		height: 120px;
		padding-top: 33px;
		margin: 10px;
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
		float: right;
		img{
			width: 80px;
			height: 80px;
		}
	}
	.module-intro {
		position: relative;

		> p {
			position: absolute;
			top: 10px;
			left: 10px;
			right: 10px;
			bottom: 10px;
			padding: 10px;
			padding-bottom: 40px;
			background:rgba(255, 255, 255, 0.6);
		}

		> .button-group {
			width: 100%;
			position: absolute;
			bottom: 20px;
		}
	}
</style>
