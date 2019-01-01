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
          <project-list :id="item.eosID" :picture="item.img" :title="item.title" :targetAmount="item.targetAmount" :amount="item.amount" :time="item.releaseTime"></project-list>
        </li>
      </ul>
      <router-link to="/project" class="see-more">{{$t('see_more')}}</router-link>
    </div>
  </div>
  <roadmap></roadmap>
  <contact></contact>
  <foot></foot>
</div>
</template>

<script>
import projectList from '@/base/project-list'
import roadmap from '@/base/roadmap'
import contact from '@/base/contact'
import foot from '@/base/foot'
export default {
  data() {
    return {
      url: '/apiCrowdfunding/homePage?page=1',
      transferUrl: '/apiEos/getCrowdfundingTransfer?account=',
      programs: []
    }
  },
  mounted() {
    this.getPrograms()
  },
  methods: {
    getPrograms() {
      this.$http.get(this.globalData.domain + this.url).then((res) => {
        if (res.data.success) {
          const pageData = res.data.data.pageData
          $.each(pageData, (index, project) => {
            project.amount = 0
            this.getTranster(project)
          })
          this.programs = pageData
        }
      }, (err) => {
        console.log('err' + err);
      })
    },
    getTranster(project) {
      this.$http.get(this.globalData.domain + this.transferUrl + project.creator).then((res) => {
        if (res.data.success) {
          $.each(res.data.data.transfer, (index, event) => {
            project.amount += parseFloat(event.data.quantity)
          });
        }
      }, (err) => {
        console.log('err' + err);
      })
    }
  },
  components: {
    roadmap,
    contact,
    foot,
    projectList
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>

</style>
