<template>
<div class="login-part">
  <div class="modal text-center" id="login" :currentAccount="currentAccount">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">{{$t("log_mds")}}</h4>
        <div class="start" @click="loginByScatter">{{$t("log_scatter")}}</div>
        <div class="loginInfo">{{$t("log_scatter_tip")}}</div>
        <p class="no-scatter">{{$t("log_no_scatter")}} <a href="javascript:;">{{$t("download_here")}}</a></p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import ScatterJS from 'static/js/scatter.min.js';
import Eos from 'static/js/eos.min.js'
export default {
  data() {
    return {
      // EOS RPC 网络设置
      network: {
        blockchain: 'eos',
        protocol: 'https',
        host: 'mainnet.eoscannon.io',
        port: 443,
        chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
      },
      currentAccount: null
    }
  },
  methods: {
    loginByScatter() {
      const that = this
      window.scatter.connect('MY_APP_NAME').then(connected => {
        if (connected) {

          // 删除之前的登录账户
          // window.scatter.forgetIdentity();

          // 登录，获取 EOS 账户
          window.scatter.getIdentity({
            accounts: [that.network]
          }).then(result => {
            that.currentAccount = result.accounts[0];
            $('#login').modal('hide')
            alert('登录成功')
            that.$emit('childByValue', that.currentAccount)
            console.log(that.currentAccount);

          }).catch(error => {
            alert('error:' + JSON.stringify(error));
          });

        } else {
          alert('connect fail');
        }
      });
    }
  }
}
</script>

<style scoped>
.modal-title {
  margin-top: 24px;
}

.loginInfo {
  padding: 96px 24px 32px;
  font-family: Gotham-Medium;
  font-size: 16px;
  line-height: 1.5;
  color: #607d8b;
}

.no-scatter {
  padding: 32px 0 8px;
  font-size: 16px;
  font-family: Gotham-Medium;
  color: #607d8b;
}

.no-scatter a {
  color: #2196f3 !important;
}

@media(max-width: 768px) {
  .modal-title {
    margin: 0;
  }

  .loginInfo {
    padding: 24px 0;
  }

  .no-scatter {
    padding: 24px 0 0;
  }
}
</style>
