<template>
<div class='project-backed'>
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
</div>
</template>

<script>
import loading from '@/base/loading'
import blankPage from '@/base/blank-page'
import myprojectList from '@/base/myproject-list'
import user from 'static/js/user'
export default {
  data() {
    return {
      isBacked: true,
      currentAccount: '',
      programs: [],
      isLoaded: false
    }
  },
  mounted() {
    this.getSupported();
  },
  methods: {
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
      })
    }
  },
  components: {
    myprojectList,
    loading,
    blankPage
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
