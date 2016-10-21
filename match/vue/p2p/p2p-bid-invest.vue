<template>
	<div>
		<div class="header-bar">
			<ol class="breadcrumb">
				<li class="item">P2P</li>
				<li class="item">投标操作</li>
			</ol>
			<p class="remain-time">剩余时间：<span>30分00秒</span></p>
		</div>
		<div class="p2p-invest-page">
			<div class="invest-input">
				<label for="">投资金额：</label>
				<input type="text" class="input-text">
				<span>万元</span>
			</div>
			<div class="question" v-for="i in 3">
				<p>{{i}}.这里是客观考察单项选择题第一题的题目这里是客观考察单项选择题第一题的题目这里是客观考察单项选择题第一题的题目这里是客观考察单项选择题第一题的题目这里是客观考察单项选择题第一题的题目这里是客观考察单项选择题第一题的题目。</p>
				<div class="options">
					<div class="option">
						<input type="radio" class="input-radio">
						<label for="">A.这里是客观考察单项选择题第一题的第一个不知道是对还是错的答案</label>
					</div>
					<div class="option">
						<input type="radio" class="input-radio">
						<label for="">B.这里是客观考察单项选择题第一题的第一个不知道是对还是错的答案</label>
					</div>
					<div class="option">
						<input type="radio" class="input-radio">
						<label for="">C.这里是客观考察单项选择题第一题的第一个不知道是对还是错的答案</label>
					</div>
					<div class="option">
						<input type="radio" class="input-radio">
						<label for="">D.这里是客观考察单项选择题第一题的第一个不知道是对还是错的答案</label>
					</div>
				</div>
			</div>
			<div class="button-group">
				<router-link class="btn blue" :to="{name: 'm-p2pbid-detail'}">提交</router-link>
			</div>
		</div>
	</div>
</template>
<style lang="less">
	.p2p-invest-page {
		padding: 0 60px;
	}

	.invest-input {
		margin-top: 45px;
		margin-bottom: 45px;

		> label {
			font-size:16px;
			color:#419bf9;
		}
	}
	.button-group {
		text-align: center;
		margin-bottom: 40px;
	}
</style>