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
        <h4 class="pro-value">{{programs.backers}} EOS</h4>
        <p class="pro-key">{{$t("backers")}}</p>
        <h4 class="pro-value">{{Math.ceil((Date.now()-(new Date(programs.release_time)))/1000/60/60/24)}} {{$t("day")}} </h4>
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
          <div class="details" v-show="isActive">
            {{programs.info}}
          </div>
          <div class="transfer" v-show="!isActive">
            <div class="info-title">{{programs.support.length}} {{$t('support')}}</div>
            <div class="transfer-list" v-for="trans in programs.support" :key="trans.id">
              <img src="static/img/icon/web_icon_ID.png" width="48" class="trans-avator">
              <div class="trans-info">
                <p class="trans-amount">{{trans.amount}} EOS</p>
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
          <input class="basic-input" type="number" v-model="amount" name="amount" :placeholder="$t('pay_amount_pl')">
        </p>
          <div class="equal">≈$0</div>
          <label>{{$t('note')}}</label>
          <textarea class="basic-input" rows="4" v-model="note" name="note" :placeholder="$t('note_pl')"></textarea>
          <div class="payment" @click="payFunc" data-dismiss="modal">{{$t('determine')}}</div>
      </div>
    </div>
  </div>
  <alert :info='alertInfo' :title='alertTitle'></alert>
</div>
</template>

<script>
import alert from '@/base/alert'
import foot from '@/base/foot'
export default {
  props: ['id'],
  data() {
    return {
      alertInfo: '',
      alertTitle: '',
      address: 'tangying1234',
      amount: '',
      note: '',
      link: window.location.href,
      copyBtn: null, //存储初始化复制按钮事件
      programs: {
        id: 1,
        address: 'eosjiazechen',
        img: 'http://www.mathwallet.org/images/mathlabs/mathlabs_webpager.jpg',
        title: 'I need your help to expand the reproduction of secret chili sauce',
        complete: 25000,
        amount: 20032,
        backers: 187,
        release_time: '2018/12/10',
        support: [{
            id: '1',
            address: 'tangying1234',
            amount: 20032,
            comments: 'Make your own chili sauce, there must be a unique formula, should be very delicious, support!',
            time: '2018-11-04  14:26:06'
          },
          {
            id: '2',
            address: 'evanlueoso01',
            amount: 20032,
            comments: 'Make your own chili sauce, there must be a unique formula, should be very delicious, support!',
            time: '2018-11-04  14:26:06'
          },
          {
            id: '3',
            address: 'eosjiazechen',
            amount: 20032,
            comments: 'Make your own chili sauce, there must be a unique formula, should be very delicious, support!',
            time: '2018-11-04  14:26:06'
          },
          {
            id: '4',
            address: 'tangying1234',
            amount: 20032,
            comments: 'Make your own chili sauce, there must be a unique formula, should be very delicious, support!',
            time: '2018-11-04  14:26:06'
          }
        ],
        info: ''
      },
      link_isShow: false,
      isActive: true
    }
  },
  mounted() {

    this.copyBtn = new this.clipboard(this.$refs.copy);
    this.$http.get('').then((res) => {
      console.log(res);

    }, (err) => {
      console.log(err);

    })
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
      if (global.browsers.android) {
        _this.$refs.copy.select();
        document.execCommand("Copy");
        _this.alertInfo = _this.$t('copy_success')
        $('#alert').modal('show')
        // alert('安卓');
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
      this.alertInfo = '连接scatter进行交易'
      $('#alert').modal('show')

    }
  },
  components: {
    foot,
    alert
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
