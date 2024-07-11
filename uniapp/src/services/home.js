import { http } from '@/utils/http'

// 获取首页轮播图数据
export const getHomeBannerAPI = (distributionSite = 1) => {
  return http({
    method: 'GET',
    url: '/home/banner',
    data: {
      distributionSite,
    },
  })
}
