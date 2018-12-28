<template>
<div class='project-backed'>
  <div class="container">
    <div class="row">
      <div class="col-sm-10 col-sm-offset-1">
        <h4 class="title">{{$t('created_projects')}}</h4>
        <div class="subtitle">{{$t('created_projects_subtitle')}}</div>
        <div class="started">{{$t("started")}}</div>
        <div class="list" v-for="item in programs" :key="item.id">
          <myproject-list :id="item.id" :isFail="item.isFail" :picture="item.img" :isApproved="item.isApproved" :title="item.title" :complete="item.complete" :time="item.release_time"></myproject-list>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import myprojectList from '@/base/myproject-list'
export default {
  data() {
    return {
      programs: [{
          id: 1,
          img: 'http://www.mathwallet.org/images/mathlabs/mathlabs_webpager.jpg',
          title: 'I need your help to expand the reproduction of secret chili sauce',
          isApproved: true,
          isFail: false,
          release_time: '2018-12-30'
        },
        {
          id: 2,
          img: 'http://www.mathwallet.org/images/mathlabs/mathlabs_webpager.jpg',
          title: 'A Plastic-free, Fuss-free lunch box',
          isApproved: false,
          isFail: false,
          release_time: '2018-12-30'
        },
        {
          id: 3,
          img: 'http://www.mathwallet.org/images/mathlabs/mathlabs_webpager.jpg',
          title: 'I need your help to expand the reproduction of secret chili sauce',
          isApproved: true,
          isFail: false,
          release_time: '2018-12-30'
        },
        {
          id: 4,
          img: 'http://www.mathwallet.org/images/mathlabs/mathlabs_webpager.jpg',
          title: 'A Plastic-free, Fuss-free lunch box',
          isApproved: false,
          isFail: true,
          release_time: '2018-12-30'
        },
        {
          id: 5,
          img: 'http://www.mathwallet.org/images/mathlabs/mathlabs_webpager.jpg',
          title: 'I need your help to expand the reproduction of secret chili sauce',
          isApproved: false,
          isFail: true,
          release_time: '2018-12-30'
        },
        {
          id: 6,
          img: 'http://www.mathwallet.org/images/mathlabs/mathlabs_webpager.jpg',
          title: 'A Plastic-free, Fuss-free lunch box',
          isApproved: false,
          isFail: true,
          release_time: '2018-12-30'
        },
        {
          id: 7,
          img: 'http://www.mathwallet.org/images/mathlabs/mathlabs_webpager.jpg',
          title: 'I need your help to expand the reproduction of secret chili sauce',
          isApproved: false,
          isFail: true,
          release_time: '2018-12-30'
        },
        {
          id: 8,
          img: 'http://www.mathwallet.org/images/mathlabs/mathlabs_webpager.jpg',
          title: 'A Plastic-free, Fuss-free lunch box',
          isApproved: false,
          isFail: true,
          release_time: '2018-12-30'
        },
        {
          id: 9,
          img: 'http://www.mathwallet.org/images/mathlabs/mathlabs_webpager.jpg',
          title: 'I need your help to expand the reproduction of secret chili sauce',
          isApproved: false,
          isFail: true,
          release_time: '2018-12-30'
        }
      ]
    }
  },
  mounted() {

  },
  components: {
    myprojectList
  }
}
</script>

<style scoped>
.project-backed {
  padding: 32px 0;
}

.project-backed .container {
  background: #fff;
  padding: 40px 15px 80px;
  border-radius: 4px;
}

.started {
  font-size: 16px;
  font-family: Gotham-Medium;
  padding: 64px 0 8px;
  border-bottom: 1px solid #e7ecf0;
  margin-bottom: 36px;
}

.list {
  padding: 12px 0;
}

@media (max-width: 767px) {
  .project-backed {
    padding: 16px;
  }

  .started {
    padding-top: 32px;
    margin: 8px;
  }

  .list {
    padding: 8px 0;
  }

}
</style>
