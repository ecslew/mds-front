<template>
<div class="address-list">
  <h4>{{name}} {{telephone}}</h4>
  <p>{{address}}, {{address_detail}} ;</p>
  <div class="btn-box">
    <a class="editor" data-toggle="modal" :data-target="'#edit'+index">{{$t('editor')}}</a>
    <a href="javascript:;" class="delete" @click="deleteAddress">{{$t('delete')}}</a>
  </div>
  <div class="modal" :id="'edit'+index">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">{{$t('edit_address')}}</h4>
        <label>{{$t('contact_name')}}</label>
        <input type="text" class="basic-input" v-model="name" :placeholder="$t('contact_name_pl')">
        <label>{{$t('contact')}}</label>
        <input type="tel" class="basic-input" v-model="telephone" :placeholder="$t('contact_pl')">
        <label>{{$t('address')}}</label>
        <input type="text" class="basic-input" v-model="address" :placeholder="$t('address_pl')">
        <label>{{$t('address_detail')}}</label>
        <input type="text" class="basic-input" v-model="address_detail" :placeholder="$t('address_detail_pl')">
        <div class="start" @click="editAddress">{{$t('save')}}</div>
      </div>
    </div>
  </div>
  <mds-toast :toastInfo='toastInfo' @toast="infoByToast"></mds-toast>
</div>
</template>

<script>
import mdsToast from '@/base/toast'
export default {
  props: ['id', 'name', 'telephone', 'address', 'address_detail', 'index'],
  data() {
    return {
      toastInfo: ''
    }
  },
  methods: {
    infoByToast(val) {
      this.toastInfo = val
    },
    editAddress(e) {
      if (!this.name) {
        this.toastInfo = this.$t('contact_name_pl')
        return false
      }
      if (!this.telephone) {
        this.toastInfo = this.$t('contact_pl')
        return false
      }
      if (!/^1[3-8]\d{9}$/.test(this.telephone)) {
        this.toastInfo = ('手机号格式不对')
        return false
      }
      if (!this.address) {
        this.toastInfo = '请选择地址'
        return false
      }
      if (!this.address_detail) {
        this.toastInfo = '请填写详细地址'
        return false
      }
      $('.modal').modal('hide')
    },
    deleteAddress() {
      this.$emit('deleteItem', this.index, this.id)
    }
  },
  components: {
    mdsToast
  }
}
</script>

<style scoped>
.address-list h4 {
  font-size: 20px;
  font-family: Gotham-Medium;
  font-weight: 500;
  line-height: 1.2;
  margin-bottom: 16px;
}

.modal .modal-content {
  padding: 24px;
}

.start {
  display: block;
  text-align: center;
}

@media (max-width: 767px) {
  .address-list h4 {
    font-size: 16px;
    margin-bottom: 12px;
  }
}
</style>
