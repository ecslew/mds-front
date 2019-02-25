<template>
<div>
  <div class="modal" id="editAddress">
    <div class="modal-dialog" role="document">
      <div class="modal-content" v-if="edit">
        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
        <img  v-if="isOrder" src="static/img/icon/back.png" width="32" class="back" data-dismiss="modal" data-target="#changeAddress" data-toggle="modal">
        <h4 class="modal-title">{{$t('edit_address')}}</h4>
        <label>{{$t('contact_name')}}</label>
        <input type="text" class="basic-input" v-model="edit.name" :placeholder="$t('contact_name_pl')">
        <label>{{$t('contact')}}</label>
        <input type="tel" class="basic-input" v-model="edit.mobile" :placeholder="$t('contact_pl')">
        <label>{{$t('shipping_address')}}</label>
        <input type="text" class="basic-input" v-model="edit.address" :placeholder="$t('shipping_address_pl')">
        <div class="confirm" v-if="isOrder" @click="editAddress(edit.index)">{{$t('save_use')}}</div>
        <div class="confirm" v-else @click="editAddress(edit.index)">{{$t('save')}}</div>
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
  props: ['addressList', 'edit', 'isOrder'],
  data() {
    return {
      editUrl: '/apiAddress/modify',
      toastInfo: '',
      isWarn: true
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
    editAddress(index) {
      this.isWarn = true
      if (!this.edit.name) {
        this.toastInfo = this.$t('contact_name_pl')
        return false
      }
      if (!this.edit.mobile) {
        this.toastInfo = this.$t('contact_pl')
        return false
      }
      if (!/^1[3-8]\d{9}$/.test(this.edit.mobile)) {
        this.toastInfo = this.$t('contact_error')
        return false
      }
      if (!this.edit.address) {
        this.toastInfo = this.$t('address_detail_error')
        return false
      }
      user.getAccount().then((currentAccount) => {
        let params = this.edit
        params.account = currentAccount.name
        this.$http.post(this.globalData.domain + this.editUrl, params, {
          "emulateJSON": true
        }).then((res) => {
          if (res.data.success) {
            this.addressList[index] = this.edit
            this.$emit('defaultAddress', this.edit)
            this.$emit('addressList', this.addressList)
            $("#editAddress").modal('hide')
            this.isWarn = false
            this.toastInfo = this.$t('modify_success')
            this.isPositionFocus = false
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
    // amapWrapper
  }
}
</script>

<style scoped>
.modal .modal-content {
  padding: 24px;
}
</style>
