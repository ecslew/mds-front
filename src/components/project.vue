<template>
<div class='project'>
  <div class="container">
    <h4 class="title text-center">{{$t('all_projects')}}</h4>
    <div class="subtitle text-center">{{$t('projects_list')}}</div>
    <ul class="row project-list">
      <li class="col-sm-4 col-xs-12" v-for="item in programs" :key="item.id">
        <project-list :id="item.eosID" :picture="item.img" :title="item.title" :targetAmount="item.targetAmount" :amount="item.amount" :time="item.releaseTime"></project-list>
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
