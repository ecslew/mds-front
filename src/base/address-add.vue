<template>
<div>
  <div class="modal" id="addAddress">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
        <img v-if="isOrder" src="static/img/icon/back.png" width="32" class="back" data-dismiss="modal" data-target="#changeAddress" data-toggle="modal">
        <h4 class="modal-title">{{$t('add_address')}}</h4>
        <label>{{$t('contact_name')}}</label>
        <input type="text" class="basic-input" v-model="add.name" :placeholder="$t('contact_name_pl')">
        <label>{{$t('contact')}}</label>
        <input type="tel" class="basic-input" v-model="add.mobile" :placeholder="$t('contact_pl')">
        <label>{{$t('shipping_address')}}</label>
        <input type="text" class="basic-input" v-model="add.address" :placeholder="$t('shipping_address_pl')">
        <div class="confirm" v-if="isOrder" @click="addAddress">{{$t('save_use')}}</div>
        <div class="confirm" v-else @click="addAddress">{{$t('save')}}</div>
      </div>
    </div>
  </div>
  <mds-toast :toastInfo='toastInfo' :isWarn="isWarn" @toast="infoByToast"></mds-toast>
</div>
</template>

<script>
import mdsToast from '@/base/toast'
import user from 'static/js/user'
export default {
  props: ['addressList', 'isOrder'],
  data() {
    return {
      addUrl: '​/apiAddress/add',
      toastInfo: '',
      isWarn: true,
      add: {}
    }
  },
  directives: {
    focus: {
      // 指令的定义
      inserted(el) {
        el.focus()
      }
    }
  },
  mounted() {
  },
  methods: {
    infoByToast: function (val) {
      this.toastInfo = val
    },
    addAddress() {
      this.isWarn = true
      if (!this.add.name) {
        this.toastInfo = this.$t('contact_name_pl')
        return false
      }
      if (!this.add.mobile) {
        this.toastInfo = this.$t('contact_pl')
        return false
      }
      if (!/^1[3-8]\d{9}$/.test(this.add.mobile)) {
        this.toastInfo = this.$t('contact_error')
        return false
      }
      if (!this.add.address) {
        this.toastInfo = this.$t('address_detail_error')
        return false
      }

      // id 后期从接口获得，此处仅做站位
      user.getAccount().then((currentAccount) => {
        let params = this.add
        params.account = currentAccount.name
        this.$http.post(this.globalData.domain + this.addUrl, params, {
          "emulateJSON": true
        }).then((res) => {
          if (res.data.success) {
            this.add.addressNo = res.data.data.addressNo
            this.addressList.unshift(this.add)
            this.$emit('defaultAddress', this.add)
            $("#addAddress").modal('hide')
            this.add = {}
            this.isWarn = false
            this.toastInfo = this.$t('success')
          } else {
            this.isWarn = true
            this.toastInfo = res.data.message
          }
        }, (err) => {
          console.log(err)
        })
      }, () => {
        // 未安装 scatter 或 登录失败
        this.isWarn = true
        this.toastInfo = this.$t('connect_scatter')
      })

    }
  },
  components: {
    mdsToast
  }
}
</script>

<style scoped>
.modal .modal-content {
  padding: 24px;
}

.map {
  width: 100%;
  height: 400px;
}
</style>
