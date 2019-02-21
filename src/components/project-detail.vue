<template>
<div class='project-detail'>
  <div class="isNull" v-if='isNull'>{{$t('project_error')}}</div>
  <template v-else>
    <div class="container">
      <div class="title">{{programs.title}}</div>
      <div class="row">
        <div class="col-sm-8">
          <p class="pic" :style="{background: 'rgba(0,0,0,0.05) url(' + programs.photos +')no-repeat center/cover'}"></p>
          <div class="author-info clearfix">
            <div class="copy-link">
              <!-- <img src="static/img/icon/web_icon_share.png" height="51" @click="linkShow"> -->
              <p ref="copy" @click="copyLink" data-clipboard-target="#copyContent" data-clipboard-action="copy"><img src="static/img/icon/web_icon_link.png" height="48"></p>
              <div ref="copyContent" id="copyContent">{{link}}</div>
              <!-- <p ref="copy" v-show="link_isShow" @click="copyLink" class="copy-btn" data-clipboard-target="#copyContent" data-clipboard-action="copy">{{$t('copy_link')}}</p> -->
            </div>
            <p class="avator"><img :src="'https://api.medishares.net/apiTools/getAddressHead?address=' + programs.creator + '&v=1.0'" width="20"></p>
              <p class="address">{{programs.creator}}</p>
              <p>{{$t('release_time')}}: {{programs.releaseTime.replace(/\//g,'-')}}</p>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="progress">
            <p class="progress-bar" :style="'width:'+parseFloat(programs.supportTotal/programs.amount*100)+'%'"></p>
          </div>
          <h4 class="pro-value main-color">{{programs.supportTotal}} {{programs.targetToken}}</h4>
          <p class="pro-key">{{$t("pledged")}} {{programs.amount}} {{programs.targetToken}}</p>
          <h4 class="pro-value">{{programs.backers?programs.backers:0}}</h4>
          <p class="pro-key">{{$t("backers")}}</p>
          <h4 class="pro-value">{{programs.endDate>0?programs.endDate:0}}</h4>
          <p class="pro-key">{{$t("for_the_rest")}}</p>
          <div :class="[{unPay:programs.endDate<=0},'confirm supportBtn']" @click="payModal">
            <template v-if='programs.type==1'>
              {{$t('payment')}}
            </template>
            <template v-else>
              {{$t('donate')}}
            </template>
          </div>
        </div>
      </div>
    </div>
    <section class="detail-info">
      <div class="tab">
        <div class="container">
          <div class="row">
            <div class="col-sm-8">
              <a :class="{'active':isActive}" @click='toggleDetails'>{{$t('details')}}</a>
              <a :class="{'active':!isActive}" @click='toggleTransfer'>{{$t('transfer')}}</a>
            </div>
            <div class="col-sm-4 hidden-xs">
              <div :class="[{unPay:programs.endDate<=0},'confirm']" @click="payModal">
                <template v-if='programs.type==1'>
                  {{$t('payment')}}
                </template>
                <template v-else>
                  {{$t('donate')}}
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container detail-info-container">
        <div class="row">
          <div class="col-sm-8">
            <div class="details" v-show="isActive" v-html="programs.des">
            </div>
            <div class="transfer" v-show="!isActive">
              <div class="info-title">{{support.length}} {{$t('support')}}</div>
              <div class="transfer-list" v-for="trans in support" :key="trans.id">
                <img src="static/img/icon/web_icon_ID.png" width="48" class="trans-avator">
                <div class="trans-info">
                  <p class="trans-amount">{{trans.amount}}</p>
                  <p class="address">{{trans.address}}</p>
                  <p class="trans-comments" v-if="trans.comments">{{trans.comments}}</p>
                  <p class="trans-time">{{trans.time}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>

  <foot></foot>
  <!-- Modal -->
  <div class="modal" id="payment">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">{{$t('donate')}}</h4>
        <label>{{$t('pay_amount')}}</label>
        <p class="basic-group">
          <input class="basic-input" type="number" v-model="amount" :placeholder="$t('pay_amount_pl')" @blur="getEosPrice">
          <span class="target-token">{{programs.targetToken}}</span>
          <span class="equal">≈${{totalEosPriceUsd}}</span>
        </p>
        <label>{{$t('note')}}</label>
        <textarea class="basic-input" rows="4" v-model="note" :placeholder="$t('note_pl')"></textarea>
        <div class="confirm" @click="payFunc">{{$t('determine')}}</div>
      </div>
    </div>
  </div>
  <alert-modal :info='alertInfo'></alert-modal>
  <mds-toast :toastInfo='toastInfo' :isWarn='isWarn' :isFail='isFail' @toast="infoByToast"></mds-toast>
</div>
</template>

<script>
import alertModal from '@/base/alert'
import mdsToast from '@/base/toast'
import foot from '@/base/foot'
import user from 'static/js/user'
import sha from 'js-sha256'
export default {
  props: ['id'],
  data() {
    return {
      alertInfo: '',
      toastInfo: '',
      isWarn: false,
      isFail: false,
      currentAccount: '',
      link: window.location.href,
      copyBtn: null, //存储初始化复制按钮事件
      programs: {
        eosID: "",
        amount: 0, // 目标金额
        supportTotal: "loading...", //支持金额
        backers: "loading...", //支持人数
        title: "loading...", // 标题
        photos: "", // 图片
        releaseTime: "loading...", // 发布时间
        endDate: "loading...", // 还剩几天
        endTime: "",
        des: "loading...", // 简介
        creator: "loading...", // 发起人
        targetAccount: "", // 收款账户
        targetToken: "",
        targetTokenContract: "",
        targetTokenDecimal: "",
        high: 0,
        low: 0
      },
      isNull: false,
      support: [],
      link_isShow: false,
      isActive: true,
      totalEosPriceUsd: 0,
      amount: '', //支付金额
      note: '' //支付备注
    }
  },
  mounted() {
    this.copyBtn = new this.clipboard(this.$refs.copy);
    this.getProjectInfo();
    // 支付按钮悬浮
    this.togglePayment();
    this.tabFix();
    $(window).scroll(() => {
      this.togglePayment();
      this.tabFix();
    })
  },
  methods: {
    infoByToast(val) {
      this.toastInfo = val
    },
    togglePayment() {
      if ($('.supportBtn')[0]) {
        if ($(window).scrollTop() > ($('.supportBtn').offset().top)) {
          $('.tab').addClass('scroll')
        } else {
          $('.tab').removeClass('scroll')
        }
      }
    },
    tabFix() {
      if ($('.tab')[0]) {
        let disY = $(window).scrollTop() - ($('.detail-info').offset().top - $('.mds-nav').outerHeight())
        if (disY > 0) {
          $('.header-nav').css('top', -disY + 'px')
          if (disY >= 50) {
            $('.detail-info').addClass('fixed')
          } else {
            $('.detail-info').removeClass('fixed')
          }
        } else {
          $('.header-nav').css('top', '0px')
          $('.detail-info').removeClass('fixed')
        }
      }
    },
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
      this.isWarn = false
      if (this.globalData.browsers.android) {
        let val = this.$refs.copyContent.innerText;
        let oInput = document.createElement("input");
        oInput.type = "text";
        oInput.value = val;
        document.body.appendChild(oInput);
        oInput.select(); // 选择对象
        document.execCommand("Copy"); // 执行浏览器复制命令
        oInput.style.display = "none";
        this.isFail = false
        this.toastInfo = this.$t('copy_success')
      } else {
        let clipboard = this.copyBtn;
        clipboard.on('success', () => {
          this.isFail = false
          this.toastInfo = this.$t('copy_success')
        });
        clipboard.on('error', () => {
          this.isFail = true
          this.toastInfo = this.$t('copy_error')
        });
      }
      setTimeout(() => {
        this.link_isShow = false
      }, 2000);
    },
    payModal() {
      if (this.programs.endDate <= 0) {
        this.isWarn = true
        this.isFail = false
        this.toastInfo = "当前项目已下架，请选择其他项目"
        return false
      }
      user.getAccount().then((currentAccount) => {
        $(".login").hide()
        $(".personal").show()
        $(".currentAccount").html(currentAccount.name)
        this.currentAccount = currentAccount.name;
        if (this.programs.creator == this.currentAccount) {
          this.isWarn = true
          this.isFail = false
          this.toastInfo = this.$t('not_support')
        } else if (this.programs.type == 1) {
          this.$router.push({
            name: 'projectPurchase',
            query: {
              id: this.id
            }
          })
        } else {
          $('#payment').modal('show')
        }
      }, () => {
        // 未安装 scatter 或 登录失败
        this.isWarn = true
        this.isFail = false
        this.toastInfo = this.$t('connect_scatter')
      })
    },
    payFunc() {
      let _this = this;
      let amount = this.amount
      let note = this.note

      // 判断金额
      if (amount - 0 < _this.programs.low) {
        this.alertInfo = '金额不能小于 ' + _this.programs.low + ' ' + _this.programs.targetToken;
        $('#alert').modal('show');
        return false;
      }

      if (amount - 0 > _this.programs.high) {
        this.alertInfo = '金额不能大于 ' + _this.programs.high + ' ' + _this.programs.targetToken;
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
            account: _this.programs.targetTokenContract,
            name: 'transfer',
            authorization: [{
              actor: _this.currentAccount,
              permission: currentAccount.authority
            }],
            data: {
              from: _this.currentAccount,
              to: _this.programs.targetAccount,
              quantity: parseFloat(amount).toFixed(_this.programs.targetTokenDecimal) + ' ' + _this.programs.targetToken,
              memo: '###{"ID":' + _this.programs.eosID + ',"creator":"' + _this.programs.creator + '","comment":"' + note + '"}###'
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
              to: _this.programs.targetAccount,
              comment: note
            };

            $.post(url, args, function (res) {
              if (res.success) {
                $('#payment').modal('hide')
                _this.alertInfo = _this.$t('success');
                $('#alert').modal('show')
                $('#alert').on('hidden.bs.modal', function (e) {
                  window.location.reload();
                })
              } else {
                _this.alertInfo = res.message;
                $('#alert').modal('show')
              }
            }, 'json')
          }
        ).catch(error => {
          // 失败
          console.log(error)
          _this.alertInfo = _this.$t('pay_error')
          $('#alert').modal('show')
        })
        // end 交易

      }, () => {
        // 未安装 scatter 或 登录失败
        this.isWarn = true
        this.isFail = false
        this.toastInfo = this.$t('connect_scatter')
      })

    },
    getProjectInfo() {

      let eosID = this.id;
      let _this = this;

      let url = _this.globalData.domain + '/apiCrowdfunding/getInfo?eosID=' + eosID;

      $.get(url, {}, function (res) {
        if (res.success) {
          // 项目信息
          _this.programs = res.data
          _this.programs.amount = parseFloat(res.data.amount).toFixed(_this.programs.targetTokenDecimal); // 目标金额

          // transfer
          $.get(_this.globalData.domain + '/apiCrowdfunding/getTransRecord', {
            'crowdfundingNo': _this.programs.crowdfundingNo
          }, function (res) {
            // 支持金额和支持人数
            _this.programs.supportTotal = parseFloat(res.data.total).toFixed(_this.programs.targetTokenDecimal);
            _this.programs.backers = res.data.count;

            if (res.success) {
              $('.details img').css({
                'width': "100%",
                "margin": "10px 0"
              })
              $.each(res.data.trans, function (index, event) {
                _this.support.push({
                  id: index + 1,
                  address: event.from,
                  amount: parseFloat(event.amount).toFixed(_this.programs.targetTokenDecimal) + ' ' + res.data.token, // 1.0000 EOS
                  comments: event.comment,
                  time: event.createDate
                });

              });
            }

          }, 'json')

        } else {
          _this.isNull = true
        }
      }, 'json')

    },
    getEosPrice() {
      let _this = this;
      $.get('https://api.coinmarketcap.com/v1/ticker/eos/?convert=USD', {}, function (res) {
        _this.totalEosPriceUsd = parseFloat(res[0]['price_usd'] * _this.amount).toFixed(2);
      }, 'json')
    }
  },
  components: {
    foot,
    alertModal,
    mdsToast
  }

}
</script>

<style scoped>
.project-detail {
  padding: 68px 0 0;
}

#copyContent {
  position: absolute;
  right: 0;
  top: 0;
  z-index: -1;
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
  font-weight: 500;
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
  font-weight: 500;
  font-size: 20px;
  line-height: 1.6;
  margin-bottom: 2px;
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
  font-weight: 500;
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

.unPay {
  opacity: 0.5;
}

.detail-info {
  background: #fff;
  margin-top: 100px;
}

.tab {
  border: 1px solid #e7ecf0;
  overflow: hidden;
}

.detail-info.fixed {
  padding-top: 80px;
}

.detail-info.fixed .tab {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 1030;
  background: #fff;
}

.tab a {
  color: var(--blueGrey);

  font-size: 20px;
  font-family: Gotham-Medium;
  font-weight: 500;
  line-height: 78px;
  display: inline-block;
  width: 178px;
  position: relative;
  text-transform: capitalize;
}

.tab .active {
  color: var(--darkColor);
}

.tab .confirm {
  margin: 0;
  transform: translateY(78px);
  transition: transform 0.5s;
}

.tab.scroll .confirm {
  transform: translateY(13px);
}

.detail-info-container {
  padding: 48px 15px 64px;
}

.info-title {
  font-size: 20px;
  line-height: 1.6;
  font-family: Gotham-Medium;
  font-weight: 500;
  color: var(--darkColor);
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
  background: var(--bgColor);
  border-radius: 4px;
  margin: 24px 0 16px;
  padding: 16px;
  font-size: 20px;
  line-height: 1.4;
}

.trans-time {
  line-height: 1.43;
  text-align: right;
  color: var(--blueGrey);
}

#payment .modal-content {
  padding: 24px;
}

.modal-title {
  margin: 8px 0 32px;
}

.equal {
  position: absolute;
  right: 0;
  top: 52px;
  color: #a9b9c1;
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

  .detail-info.fixed {
    padding-top: 60px;
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
