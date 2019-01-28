<template>
<div class='project-purchase'>
  <div class="container top-container hidden-xs">
    <h4 class="select-title">{{$t('project_name')}}:</h4>
    <div class="title">{{programs.title}}</div>
  </div>
  <section class="select-gear">
    <div class="container">
      <h4 class="select-title">{{$t('choose_gear')}}</h4>
      <div class="row">
        <ul class="col-sm-8 select-list">
          <li v-for="(item,index) in gearList" :key="index" :class="[{selected:item.isSelected},'clearfix']">
            <div class="list-info clearfix" @click="selectGear(item)">
              <p class="pic" :style="{background: 'url(' + programs.photos +')no-repeat center/cover'}"></p>
              <h3>{{item.sum}} EUSD</h3>
              <div class="gear-type">{{$t('gear'+(index+1))}} : {{item.unit}} kg</div>
            </div>
            <div class="add_sub"><img src="static/img/icon/sub.jpg" width="34" @click="subNumber(item)"><input type="tel" class="add_number" v-model="item.number" @input="changeNumber(item)"><img src="static/img/icon/add.jpg" width="34" @click="addNumber(item)"></div>
          </li>
          <div class="comment">
            <h4 class="select-title">{{$t('comments')}}</h4>
            <div class="comment-info">
              <div class="user-info hidden-xs">
                <img src="static/img/icon/web_icon_ID.png">
                <p>{{currentAccount}}</p>
              </div>
              <textarea v-model="note" :placeholder="$t('note_pl')"></textarea>
            </div>
          </div>
          <div :class="[{active:selectedOrder&&selectedOrder.number>0},'confirm']" @click="submitOrder">{{$t('confirm')}}</div>
        </ul>
        <div class="col-sm-4 mds_notice">
          <h4>{{$t('mds_notice1')}}</h4>
          <p>{{$t('mds_notice2')}}</p>
        </div>
      </div>
    </div>
  </section>
  <foot></foot>
  <mds-toast :toastInfo='toastInfo' :isWarn="isWarn" @toast="infoByToast"></mds-toast>
</div>
</template>

<script>
import mdsToast from '@/base/toast'
import foot from '@/base/foot'
import user from 'static/js/user'
import sha from 'js-sha256'
export default {
  props: ['id'],
  data() {
    return {
      getInfoUrl: '/apiCrowdfunding/getInfo?eosID=',
      getGearUrl: '',
      currentAccount: '',
      isEdit: false,
      gearList: [{
        id: '1',
        sum: '10',
        unit: '2',
        max_number: 20,
        number: 0
      }, {
        id: '2',
        sum: '20',
        unit: '4',
        max_number: 20,
        number: 0
      }, {
        id: '3',
        sum: '30',
        unit: '8',
        max_number: 20,
        number: 0
      }],
      selectedOrder: null,
      toastInfo: '',
      isWarn: true,
      programs: '',
      note: '', //支付备注
      noteHash: '' //加密支付备注
    }
  },
  mounted() {
    this.getUser()
    this.gearList.map((list) => {
      this.$set(list, 'isSelected', false);
    })
    this.getProjectInfo()
  },
  methods: {
    infoByToast(val) {
      this.toastInfo = val
    },
    getUser() {
      user.getAccount().then((currentAccount) => {
        $(".login").hide()
        $(".personal").show()
        $(".currentAccount").html(currentAccount.name)
        this.currentAccount = currentAccount.name;
      }, () => {
        // 未安装 scatter 或 登录失败
        this.toastInfo = this.$t('connect_scatter')
      })
    },
    getProjectInfo() {
      if (this.$route.params.programs) {
        this.programs = this.$route.params.programs
      } else if (this.$route.params.order) {
        let index = this.$route.params.order.id
        this.selectedOrder = this.$route.params.order
        this.programs = this.selectedOrder.programs
        this.gearList[index - 1] = this.selectedOrder
        this.note = this.selectedOrder.note
      } else {
        this.$http.get(this.globalData.domain + this.getInfoUrl + this.id).then((res) => {
          if (res.data.success) {
            this.programs = res.data.data
          }
        }, (err) => {
          console.log(err)
        })
      }
    },
    // 选择档位
    selectGear(item) {
      this.gearList.map((list) => {
        this.$set(list, 'isSelected', false);
      })
      item.isSelected = true
      this.selectedOrder = item
    },
    subNumber(item) {
      item.number--
      if (item.number < 0) {
        this.toastInfo = "受不了了，宝贝不能再减少了哦"
        item.number = 0
      }
    },
    addNumber(item) {
      item.number++
      if (item.number > item.max_number) {
        this.toastInfo = "该宝贝不能购买更多哦"
        item.number = item.max_number
      }
    },
    changeNumber(item) {
      if (item.number > item.max_number) {
        this.toastInfo = "数量超出范围"
        item.number = item.max_number
      }
    },
    submitOrder() {
      user.getAccount().then((currentAccount) => {
        $(".login").hide()
        $(".personal").show()
        $(".currentAccount").html(currentAccount.name)
        this.currentAccount = currentAccount.name;
        if (this.programs.creator == this.currentAccount) {
          this.toastInfo = this.$t('not_support')
          return false
        }
        if (!this.selectedOrder) {
          this.toastInfo = this.$t('purchase_no_chosen')
          return false
        }
        if (this.selectedOrder.number < 1) {
          this.toastInfo = this.$t('purchase_no_number')
          return false
        }
        this.selectedOrder.programs = this.programs
        // 支付备注
        this.selectedOrder.noteHash = sha.sha256(this.note)
        this.selectedOrder.note = this.note
        // 调接口提交数据
        this.$router.push({
          name: 'orderDetail',
          params: {
            'order': this.selectedOrder,
            'id': this.id
          }
        })
      }, () => {
        // 未安装 scatter 或 登录失败
        this.toastInfo = this.$t('connect_scatter')
      })

    }
  },
  components: {
    foot,
    mdsToast
  }

}
</script>

<style scoped>
.top-container {
  padding: 64px 15px;
}

.select-title {
  font-size: 20px;
  font-family: Gotham-Medium;
  font-weight: 500;
  line-height: 1.6;
}

.title {
  text-align: left;
}

.select-gear {
  background: #fff;
  padding-bottom: 160px;
}

.select-gear .select-title {
  padding: 32px 0;
}

.mds_notice {
  font-size: 16px;
  line-height: 1.75;
  padding: 0 15px 24px;
}

.mds_notice h4 {
  font-size: 16px;
  font-family: Gotham-Medium;
  font-weight: 500;
  margin-bottom: 20px;
}

.select-list li {
  font-family: Gotham-Medium;
  font-weight: 500;
  border: 1px solid var(--paleBlue);
  border-radius: 4px;
  margin-bottom: 24px;
  padding: 24px;
}

.select-list li.selected {
  border-color: var(--darkColor);
}

.list-info {
  float: left;
  width: calc(100% - 130px);
  padding-left: 68px;
  background: url(../../static/img/icon/no_select.png)no-repeat left top/36px;
}

.selected .list-info {
  background-image: url(../../static/img/icon/web_icon_ok.png);
}

.list-info .pic {
  width: 160px;
  height: 110px;
  border-radius: 4px;
  margin-right: 24px;
  float: left;
}

.select-list h3 {
  font-size: 32px;
  margin-bottom: 4px;
}

.add_sub {
  float: right;
  width: 130px;
  text-align: right;
}

.add_number {
  width: 56px;
  padding: 0 13px;
  font-family: Gotham-Medium;
  font-weight: 500;
  text-align: center;
  line-height: 34px;
}

.comment-info {
  border: 1px solid var(--paleBlue);
  border-radius: 4px;
  position: relative;
  overflow: hidden;
}

.user-info {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  background: var(--bgColor);
  padding: 32px 48px;
  font-family: Gotham-Medium;
  font-weight: 500;
}

.user-info img {
  width: 88px;
  margin-bottom: 8px;
}

.comment-info textarea {
  height: 180px;
  width: 100%;
  padding: 24px 24px 24px 210px;
  display: block;
}

.confirm {
  opacity: 0.5;
}

.confirm.active {
  opacity: 1;
}

@media(max-width: 991px) {
  .select-list .list-info {
    padding-left: 40px;
    float: none;
    width: 100%;
    background-size: 24px;
    margin-bottom: 32px;
  }
}

@media(max-width: 768px) {
  .top-container {
    padding: 32px 15px;
  }

  .select-title {
    font-size: 16px;
  }

  .select-gear {
    padding-bottom: 50px;
  }

  .select-gear .select-title {
    padding: 24px 0;
  }

  .select-list li {
    padding: 24px 16px;
  }

  .list-info .pic {
    width: 90px;
    height: 62px;
    margin-right: 16px;
  }

  .select-list h3 {
    font-size: 20px;
  }

  .comment-info textarea {
    padding: 16px;
    background: var(--bgColor);
  }

  .mds_notice {
    margin-top: 50px;
  }
}
</style>
