###使用

```
1.<template>

<vue3-map @commitCheck="commitCheck" :mapKey='mapKey'  :Radius='Radius' :showResetting='showResetting' :listIco='listIco' :orientationIco='orientationIco' :resettingIco='resettingIco' :configData='configData'></vue3-map>

2.<script>

export default {
	data() {
		return {
				mapKey:'737965f92c797efb5447a4d658328513',
				address: '',
				latitude: '',
				longitude: '',
				listIco:'/uni_modules/vue3-map/static/item-inx.png',
				orientationIco:'/uni_modules/vue3-map/static/map-inx.png',
				resettingIco:"/uni_modules/vue3-map/static/position.png",
				showResetting:true,
				Radius:'',
			// 微信公众号jsSdk配置
			configData:{
				debug:false,// 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				appId:'',// 必填，公众号的唯一标识
				timestamp: '', // 必填，生成签名的时间戳
				nonceStr: '', // 必填，生成签名的随机串
				signature: '', // 必填，签名
			}
		};
	},
	methods: {
		commitCheck(e) {
			console.log(e, 565);
			uni.$emit('commitCheck', e);
			uni.navigateBack({
				delta: 1
			});
		}
	}
};

```
### 属性说明

| 属性名           | 类型     | 默认值       | 说明              |
|-----------------|----------|-------------|-----------------------|
| mapKey       	  | String   | " "         | 高德Web服务Key必须传 注意小程序、h5、app都是统一，这个参数是高德【web服务】的key            |
| resettingIco    | String   |默认组件图标   | 定位复位图标     |
| orientationIco  | String   |默认组件图标   | 定位图标        |
| listIco         | String   |默认组件图标   | 列表图标  |
| Radius          | String   |''           | 搜索范围默认空字符串，不限制搜索范围，如果要设置范围【写城市全面列如：东莞市】   |
| showResetting   | Boolean  | true        | 复位定位功能显示      |
| configData  	  | Object  | {}           | 微信公众号jsSdk配置{debug:false,// 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。appId:'',// 必填，公众号的唯一标识timestamp: '', // 必填，生成签名的时间戳nonceStr: '', // 必填，生成签名的随机串signature: '', // 必填，签名}      |

注意：
1. mapKey的高德Web服务Key是我的个人注册测试使用的，使用次数有限，大家换成自己的

###事件说明

| 事件名        | 说明                  | 返回值 |
|---------------|----------------------|--------|
| @commitCheck  | 选中地址的确认地址回调 | data，详情见下方说明 |

#### @commitCheck 返回值 data 说明 

| 值      | 类型    | 说明  |
| ------- | ------ | ----- |
| id      | String | 地址id |
| name    | String | 地点名称|
| address | String | 地点详细地址|
| province| String | 省   |
| city    | String | 市 |
| district| String | 区 |
| location| String | 经纬度坐标 |
| pcode   | String | 省编码 |
| citycode| String | 城市编码 |
| adcode  | String | 区编码 |

###注意：微信小程序使用
```
1.运行微信小程序使用--在【manifest.json】配置自己的微信小程序appid

2.在manifest.json中声明定位
			 /* 小程序特有相关 */
		"mp-weixin" : {
			"appid" : "",
			"setting" : {
				"urlCheck" : false,
				"es6" : true,
				"postcss" : true,
				"minified" : true
			},
			"usingComponents" : true,
			"permission" : {
				"scope.userLocation" : {
					"desc" : "定位"
				}
			},
			"requiredPrivateInfos" : [
				"getLocation", //使用uni.getlocation才需声明
				"startLocationUpdate", //必要
				"onLocationChange" //必要
			]
		},
3.插件用的mapKey参数是--高德的【web服务】的key  app、h5、小程序统一用一个
```

###注意：h5使用--格外要引入高德地图模块
```
1.h5使用
		必须去高德申请Web端的ksy和密钥
2.然后再【manifest.json】配置定位地图
		1.选择高德
		2.把申请的web的key配置在key那里
		3.把申请的web的秘钥配置在securityJsCode那里
		4.运行
3.注意：去[高德开发申请网站](https://console.amap.com/dev/key/app)区申请
		可以使用我的测试key配置体验--注意是测试有次数限制，尽量用自己的
		key：'6fd9d6c8b1015a6d9f9454d5df596a0f'
		code:'dc3a5f4976a6b06d3cf3ab280f672a17'
 4.插件用的mapKey参数是--高德的【web服务】的key  app、h5、小程序统一用一个
 5.很多人会遇到手机浏览器不返回定位问题，拒绝返回定位的错误，这是因为你的域名协议是http，现在必须是https才会返回位置浏览器。
```

 ###注意：h5微信公众使用
```
1.h5微信公众使用
		必须去高德申请Web端的ksy和密钥
2.然后再【manifest.json】配置定位地图
		1.选择高德
		2.把申请的web的key配置在key那里
		3.把申请的web的秘钥配置在securityJsCode那里
		4.运行
3.注意：去[高德开发申请网站](https://console.amap.com/dev/key/app)区申请
		可以使用我的测试key配置体验--注意是测试有次数限制，尽量用自己的
		key：'6fd9d6c8b1015a6d9f9454d5df596a0f'
		code:'dc3a5f4976a6b06d3cf3ab280f672a17'
 4.插件用的mapKey参数是--高德的【web服务】的key  app、h5、小程序统一用一个
 5.在公众号后台jssdk授权域名配置好，然后把授权微信jsSdk的参数传给组件，怎么获取jsSdk配置参数[参考官方文档](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html)
 6.很多人会遇到手机浏览器不返回定位问题，拒绝返回定位的错误，这是因为你的域名协议是http，现在必须是https才会返回位置浏览器,公众号jsSDK配置参数不能为空，demo是为空自行配置自己的参数。
```

###注意：app使用--格外要引入高德地图模块
```
 1.app使用必须去高德申请安卓和ios的key--你开发安卓申请安卓、开发ios申请ios
 
2.然后再【manifest.json】app模块配置定位和地图引入模块配置对应参数
	1.定位配置--配置系统定位、高德定位，然后配置【高德用户名】【appkey】
	2.地图配置--配置高德，然后配置【高德用户名】【appkey】
		
 3.注意：去[高德开发申请网站](https://console.amap.com/dev/key/app)区申请
		
 4.插件用的mapKey参数是--高德的【web服务】的key  app、h5、小程序统一用一个
```

### 其他版本地图选点如下
	
-	1.使用vue2的uni_modules地图选点插件请移步[高德地图--地图选点uni_modules插件](https://ext.dcloud.net.cn/plugin?id=17182)下载

-	2.使用vue2的components地图选点插件请移步[高德地图--地图选点插件](https://ext.dcloud.net.cn/plugin?id=16882)下载

###有不懂可以
```
有任何疑问可以  加qq1848961270  备注插件名称
```
