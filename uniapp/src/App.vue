<script>
import { useTokenStore } from '@/store/token';
import { userLoginService } from '@/api/login';
export default {
  onLaunch: function () {
    console.log('App Launch')
    const tokenStore = useTokenStore();
    if (!tokenStore.token) {
      uni.navigateTo({
        url: '/pages/transition/Login'
      });
    }
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
}
</script>

<style>
/*每个页面公共css */
</style>
