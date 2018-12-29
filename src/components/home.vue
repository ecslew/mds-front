<template>
<div class="home">
  <div class="mds-top">
    <div class="container">
      <div class="title">{{$t('title')}}</div>
      <div class="slogan">{{$t('slogan')}}</div>
      <router-link to="/projectCreate" class="start">{{$t('start_project')}}</router-link>
    </div>
  </div>
  <!-- All mutual aid programs -->
  <div class="aid-programs">
    <div class="container">
      <div class="mds-title">{{$t('programs_title')}}</div>
      <ul class="row">
        <li class="col-sm-4 col-xs-12" v-for="item in programs" :key="item.id">
          <project-list :id="item.eosID" :picture="item.img" :title="item.title" :targetAmount="item.targetAmount" :time="item.releaseTime"></project-list>
        </li>
      </ul>
      <router-link to="/project" class="see-more">{{$t('see_more')}}</router-link>
    </div>
  </div>
  <!-- 什么是 MediShares -->
  <div class="mds-des">
    <div class="container">
      <div class="mds-title">{{$t('mediShares_des')}}</div>
      <ul class="row">
        <li class="col-sm-4 col-xs-12"><span class="mds-des-dot">•</span>
          <div>{{$t('mediShares_des1')}}</div>
        </li>
        <li class="col-sm-4 col-xs-12"><span class="mds-des-dot">•</span>
          <div>{{$t('mediShares_des2')}}</div>
        </li>
        <li class="col-sm-4 col-xs-12"><span class="mds-des-dot">•</span>
          <div>{{$t('mediShares_des3')}}</div>
        </li>
      </ul>
    </div>
  </div>
  <!-- MediShares 的优势 -->
  <div class="mds-superiority">
    <div class="container">
      <div class="mds-title">{{$t('mediShares_adv')}}</div>
      <ul class="row">
        <li class="col-xs-12 col-sm-4"><span class="mds-sup-icon"><img src="static/img/icon/advantage_icon_1@2x.png"></span>
          <div>{{$t('mediShares_adv1')}}</div>
        </li>
        <li class="col-xs-12 col-sm-4"><span class="mds-sup-icon"><img src="static/img/icon/advantage_icon_2@2x.png"></span>
          <div>{{$t('mediShares_adv2')}}</div>
        </li>
        <li class="col-xs-12 col-sm-4"><span class="mds-sup-icon"><img src="static/img/icon/advantage_icon_3@2x.png"></span>
          <div>{{$t('mediShares_adv3')}}</div>
        </li>
        <li class="col-xs-12 col-sm-4"><span class="mds-sup-icon"><img src="static/img/icon/advantage_icon_4@2x.png"></span>
          <div>{{$t('mediShares_adv4')}}</div>
        </li>
        <li class="col-xs-12 col-sm-4"><span class="mds-sup-icon"><img src="static/img/icon/advantage_icon_5@2x.png"></span>
          <div>{{$t('mediShares_adv5')}}</div>
        </li>
      </ul>
    </div>
  </div>
  <foot></foot>
</div>
</template>

<script>
import projectList from '@/base/project-list'
import foot from '@/base/foot'
export default {
  data() {
    return {
      url: '/apiCrowdfunding/homePage?page=1',
      programs: [{
          "title": "这是一个众筹项目",
          "crowdfundingNo": "ABC123455", // 项目编号
          "eosID": "1", // 链上ID
          "creator": "eosjiazechen", // 发起者
          "targetToken": "SNC", // 目标筹集 Token
          "targetAmount": "10000", // 目标筹集个数
          "releaseTime": "2018-12-26 13:36:49", // 项目发起时间
          "img": "http://www.mathwallet.org/images/mathlabs/mathlabs_webpager.jpg" // 图片
        },
        {
          "title": "这是一个众筹项目",
          "crowdfundingNo": "ABC123455", // 项目编号
          "eosID": "2", // 链上ID
          "creator": "eosjiazechen", // 发起者
          "targetToken": "SNC", // 目标筹集 Token
          "targetAmount": "10000", // 目标筹集个数
          "releaseTime": "2018-12-26 13:36:49", // 项目发起时间
          "img": "http://www.mathwallet.org/images/mathlabs/mathlabs_webpager.jpg" // 图片
        },
        {
          "title": "这是一个众筹项目",
          "crowdfundingNo": "ABC123455", // 项目编号
          "eosID": "3", // 链上ID
          "creator": "eosjiazechen", // 发起者
          "targetToken": "SNC", // 目标筹集 Token
          "targetAmount": "10000", // 目标筹集个数
          "releaseTime": "2018-12-26 13:36:49", // 项目发起时间
          "img": "http://www.mathwallet.org/images/mathlabs/mathlabs_webpager.jpg" // 图片
        }
      ]
    }
  },
  mounted() {
    this.$http.get(this.globalData.domain + this.url).then((res) => {
      if (res.data.success) {
        this.programs = res.data.data.pageData
      }
    }, (err) => {
      console.log('err' + err);
    })
  },
  components: {
    foot,
    projectList
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>

</style>
