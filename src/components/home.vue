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
          <project-list :id="item.id" :picture="item.img" :title="item.title" :complete="item.complete" :time="item.release_time"></project-list>
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
      programs: [{
          id: 1,
          img: 'http://www.mathwallet.org/images/mathlabs/mathlabs_webpager.jpg',
          title: 'I need your help to expand the reproduction of secret chili sauce',
          complete: '12000',
          release_time: '2018-12-30'
        },
        {
          id: 2,
          img: 'http://www.mathwallet.org/images/mathlabs/mathlabs_webpager.jpg',
          title: 'A Plastic-free, Fuss-free lunch box',
          complete: '12000',
          release_time: '2018-12-30'
        },
        {
          id: 3,
          img: 'http://www.mathwallet.org/images/mathlabs/mathlabs_webpager.jpg',
          title: 'I need your help to expand the reproduction of secret chili sauce',
          complete: '12000',
          release_time: '2018-12-30'
        }
      ]
    }
  },
  mounted() {

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
