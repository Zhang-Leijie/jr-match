<template>
	<div class="raise backimg absolute" style="background-image:url('image/beijing.png');">
		<div class="header-bar">
			<ol class="breadcrumb">
				<li class="item">众筹</li>
				<li class="item">项目设计</li>
			</ol>
			<p class="remain-time">剩余时间：<span>30分00秒</span></p>
		</div>
		<div style="width:100%;padding:0px 40px">
			<div class="table-box" style="padding:20px 40px">
				<div class="intro">
					<div class="col"></div>
					<div class="title f6">背景描述</div>
					<div class="clear"></div>
					<div class="cont f2">
						这里显示的是背景描述的内容这里显示的是背景描述的内容这里显示的是背景描述的内容这里显示的是背景描述的内容这里显示的是背景描述的内容这里显示的是背
						景描述的内容这里显示的是背景描述的内容这里显示的是背景描述的内容这里显示的是背景描述的内容这里显示的是背景描述的内容这里显示的是背景描述的内容这
						里显示的是背景描述的内容这里显示的是背景描述的内容这里显示的是背景描述的内容这里显示的是背景描述的内容...
					</div>
				</div>
				<div class="intro">
					<div class="col"></div>
					<div class="title f6">背景描述</div>
					<div class="clear"></div>
					<div class="cont f2">
						这里显示的是背景描述的内容这里显示的是背景描述的内容这里显示的是背景描述的内容这里显示的是背景描述的内容这里显示的是背景描述的内容这里显示的是背
						景描述的内容这里显示的是背景描述的内容这里显示的是背景描述的内容这里显示的是背景描述的内容这里显示的是背景描述的内容这里显示的是背景描述的内容这
						里显示的是背景描述的内容这里显示的是背景描述的内容这里显示的是背景描述的内容这里显示的是背景描述的内容...
					</div>
				</div>
				<div class="btn-box">
					<btn-back style="background-color:#fff;color:#666;"></btn-back>
					<router-link :to="{name: 'm-p2praisechart'}">
						<btn-go style="margin-left:40px;"></btn-go>
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>
<style lang="less">
	.header{
		padding: 0px 40px;
		width: 100%;
		height: 50px;
		top: 0px;
		background:rgba(255, 255, 255, 0.6);
		line-height: 50px;
		.time{
			top: 0px;
			right: 40px;
		}
	}
	.raise{
		top: 0px;
		bottom: 0px;
		left: 0px;
		right: 0px;
		min-width: 1200px;
		width: 100%;
	}
	.back{
		cursor: pointer;
		width: 60px;
		color: #fff;
		line-height: 40px;
	}
	.table-box{
		width: 100%;
		margin: 10px auto 0px;
		min-height: 560px;
		background:rgba(255, 255, 255, 0.6);
	}
	.flaticon-left-arrow:before{
		margin-left: 0px;
	}
	.intro{
		min-height: 230px;
		.col{
			width: 8px;
			height: 30px;
			background:#3386fe;
			float: left;
		}
		.title{
			float: left;
			line-height: 30px;
			margin-left: 10px;
		}
		.cont{
			margin-top: 30px;
			padding-left: 60px;
			width: 100%;
		}

	}
	.btn-box{
		text-align: center;		
	}
</style>