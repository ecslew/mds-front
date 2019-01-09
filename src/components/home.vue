<template>
<div class="home">
  <div class="mds-top">
    <div class="container">
      <div class="title">{{$t('title')}}</div>
      <div class="slogan">{{$t('slogan')}}</div>
      <a href="javascript:;" class="start"  @click="createProject">{{$t('start_project')}}</a>
    </div>
  </div>
  <!-- All mutual aid programs -->
  <div class="aid-programs">
    <div class="container">
      <div class="mds-title">{{$t('programs_title')}}</div>
      <ul class="row">
        <li class="col-sm-4 col-xs-12" v-for="item in programs" :key="item.id">
          <project-list :id="item.eosID" :picture="item.img" :title="item.title" :targetAmount="item.targetAmount" :amount="item.reciveAmount" :time="item.releaseTime" :targetToken="item.targetToken"></project-list>
        </li>
      </ul>
      <router-link to="/project" class="see-more">{{$t('see_more')}}</router-link>
    </div>
  </div>
  <roadmap></roadmap>
  <contact></contact>
  <foot></foot>
  <loading v-if="!isLoaded"></loading>
  <mds-toast :toastInfo='toastInfo' @toast="infoByToast"></mds-toast>
</div>
</template>

<script>
import loading from '@/base/loading'
import projectList from '@/base/project-list'
import roadmap from '@/base/roadmap'
import contact from '@/base/contact'
import foot from '@/base/foot'
import user from 'static/js/user'
import mdsToast from '@/base/toast'
export default {
  data() {
    return {
      url: '/apiCrowdfunding/homePage?page=1',
      transferUrl: '/apiEos/getCrowdfundingTransfer?account=',
      programs: [],
      isLoaded: false,
      toastInfo: ''
    }
  },
  mounted() {
    this.getPrograms()
  },
  methods: {
    infoByToast: function (val) {
      this.toastInfo = val
    },
    getPrograms() {
      this.$http.get(this.globalData.domain + this.url).then((res) => {
        if (res.data.success) {
          this.isLoaded = true
          const pageData = res.data.data.pageData.slice(0, 3)
          this.programs = pageData
        }
      }, (err) => {
        console.log('err' + err);
      })
    },
    createProject() {
      user.getAccount().then(res => {
        $(".currentAccount").html(res.name)
        $('#login').modal('hide')
        $(".login").hide()
        $(".personal").show()
        this.$router.push('/projectCreate')
      }, () => {
        // 未安装 scatter 或 登录失败
        this.toastInfo = this.$t('connect_scatter')
      })
    }
  },
  components: {
    roadmap,
    contact,
    foot,
    projectList,
    loading,
    mdsToast
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>

</style>
