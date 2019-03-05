<template>
<div>
  <div class="cross-chian">
    <div class="container">
      <div class="title uppercase">{{$t('cross_chain_title')}}</div>
      <div class="slogan">{{$t('cross_chain_slogan')}}</div>
      <form>
        <div class="row">
          <div class="col-xs-5">
            <label>{{$t('cross_chain_from')}}</label>
            <div class="basic-group">
              <!-- FROM -->
              <input class="basic-input" type="number" v-model="from.assets" :placeholder="$t('cross_chain_assets')" @input="changeAmount">
              <span class="target-token">{{from.name}}</span>
            </div>
          </div>
          <div class="col-xs-2 trans" @click="switchFunc"><img src="static/img/crossChain/zhuanhuan.png"></div>
            <div class="col-xs-5">
              <label>{{$t('cross_chain_to')}}</label>
              <div class="basic-group">
                <!-- TO -->
                <input class="basic-input" type="number" v-model="to.assets" :placeholder="$t('cross_chain_assets')">
                <span class="target-token">{{to.name}}</span>
              </div>
            </div>
          </div>
          <div class="low-amount"><span>{{$t('cross_chain_low')}}</span>：{{low_amount}} {{from.name}}</div>
          <!-- <label>{{from.name}} {{$t('amount')}}</label>
          <div class="basic-group">
            <input class="basic-input" type="text" :placeholder="$t('cross_chain_assets')" @change="changeTransferAmount" v-model="transfer_amount">
            <span class="target-token">{{from.name}}</span>
            <div class="error-tip" v-if="isError&&transfer_amount-0<low_amount">{{$t('cross_chain_error_tip1')}} {{from.name}} {{$t('cross_chain_error_tip1')}} {{low_amount}} {{from.name}}</div>
            <div class="equal" v-else>≈ {{parseFloat(equal_amount).toFixed(4)}} {{to.name}}</div>
          </div> -->
          <!-- 接收地址 -->
          <label>{{$t('receive_address')}}</label>
          <input class="basic-input" type="text" :placeholder="$t('cross_chain_account')">
          <a class="confirm" @click="nextStep">{{$t('next_step')}}</a>
      </form>
    </div>
  </div>
  <foot></foot>
  <mds-toast :toastInfo='toastInfo' :isWarn="isWarn" @toast="infoByToast"></mds-toast>
</div>
</template>

<script>
import foot from '@/base/foot'
import mdsToast from '@/base/toast'
export default {
  data() {
    return {
      from: {
        name: 'MDS',
        assets: ''
      },
      to: {
        name: 'EMDS',
        assets: ''
      },
      low_amount: 100,
      toastInfo: '',
      isWarn: true
      // transfer_amount: '',
      // equal_amount: 0,
      // isError: false
    }
  },
  methods: {
    infoByToast(val) {
      this.toastInfo = val
    },
    changeAmount() {
      this.to.assets = this.from.assets
    },
    switchFunc() {
      let place = this.from
      this.from = this.to
      this.to = place
    },
    nextStep() {

    }
    // changeTransferAmount() {
    //   this.isError = true
    //   if (this.transfer_amount - 0 > 1000) {
    //     this.toastInfo = this.$t('transfer_max_limit')
    //     this.transfer_amount = 1000
    //   }
    //   this.equal_amount = this.transfer_amount
    // }
  },
  components: {
    foot,
    mdsToast
  }
}
</script>

<style scoped>
.cross-chian {
  padding: 140px 0;
  background: url('../../static/img/crossChain/01.png')no-repeat 90% 10% /500px, url('../../static/img/crossChain/02.png')no-repeat -140px 115%/284px, url('../../static/img/crossChain/03.png')no-repeat 16% 33%/120px, linear-gradient(to bottom, #f6f6f6, #acbabf);
}

.uppercase,
label {
  text-transform: uppercase;
}

.slogan {
  font-family: Gotham-Medium;
  font-weight: 500;
  font-size: 24px;
  line-height: 1.33;
  text-align: center;
  padding: 10px 40px;
}

form {
  background: #fff;
  border-top: 8px solid #c8d2d7;
  border-radius: 4px;
  margin-top: 120px;
  padding: 84px 92px;
}

.low-amount {
  margin: 10px 0;
  color: var(--light-grey-blue);
}

.equal {
  color: var(--blueGrey);
  margin-top: 8px;
}

.trans {
  text-align: center;
  padding-top: 58px;
  cursor: pointer;
}

.trans img {
  width: 64px;
}

.cross-chian .basic-input {
  background: transparent;
  border: 1px solid var(--light-grey-blue);
}

.cross-chian .error {
  border: 1px solid var(--orangeRed);
}

.cross-chian .confirm {
  background: var(--blueColor);
}

.error-tip {
  color: var(--orangeRed);
  margin-top: 8px;
}

@media(max-width: 768px) {
  .cross-chian {
    padding: 32px 0;
    background: url('../../static/img/crossChain/01.png')no-repeat 240px 0 /230px, url('../../static/img/crossChain/02.png')no-repeat -75px 110%/150px, url('../../static/img/crossChain/03.png')no-repeat -30px 125px/80px, linear-gradient(to bottom, #f6f6f6, #acbabf);
  }

  .slogan {
    font-size: 12px;
  }

  form {
    padding: 0 12px 32px;
    margin-top: 32px;
  }

  .trans {
    padding: 70px 0 0;
  }

  .col-xs-5 {
    padding-right: 0;
  }

  .trans+.col-xs-5 {
    padding-left: 0;
    padding-right: 15px;
  }

  .trans img {
    width: 44px;
  }
}
</style>
