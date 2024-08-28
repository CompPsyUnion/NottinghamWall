<template>
  <view class="container">
    <map
        :latitude="latitude"
        :longitude="longitude"
        :scale="scale"
        class="map"
        show-location="true"
        @regionchange="onRegionChange">

      <view class="marker">
        <text class="marker-label">{{ latitude.toFixed(5) }}, {{ longitude.toFixed(5) }}</text>
        <uni-icons type="location-filled" :size="30" color="#007aff" />
      </view>

      <button class="recenter-button" @click="recenterMap">
        <uni-icons type="location-filled" :size="30" color="#fff" />
      </button>
    </map>
    <view class="card">
      <input type="text" class="input" placeholder="输入框1" v-model="input1" />
      <input type="text" class="input" placeholder="输入框2" v-model="input2" />
      <button class="submit-button" @click="handleSubmit">提交</button>
    </view>
    <uni-grid :column="3" class="grid">
      <uni-grid-item class="grid-item">
        <view class="grid-content">
          <uni-icons type="image" :size="30" color="#777" />
          <text class="text">我的订单</text>
        </view>
      </uni-grid-item>
      <uni-grid-item class="grid-item">
        <view class="grid-content">
          <uni-icons type="image" :size="30" color="#777" />
          <text class="text">我要接单</text>
        </view>
      </uni-grid-item>
      <uni-grid-item class="grid-item">
        <view class="grid-content">
          <uni-icons type="image" :size="30" color="#777" />
          <text class="text">提现中心</text>
        </view>
      </uni-grid-item>
    </uni-grid>
  </view>
</template>


<script>
export default {
  data() {
    return {
      latitude: 39.91667,
      longitude: 116.41667,
      scale: 14,
      userLocation: { // 用于存储用户的当前位置
        latitude: 39.91667,
        longitude: 116.41667,
      },
    };
  },
  methods: {
    getLocation() {
      uni.authorize({
        scope: 'scope.userLocation',
        success: () => {
          uni.getLocation({
            type: 'gcj02',
            success: (res) => {
              this.latitude = res.latitude;
              this.longitude = res.longitude;
              this.userLocation = {latitude: res.latitude, longitude: res.longitude}; // 记录当前位置
              uni.setStorageSync('latitude', res.latitude);
              uni.setStorageSync('longitude', res.longitude);
              console.log(`Latitude: ${res.latitude}, Longitude: ${res.longitude}`);
            },
            fail: (err) => {
              uni.showToast({
                title: '获取定位失败',
                icon: 'none'
              });
            }
          });
        },
        fail: () => {
          uni.showToast({
            title: '授权失败',
            icon: 'none'
          });
        }
      });
    },
    onRegionChange(event) {
      if (event.type === 'end') {
        // 当地图移动结束后记录当前位置
        this.latitude = event.detail.centerLocation.latitude;
        this.longitude = event.detail.centerLocation.longitude;
      }
    },
    recenterMap() {
      // 重新定位到用户当前位置
      this.latitude = this.userLocation.latitude;
      this.longitude = this.userLocation.longitude;
    },
    handleSubmit() {
      console.log('Input 1:', this.input1);
      console.log('Input 2:', this.input2);
    }
  },
  onLoad() {
    this.getLocation();
  }
  // TODO grid跳转
  // TODO 地址簿选点
};
</script>

<style lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  padding-bottom: 20px;
  background-color: #fff;
}

.map {
  width: 90%;
  height: 45%;
  border-radius: 15px;
  overflow: hidden;
  border: 2px solid #ddd;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  position: relative;
}

.marker {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -100%);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.marker-label {
  margin-bottom: 5px;
  font-size: 12px;
  color: #333;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 2px 6px;
  border-radius: 3px;
}

.card {
  width: 85%;
  background-color: #f9f9f9;
  border-radius: 15px;
  padding: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Center children vertically */
}

.card-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
}

.card-content {
  font-size: 14px;
  color: #555;
  margin-bottom: 5px;
}

.input {
  width: 90%;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ddd;
  border-radius: 15px;
}

.submit-button {
  width: 90%;
  height: 40px;
  background-color: #007aff;
  color: #fff;
  border: none;
  border-radius: 20px;
  margin-top: 10px;
  cursor: pointer;
}

.grid {
  width: 90%;
  margin-top: 20px;
}

.grid-item {
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.grid-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px 0;
}

.text {
  margin-top: 10px;
  font-size: 14px;
  color: #333;
}

.recenter-button {
  position: absolute;
  bottom: 15px;
  right: 15px;
  background-color: #007aff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
