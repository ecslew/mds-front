<template>
<div class='project-detail'>
  <div class="container">
    <div class="title">{{programs.title}}</div>
    <div class="row">
      <div class="col-sm-8">
        <p class="pic" :style="{background: 'url(' + programs.img +')no-repeat center/cover'}"></p>
        <div class="author-info clearfix">
          <div class="copy-link">
            <img src="static/img/icon/web_icon_share.png" height="51" @click="linkShow">
            <input type="text" id="copyContent" v-model="link"/>
            <p ref="copy" v-show="link_isShow" @click="copyLink" class="copy-btn" data-clipboard-target="#copyContent" data-clipboard-action="copy">{{$t('copy_link')}}</p>
          </div>
          <p class="avator"><img :src="'https://api.medishares.net/apiTools/getAddressHead?address=' + programs.address + '&v=1.0'" width="20"></p>
            <p class="address">{{programs.address}}</p>
            <p>{{$t('release_time')}}: {{programs.release_time.replace(/\//g,'-')}}</p>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="progress">
          <p class="progress-bar" :style="'width:'+parseFloat(programs.amount/programs.complete*100)+'%'"></p>
        </div>
        <h4 class="pro-value main-color">{{programs.amount}} EOS</h4>
        <p class="pro-key">{{$t("pledged")}} {{programs.complete}} EOS</p>
        <h4 class="pro-value">{{programs.backers}}</h4>
        <p class="pro-key">{{$t("backers")}}</p>
        <h4 class="pro-value">{{programs.restDays}} {{$t("day")}} </h4>
        <p class="pro-key">{{$t("for_the_rest")}}</p>
        <div class="payment" @click="payModal">{{$t('payment')}}</div>
      </div>
    </div>
  </div>
  <section class="detail-info">
    <div class="tab">
      <div class="container">
        <a :class="{'active':isActive}" @click='toggleDetails'>{{$t('details')}}</a>
        <a :class="{'active':!isActive}" @click='toggleTransfer'>{{$t('transfer')}}</a>
      </div>
    </div>
    <div class="container detail-info-container">
      <div class="row">
        <div class="col-sm-8">
          <div class="details" v-show="isActive" v-html="programs.info">
          </div>
          <div class="transfer" v-show="!isActive">
            <div class="info-title">{{programs.support.length}} {{$t('support')}}</div>
            <div class="transfer-list" v-for="trans in programs.support" :key="trans.id">
              <img src="static/img/icon/web_icon_ID.png" width="48" class="trans-avator">
              <div class="trans-info">
                <p class="trans-amount">{{trans.amount}}</p>
                <p class="address">{{trans.address}}</p>
                <p class="trans-comments">{{trans.comments}}</p>
                <p class="trans-time">{{trans.time}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <foot></foot>
  <!-- Modal -->
  <div class="modal" id="payment">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">{{$t('payment')}}</h4>
        <label>{{$t('pay_amount')}}</label>
        <p class="basic-group">
          <input class="basic-input" id="amount" type="number" v-model="amount" name="amount" :placeholder="$t('pay_amount_pl')" @blur="getEosPrice">
        </p>
          <div class="equal">≈${{totalEosPriceUsd}}</div>
          <label>{{$t('note')}}</label>
          <textarea class="basic-input" rows="4" v-model="note" id="note" name="note" :placeholder="$t('note_pl')"></textarea>
          <div class="payment" @click="payFunc" data-dismiss="modal">{{$t('determine')}}</div>
      </div>
    </div>
  </div>
  <alert-modal :info='alertInfo' :title='alertTitle'></alert-modal>
</div>
</template>

<script>
import alertModal from '@/base/alert'
import foot from '@/base/foot'
import util from 'static/js/util'
import user from 'static/js/user'
export default {
  props: ['id'],
  data() {
    return {
      alertInfo: '',
      alertTitle: '',
      currentAccount: '',
      amount: '',
      note: '',
      link: window.location.href,
      copyBtn: null, //存储初始化复制按钮事件
      programs: {
        id: 0,
        address: 'loading...',
        img: 'http://www.mathwallet.org/images/mathlabs/mathlabs_webpager.jpg',
        title: 'I need your help to expand the reproduction of secret chili sauce',
        complete: 0,
        amount: 0,
        backers: 0,
        release_time: 'loading...',
        restDays: 0,
        support: [],
        info: '',
        crowdfundingNo: '',
        targetAccount: '',
        low : 0,
        high : 0
      },
      link_isShow: false,
      isActive: true,
      totalEosPriceUsd: 0
    }
  },
  mounted() {
    this.copyBtn = new this.clipboard(this.$refs.copy);
    this.getProjectInfo();
  },
  methods: {
    toggleDetails() {
      this.isActive = true
    },
    toggleTransfer() {
      this.isActive = false
    },
    linkShow() {
      this.link_isShow = !this.link_isShow
    },
    copyLink() {
      let _this = this;
      if (this.globalData.browsers.android) {
        _this.$refs.copy.select();
        document.execCommand("Copy");
        _this.alertInfo = _this.$t('copy_success')
        $('#alert').modal('show')
      } else {
        let clipboard = _this.copyBtn;
        clipboard.on('success', function () {
          _this.alertInfo = _this.$t('copy_success')
          $('#alert').modal('show')
        });
        clipboard.on('error', function () {
          _this.alertInfo = _this.$t('copy_error')
          $('#alert').modal('show')
        });
      }

    },
    payModal() {
      if (this.programs.address == this.address) {
        this.alertInfo = this.$t('copy_success')
        $('#alert').modal('show')
      } else {
        $('#payment').modal('show')
      }
    },
    payFunc() {
      let _this = this;
      let amount = $('#amount').val();
      let note = $('#note').val();

      // 判断金额
      if( amount-0 < _this.programs.low ){
        this.alertInfo = '金额不能小于 ' + _this.programs.low + ' EOS';
        $('#alert').modal('show');
        return false;
      }

      if( amount-0 > _this.programs.high ){
         this.alertInfo = '金额不能大于 ' + _this.programs.high + ' EOS';
        $('#alert').modal('show');
        return false;
      }

      // 判断登录
      user.getAccount().then((currentAccount) => {
        _this.currentAccount = currentAccount.name;
        $(".login").hide()
        $(".personal").show()
        $(".currentAccount").html(currentAccount.name)
        // 交易
        user.getEos().transaction({
          actions: [{
            account: 'eosio.token',
            name: 'transfer',
            authorization: [{
              actor: _this.currentAccount,
              permission: 'active'
            }],
            data: {
              from: _this.currentAccount,
              to: _this.programs.targetAccount,
              quantity: parseFloat(amount).toFixed(4) + ' EOS',
              memo: '###{"ID":' + _this.programs.id + ',"creator":"' + _this.programs.address + '","comment":"' + note + '"}###'
            }
          }]
        }).then(
          result => {
            // 成功之后调用我们的log
            var url = _this.globalData.domain + '/apiCrowdfunding/trans';

            var args = {
              crowdfundingNo: _this.programs.crowdfundingNo,
              hash: result.transaction_id,
              amount: amount,
              from: _this.currentAccount,
              to: _this.programs.targetAccount
            };

            $.post(url, args, function (res) {
              if (res.success) {
                _this.alertInfo = _this.$t('success');
                $('#alert').modal('show')
              } else {
                _this.alertInfo = res.message;
                $('#alert').modal('show')
              }
            }, 'json')
          }
        ).catch(
          error => {
            // 失败
            _this.alertInfo = JSON.parse(error).error.details[0].message;
            $('#alert').modal('show')
          }
        )
        // end 交易

      }, error => {
        console.log(error);
        // 未安装 scatter 或 登录失败
        this.alertInfo = '连接scatter进行交易'
        $('#alert').modal('show')
      })

    },
    getProjectInfo() {

      let _GET = util.getParams();
      let eosID = _GET.id;
      let _this = this;

      var url = _this.globalData.domain + '/apiCrowdfunding/getInfo?eosID=' + eosID;

      $.get(url, {}, function (res) {
        if (res.success) {
          _this.programs.info = res.data.des; // 简介
          _this.programs.crowdfundingNo = res.data.crowdfundingNo; // 订单号
          _this.programs.img = res.data.photos; // 图片
          _this.programs.complete = parseFloat(res.data.amount).toFixed(4); // 总共
          _this.programs.title = res.data.title; // 标题
          _this.programs.address = res.data.creator; // 发起人
          _this.programs.restDays = res.data.endDate; // 还剩几天
          _this.programs.release_time = res.data.releaseTime; // 发布时间
          _this.programs.targetAccount = res.data.targetAccount; // 收款账户
          _this.programs.id = res.data.eosID; // eosID
          _this.programs.low = res.data.low; // low
          _this.programs.high = res.data.high; // high

          // transfer
          $.get(_this.globalData.domain + '/apiEos/getCrowdfundingTransfer', {
            'account': _this.programs.targetAccount
          }, function (res) {

            if (res.success) {
              $.each(res.data.transfer, function (index, event) {
                _this.programs.support.push({
                  id: index + 1,
                  address: event.data.from,
                  amount: event.data.quantity, // 1.0000 EOS
                  comments: JSON.parse(event.data.memo.replace(/###/ig, '')).comment, // ###{}### 需要过滤
                  time: util.timestampToDate(event.timestamp) // 时间戳
                });
                _this.programs.amount += parseFloat(event.data.quantity)
                _this.programs.backers++;

              });
            }

          }, 'json')

        }
      }, 'json')

    },
    getEosPrice() {
      let _this = this;
      $.get('https://api.coinmarketcap.com/v1/ticker/eos/?convert=USD', {}, function (res) {
        _this.totalEosPriceUsd = parseFloat(res[0]['price_usd'] * $('#amount').val()).toFixed(2);
      }, 'json')
    }
  },
  components: {
    foot,
    alertModal
  }

}
</script>

<style scoped>
.project-detail {
  padding: 68px 0 0;
}

#copyContent {
  position: absolute;
  opacity: 0;
}

.title {
  padding-bottom: 48px;
  text-align: left;
}

.pic {
  width: 100%;
  height: 412px;
  border-radius: 4px;
}

.pro-value {
  font-family: Gotham-Medium;
  font-size: 32px;
  line-height: 1;
  margin: 16px 0 8px;
}

.pro-key {
  margin-bottom: 48px;
}

.author-info {
  padding: 32px 0;
}

.copy-link {
  float: right;
  position: relative;
  cursor: pointer;
}

.avator {
  float: left;
  width: 64px;
  height: 64px;
  background: #fff;
  border-radius: 50%;
  font-size: 0;
  line-height: 64px;
  text-align: center;
  margin-right: 16px;
  overflow: hidden;
}

.address {
  font-family: Gotham-Medium;
  font-size: 20px;
  line-height: 1.6;
  margin-bottom: 4px;
}

.copy-btn {
  padding: 25px 25px 25px 76px;
  background: #fff url('../../static/img/icon/web_icon_link.png')no-repeat 24px/38px;
  box-shadow: 0 2px 8px 0 rgba(175, 175, 175, 0.5);
  border-radius: 4px;
  position: absolute;
  top: 64px;
  right: 0;
  font-family: Gotham-Medium;
  min-width: 208px;
  z-index: 10;
}

.copy-btn:after {
  content: "";
  position: absolute;
  top: -16px;
  right: 16px;
  width: 0;
  height: 0;
  border: 8px solid transparent;
  border-bottom-color: #fff;
}

.payment {
  background: #00d102;
  color: #fff;
  height: 52px;
  line-height: 52px;
  text-align: center;
  font-size: 16px;
  font-family: Gotham-Medium;
  border-radius: 4px;
  cursor: pointer;
}

.detail-info {
  background: #fff;
  margin-top: 100px;
}

.tab {
  border: 1px solid #e7ecf0;
}

.tab a {
  color: #2c363f;
  font-size: 20px;
  font-family: Gotham-Medium;
  line-height: 96px;
  display: inline-block;
  width: 178px;
  position: relative;
  text-transform: capitalize;
}

.tab .active:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 18px;
  height: 4px;
  background: #00d102;
  border-radius: 4px;
}

.detail-info-container {
  padding: 48px 15px 64px;
}

.info-title {
  font-size: 20px;
  line-height: 1.6;
  font-family: Gotham-Medium;
  color: #2c363f;
  padding-bottom: 16px;
}

.transfer-list {
  padding: 16px 0;
  border-bottom: 1px solid #e7ecf0;
}

.trans-avator {
  float: left;
  margin-right: 16px;
}

.trans-info {
  padding: 8px 0;
  overflow: hidden;
}

.trans-amount {
  font-size: 20px;
  line-height: 1.6;
  float: right;
}

.trans-comments {
  background: #f2f5f6;
  border-radius: 4px;
  margin: 24px 0 16px;
  padding: 16px;
  font-size: 20px;
  line-height: 1.4;
}

.trans-time {
  line-height: 1.43;
  text-align: right;
  color: #607d8b;
}

.modal-title {
  margin: 8px 0 32px;
}

.modal label {
  font-family: Gotham-Medium;
  margin: 8px 0 16px;
}

.modal .payment {
  margin-top: 64px;
}

.equal {
  text-align: right;
  color: #a9b9c1;
  margin-top: 4px;
}

@media(max-width: 768px) {
  .project-detail {
    padding: 24px 0 0;
  }

  .title {
    padding-bottom: 24px;
  }

  .pic {
    height: 200px;
  }

  .avator {
    width: 48px;
    height: 48px;
    line-height: 48px;
    margin-right: 10px;
  }

  .pro-value {
    font-size: 28px;
  }

  .pro-key {
    margin-bottom: 36px;
  }

  .detail-info {
    margin-top: 32px;
  }

  .tab a {
    width: 130px;
    font-size: 16px;
    height: 60px;
    line-height: 60px;
  }

  .detail-info-container {
    padding: 24px 15px 32px;
  }

  .transfer-list {
    padding: 14px 0 2px;
  }

  .transfer-list .address,
  .trans-amount {
    font-size: 16px;
  }

  .trans-comments {
    font-size: 14px;
    margin: 12px 0 10px;
  }

  .trans-avator {
    margin-right: 10px;
  }
}
</style>
