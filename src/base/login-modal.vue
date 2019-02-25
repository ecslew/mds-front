<template>
<div>
  <div class="modal text-center" id="login">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">{{$t("log_mds")}}</h4>
        <div class="start" @click="loginByScatter">{{$t("log_scatter")}}</div>
        <div class="loginInfo">{{$t("log_scatter_tip")}}</div>
        <p class="no-scatter">{{$t("log_no_scatter")}} <a href="https://get-scatter.com/" target="_blank">{{$t("download_here")}}</a></p>
      </div>
    </div>
  </div>
  <mds-toast :toastInfo='toastInfo' :isWarn='isWarn' @toast="infoByToast"></mds-toast>
</div>
</template>

<script>
import mdsToast from '@/base/toast'
import user from 'static/js/user'
export default {
  data() {
    return {
      toastInfo: '',
      isWarn: true
    }
  },
  methods: {
    infoByToast: function (val) {
      this.toastInfo = val
    },
    loginByScatter() {
      user.getAccount().then((res) => {
        if (this.$route.path == '/myProject' || this.$route.path == '/projectBacked') {
          this.$router.go(0)
        }
        $(".currentAccount").html(res.name)
        $('#login').modal('hide')
        $(".login").hide()
        $(".personal").show()
      }, () => {
        // 未安装 scatter 或 登录失败
        this.toastInfo = this.$t('connect_scatter')
      });
    }
  },
  components: {
    mdsToast
  }
}
</script>

<style scoped>
.modal-title {
  margin-top: 24px;
}

.loginInfo {
  padding: 96px 24px 32px;
  font-family: Gotham-Medium;
  font-weight: 500;
  font-size: 16px;
  line-height: 1.5;
  color: var(--blueGrey);
}

.no-scatter {
  padding: 32px 0 8px;
  font-size: 16px;
  font-family: Gotham-Medium;
  font-weight: 500;
  color: var(--blueGrey);
  border-top: 1px solid var(--bgColor);
}

.no-scatter a {
  color: var(--blueColor) !important;
}

@media(max-width: 768px) {
  .modal-title {
    margin: 0;
  }

  .loginInfo {
    padding: 24px 16px;
  }

  .no-scatter {
    padding: 24px 0 0;
  }
}
</style>
