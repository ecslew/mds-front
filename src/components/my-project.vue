<template>
<div class='my-project'>
  <div class="container">
    <div class="row">
      <div class="col-sm-10 col-sm-offset-1">
        <h4 class="title">{{$t('my_projects')}}</h4>
        <div class="subtitle">{{$t('created_projects_subtitle')}}</div>
        <div class="started">{{$t("started")}}</div>
        <template v-if="programs.length>0">
          <div class="list" v-for="(item,index) in programs" :key="item.id">
            <myproject-list @deleteItem="deleteProject" :isBacked="isBacked" :index="index" :status="item.status" :id="item.id" :title="item.name" :time="item.releaseTime"></myproject-list>
          </div>
        </template>
        <blank-page v-else></blank-page>
      </div>
    </div>
  </div>
  <alert-modal :info='alertInfo' :title='alertTitle'></alert-modal>
  <loading v-if="!isLoaded"></loading>
  <mds-toast :toastInfo='toastInfo' @toast="infoByToast"></mds-toast>
</div>
</template>

<script>
import loading from '@/base/loading'
import blankPage from '@/base/blank-page'
import alertModal from '@/base/alert'
import myprojectList from '@/base/myproject-list'
import user from 'static/js/user'
import util from 'static/js/util'
import mdsToast from '@/base/toast'
export default {
  data() {
    return {
      url: this.globalData.protocol + '://' + this.globalData.host + '/v1/chain/get_table_rows',
      deleteUrl: '/apiCrowdfunding/delete?eosID=',
      alertInfo: '',
      alertTitle: '',
      isBacked: false,
      programs: [],
      isLoaded: false,
      toastInfo: ''
    }
  },
  mounted() {
    this.getProject()
  },
  methods: {
    infoByToast: function (val) {
      this.toastInfo = val
    },
    getProject() {
      let _this = this;
      user.getAccount().then((res) => {
        $(".login").hide()
        $(".personal").show()
        $(".currentAccount").html(res.name)

        $.post(_this.url, JSON.stringify({
          "code": _this.globalData.contract,
          "scope": res.name,
          "table": "item",
          "json": true,
          "limit": -1
        }), function (res) {
          _this.isLoaded = true
          $.each(res.rows, (index, project) => {
            project.releaseTime = util.timestampToDate(project.start).slice(0, 10)
          })
          _this.programs = res.rows
        }, 'json')
      }, () => {
        // 未安装 scatter 或 登录失败
        this.toastInfo = this.$t('connect_scatter')
      })
    },
    deleteProject(val, title, id) {
      let that = this;
      // 判断是否登录
      user.getAccount().then((res) => {
        const eos = user.getEos()
        // 删除项目提交到链上
        eos.transaction({
          actions: [{
            account: that.globalData.contract, // 合约名
            name: 'erase', // 合约方法
            authorization: [{
              actor: res.name, // 登录当前账户
              permission: 'active'
            }],
            data: {
              "initiator": res.name, // 项目发起人
              "name": title // 项目名称
            }
          }]
        }).then(
          result => {
            this.programs.splice(val, 1)
            // 成功，调用我们的接口
            this.$http.get(this.globalData.domain + this.deleteUrl + id).then(res => {
              if (res.data.success) {
                this.alertInfo = this.$t('deleted_success')
                $('#alert').modal('show')
              } else {
                console.log(res.data.message);
              }
            }, err => {
              console.log(err);
            })
          }
        ).catch(
          error => {
            // 失败
            console.log(error)
          }
        )
      }, () => {
        // 未安装 scatter 或 登录失败
        this.toastInfo = this.$t('connect_scatter')
      })
    }
  },
  components: {
    myprojectList,
    alertModal,
    loading,
    blankPage,
    mdsToast
  }
}
</script>

<style scoped>
.my-project {
  padding: 32px 0;
}

.my-project .container {
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
  .my-project {
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
