<template>
<div>
  <div class="cross-chain">
    <div class="container">
      <div class="title uppercase">{{$t('cross_chain_title')}}</div>
      <div class="slogan"><a target="_blank" :href="$t('what_is_emds')">{{$t('cross_chain_slogan')}}</a></div>
      <form>
        <div class="row">
          <div class="col-sm-6">
            <label>{{$t('cross_chain_from')}}</label>
            <div class="basic-group">
              <!-- FROM -->
              <input class="basic-input" type="number" v-model="from.assets" :placeholder="$t('cross_chain_assets')" @input="changeAmount" min="0">
              <span class="target-token">{{from.name}}</span>
            </div>
            <div class="low-amount"><span>{{$t('cross_chain_range')}}</span> {{from.min}} ~ {{from.max}} {{from.name}}</div>
          </div>
          <div class="col-sm-6">
            <label>{{$t('cross_chain_to')}}</label>
            <div class="basic-group">
              <!-- TO -->
              <input class="basic-input" readonly="true" type="number" v-model="to.assets" :placeholder="$t('cross_chain_get_assets')">
              <span class="target-token">{{to.name}}</span>
            </div>
            <div class="low-amount"><span>{{$t('cross_fee')}}</span>：{{from.fee}} {{to.name}}</div>
          </div>
        </div>
        <!-- Address -->
        <label>{{address_title}}</label>
        <input class="basic-input" type="text" v-model="toAddress" :placeholder="$t('cross_chain_account')">
        <a class="confirm" @click="nextStep">{{$t('next_step')}}</a>
      </form>
    </div>
  </div>
  <foot></foot>
  <mds-toast :toastInfo='toastInfo' :isWarn="isWarn" @toast="infoByToast"></mds-toast>
  <mds-alert :info='alertInfo'></mds-alert>
  <!-- Modal -->
  <div class="modal" id="successModal">
    <div class="modal-dialog" role="document">
      <div class="modal-content text-center">
        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
        <img src="static/img/crossChain/success.png" width="64">
        <h4 class="modal-title">{{$t('cross_success_title')}}</h4>
        <p class="info">{{$t('cross_success_info')}}</p>
        <div>
          <span data-dismiss="modal" class="modal-close">{{$t('got_it')}}</span>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import foot from '@/base/foot'
import mdsToast from '@/base/toast'
import mdsAlert from '@/base/alert'
import user from 'static/js/user'
export default {
  props: ['blockchain'],
  data() {
    return {
      address_title:this.$t('cross_chain_address_eos'),
      from: {
        name: 'MDS',
        min_amount: 100,
        max_amount: 100,
        fee: 0,
        address: '',
        assets: '',
        decimal: 1000000000000000000
      },
      to: {
        name: 'EMDS',
        min_amount: 100,
        max_amount: 100,
        fee: 0,
        address: '',
        assets: '',
        decimal: 10000
      },
      account: '',
      toAddress: '',
      low_amount: 0,
      toastInfo: '',
      alertInfo: '',
      isWarn: true,
      initUrl: '/apiEmds/getInit',
      createOrderUrl: '/apiEmds/createOrder',
      finishOrderUrl: '/apiEmds/finishOrder'
    }
  },
  created() {
    this.getInit();
  },
  methods: {
    infoByToast(val) {
      this.toastInfo = val
    },
    changeAmount() {
      this.to.assets = this.from.assets - this.from.fee > 0 ? this.from.assets - this.from.fee : 0;
    },
    switchFunc() {
      if (this.blockchain == 'eos') {
        let place = this.from
        this.from = this.to
        this.to = place
        this.address_title=this.$t('cross_chain_address_eth')
      }
      this.low_amount = this.from.min;
    },
    nextStep() {

      if (this.from.assets - 0 < this.from.min || this.from.assets - 0 > this.from.max) {
        this.toastInfo = 'Amount should between ' + this.from.min + ' - ' + this.from.max;
        return false;
      }

      if (this.toAddress == '') {
        this.toastInfo = 'Address can\'t empty!';
        return false;
      }

      if (this.to.name == 'MDS') {
        var reg = /^0x[a-f0-9]{40}$/i.test(this.toAddress);
        if (!reg) {
          this.toastInfo = 'Address Style Error!';
          return false;
        }
      } else {
        if (this.toAddress.length > 12) {
          this.toastInfo = 'Address Style Error!';
          return false;
        }
      }

      // 获取当前登录账户
      if (this.from.name == 'MDS') {

        if (typeof window.web3 == 'undefined') {
          this.toastInfo = 'Get web3 fail. Please install MetaMask.';
        }

        if (typeof web3.eth.accounts[0] == 'undefined') {

          this.toastInfo = 'Get Account fail.';
          return false;
        }

        this.$http.post(this.globalData.domain + this.createOrderUrl, {
          'address': web3.eth.accounts[0],
          'toAddress': this.toAddress,
          'amount': this.from.assets * this.from.decimal,
          'type': this.from.name == 'MDS' ? 0 : 1
        }, {
          'emulateJSON': true
        }).then(res => {
          if (res.data.success) {
            this.sendMDS(res.data.data.orderNo);
          } else {
            this.toastInfo = res.data.message;
          }
        })
      } else {
        user.getAccount().then(res => {
          this.account = res.name;

          this.$http.post(this.globalData.domain + this.createOrderUrl, {
            'address': this.account,
            'toAddress': this.toAddress,
            'amount': this.from.assets * this.from.decimal,
            'type': this.from.name == 'MDS' ? 0 : 1
          }, {
            'emulateJSON': true
          }).then(res => {
            if (res.data.success) {
              // emds -> mds
              this.sendEMDS(res.data.data.orderNo);
            } else {
              this.toastInfo = res.data.message;
            }
          })
        })
      }
    },
    getInit() {
      this.$http.post(this.globalData.domain + this.initUrl, {}, {
        'emulateJSON': true
      }).then(res => {
        if (res.data.success) {
          this.from.min = res.data.data.mds.min / this.from.decimal;
          this.low_amount = res.data.data.mds.min / this.from.decimal;
          this.from.max = res.data.data.mds.max / this.from.decimal;
          this.from.fee = res.data.data.mds.fee / this.from.decimal;
          this.from.address = res.data.data.mds.toAddress;
          this.to.min = res.data.data.emds.min / this.to.decimal;
          this.to.max = res.data.data.emds.max / this.to.decimal;
          this.to.fee = res.data.data.emds.fee / this.to.decimal;
          this.to.address = res.data.data.emds.toAddress;
          this.switchFunc()
        } else {
          this.toastInfo = 'System Init Error!';
        }
      })
    },
    sendMDS(orderNo) {

      var assets = parseFloat(this.from.assets) * parseInt(this.from.decimal);
      assets = assets.toString(16);
      var len = assets.length;
      for (let i = 0; i < 64 - len; i++) {
        assets = '0' + assets;
      }

      let _this = this;

      web3.eth.sendTransaction({
        'from': web3.eth.accounts[0],
        'to': '0x66186008c1050627f979d464eabb258860563dbe',
        'value': '0x0',
        'data': '0x' + 'a9059cbb' + '000000000000000000000000' + this.from.address.substr(2, this.from.address.length).toLowerCase() + assets
      }, function (error, hash) {
        if (hash) {
          _this.$http.post(_this.globalData.domain + _this.finishOrderUrl, {
            'address': web3.eth.accounts[0],
            'orderNo': orderNo,
            'hash': hash
          }, {
            'emulateJSON': true
          }).then(res => {
            if (res.data.success) {
              $('#successModal').modal('show');
              _this.from.assets = '';
              _this.to.assets = '';
              _this.toAddress = '';
            } else {
              _this.toastInfo = 'System Error!';
            }
          })
        } else {
          _this.toastInfo = error.message;
        }
      });
    },
    sendEMDS(orderNo) {
      // isLogin
      user.getAccount().then((res) => {
        $(".login").hide()
        $(".personal").show()
        $(".currentAccount").html(res.name)

        const eos = user.getEos()

        eos.transaction({
          actions: [{
            account: 'medisharesbp',
            name: 'transfer',
            authorization: [{
              actor: res.name,
              permission: res.authority
            }],
            data: {
              from: res.name,
              to: this.from.address,
              quantity: parseFloat(this.from.assets).toFixed(4) + ' EMDS',
              memo: 'EMDS Exchange'
            }
          }]
        }).then(
          result => {
            this.$http.post(this.globalData.domain + this.finishOrderUrl, {
              'address': res.name,
              'orderNo': orderNo,
              'hash': result.transaction_id
            }, {
              'emulateJSON': true
            }).then(res => {
              if (res.data.success) {
                $('#successModal').modal('show');
                this.from.assets = '';
                this.to.assets = '';
                this.toAddress = '';
              } else {
                this.toastInfo = 'System Error!';
              }
            })
          },reject=>{
              this.toastInfo = JSON.parse(reject).error.details[0].message;
          }
        ).catch(error => {
          console.log(JSON.stringify(error.message))
          this.toastInfo = JSON.stringify(error.message);
        })
      }, () => {
        // 未安装 scatter 或 登录失败
        this.toastInfo = this.$t('connect_scatter')
      })
    }
  },
  components: {
    foot,
    mdsToast,
    mdsAlert
  }
}
</script>

<style scoped>
#successModel .info {
  font-size: 14px;
  font-weight: 500;
}

.modal-content .modal-title {
  margin-bottom: 30px;
}

.modal-close {
  border: none;
  padding: 18px 0px;
  background: #007aff;
  color: #fff;
  display: inline-block;
  border-radius: 8px;
  margin-top: 84px;
  width: 200px;
}

.cross-chain {
  padding: 100px 0;
  background: url('../../static/img/crossChain/01.png')no-repeat 90% 10% /500px, url('../../static/img/crossChain/02.png')no-repeat -140px 115%/284px, url('../../static/img/crossChain/03.png')no-repeat 16% 33%/120px, linear-gradient(to bottom, #f6f6f6, #acbabf 70%);
}

.cross-chain .title {
  font-size: 48px;
}

.uppercase,
label {
  text-transform: uppercase;
}

.slogan {
  font-family: Gotham-Medium;
  font-size: 20px;
  line-height: 1.33;
  text-align: center;
  padding: 10px 40px;
}

.slogan a{
  color:#007aff;
  text-decoration:underline;
}

form {
  background: #fff;
  border-top: 8px solid #c8d2d7;
  border-radius: 4px;
  margin-top: 80px;
  padding: 52px 92px 84px;
}

.low-amount {
  margin: 10px 0;
  color: var(--light-grey-blue);
}

.equal {
  color: var(--blueGrey);
  margin-top: 8px;
}

.cross-chain .basic-input {
  background: transparent;
  border: 1px solid var(--light-grey-blue);
}

.cross-chain .error {
  border: 1px solid var(--orangeRed);
}

.cross-chain .confirm {
  background: #007aff;
}

.error-tip {
  color: var(--orangeRed);
  margin-top: 8px;
}

.mobile-trans {
  text-align: right;
  padding-top: 24px;
  display: none;
}

@media(max-width: 768px) {
  .cross-chain {
    padding: 32px 0;
    background: url('../../static/img/crossChain/01.png')no-repeat 240px 0 /230px, url('../../static/img/crossChain/02.png')no-repeat -75px 110%/150px, url('../../static/img/crossChain/03.png')no-repeat -30px 125px/80px, linear-gradient(to bottom, #f6f6f6, #acbabf);
  }

  .cross-chain .title {
    font-size: 24px;
  }

  .slogan {
    font-size: 10px;
    padding: 10px 16px;
  }

  form {
    padding: 24px 16px 32px;
    margin-top: 32px;
  }

  label {
    margin: 8px 0;
  }
}
</style>
