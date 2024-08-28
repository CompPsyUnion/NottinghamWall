<template>
	<view class="map-min-box">
		<!-- 可视化地图 -->
		<view class="map-min-1" v-if="maptype == 1">
			<view class="map-box">
				<map id="myMap" :enable-poi="true" :show-location="true" style="height: 100%; width: 100%"
					:longitude="longitude" :latitude="latitude" scale="15" @regionchange="regionchangetab">
					<cover-image :class="jump == 1 ? 'controls-play-img bounce-animation' : 'controls-play-img'"
						:src="orientationIco"></cover-image>
					<cover-image v-if="showResetting" @click="setposition" class="position-play-img"
						:src="resettingIco"></cover-image>
				</map>
			</view>
			<view class="sou-item-list">
				<view class="u-search-box" @click="opensea">
					<view class="search-min-box">
						<image
							src="https://lbs.gtimg.com/visual/miniprogram-plugin/location-picker/assets/s_search@2x.png"
							mode=""></image>
						搜索地点
					</view>
				</view>
				<view class="list-item-name-box">
					<view class="category-scroll-view">
						<scroll-view scroll-y="true" class="scroll-Y" @scrolltolower="lower">
							<view class="scroll-view-item" v-for="(item, index) in list" :key="index"
								@click="setpoi(item, index)">
								<view class="poi-item-name">
									<image :src="listIco" mode=""></image>
									{{ item.name }}
								</view>
								<view class="poi-address">{{ item.address }}</view>
								<view class="right-icon" v-if="locinx == index"></view>
							</view>
							<view class="loading-box" v-if="list.length == 0">
								<view class="load-animation" v-if="loading">
									<view class="spinner"></view>
									<view class="txt-item">加载中</view>
								</view>
							</view>
						</scroll-view>
					</view>
				</view>
				<view class="but-box">
					<view class="btn-location" @click="fixAddress">确认选点</view>
				</view>
			</view>
		</view>
		<view class="map-min-2" v-if="maptype == 2">
			<view class="map-min-2-search-box">
				<input v-model="keyword" placeholder="搜索地点" @input="changeword" @confirm="changeword"
					class="locationpicker-search-content-ipt" />
				<view class="locationpicker-search-clear" @click="onClearInput">
					<image src="https://lbs.gtimg.com/visual/miniprogram-plugin/location-picker/assets/btn_close@2x.png"
						class="locationpicker-search-clear-ipt" mode=""></image>
				</view>
				<view class="locationpicker-search--content-btn-line"></view>
				<view class="locationpicker-search-content-btn" @click="changeword">搜索</view>
				<!-- <u-search placeholder="搜索地点" shape="square" bgColor="#ebebeb" v-model="keyword" @search='' @custom='changeword' @change="changeword"></u-search> -->
			</view>
			<u-line></u-line>
			<scroll-view scroll-y="true" class="scroll-Y">
				<view class="scroll-view-item" v-for="(item, index) in seolist" :key="index"
					@click="seopoi(item, index)">
					<view class="poi-item-name">
						<image :src="listIco" mode=""></image>
						{{ item.name }}
					</view>
					<view class="poi-address">{{ item.address }}</view>
				</view>
				<view class="loading-box" v-if="seolist.length == 0 && keyword != ''">
					<view class="load-animation" v-if="loading">
						<view class="spinner"></view>
						<view class="txt-item">加载中</view>
					</view>
					<view class="empty-box" v-if="!loading && seolist.length == 0">
						<view class="value-txt-box-2">没有搜索到数据</view>
					</view>
				</view>
				<!-- 历史搜索记录 -->
				<view class="history-item-box" v-if="history.length == 0 && keyword == ''">
					<view class="empty-box">
						<view class="value-txt-box-1">还没有历史记录</view>
						<view class="value-txt-box-2">快来体验世界吧</view>
					</view>
				</view>
				<view class="history-item-box" v-if="history.length > 0 && keyword == ''">
					<view class="scroll-view-item" v-for="(item, index) in history" :key="index"
						@click="seopoi(item, index)">
						<view class="poi-item-name">
							<image :src="listIco" mode=""></image>
							{{ item.name }}
						</view>
						<view class="poi-address">{{ item.address }}</view>
					</view>
					<view class="item-but-box" v-if="history.length > 0">
						<view class="locationpicker-clear-history-btn" @click="Clearhistory">清空历史记录</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script setup>
	// 引入公共JS文件
	import amapWx from './amapWx.js';
	import {
		defineEmits
	} from 'vue';
	import {
		onMounted,
		ref,
		defineProps,
		getCurrentInstance
	} from 'vue';
	const instance = getCurrentInstance();
	const emits = defineEmits(['commitCheck']); // 定义要触发的自定义事件
	// 或者按需引入
	// 使用引入的函数或变量
	const props = defineProps({
		// 高德Web服务Key
		mapKey: {
			type: String,
			default: ''
		},
		// 定位复位图标
		resettingIco: {
			type: String,
			default: '/uni_modules/vue3-map/static/position.png'
		},
		// 定位图标
		orientationIco: {
			type: String,
			default: '/uni_modules/vue3-map/static/map-inx.png'
		},
		// 列表图标
		listIco: {
			type: String,
			default: '/uni_modules/vue3-map/static/item-inx.png'
		},
		// 搜索范围
		Radius: {
			type: String,
			default: ''
		},
		//定位功能显示
		showResetting: {
			type: Boolean,
			default: true
		},
		// 微信公众号jsSdk配置
		configData: {
			type: Object,
			default: () => {}
		}
	});
	const maptype = ref(1);
	const latitude = ref('');
	const longitude = ref('');
	const markers = ref([]);
	const list = ref([]);
	const history = ref([]);
	const seolist = ref([]);
	const myAmapFun = ref('');
	const location = ref('');
	const jump = ref(1);
	const keyword = ref('');
	const mapObj = ref(null);
	const loading = ref(true);
	const page = ref(1);
	const count = ref(0);
	const locinx = ref(0);
	const changel = ref(1);
	const mapRef = ref(null);
	let mapContext = null;
	// 初始化函数
	function created() {
		mapObj.value = uni.createMapContext('myMap');
		myAmapFun.value = new amapWx.AMapWX({
			key: props.mapKey
		});
		// #ifndef WEB
		uni.getLocation({
			type: 'gcj02',
			altitude: true,
			geocode: true,
			isHighAccuracy: true,
			success: function(res) {
				try {
					console.log('---2', res);
					latitude.value = res.latitude;
					longitude.value = res.longitude;
					location.value = `${latitude.value},${longitude.value}`;
					attachments();
					console.log(maptype.value, '初始化---1', longitude.value);
				} catch {}
			},
			fail: function(info) {
				//失败回调
				console.log(info, 2);
			}
		});
		// #endif
		// #ifdef WEB

		var ua = window.navigator.userAgent.toLowerCase();
		if (ua.match(/micromessenger/i) == 'micromessenger') {
			console.log('微信客户端');
			// // 配置sdksj
			if (isEmpty(props.configData)) {
				console.log('请配置wxJSsdk配置参数！');
				return;
			} else {
				const script = document.createElement('script');
				script.src = '/uni_modules/vue3-map/static/jweixin.js';
				script.onload = () => {
					const weixin = window.wx; // 确保微信JS-SDK的全局变量wx存在
					weixin.config({
						...props.configData,
						jsApiList: ['openLocation', 'getLocation'] // 必填，需要使用的JS接口列表
					});
					console.log('微信客户端', weixin);
					// sdk加载完成后执行
					weixin.ready(() => {
						weixin.checkJsApi({
							jsApiList: ['getLocation'],
							success: (res) => {
								console.log('weixin.ready', res);
								if (res.checkResult.getLocation == false) {
									console.log('微信版本低');
									return;
								}
							}
						});
						weixin.error((err) => {
							console.error('接口调取失败', err);
						});
						// 获取位置
						weixin.getLocation({
							type: 'gcj02',
							success: (res) => {
								console.log('jssdk获取的位置:', res.longitude, res.latitude);
								latitude.value = res.latitude;
								longitude.value = res.longitude;
								location.value = `${latitude.value},${longitude.value}`;
								attachments();
							},
							cancel: (res) => {
								console.error('您已禁止获取位置信息');
							}
						});
					});
				};
				document.head.appendChild(script); // 当脚本加载完毕后调用的函数
			}
		} else {
			console.log('不是微信客户端');
			uni.getLocation({
				type: 'gcj02',
				altitude: true,
				geocode: true,
				isHighAccuracy: true,
				success: function(res) {
					try {
						latitude.value = res.latitude;
						longitude.value = res.longitude;
						location.value = `${latitude.value},${longitude.value}`;
						attachments();
					} catch {}
				},
				fail: function(info) {
					//失败回调
					console.log(info, 2);
				}
			});
		}
		// #endif
	}

	function isEmpty(obj) {
		return Object.keys(obj).length === 0;
	}

	function onClearInput() {
		keyword.value = '';
		seolist.value = [];
	}

	function Clearhistory() {
		uni.showModal({
			title: '提示',
			content: '确定清空全部历史记录？',
			success: function(res) {
				if (res.confirm) {
					uni.removeStorage({
						key: 'locationHistory',
						success: function(res) {
							console.log('success');
							history.value = [];
						}
					});
				} else if (res.cancel) {
					console.log('用户点击取消');
				}
			}
		});
	}
	// 搜索
	function changeword() {
		loading.value = true;
		seolist.value = [];
		let formData = {};
		if (props.Radius) {
			formData = {
				location: location.value,
				keywords: keyword.value,
				city: props.Radius,
				citylimit: true
			};
		} else {
			formData = {
				location: location.value,
				keywords: keyword.value
			};
		}
		myAmapFun.value.getInputtips({
			...formData,
			success: function(data) {
				data.tips.forEach((item, index) => {
					//成功回调
					//成功回调
					if (item.location != '' && item.district != '') {
						let province = '';
						if (item.district.match(/^(.*?省|.*?自治区)/)) {
							province = item.district.match(/^(.*?省|.*?自治区)/)[0];
						}
						let city = '';
						if (item.district.replace(province, '').match(/^(.*?市|.*?地区)/)) {
							city = item.district.replace(province, '').match(/^(.*?市|.*?地区)/)[0];
						}
						let district = '';
						if ((district = item.district.replace(province + city, '').match(
								/^.*?(区|县|镇)/))) {
							district = item.district.replace(province + city, '').match(/^.*?(区|县|镇)/)[
								0];
						}
						seolist.value.push({
							id: item.id,
							name: item.name,
							address: item.address,
							location: item.location,
							province: province,
							city: city,
							district: district,
							adcode: item.adcode
						});
					}
				});
				count.value = data.count;
				loading.value = false;
				uni.hideLoading();
			},
			fail: function(info) {
				//失败回调
				console.log(info, 2);
			}
		});
	}
	// 确定地址
	function fixAddress() {
		let location = list.value[locinx.value];
		console.log(123);
		emits('commitCheck', location);
	}
	// 搜索跳转
	function opensea() {
		list.value = [];
		seolist.value = [];
		maptype.value = 2;
		uni.getStorage({
			key: 'locationHistory',
			success: function(res) {
				history.value = res.data;
			}
		});
	}
	// 下拉加载
	function lower() {
		if (list.value.length != count.value) {
			page.value++;
			uni.showLoading({
				title: '加载中...'
			});
			attachments();
		}
	}
	// 选择定位坐标地址
	function setpoi(e, inx) {
		locinx.value = inx;
		changel.value = 2;
		let lon = e.location.split(',');
		latitude.value = lon[1];
		longitude.value = lon[0];
	}
	// 搜索选择
	function seopoi(e) {
		changel.value = 2;
		let lon = e.location.split(',');
		latitude.value = lon[1];
		longitude.value = lon[0];
		page.value = 1;
		list.value.push(e);
		const val = history.value.find((k) => k.id == e.id);
		if (!val) {
			history.value.unshift(e);
			uni.setStorage({
				key: 'locationHistory',
				data: history.value,
				success: function() {
					console.log('success');
				}
			});
		}
		location.value = e.location;
		attachments();
		setTimeout(() => {
			changel.value = 1;
		}, 1000);
		maptype.value = 1;
		keyword.value = '';
	}
	// 复原定位
	function setposition() {
		changel.value = 2;
		locinx.value = 0;
		page.value = 1;
		// #ifndef WEB
		uni.getLocation({
			type: 'gcj02',
			altitude: true,
			geocode: true,
			isHighAccuracy: true,
			success: function(res) {
				try {
					location.value = `${res.latitude},${res.longitude}`;
					latitude.value = latitude.value + 2;
					longitude.value = longitude.value + 2;
					setTimeout(() => {
						latitude.value = res.latitude;
						longitude.value = res.longitude;
					}, 400);
					list.value = [];
					loading.value = true;
					attachments();
					setTimeout(() => {
						changel.value = 1;
					}, 1000);
				} catch {}
			},
			fail: function(info) {
				//失败回调
				console.log(info, 2);
			}
		});
		// #endif
		// #ifdef WEB

		var ua = window.navigator.userAgent.toLowerCase();
		if (ua.match(/micromessenger/i) == 'micromessenger') {
			console.log('微信客户端');
			// // 配置sdksj
			if (isEmpty(props.configData)) {
				console.log('请配置wxJSsdk配置参数！');
				return;
			} else {
				const script = document.createElement('script');
				script.src = '/uni_modules/vue3-map/static/jweixin.js';
				script.onload = () => {
					const weixin = window.wx; // 确保微信JS-SDK的全局变量wx存在
					weixin.config({
						...props.configData,
						jsApiList: ['openLocation', 'getLocation'] // 必填，需要使用的JS接口列表
					});
					console.log('微信客户端', weixin);
					// sdk加载完成后执行
					weixin.ready(() => {
						weixin.checkJsApi({
							jsApiList: ['getLocation'],
							success: (res) => {
								console.log('weixin.ready', res);
								if (res.checkResult.getLocation == false) {
									console.log('微信版本低');
									return;
								}
							}
						});
						weixin.error((err) => {
							console.error('接口调取失败', err);
						});
						// 获取位置
						weixin.getLocation({
							type: 'gcj02',
							success: (res) => {
								console.log('jssdk获取的位置:', res.longitude, res.latitude);
								location.value = `${res.latitude},${res.longitude}`;
								latitude.value = latitude.value + 2;
								longitude.value = longitude.value + 2;
								setTimeout(() => {
									latitude.value = res.latitude;
									longitude.value = res.longitude;
								}, 400);
								list.value = [];
								loading.value = true;
								attachments();
								setTimeout(() => {
									changel.value = 1;
								}, 1000);
							},
							cancel: (res) => {
								console.error('您已禁止获取位置信息');
							}
						});
					});
				};
				document.head.appendChild(script); // 当脚本加载完毕后调用的函数
			}
		} else {
			console.log('不是微信客户端');
			uni.getLocation({
				type: 'gcj02',
				altitude: true,
				geocode: true,
				isHighAccuracy: true,
				success: function(res) {
					try {
						location.value = `${res.latitude},${res.longitude}`;
						latitude.value = latitude.value + 2;
						longitude.value = longitude.value + 2;
						setTimeout(() => {
							latitude.value = res.latitude;
							longitude.value = res.longitude;
						}, 400);
						list.value = [];
						loading.value = true;
						attachments();
						setTimeout(() => {
							changel.value = 1;
						}, 1000);
					} catch {}
				},
				fail: function(info) {
					//失败回调
					console.log(info, 2);
				}
			});
		}
		// #endif
	}
	// 发生变化定位
	function regionchangetab(e) {
		// #ifdef APP
		setTimeout(() => {
			let mapForm = mapObj.value.$getAppMap();
			mapForm.onstatuschanged = function(eve) {
				location.value = `${eve.center.latitude},${eve.center.longitude}`;
				if (changel.value == 1) {
					loading.value = true;
					page.value = 1;
					list.value = [];
					attachments();
				} else {
					changel.value = 1;
				}
			};
		}, 400);
		// #endif
		// #ifdef H5 || MP
		if (changel.value == 1) {
			if (e.type == 'end') {
				page.value = 1;
				jump.value = 0;
				location.value = `${e.detail.centerLocation.latitude},${e.detail.centerLocation.longitude}`;
				// latitude.value = e.detail.centerLocation.latitude;
				// longitude.value = e.detail.centerLocation.longitude;
				list.value = [];
				attachments();
				setTimeout(() => {
					jump.value = 1;
				}, 400);
			}
		}
		// #endif
	}
	// 获取附近poi
	function attachments() {
		myAmapFun.value.getPoiAround({
			location: location.value,
			page: page.value,
			success: function(data) {
				console.log(data, '--1--', location.value);
				if (data) {
					data.poisData.forEach((item, index) => {
						//成功回调
						list.value.push({
							id: item.id,
							name: item.name,
							address: item.address,
							location: item.location,
							province: item.pname,
							city: item.cityname,
							district: item.adname
						});
					});
					if (!list.value[0].pcode) {
						list.value[0].pcode = list.value[1].pcode;
						list.value[0].citycode = list.value[1].citycode;
					}
					count.value = data.count;
				}

				loading.value = false;
				uni.hideLoading();
			},
			fail: function(info) {
				//失败回调
				console.log(info, 2);
			}
		});
	}
	created(); //初始化
	onMounted(() => {});
</script>

<style lang="scss">
	.map-min-box {
		height: 100vh;
		width: 100vw;
		overflow: hidden;

		.load-animation {
			height: 100rpx;
			margin: auto;
		}

		.txt-item {
			height: 50rpx;
			line-height: 50rpx;
			font-size: 30rpx;
			color: rgba(0, 0, 0, 0.3);
			text-align: center;
		}

		.spinner {
			width: 50rpx;
			margin: auto;
			height: 50rpx;
			border: 6rpx solid rgba(0, 0, 0, 0.3);
			border-top-color: #ffffff;
			border-radius: 50%;
			animation: spin 1s linear infinite;
		}

		.top-box {
			background-color: #fff;

			.block_1 {
				position: relative;

				.Title-top {
					text-align: center;
					font-size: 34rpx;
					font-weight: 500;
					color: #000000;
				}

				.ioc-box {
					position: absolute;
					z-index: 999;
					left: 18rpx;
					top: 0rpx;
					height: 100%;
					display: flex;
				}
			}
		}

		// 可视化地图选点
		.map-min-1 {
			width: 100%;
			height: 100%;

			.map-box {
				width: 100%;
				height: 50%;

				#myMap {
					width: 100%;
					height: 100%;
					position: relative;
				}

				@keyframes bounce {
					0% {
						top: 50%;
						animation-timing-function: ease-in;
					}

					/* 动画开始时图片位于原始位置 */
					50% {
						top: 40%;
					}

					/* 动画进行到一半时，图片向上移动10像素 */
					100% {
						top: 50%;
						animation-timing-function: ease-out;
					}

					/* 动画结束时回到原始位置 */
				}

				.bounce-animation {
					animation: bounce 0.6s alternate;
					/* 动画名称、持续时间、重复次数和交替方向 */
				}

				.controls-play-img {
					height: 88rpx;
					left: 50%;
					margin-left: -40rpx;
					margin-top: -88rpx;
					top: 50%;
					width: 80rpx;
					z-index: 9999;
					position: absolute;
				}

				.position-play-img {
					bottom: 32rpx;
					height: 66rpx;
					right: 16rpx;
					width: 66rpx;
					border-radius: 50%;
					background-color: #fff;
					overflow: hidden;
					z-index: 9999;
					position: absolute;
				}
			}

			.sou-item-list {
				width: 100%;
				height: 50%;

				.u-search-box {
					padding: 28rpx 32rpx 20rpx;

					.search-min-box {
						background: #f2f2f2;
						border-radius: 14rpx;
						box-sizing: border-box;
						color: #999;
						font-size: 28rpx;
						height: 68rpx;
						line-height: 40rpx;
						padding: 14rpx 22rpx;

						image {
							display: inline-block;
							height: 32rpx;
							vertical-align: middle;
							width: 32rpx;
						}
					}
				}

				.list-item-name-box {
					height: calc(100% - 108rpx - 160rpx);
					width: calc(100% - 60rpx);
					padding: 0 20rpx 0 40rpx;

					.category-scroll-view {
						width: 100%;
						height: 100%;

						.scroll-Y {
							width: 100%;
							height: 100%;

							.scroll-view-item {
								border-bottom: 2rpx solid #e5e5e5;
								margin-right: 20rpx;
								padding: 32rpx 0 30rpx;
								position: relative;

								.poi-item-name {
									color: #333;
									font-size: 32rpx;
									line-height: 44rpx;
									overflow: hidden;
									text-overflow: ellipsis;
									white-space: nowrap;
									width: 90%;

									image {
										display: inline-block;
										height: 36rpx;
										margin-right: 8rpx;
										margin-top: -8rpx;
										vertical-align: middle;
										width: 36rpx;
									}
								}

								.poi-address {
									color: #666;
									font-size: 26rpx;
									line-height: 36rpx;
									margin-left: 44rpx;
									margin-top: 10rpx;
									overflow: hidden;
									text-overflow: ellipsis;
									white-space: nowrap;
									width: 80%;
								}

								.right-icon {
									border-bottom: 4rpx solid #427cff;
									border-left: 4rpx solid #427cff;
									height: 8rpx;
									margin-top: -2rpx;
									position: absolute;
									right: 0;
									top: 50%;
									-webkit-transform: rotate(-45deg);
									transform: rotate(-45deg);
									width: 20rpx;
								}
							}

							.loading-box {
								height: 100%;
								width: 100%;
								display: flex;
							}
						}
					}
				}

				.but-box {
					padding: 20rpx 40rpx 22rpx;
					border-top: 2rpx solid #e5e5e5;
					padding-bottom: calc(22rpx + 30rpx);

					.btn-location {
						background: #427cff;
						border-radius: 200rpx;
						color: #fff;
						font-size: 32rpx;
						height: 68rpx;
						line-height: 68rpx;
						text-align: center;
					}
				}
			}
		}

		// 可视化地图选点结束
		.map-min-2 {
			width: 100vw;
			height: 100vh;
			background-color: #fff;

			.loading-box {
				height: 100%;
				width: 100%;
				display: flex;

				.empty-box {
					padding: 200rpx 0;
					text-align: center;
					width: 100%;

					.value-txt-box-1 {
						margin: 10rpx auto;
					}

					.value-txt-box-2 {
						color: #666;
						font-size: 26rpx;
						margin: 0 auto;
					}
				}
			}

			.map-min-2-search-box {
				height: 84rpx;
				background: #efefef;
				border-radius: 7px;
				height: 42px;
				margin: 0 14px 10px;
				display: -webkit-flex;
				display: flex;
				-webkit-justify-content: space-around;
				justify-content: space-around;

				input {
					cursor: auto;
					display: block;
					font-family: UICTFontTextStyleBody;
					height: 1.4rem;
					min-height: 1.4rem;
					overflow: hidden;
					text-overflow: clip;
					white-space: nowrap;
				}

				.locationpicker-search-content-ipt {
					height: 42px;
					padding-left: 10px;
					width: 70%;
				}

				.locationpicker-search-clear {
					height: 43px;
					text-align: center;
					width: 33px;

					.locationpicker-search-clear-ipt {
						height: 16px;
						margin-top: 13px;
						width: 16px;
					}
				}

				.locationpicker-search--content-btn-line {
					background: #c7c7c7;
					height: 16px;
					margin: 13px -10px 0 0;
					width: 1px;
				}

				.locationpicker-search-content-btn {
					color: #427cff;
					height: 42px;
					line-height: 42px;
					padding: 0 10px 0 20px;
				}
			}

			.scroll-Y {
				height: calc(100vh - 87px - 150rpx);
				width: 100vw;

				.scroll-view-item {
					border-bottom: 2rpx solid #e5e5e5;
					padding: 30rpx 40rpx 30rpx 40rpx;
					position: relative;

					.poi-item-name {
						color: #333;
						font-size: 32rpx;
						line-height: 44rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						width: 90%;

						image {
							display: inline-block;
							height: 36rpx;
							margin-right: 8rpx;
							margin-top: -8rpx;
							vertical-align: middle;
							width: 36rpx;
						}
					}

					.poi-address {
						color: #666;
						font-size: 26rpx;
						line-height: 36rpx;
						margin-left: 44rpx;
						margin-top: 10rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						width: 80%;
					}
				}

				// 历史
				.history-item-box {
					width: 100vw;
					height: 100%;

					.empty-box {
						padding: 200rpx 0;
						text-align: center;
						width: 100%;

						.value-txt-box-1 {
							margin: 10rpx auto;
						}

						.value-txt-box-2 {
							color: #666;
							font-size: 26rpx;
							margin: 0 auto;
						}
					}

					.item-but-box {
						height: 160rpx;
						padding-top: 20rpx;

						.locationpicker-clear-history-btn {
							border: 2rpx solid #c7c7c7;
							border-radius: 32rpx;
							color: #666;
							font-size: 26rpx;
							height: 60rpx;
							line-height: 60rpx;
							margin: 0 auto;
							text-align: center;
							width: 268rpx;
						}
					}

					.scroll-view-item {
						border-bottom: 2rpx solid #e5e5e5;
						padding: 30rpx 40rpx 30rpx 40rpx;
						position: relative;

						.poi-item-name {
							color: #333;
							font-size: 32rpx;
							line-height: 44rpx;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							width: 90%;

							image {
								display: inline-block;
								height: 36rpx;
								margin-right: 8rpx;
								margin-top: -8rpx;
								vertical-align: middle;
								width: 36rpx;
							}
						}

						.poi-address {
							color: #666;
							font-size: 26rpx;
							line-height: 36rpx;
							margin-left: 44rpx;
							margin-top: 10rpx;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							width: 80%;
						}
					}
				}
			}
		}
	}
</style>