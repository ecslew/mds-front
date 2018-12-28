<template>
<div class='project'>
  <div class="container">
    <h4 class="title text-center">{{$t('all_projects')}}</h4>
    <div class="subtitle text-center">{{$t('projects_list')}}</div>
    <ul class="row project-list">
      <li class="col-sm-4 col-xs-12" v-for="item in programs" :key="item.id">
        <project-list :id="item.id" :picture="item.img" :title="item.title" :complete="item.complete" :time="item.release_time"></project-list>
      </li>
    </ul>
    <div class="load-more" v-show="!isAll"><span>{{$t("load_more")}}</span></div>
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
      isAll: true,
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
        },
        {
          id: 4,
          img: 'http://www.mathwallet.org/images/mathlabs/mathlabs_webpager.jpg',
          title: 'A Plastic-free, Fuss-free lunch box',
          complete: '12000',
          release_time: '2018-12-30'
        },
        {
          id: 5,
          img: 'http://www.mathwallet.org/images/mathlabs/mathlabs_webpager.jpg',
          title: 'I need your help to expand the reproduction of secret chili sauce',
          complete: '12000',
          release_time: '2018-12-30'
        },
        {
          id: 6,
          img: 'http://www.mathwallet.org/images/mathlabs/mathlabs_webpager.jpg',
          title: 'A Plastic-free, Fuss-free lunch box',
          complete: '12000',
          release_time: '2018-12-30'
        },
        {
          id: 7,
          img: 'http://www.mathwallet.org/images/mathlabs/mathlabs_webpager.jpg',
          title: 'I need your help to expand the reproduction of secret chili sauce',
          complete: '12000',
          release_time: '2018-12-30'
        },
        {
          id: 8,
          img: 'http://www.mathwallet.org/images/mathlabs/mathlabs_webpager.jpg',
          title: 'A Plastic-free, Fuss-free lunch box',
          complete: '12000',
          release_time: '2018-12-30'
        },
        {
          id: 9,
          img: 'http://www.mathwallet.org/images/mathlabs/mathlabs_webpager.jpg',
          title: 'I need your help to expand the reproduction of secret chili sauce',
          complete: '12000',
          release_time: '2018-12-30'
        }
      ]
    }
  },
  mounted() {
    console.log(global.devdomain)
  },
  components: {
    foot,
    projectList
  }
}
</script>

<style scoped>
.project {
  padding-top: 80px;
}

.project-list {
  padding: 64px 0 32px;
}

.project-list li {
  margin-bottom: 32px;
}

.load-more {
  text-align: center;
  padding-bottom: 96px;
}

.load-more span {
  display: inline-block;
  padding: 16px 32px;
  border-radius: 4px;
  background: #fff;
  font-family: Gotham-Medium;
  font-size: 16px;
  line-height: 1.25;
}

@media (max-width: 767px) {
  .project {
    padding-top: 24px;
  }

  .project-list {
    padding: 24px 0;
  }

  .load-more {
    padding-bottom: 48px;
  }
}
</style>
