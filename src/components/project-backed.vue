<template>
<div class='project-backed project-container'>
  <div class="container">
    <div class="row">
      <div class="col-sm-10 col-sm-offset-1">
        <h4 class="title">{{$t('support_projects')}}</h4>
        <div class="subtitle">{{$t('support_projects_subtitle')}}</div>
        <div class="started">{{$t("started")}}</div>
        <template v-if="programs.length>0">
          <div class="list" v-for="item in programs" :key="item.id">
            <myproject-list :isBacked="isBacked" :id="item.eosID" :title="item.title" :time="item.releaseTime"></myproject-list>
          </div>
        </template>
        <blank-page v-else></blank-page>
      </div>
    </div>
  </div>
  <loading v-if="!isLoaded"></loading>
  <mds-toast :toastInfo='toastInfo' :isWarn='isWarn' @toast="infoByToast"></mds-toast>
</div>
</template>

<script>
import loading from '@/base/loading'
import blankPage from '@/base/blank-page'
import myprojectList from '@/base/myproject-list'
import user from 'static/js/user'
import mdsToast from '@/base/toast'
export default {
  data() {
    return {
      isBacked: true,
      currentAccount: '',
      programs: [],
      isLoaded: false,
      toastInfo: '',
      isWarn: false
    }
  },
  mounted() {
    this.getSupported();
  },
  methods: {
    infoByToast: function (val) {
      this.toastInfo = val
    },
    getSupported() {
      let _this = this;
      user.getAccount().then((currentAccount) => {
        _this.currentAccount = currentAccount.name;
        $(".login").hide()
        $(".personal").show()
        $(".currentAccount").html(currentAccount.name)
        // 从交易记录获取支持过的项目
        $.get(_this.globalData.domain + '/apiCrowdfunding/supported', {
          account: _this.currentAccount
        }, function (res) {
          if (res.success) {
            _this.isLoaded = true
            $.each(res.data, function (index, event) {
              _this.programs.push(event);
              // 通过编号查信息

            })
          }
        }, 'json')
      }, () => {
        // 未安装 scatter 或 登录失败
        this.isWarn = true
        this.toastInfo = this.$t('connect_scatter')
      })
    }
  },
  components: {
    myprojectList,
    loading,
    blankPage,
    mdsToast
  }
}
</script>

<style scoped>
</style>
