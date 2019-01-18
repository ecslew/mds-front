<template>
<div class='create-project project-container'>
  <div class="container">
    <div class="row">
      <div class="col-sm-10 col-sm-offset-1">
        <h4 class="title">{{$t('address_manage')}}</h4>
        <div class="subtitle">{{$t('address_manage_subtitle')}}</div>
        <div class="started">{{$t("address_list")}}</div>
        <ul class="list">
          <li v-for="(item,index) in addressList" :key="item.id">
            <address-list @deleteItem="deleteAddress" :index="index" :id="item.id" :name="item.name" :telephone="item.telephone" :address="item.address" :address_detail="item.address_detail"></address-list>
          </li>
          <li class="add-address" data-toggle="modal" data-target="#addAddress">+ {{$t("add_address")}}</li>
        </ul>
      </div>
    </div>
  </div>
  <!-- 新增地址弹窗 -->
  <add-address :addressList="addressList" @defaultAddress="getDefaultAddress"></add-address>
  <mds-toast :toastInfo='toastInfo' @toast="infoByToast"></mds-toast>
</div>
</template>

<script>
import mdsToast from '@/base/toast'
import addressList from '@/base/address-list'
import addAddress from '@/base/add-address'
export default {
  data() {
    return {
      toastInfo: '',
      defaultAddress: {},
      addressList: [{
        id: 1,
        name: 'Evan Lu',
        telephone: '18701936666',
        address: '上海市，浦东新区',
        address_detail: '高行镇高博璐 211 弄 西林雅苑 1 号楼 1808 室'
      }, {
        id: 2,
        name: 'ty',
        telephone: '18701936666',
        address: '上海市，虹口区',
        address_detail: '杨树浦路128号，5号楼中科招商8楼众托帮'
      }]
    }
  },
  mounted() {

  },
  methods: {
    infoByToast(val) {
      this.toastInfo = val
    },
    getDefaultAddress(obj) {
      this.defaultAddress = JSON.parse(JSON.stringify(obj))
    },
    deleteAddress(index, id) {
      this.addressList.splice(index, 1)
      this.toastInfo = this.$t('deleted_success')
    }
  },
  components: {
    mdsToast,
    addressList,
    addAddress
  }
}
</script>

<style scoped>
.list li {
  border: 1px solid #e7ecf0;
  margin-bottom: 24px;
  border-radius: 4px;
  padding: 24px 32px;
  font-size: 16px;
}

.list .add-address {
  text-align: center;
  color: var(--blueColor);
  font-family: Gotham-Medium;
  font-weight: 500;
  font-size: 20px;
  cursor: pointer;
}

.modal .modal-content {
  padding: 24px;
}

.start {
  display: block;
  text-align: center;
}

/* .gender {
  position: relative;
  display: block;
}

.gender input[type="radio"] {
  width: 96px;
  height: 52px;
  position: absolute;
}

.gender input[type="radio"]+span {
  width: 96px;
  height: 52px;
  border-radius: 4px;
  border: 1px solid var(--paleBlue);
  color: var(--paleBlue);
  font-size: 16px;
  line-height: 52px;
  text-align: center;
  display: inline-block;
  margin-right: 24px;
}

.gender input[type="radio"]:checked+span {
  border: 1px solid var(--primaryColor);
  color: var(--primaryColor);
} */

@media (max-width: 767px) {
  .list li {
    margin-bottom: 12px;
    padding: 12px;
    font-size: 14px;
  }

  .list .add-address {
    font-size: 16px;
  }

}
</style>
