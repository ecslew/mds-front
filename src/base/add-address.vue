<template>
<div>
  <div class="modal" id="addAddress">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">{{$t('add_address')}}</h4>
        <label>{{$t('contact_name')}}</label>
        <input type="text" class="basic-input" v-model="add.name" :placeholder="$t('contact_name_pl')">
        <label>{{$t('contact')}}</label>
        <input type="tel" class="basic-input" v-model="add.telephone" :placeholder="$t('contact_pl')">
        <label>{{$t('address')}}</label>
        <input type="text" class="basic-input" v-model="add.address" :placeholder="$t('address_pl')">
        <label>{{$t('address_detail')}}</label>
        <input type="text" class="basic-input" v-model="add.address_detail" :placeholder="$t('address_detail_pl')">
        <div class="start" @click="addAddress">{{$t('save')}}</div>
      </div>
    </div>
  </div>
  <mds-toast :toastInfo='toastInfo' @toast="infoByToast"></mds-toast>
</div>
</template>

<script>
import mdsToast from '@/base/toast'
import user from 'static/js/user'
export default {
  props: ['addressList'],
  data() {
    return {
      toastInfo: '',
      defaultAddress: {},
      add: {}
    }
  },
  methods: {
    infoByToast: function (val) {
      this.toastInfo = val
    },
    addAddress() {
      if (!this.add.name) {
        this.toastInfo = this.$t('contact_name_pl')
        return false
      }
      if (!this.add.telephone) {
        this.toastInfo = this.$t('contact_pl')
        return false
      }
      if (!/^1[3-8]\d{9}$/.test(this.add.telephone)) {
        this.toastInfo = this.$t('contact_error')
        return false
      }
      if (!this.add.address) {
        this.toastInfo = this.$t('address_error')
        return false
      }
      if (!this.add.address_detail) {
        this.toastInfo = this.$t('address_detail_error')
        return false
      }
      // id 后期从接口获得，此处仅做站位
      this.add.id = this.addressList.length + 1
      this.addressList.unshift(this.add)
      this.$emit('defaultAddress', this.add)
      $("#addAddress").modal('hide')
      this.add = {}
    }
  },
  components: {
    mdsToast
  }
}
</script>

<style>
.modal .modal-content {
  padding: 24px;
}

.modal .start {
  display: block;
  text-align: center;
}
</style>
