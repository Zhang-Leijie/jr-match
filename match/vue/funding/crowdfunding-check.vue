<template>
	<div>
		<div class="header-bar">
			<ol class="breadcrumb">
				<li class="item">众筹</li>
				<li class="item">项目设计</li>
			</ol>
		</div>
		<div class="form-page">
			<div>
				<div class="form-title">
					<h1>项目信息</h1>
				</div>
				<div class="form-input">
					<span class="name">项目名称：</span>
					<span class="input">{{params.name}}</span>
				</div>
				<div class="form-input">
					<span class="name">项目简介：</span>
					<span class="input">{{params.summary}}</span>
				</div>
				<div class="form-input">
					<span class="name">所在城市：</span>
					<span class="input">{{params.block}}</span>
				</div>
				<div class="form-input">
					<span class="name">是否领投：</span>
					<span class="input">
						{{(params.lead === '' || params.lead === undefined) ?
							 '' : (params.lead == 1 ? '是' : '否')}}
					</span>
				</div>
				<div class="form-input">
					<span class="name">创立时间：</span>
					<span class="input">{{params.found_time}}</span>
				</div>
				<div class="form-input">
					<span class="name">项目阶段：</span>
					<span class="input">{{params.periods}}</span>
				</div>
				<div class="form-input">
					<span class="name">盈利状况：</span>
					<span class="input">{{params.profits}}</span>
				</div>
				<div class="form-input">
					<span class="name">运营数据：</span>
					<span class="input">{{params.detail}}</span>
				</div>
			</div>
			<div>
				<div class="form-title">
					<h1>项目展示</h1>
				</div>
				<div class="form-input">
					<span class="name">首页图片：</span>
					<div class="image-container">
						<img :src="params.index_photo">
					</div>
				</div>
				<div class="form-input">
					<span class="name">项目图片：</span>
					<div class="image-container">
						<img :src="params.project_photo">
					</div>
				</div>
				<div class="form-input">
					<span class="name">商业模式：</span>
					<div class="image-container">
						<img :src="params.mode_photo">
					</div>
				</div>
				<div class="form-input">
					<span class="name">市场分析：</span>
					<div class="image-container">
						<img :src="params.analysis_photo">
					</div>
				</div>
				<div class="form-input">
					<span class="name">核心竞争力：</span>
					<div class="image-container">
						<img :src="params.core_photo">
					</div>
				</div>
				<div class="form-input">
					<span class="name">商业计划书（可选）：</span>
					<span class="input">
						<a v-if="params.prospectus" target="_blank" style="color:#419bf9;" :href="params.prospectus">查看地址</a>
						<a v-if="!params.prospectus" href="">未上传</a>
					</span>
				</div>
			</div>
			<div>
				<div class="form-title">
					<h1>项目信息</h1>
				</div>
				<div class="form-input">
					<span class="name">目标额度：</span>
					<span class="input">{{params.money}}</span>
					<span>元</span>
				</div>
				<div class="form-input">
					<span class="name">出让股份：</span>
					<span class="input">{{params.shares}}</span>
					<span>%</span>
				</div>
				<div class="form-input">
					<span class="name">融资计划书（可选）：</span>
					<span class="input">
						<a v-if="params.proposal" target="_blank" style="color:#419bf9;" :href="params.proposal">查看地址</a>
						<a v-if="!params.proposal" href="">未上传</a>
					</span>
				</div>
			</div>
			<div>
				<div class="form-title">
					<h1>发起者信息</h1>
				</div>
				<div class="form-input">
					<span class="name">
						<label class="avatar-image">
							<img :src="params.team_logo" alt="">
						</label>
					</span>
				</div>
				<div class="form-input">
					<span class="name">团队名称：</span>
					<span class="input">{{params.team_name}}</span>
				</div>
				<div class="form-input">
					<span class="name">团队简介：</span>
					<span class="input">{{params.team_summary}}</span>
				</div>
				<div class="form-input">
					<span class="name">团队成员：</span>
				</div>
				<div v-for="(member_,index) in team" :key="member_.id">
					<div class="form-input">
						<span class="name">
							<label class="avatar-image small">
								<img :src="params.team_logo" alt="">
							</label>
						</span>
					</div>
					<div class="form-input indent0">
						<span class="name">姓名：</span>
						<span class="input">{{member_.member_name}}</span>
					</div>
					<div class="form-input indent0">
						<span class="name">团队职务：</span>
						<span class="input">{{member_.member_position}}</span>
					</div>
					<div class="form-input indent0">
						<span class="name">个人简介：</span>
						<span class="input">{{member_.member_intro}}</span>
					</div>
				</div>
			</div>
			<div>
				<div class="form-title">
					<h1>认证信息（可选）</h1>
				</div>
				<div v-for="(proof_, index) in proof" :key="proof_.id">
					<div class="form-input">
						<span class="name">认证名称：</span>
						<span class="input">{{proof_.proof_name}}</span>
					</div>
					<div class="form-input">
						<span class="name">&nbsp;</span>
						<div class="image-container">
							<img :src="proof_.proof_detail">
						</div>
					</div>
				</div>
			</div>
			<div>
				<div class="button-group">
					<router-link class="btn white" :to="{name:'m-cfitem'}">返回</router-link>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {getCFDetail} from '~/ajax/get.js'

	export default {
		data(){
			return {
				params: {
					id: "",
					name: "",
					summary: "",
					money: "",
					periods: "",
					profits: "",
					found_time: "",
					block: "",
					shares: "",
					lead: "",
					prospectus: "",
					proposal: "",
					index_photo: "",
					project_photo: "",
					mode_photo: "",
					analysis_photo: "",
					core_photo: "",
					detail: "",
					team_logo: "",
					team_name: "",
					team_summary: ""
				},
				team: [],
				proof: []
			}
		},
		mounted(){
			getCFDetail({
				id: this.$route.query.relation_id
			}).then((res) => {
				console.dir(res)
				Object.keys(this.params).forEach((prop) => {
					var val = res.baseinfo[prop]
					if (val) {
						this.params[prop] = val
					}
				})
				this.team = res.team
				this.proof = res.proof
			})
		}
	}
</script>