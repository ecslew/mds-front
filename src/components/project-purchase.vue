<template>
<div class='project-purchase'>
  <div class="container top-container">
    <h4 class="select-title">{{$t('project_name')}}:</h4>
    <div class="title text-left">{{programs.title}}</div>
  </div>
  <section class="select-gear">
    <div class="container">
      <h4 class="select-title">{{$t('choose_gear')}}</h4>
      <div class="row">
        <ul class="col-sm-8 select-list">
          <li v-for="(item,index) in gear" :key="index" :class="{selected:item.isSelected}">
            <div class="list-top" @click="selectGear(item)">
              <h3>{{item.sum}} EUSD</h3>
              <div class="gear-type">{{$t('gear'+(index+1))}} : {{item.unit}} kg</div>
            </div>
            <div class="list-info">
              <div class="row">
                <div class="col-sm-6">
                  <p class="list-title">{{$t('shipping_address')}}</p>
                  <!-- 无收货地址 -->
                  <div v-if="addressList.length==0" class="no-address">
                    <h5>{{$t('no_address')}}</h5>
                    <span :data-target="item.isSelected?'#addAddress':''" data-toggle="modal">{{$t('add_shipping_address')}}</span>
                  </div>
                  <!-- 有收货地址 -->
                  <template v-else>
                    <p>{{defaultAddress.address}},{{defaultAddress.address_detail}}</p>
                    <span :data-target="item.isSelected?'#changeAddress':''" data-toggle="modal" class="change-address">{{$t('change_shipping_address')}}</span>
                  </template>
                </div>
                <div class="col-sm-offset-1 col-sm-5">
                  <p class="list-title">{{$t('delivery_date')}}</p>
                  <p>{{$t('delivery_date_tip')}}</p>
                  <p class="list-title">{{$t('restricted_areas')}}</p>
                  <p>{{$t('restricted_areas_tip')}}</p>
                </div>
              </div>
              <span :class="[{active:addressList.length > 0},'start']" @click="payment">{{$t('payment')}}</span>
            </div>
          </li>
        </ul>
        <div class="col-sm-4 mds_notice">
          <h4>{{$t('mds_notice1')}}</h4>
          <p>{{$t('mds_notice2')}}</p>
        </div>
      </div>
    </div>
  </section>
  <foot></foot>
  <!-- 新增地址弹窗 -->
  <add-address :addressList="addressList" @defaultAddress="setDefaultAddress"></add-address>
  <!-- 更换地址 -->
  <div class="modal" id="changeAddress">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
        <!-- 编辑地址 -->
        <template v-if="isEdit">
          <img src="static/img/icon/back.png" width="32" class="back" @click="isEdit=false">
          <h4 class="modal-title">{{$t('edit_address')}}</h4>
          <label>{{$t('contact_name')}}</label>
          <input type="text" class="basic-input" v-model="edit.name" :placeholder="$t('contact_name_pl')">
          <label>{{$t('contact')}}</label>
          <input type="tel" class="basic-input" v-model="edit.telephone" :placeholder="$t('contact_pl')">
          <label>{{$t('address')}}</label>
          <input type="text" class="basic-input" v-model="edit.address" :placeholder="$t('address_pl')">
          <label>{{$t('address_detail')}}</label>
          <input type="text" class="basic-input" v-model="edit.address_detail" :placeholder="$t('address_detail_pl')">
          <div class="start" @click="editAddress(edit.index)">{{$t('save_use')}}</div>
        </template>
        <!-- 选择地址 -->
        <template v-else>
          <h4 class="modal-title">{{$t('address_pl')}}</h4>
          <div class="add" data-target="#addAddress" data-toggle="modal" data-dismiss="modal">+{{$t('add_address')}}</div>
          <ul class="select-list">
            <li v-for="(item,index) in addressList" :key="item.id" :class="{selected:item.isSelected}">
              <div class="list-top" @click="selectAddress(item)">
                <h4>{{item.name}} {{item.telephone}}</h4>
                <p>{{item.address}}, {{item.address_detail}} ;</p>
              </div>
              <div class="btn-box">
                <a href="javascript:;" class="editor" @click="editModal(item,index)">{{$t('editor')}}</a>
                <a href="javascript:;" class="delete" @click="deleteAddress(item,index)">{{$t('delete')}}</a>
              </div>
            </li>
          </ul>
          <div class="start" @click="setDefaultAddress(selectedAddress)">{{$t('confirm')}}</div>
        </template>
      </div>
    </div>
  </div>
  <alert-modal :info='alertInfo' :title='alertTitle'></alert-modal>
  <mds-toast :toastInfo='toastInfo' @toast="infoByToast"></mds-toast>
</div>
</template>

<script>
import alertModal from '@/base/alert'
import mdsToast from '@/base/toast'
import addAddress from '@/base/add-address'
import foot from '@/base/foot'
import util from 'static/js/util'
import user from 'static/js/user'
import sha from 'js-sha256'
export default {
  props: ['id'],
  data() {
    return {
      currentAccount: '',
      isEdit: false,
      gear: [{
        sum: '10',
        unit: '2'
      }, {
        sum: '20',
        unit: '4'
      }, {
        sum: '30',
        unit: '8'
      }],
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
      }, {
        id: 3,
        name: '树甙芎',
        telephone: '18701936666',
        address: '河北省，邯郸市，肥乡区',
        address_detail: '辛安镇村博爱医院对面'
      }],
      // addressList: [],
      defaultAddress: {},
      edit: {},
      add: {},
      selectedGear: {},
      selectedAddress: {},
      alertInfo: '',
      alertTitle: '',
      toastInfo: '',
      programs: {
        id: 0,
        address: 'loading...',
        img: '',
        title: '爱心助农：陕西富平县柿饼，自然挂霜、满满流心的富平柿饼，舌尖上的美味。',
        complete: 0,
        amount: 0,
        backers: 0,
        release_time: 'loading...',
        restDays: 0,
        support: [],
        info: '',
        crowdfundingNo: '',
        targetAccount: '',
        targetToken: '',
        targetTokenDecimal: '',
        targetTokenContract: '',
        low: 0,
        high: 0
      },
      note: '' //支付备注
    }
  },
  mounted() {
    this.gear.map((list) => {
      this.$set(list, 'isSelected', false);
    })
    this.addressList.map((list) => {
      this.$set(list, 'isSelected', false);
    })
    if (this.addressList.length) {
      this.setDefaultAddress(this.addressList[0])
    }
  },
  methods: {
    infoByToast(val) {
      this.toastInfo = val
    },
    // 选择档位
    selectGear(item) {
      this.gear.map((list) => {
        this.$set(list, 'isSelected', false);
      })
      item.isSelected = true
      this.selectedGear = item
    },
    //设置默认地址
    setDefaultAddress(obj) {
      this.defaultAddress = JSON.parse(JSON.stringify(obj))
      this.selectAddress(obj)
      $("#changeAddress").modal('hide')
      this.isEdit = false
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
      this.isEdit = true
      this.edit = JSON.parse(JSON.stringify(item))
      this.edit.index = index
      this.selectAddress(item)
    },
    // 编辑地址
    editAddress(index) {
      if (!this.edit.name) {
        this.toastInfo = this.$t('contact_name_pl')
        return false
      }
      if (!this.edit.telephone) {
        this.toastInfo = this.$t('contact_pl')
        return false
      }
      if (!/^1[3-8]\d{9}$/.test(this.edit.telephone)) {
        this.toastInfo = this.$t('contact_error')
        return false
      }
      if (!this.edit.address) {
        this.toastInfo = this.$t('address_error')
        return false
      }
      if (!this.edit.address_detail) {
        this.toastInfo = this.$t('address_detail_error')
        return false
      }
      this.setDefaultAddress(this.edit)
      this.addressList[index] = this.edit
    },
    // 删除地址
    deleteAddress(item, index) {
      this.addressList.splice(index, 1)
      this.toastInfo = this.$t('deleted_success')
      if (this.defaultAddress.id == item.id) {
        if (this.addressList.length) {
          this.selectedAddress = this.addressList[0]
        }
      }
      this.defaultAddress = JSON.parse(JSON.stringify(this.selectedAddress))
      this.selectAddress(this.selectedAddress)
    },
    payment() {
      let _this = this
      let amount = this.selectedGear.sum
      let note = this.note

      if (this.addressList.length > 0) {
        // 判断登录
        user.getAccount().then((currentAccount) => {
          this.currentAccount = currentAccount.name;
          $(".login").hide()
          $(".personal").show()
          $(".currentAccount").html(currentAccount.name)

          // 附加信息
          let additional = JSON.stringify({
            "name": this.defaultAddress.name,
            "address": this.defaultAddress.address + this.defaultAddress.address_detail,
            "telephone": this.defaultAddress.telephone
          });

          // 交易
          user.getEos().transaction({
            actions: [{
              account: _this.programs.targetTokenContract,
              name: 'transfer',
              authorization: [{
                actor: _this.currentAccount,
                permission: 'active'
              }],
              data: {
                from: _this.currentAccount,
                to: _this.programs.targetAccount,
                quantity: parseFloat(amount).toFixed(_this.programs.targetTokenDecimal) + ' ' + _this.programs.targetToken,
                memo: '###{"ID":' + _this.programs.id + ',"creator":"' + _this.programs.address + '","comment":"' + note + '","additional":"' + sha.sha256(additional) + '"}###'
              }
            }]
          }).then(
            result => {
              // 成功之后调用我们的log
              var url = _this.globalData.domain + '/apiCrowdfunding/trans';
              var args = {
                crowdfundingNo: _this.programs.crowdfundingNo,
                hash: result.transaction_id,
                amount: amount,
                from: _this.currentAccount,
                to: _this.programs.targetAccount,
                comment: note,
                additional: additional
              };

              $.post(url, args, function (res) {
                if (res.success) {
                  _this.alertInfo = _this.$t('success');
                } else {
                  _this.alertInfo = res.message;
                  $('#alert').modal('show')
                }
              }, 'json')
            }
          ).catch(
            error => {
              // 失败
              _this.alertInfo = error;
              $('#alert').modal('show')
            }
          )
          // end 交易

        }, () => {
          // 未安装 scatter 或 登录失败
          this.toastInfo = this.$t('connect_scatter')
        })
      }
    }
  },
  components: {
    foot,
    alertModal,
    mdsToast,
    addAddress
  }

}
</script>

<style scoped>
.top-container {
  padding: 64px 15px;
}

.select-title {
  font-size: 20px;
  font-family: Gotham-Medium;
  font-weight: 500;
  line-height: 1.6;
}

.title {
  text-align: left;
}

.select-gear {
  background: #fff;
}

.select-gear .select-title {
  padding: 32px 0;
}

.mds_notice {
  font-size: 16px;
  line-height: 1.75;
  padding: 0 15px 24px;
}

.mds_notice h4 {
  font-size: 16px;
  font-family: Gotham-Medium;
  font-weight: 500;
  margin-bottom: 20px;
}

.select-list li {
  font-family: Gotham-Medium;
  font-weight: 500;
  border: 1px solid var(--paleBlue);
  border-radius: 4px;
  margin-bottom: 24px;
  padding: 24px;
}

.select-list li.selected {
  border-color: var(--darkColor);
}

.select-list .list-top {
  padding-left: 60px;
  background: url(../../static/img/icon/no_select.png)no-repeat left top/36px;
}

.select-list .selected .list-top {
  background-image: url(../../static/img/icon/web_icon_ok.png);
}

.select-list h3 {
  font-size: 32px;
  margin-bottom: 4px;
}

.list-info {
  padding: 24px 0 0 60px;
}

.list-title {
  font-family: Gotham-Book;
  font-weight: 400;
}

.list-title+p {
  margin: 8px 0 44px;
  word-wrap: break-word;
}

.change-address {
  color: var(--blueColor);
  display: block;
}

.selected .change-address {
  cursor: pointer;
}

.select-gear .start {
  opacity: 0.5;
  cursor: default;
}

.selected .start.active {
  opacity: 1;
  cursor: pointer;
}

.no-address {
  background: var(--bgColor);
  padding: 32px;
  text-align: center;
  line-height: 1.7;
  margin: 8px 0 24px;
  border-radius: 4px;
}

.no-address h5 {
  font-size: 14px;
  color: var(--blueGrey);
  margin-bottom: 4px;
}

.no-address span {
  color: var(--blueColor);
  text-decoration: underline;
}

.selected .no-address span {
  cursor: pointer;
}

.modal .select-list .list-top {
  background-size: 24px;
  padding-left: 48px;
}

.modal .select-list li.selected {
  border-color: var(--paleBlue);
}

.select-list h4 {
  font-size: 20px;
  line-height: 1.2;
  margin-bottom: 16px;
}

.btn-box {
  text-align: right;
  position: relative;
  padding-right: 86px;
}

.btn-box .delete {
  position: absolute;
  z-index: 100000;
  right: 0;
  top: 0;
}

.add {
  color: var(--blueColor);
  text-align: right;
  font-size: 16px;
  margin: 24px 0;
  cursor: pointer;
}

.modal .back {
  position: fixed;
  left: 24px;
  top: 24px;
  margin: 0;
}

.modal p {
  word-wrap: break-word;
}

@media(max-width: 768px) {
  .top-container {
    padding: 32px 15px;
  }

  .select-title {
    font-size: 16px;
  }

  .select-gear {
    margin-top: 24px;
  }

  .select-gear .select-title {
    padding: 24px 0;
  }

  .select-list li {
    padding: 16px;
  }

  .select-list .list-top {
    background-size: 24px;
    padding-left: 40px !important;
  }

  .select-list .list-info {
    padding-left: 40px;
  }

  .select-list h3 {
    font-size: 24px;
  }

  .change-address {
    margin-bottom: 24px;
  }

  .list-title+p {
    margin: 8px 0 24px;
  }
}
</style>
