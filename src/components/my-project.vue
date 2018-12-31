<template>
<div class='my-project'>
  <div class="container">
    <div class="row">
      <div class="col-sm-10 col-sm-offset-1">
        <h4 class="title">{{$t('my_projects')}}</h4>
        <div class="subtitle">{{$t('created_projects_subtitle')}}</div>
        <div class="started">{{$t("started")}}</div>
        <div class="list" v-for="(item,index) in programs" :key="item.id">
          <myproject-list @deleteItem="deleteProject" :index="index" :isBacked="isBacked" :id="item.eosID" :isFail="item.isFail" :picture="item.img" :isApproved="item.isApproved" :title="item.title" :targetAmount="item.targetAmount" :time="item.releaseTime"></myproject-list>
        </div>
      </div>
    </div>
  </div>
  <alert-modal :info='alertInfo' :title='alertTitle'></alert-modal>
</div>
</template>

<script>
import alertModal from '@/base/alert'
import myprojectList from '@/base/myproject-list'
import user from 'static/js/user'
export default {
  data() {
    return {
      url: 'http://kylin.meet.one:8888/v1/chain/get_table_rows',
      params: {
        "code": "eostest51111",
        "scope": "eostest51112",
        "table": "item",
        "json": true
      },
      alertInfo: '',
      alertTitle: '',
      isBacked: false,
      programs: [
        // {
        //   "id": 1,
        //   "name": "name1",
        //   "item_digest": "0e656f73696f3a3a6162692f312e30010474696d650675696e7433320506676c",
        //   "initiator": "eostest51112",
        //   "receiver": "eostest51112",
        //   "min_fund": {
        //     "quantity": "1.0000 EOS",
        //     "contract": "eosio.token"
        //   },
        //   "max_fund": {
        //     "quantity": "10.0000 EOS",
        //     "contract": "eosio.token"
        //   },
        //   "target_fund": {
        //     "quantity": "100.0000 EOS",
        //     "contract": "eosio.token"
        //   },
        //   "start": 1545991086,
        //   "deadline": 1555742002,
        //   "status": 0
        // },
        //        {
        //          eosID: 1,
        //          img: 'http://www.mathwallet.org/images/mathlabs/mathlabs_webpager.jpg',
        //          title: 'I need your help to expand the reproduction of secret chili sauce',
        //          isApproved: false,
        //          isFail: false,
        //          targetAmount: "10000",
        //          releaseTime: '2018-12-30'
        //        }
      ]
    }
  },
  mounted() {
    this.getProject()
  },
  methods: {
    getProject() {
      this.$http.post(this.url, this.params).then(res => {
        this.programs = res.data.rows
        console.log(res);
      }, err => {
        console.log('error:' + err);
      })
    },
    deleteProject(val, title, id) {
      this.programs.splice(val, 1)
      // 判断是否登录
      user.getAccount().then((res) => {
        const eos = user.getEos()
        // 删除项目提交到链上
        eos.transaction({
          actions: [{
            account: 'medishareeos', // 合约名
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
            console.log(result);
            // 成功，调用我们的接口
            this.$http.get(this.globalData.domain + '/apiCrowdfunding/delete?eosID=' + id).then(res => {
              if (res.data.success) {
                this.alertInfo = "successfully deleted"
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
      }, (err) => {
        alert(err)
      })
    }
  },
  components: {
    myprojectList,
    alertModal
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
