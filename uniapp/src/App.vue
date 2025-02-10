<script>
import {userLoginService} from "@/api/login";

export default {
  onLaunch: function () {
    console.log('App Launch')
    uni.login({
      provider: 'weixin',
      success: async (loginRes) => {
        if (loginRes.errMsg === 'login:ok') {
          console.log('-=-=-=-=loginRes-=-=-=', loginRes);
        }
        const params = {
          code: loginRes.code
        };
        try {
          await userLoginService(params);
        } catch (error) {
          console.error('用户登录失败:', error);
        }
      },
      fail: function (err) {
        console.log('login fail:', err);
        uni.navigateTo({
          url: '/pages/transition/agreement'
        })
      }
    });
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
