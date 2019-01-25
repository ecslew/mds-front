<template>
<div class="order">
  <section class="detail">
    <div class="container">
      <div class="row">
        <div class="col-sm-8">
          <div class="edit" @click="editOrder">{{$t('editor')}}</div>
          <h4 class="select-title">{{$t('order_detail')}}</h4>
          <ul class="order-info">
            <li>
              <h5>{{$t('project_name')}}:</h5>
              <p>{{orderList.programs.title}}</p>
            </li>
            <li>
              <h5>{{$t('order')}}:</h5>
              <p>
                <span>{{$t('gear'+orderList.id)}} : {{orderList.unit}} kg</span>
              </p>
            </li>
            <li>
              <h5>{{$t('quantity')}}:</h5>
              <p>{{orderList.number}}</p>
            </li>
            <li>
              <h5>{{$t('total_amount')}}:</h5>
              <p>{{orderList.sum*orderList.number}} EUSD</p>
            </li>
          </ul>
          <div class="order-info">
            <!-- 无收货地址 -->
            <div v-if="addressList.length==0" class="no-address" data-target="#addAddress" data-toggle="modal">+ {{$t('add_shipping_address')}}</div>
            <!-- 有收货地址 -->
            <template v-else>
              <div v-if="!defaultAddress" class="no-address" data-target="#changeAddress" data-toggle="modal">+ {{$t('add_shipping_address')}}</div>
              <div v-else>
                <h4>{{defaultAddress?defaultAddress.name:''}} {{defaultAddress?defaultAddress.mobile:''}}</h4>
                <p>{{defaultAddress?defaultAddress.area:''}}, {{defaultAddress?defaultAddress.address:''}} ;</p>
                <a class="change-address" href="#changeAddress" data-toggle="modal">{{$t('change_shipping_address')}}</a>
              </div>
            </template>
          </div>
          <div class="confirm" @click="payment">{{$t('payment')}}</div>
        </div>
      </div>
    </div>
  </section>
  <foot></foot>
  <!-- 更换地址 -->
  <div class="modal" id="changeAddress">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">{{$t('address_pl')}}</h4>
        <div class="add" data-target="#addAddress" data-toggle="modal" data-dismiss="modal">+{{$t('add_address')}}</div>
        <ul class="select-list" v-if="addressList.length>0">
          <li v-for="(item,index) in addressList" :key="index" :class="{selected:item.isSelected}">
            <div class="list-top" @click="selectAddress(item)">
              <h4>{{item.name}} {{item.mobile}}</h4>
              <p>{{item.address}}, {{item.address}} ;</p>
            </div>
            <div class="btn-box">
              <a href="#editAddress" data-dismiss="modal" data-toggle="modal" class="editor" @click="editModal(item,index)">{{$t('editor')}}</a>
              <a href="#deleteAddress" data-toggle="modal" class="delete" @click="deleteModal(index,item.addressNo)">{{$t('delete')}}</a>
            </div>
          </li>
        </ul>
        <div v-else class="text-center">{{$t('no_address')}}，{{$t('add_shipping_address')}}</div>
        <div class="confirm" @click="setDefaultAddress(selectedAddress)">{{$t('confirm')}}</div>
      </div>
    </div>
  </div>
  <!-- 新增地址弹窗 -->
  <add-address :addressList="addressList" @defaultAddress="setDefaultAddress" :isOrder="isOrder"></add-address>
  <!-- 编辑地址 -->
  <edit-address :addressList="addressList" :edit="edit" @defaultAddress="setDefaultAddress" :isOrder="isOrder"></edit-address>
  <!-- 删除地址 -->
  <delete-address :id="deleteItem.id" :index="deleteItem.index" @deleteAddress="deleteAddress"></delete-address>
  <alert-modal :info='alertInfo'></alert-modal>
  <mds-toast :toastInfo='toastInfo' :isWarn="isWarn" @toast="infoByToast"></mds-toast>
</div>
</template>

<script>
import alertModal from '@/base/alert'
import mdsToast from '@/base/toast'
import addAddress from '@/base/address-add'
import editAddress from '@/base/address-edit'
import deleteAddress from '@/base/address-delete'
import foot from '@/base/foot'
import user from 'static/js/user'
export default {
  data() {
    return {
      getListUrl: '​/apiAddress/getList',
      deleteUrl: '​/apiAddress/delete',
      alertInfo: '',
      toastInfo: '',
      isWarn: false,
      isOrder: true,
      orderList: {
        programs: {
          title: 'loading...'
        },
        id: 1,
        unit: 0,
        number: 0,
        sum: 0
      },
      id: '',
      addressList: [],
      defaultAddress: null,
      edit: {
        addressNo: '',
        name: '',
        mobile: '',
        area: '',
        address: ''
      },
      selectedAddress: null,
      deleteItem: {
        id: '',
        index: ''
      }
    }
  },
  mounted() {
    this.getList()

    this.getOrder()
  },
  methods: {
    infoByToast(val) {
      this.toastInfo = val
    },
    // 获取订单信息
    getOrder() {
      if (this.$route.params.order) {
        this.orderList = this.$route.params.order
        this.id = this.$route.params.id
      }
    },
    // 编辑订单
    editOrder() {
      this.$router.push({
        name: 'projectPurchase',
        query: {
          id: this.id
        },
        params: {
          'order': this.orderList
        }
      })
    },
    // 获取地址
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
            this.addressList = res.data.data.pageData
            this.addressList.map((list) => {
              this.$set(list, 'isSelected', false);
            })
            if (this.addressList.length) {
              this.setDefaultAddress(this.addressList[0])
            } else {
              this.isOrder = false
            }
          } else {
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
    //设置默认地址
    setDefaultAddress(obj) {
      this.isOrder = true
      this.defaultAddress = JSON.parse(JSON.stringify(obj))
      this.selectAddress(obj)
      $("#changeAddress").modal('hide')
    },
    // 更改选中地址样式
    selectAddress(selectItem) {
      this.addressList.map((list) => {
        this.$set(list, 'isSelected', false);
      })
      selectItem.isSelected = true
      this.selectedAddress = selectItem
    },
    // 编辑地址弹窗显示
    editModal(item, index) {
      this.edit = JSON.parse(JSON.stringify(item))
      this.edit.index = index
      this.selectAddress(item)
    },
    deleteModal(index, id) {
      this.deleteItem.index = index
      this.deleteItem.id = id
    },
    // 删除地址
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
            if (this.addressList.length) {
              if (this.selectedAddress.addressNo == id) {
                this.selectedAddress = this.addressList[0]
              }
              this.isOrder = true
              this.defaultAddress = JSON.parse(JSON.stringify(this.selectedAddress))
              this.selectAddress(this.selectedAddress)
            } else {
              this.isOrder = false
            }
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
    payment() {

    }
  },
  components: {
    foot,
    alertModal,
    mdsToast,
    addAddress,
    editAddress,
    deleteAddress
  }
}
</script>

<style scoped>
.detail {
  background: #fff;
  padding: 96px 0;
}

.select-title {
  font-size: 20px;
  font-family: Gotham-Medium;
  font-weight: 500;
  line-height: 1.6;
}

.edit {
  cursor: pointer;
  float: right;
  font-size: 20px;
  line-height: 1.6;
  color: var(--blueColor);
}

.order-info {
  background: var(--bgColor);
  padding: 32px 48px;
  border-radius: 4px;
  margin-top: 32px;
}

.order-info>li {
  padding: 0 0 32px 120px;
  position: relative;
}

.order-info>li:last-child {
  padding-bottom: 0;
}

.order-info>li h5 {
  position: absolute;
  left: 0;
  top: 0;
  font-family: Gotham-Medium;
  font-weight: 600;
  line-height: 1.7;
}

.order-info>li span {
  margin-right: 40px;
}

.no-address {
  text-decoration: underline;
  color: var(--blueColor);
  text-align: center;
  font-size: 20px;
  font-family: Gotham-Medium;
  font-weight: 500;
  padding: 32px 0;
  cursor: pointer;
}

.order-info h4 {
  font-family: Gotham-Medium;
  font-weight: 500;
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 8px;
}

.order-info .change-address {
  display: block;
  font-size: 16px;
  color: var(--blueColor);
  margin-top: 32px;
}

.select-list li {
  border: 1px solid var(--paleBlue);
  border-radius: 4px;
  margin-bottom: 24px;
  padding: 24px;
}

.select-list li.selected {
  border-color: var(--darkColor);
}

.select-list .list-top {
  padding-left: 40px;
  background: url(../../static/img/icon/no_select.png)no-repeat left top/24px;
}

.select-list .selected .list-top {
  background-image: url(../../static/img/icon/web_icon_ok.png);
}

.select-list h4 {
  font-family: Gotham-Medium;
  font-weight: 500;
  font-size: 20px;
  line-height: 1.2;
  margin-bottom: 16px;
}

.btn-box {
  text-align: right;
}

.btn-box .delete {
  padding: 0;
}

.add {
  color: var(--blueColor);
  text-align: right;
  font-size: 16px;
  margin: 24px 0;
  cursor: pointer;
}

.modal p {
  word-wrap: break-word;
}

#changeAddress .modal-content {
  padding: 24px;
}

@media(max-width: 768px) {
  .detail {
    padding: 32px 0;
  }

  .select-title,
  .edit {
    font-size: 16px;
  }

  .order-info {
    padding: 16px;
    margin-top: 24px;
  }

  .order-info>li {
    padding: 0 0 24px 0;
  }

  .order-info>li h5 {
    position: relative;
    margin-bottom: 8px;
  }

  .select-list li {
    padding: 16px;
  }

  .select-list h4 {
    font-size: 16px;
  }

  .no-address {
    font-size: 16px;
  }
}
</style>
