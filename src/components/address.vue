<template>
<div class='create-project project-container'>
  <div class="container">
    <div class="row">
      <div class="col-sm-10 col-sm-offset-1">
        <h4 class="title">{{$t('address_manage')}}</h4>
        <div class="subtitle">{{$t('address_manage_subtitle')}}</div>
        <div class="started">{{$t("address_list")}}</div>
        <ul class="list">
          <template v-if='addressList.length>0'>
            <li v-for="(item,index) in addressList" :key="item.addressNo">
              <h4>{{item.name}} {{item.mobile}}</h4>
              <p>{{item.address}} ;</p>
              <div class="btn-box">
                <a href="#editAddress" class="editor" data-toggle="modal" @click="editModal(item,index)">{{$t('editor')}}</a>
                <a href="#deleteAddress" class="delete" data-toggle="modal" @click="deleteModal(index, item.addressNo)">{{$t('delete')}}</a>
              </div>
            </li>
          </template>
          <li class="add-address" data-toggle="modal" data-target="#addAddress">+ {{$t("add_address")}}</li>
        </ul>
      </div>
    </div>
  </div>
  <!-- 新增地址弹窗 -->
  <add-address :addressList="addressList"></add-address>
  <!-- 编辑地址 -->
  <edit-address :addressList="addressList" :edit="edit" @addressList="getAddressList"></edit-address>
  <!-- 删除地址 -->
  <delete-address :id="deleteItem.id" :index="deleteItem.index" @deleteAddress="deleteAddress"></delete-address>
  <mds-toast :toastInfo='toastInfo' @toast="infoByToast"></mds-toast>
  <loading v-if="!isLoaded"></loading>
</div>
</template>

<script>
import loading from '@/base/loading'
import mdsToast from '@/base/toast'
import addAddress from '@/base/address-add'
import editAddress from '@/base/address-edit'
import deleteAddress from '@/base/address-delete'
import user from 'static/js/user'
export default {
  data() {
    return {
      getListUrl: '​/apiAddress/getList',
      deleteUrl: '​/apiAddress/delete',
      toastInfo: '',
      isWarn: true,
      isLoaded: false,
      addressList: [],
      edit: {
        addressNo: '', // 地址编号
        name: '', // 姓名
        address: '', // 详细地址
        mobile: '' // 手机号
      },
      deleteItem: {
        id: '',
        index: ''
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    infoByToast(val) {
      this.toastInfo = val
    },
    getList() {
      user.getAccount().then((currentAccount) => {
        $(".login").hide()
        $(".personal").show()
        $(".currentAccount").html(currentAccount.name)
        this.$http.post(this.globalData.domain + this.getListUrl, {
          account: currentAccount.name
        }, {
          "emulateJSON": true
        }).then((res) => {
          if (res.data.success) {
            this.isLoaded = true
            this.addressList = res.data.data.pageData
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
    },
    // 编辑完成后更改地址列表
    getAddressList(obj) {
      this.addressList = JSON.parse(JSON.stringify(obj))
    },
    // 编辑地址弹窗显示
    editModal(item, index) {
      this.edit = JSON.parse(JSON.stringify(item))
      this.edit.index = index
    },
    deleteModal(index, id) {
      this.deleteItem.index = index
      this.deleteItem.id = id
    },
    deleteAddress(index, id) {
      user.getAccount().then((currentAccount) => {
        this.$http.post(this.globalData.domain + this.deleteUrl, {
          account: currentAccount.name,
          addressNo: id
        }, {
          "emulateJSON": true
        }).then((res) => {
          if (res.data.success) {
            this.addressList.splice(index, 1)
            this.isWarn = false
            this.toastInfo = this.$t('deleted_success')
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
    loading,
    mdsToast,
    addAddress,
    editAddress,
    deleteAddress
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

.list h4 {
  font-size: 20px;
  font-family: Gotham-Medium;
  font-weight: 500;
  line-height: 1.2;
  margin-bottom: 16px;
}

.modal .modal-content {
  padding: 24px;
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

  .list h4 {
    font-size: 16px;
    margin-bottom: 12px;
  }

  .list .add-address {
    font-size: 16px;
  }

}
</style>
