<template>
  <div class="dashboard-container home">
    <!-- 营业数据 -->
    <Overview :overviewData="overviewData" />
    <!-- end -->
    <!-- 订单管理 -->
    <Orderview :orderviewData="orderviewData" />
    <!-- end -->
    <!-- 订单信息 -->
    <OrderList
      :order-statics="orderStatics"
      @getOrderListBy3Status="getOrderListBy3Status"
    />
    <!-- end -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import {
  getBusinessData,
  getDataOverView, //营业数据
  getOrderData, //订单管理今日订单
} from '@/api/index'
import { getOrderListBy } from '@/api/order'
import Overview from './components/overview.vue'
import OrderList from './components/orderList.vue'
@Component({
  name: 'Dashboard',
  components: {
    Overview,
    OrderList,
  },
})
export default class extends Vue {
  private todayData = {} as any
  private overviewData = {}
  private orderviewData = {} as any
  private flag = 2
  private tateData = []
  private orderListData = []
  private counts = 0
  private page: number = 1
  private pageSize: number = 10
  private status = 2
  private orderStatics = {} as any
  created() {
    this.init()
  }
  init() {
    this.$nextTick(() => {
      this.getBusinessData()
      this.getOrderStatisticsData()
    })
  }
  // 获取营业数据
  async getBusinessData() {
    const data = await getBusinessData()
    this.overviewData = data.data.data
  }
  // 获取今日订单
  async getOrderStatisticsData() {
    const data = await getOrderData()
    this.orderviewData = data.data.data
  }
  //获取待处理，待派送，派送中数量
  getOrderListBy3Status() {
    getOrderListBy({})
      .then((res) => {
        if (res.data.code === 1) {
          this.orderStatics = res.data.data
        } else {
          this.$message.error(res.data.msg)
        }
      })
      .catch((err) => {
        this.$message.error('请求出错了：' + err.message)
      })
  }
}
</script>

<style lang="scss">
</style>
