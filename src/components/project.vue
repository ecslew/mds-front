<template>
<div class='project'>
  <div class="container">
    <h4 class="title text-center">{{$t('all_projects')}}</h4>
    <div class="subtitle text-center">{{$t('projects_list')}}</div>
    <ul class="row project-list" v-if="programs.length>0">
      <li class="col-sm-4 col-xs-12" v-for="item in programs" :key="item.id">
        <project-list :id="item.eosID" :picture="item.img" :title="item.title" :targetAmount="item.targetAmount" :amount="item.reciveAmount" :time="item.releaseTime" :targetToken="item.targetToken"></project-list>
      </li>
    </ul>
    <blank-page v-else></blank-page>
    <!-- <div class="load-more" v-show="!isAll"><span>{{$t("load_more")}}</span></div> -->
    <div class="load-more" v-if="!isLoadEnd">
      <p><img src="static/img/icon/loading_icon.png" width="24"> <span>{{$t('load_more')}}</span></p>
    </div>
    <div v-if="programs.length>0&&isOver" class="bottom-line"><span>{{$t('bottom_line')}}</span></div>
  </div>
  <foot></foot>
  <loading v-if="!isLoaded"></loading>
</div>
</template>

<script>
import loading from '@/base/loading'
import blankPage from '@/base/blank-page'
import projectList from '@/base/project-list'
import foot from '@/base/foot'
export default {
  data() {
    return {
      isOver: false, //全部已加载
      isLoadEnd: false, //加载更多
      url: '/apiCrowdfunding/homePage?page=',
      page: 1,
      transferUrl: '/apiEos/getCrowdfundingTransfer?account=',
      programs: [],
      isLoaded: false
    }
  },
  mounted() {
    this.getPrograms()
  },
  methods: {
    getPrograms() {
      // 设置一个开关来避免重负请求数据
      let sw = false
      this.$http.get(this.globalData.domain + this.url + this.page).then((res) => {
        if (res.data.success) {
          this.isLoaded = true
          this.isLoadEnd = true
          // 将得到的数据放到vue中的data
          this.programs = res.data.data.pageData;
          if (res.data.data.pageData.length < 9) {
            // 如果显示全部已加载则放开此注释
            // this.isOver = true
            sw = false
          } else {
            sw = true
          }
        }
      }, (error) => {
        console.log(error)
      })

      // 注册scroll事件并监听
      $(window).scroll(() => {
        // 判断是否打开开关
        if (sw == true) {
          // 判断是否滚动到底部
          if ($(window).scrollTop() + $(window).height() >= $('#app').outerHeight(true) - $('footer').outerHeight(true)) {
            this.page++
            // 将开关关闭
            sw = false
            this.isLoadEnd = false
            this.$http.get(this.globalData.domain + this.url + this.page).then((res) => {
              // 将新获取的数据push到vue中的data，就会反应到视图中了
              this.programs.concat(res.data.data.pageData)
              this.isLoadEnd = true
              // 数据更新完毕，将开关打开
              if (res.data.data.pageData.length < 9) {
                // 如果显示全部已加载则放开此注释
                // this.isOver = true
                sw = false
              } else {
                sw = true
              }
            }, (error) => {
              console.log(error)
            })
          }
        }
      })
    }
  },
  components: {
    foot,
    projectList,
    loading,
    blankPage
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
  font-weight: 500;
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
