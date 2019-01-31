<template>
<div class="project-container support-box">
  <div class="container support">
    <h4 class="title">{{$t('support_list')}}</h4>
    <div class="subtitle">{{$t('support_list_subtitle')}}</div>
    <div class="dropdown">
      <p class="dropdown-toggle" data-toggle="dropdown"><span>{{$t('delivery_status' + selectedType)}}</span><span class="tri"></span></p>
      <ul class="dropdown-menu">
        <li v-for="(item,index) in selectList" :key="index" @click="changeSelect(item)">{{$t('delivery_status'+item)}}</li>
      </ul>
    </div>
    <div class="row support-list">
      <div class="hidden-xs">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>{{$t('numbering')}}</th>
              <th>{{$t('name')}}</th>
              <th>{{$t('contact')}}</th>
              <th>{{$t('address')}}</th>
              <th>{{$t('quantity')}}</th>
              <th>{{$t('gear')}}/{{$t('amount')}}</th>
              <th>{{$t('delivery_status')}}</th>
            </tr>
          </thead>
          <tbody v-if="allList.length>0">
            <template v-if="supportList.length>0">
              <tr v-for="(item,index) in supportList" :key="index">
                <td>{{index+1}}</td>
                <td>{{item.name}}</td>
                <td>{{item.mobile}}</td>
                <td>{{item.area}}, {{item.address}}</td>
                <td>{{item.num}}</td>
                <td class="price">{{$t('gear'+item.level)}}<br>{{item.money}} {{item.targetToken}}</td>
                <td class="status">
                  <span v-if="item.status==4">{{$t('delivery_status4')}}</span>
                  <span v-else class="status0" @click="changeStatus(item)">{{$t('delivery_status3')}}</span>
                </td>
              </tr>
            </template>
            <template v-else>
              <!-- 已发货为0 -->
              <tr v-if="sendOutList.length<=0" class="list-null">
                <td colspan="7">{{$t('sendOut_none')}}</td>
              </tr>
              <!-- 待发货为0 -->
              <tr v-if="unsentList.length<=0" class="list-null">
                <td colspan="7">{{$t('unsent_none')}}</td>
              </tr>
            </template>

          </tbody>
          <!-- 无人购买 -->
          <tr v-if="allList.length<=0" class="list-null">
            <td colspan="7">{{$t('support_none')}}</td>
          </tr>
        </table>
      </div>
      <ul class="hidden-sm hidden-md hidden-lg" v-if='allList.length>0'>
        <template v-if="supportList.length>0">
          <li v-for="(item,index) in supportList" :key="index">
            <div class="serial-number">{{index+1}}</div>
            <div class="support-info">
              <p>{{item.name}}</p>
              <p>{{item.area}}, {{item.address}}</p>
              <h5>{{$t('gear'+item.level)}} : {{item.money}} {{item.targetToken}}</h5>
              <p>{{$t('quantity')}} : {{item.num}}</p>
              <p>{{item.mobile}}</p>
            </div>
            <div class="status">
              <span v-if="item.status==4">{{$t('delivery_status4')}}</span>
              <span v-else class="status0" @click="changeStatus(item)">{{$t('delivery_status3')}}</span>
            </div>
          </li>
        </template>
        <template v-else>
          <!-- 已发货为0 -->
          <div v-if="sendOutList.length<=0" class="list-null">{{$t('sendOut_none')}}</div>
          <!-- 待发货为0 -->
          <div v-if="unsentList.length<=0" class="list-null">{{$t('unsent_none')}}</div>
        </template>
      </ul>
      <!-- 无人购买 -->
      <div v-if="allList.length<=0" class="list-null hidden-sm hidden-md hidden-lg">{{$t('support_none')}}</div>
    </div>
    <div v-if="supportList.length>0&&isOver" class="bottom-line"><span>{{$t('bottom_line')}}</span></div>
  </div>
  <loading v-if="!isLoaded"></loading>
</div>
</template>

<script>
import user from 'static/js/user'
import loading from '@/base/loading'
export default {
  data() {
    return {
      supportUrl: '/apiOrder/supportList',
      sendOutUrl: '/apiOrder/sendOut',
      page: 1,
      selectedType: 2,
      selectList: [2, 3, 4], //2:全部 3:待发货,4:已发货
      allList: [], //全部列表
      sendOutList: [], //已发货列表
      unsentList: [], //待发货列表
      supportList: [],
      isLoaded: false,
      id: this.$route.params.id ? this.$route.params.id : '',
      isOver: false
    }
  },
  mounted() {
    this.getSupportList()
  },
  updated() {
    $(window).scroll(() => {
      this.getMore();
    })
  },
  methods: {
    getSupportList() {
      this.$http.post(this.globalData.domain + this.supportUrl, {
        crowdfundingID: this.id,
        page: this.page
      }, {
        'emulateJSON': true
      }).then(res => {
        if (res.data.success) {
          this.isLoaded = true
          if (res.data.data.length > 0) {
            this.allList = this.allList.concat(res.data.data)
            this.supportList = this.allList
            this.allList.map(item => {
              if (item.status == 3) {
                this.unsentList.push(item)
              }
            })
            if (res.data.data.length < 10) {
              this.isOver = true
            }
          } else {
            this.isOver = true
          }
        }
      })
    },
    getMore() {
      if ($('.support-box').length > 0) {
        if ($(window).scrollTop() >= $('.support').outerHeight(true) + $('.support').offset().top - $(window).height()) {
          this.page++
          console.log(this.page)
          if (this.selectedType == 3 || this.selectedType == 4) {
            this.getMoreList(this.selectedType)
          } else {
            this.getSupportList()
          }
        }
      }
    },
    getMoreList(status) {
      this.isOver = false
      this.$http.post(this.globalData.domain + this.supportUrl, {
        crowdfundingID: this.id,
        status: status,
        page: this.page
      }, {
        'emulateJSON': true
      }).then(res => {
        if (res.data.success) {
          if (res.data.data.length > 0) {
            if (status == 3) {
              this.unsentList = this.unsentList.concat(res.data.data)
              this.supportList = this.unsentList
            } else if (status == 4) {
              this.sendOutList = this.sendOutList.concat(res.data.data)
              this.supportList = this.sendOutList
            }
            if (res.data.data.length < 10) {
              this.isOver = true
            }
          } else {
            this.isOver = true
          }
        }
      })
    },
    changeSelect(item) {
      this.isLoaded = false
      this.isOver = false
      this.selectedType = item
      this.page = 1
      // 调接口
      if (item == 2) {
        item = ''
      }
      this.$http.post(this.globalData.domain + this.supportUrl, {
        crowdfundingID: this.id,
        status: item,
        page: this.page
      }, {
        'emulateJSON': true
      }).then(res => {
        if (res.data.success) {
          this.isLoaded = true
          if (item == 3) {
            this.unsentList = res.data.data
          } else if (item == 4) {
            this.sendOutList = res.data.data
          }
          this.allList = res.data.data
          this.supportList = res.data.data
          if (res.data.data.length < 10) {
            this.isOver = true
          }
        }
      })
    },
    changeStatus(item) {
      user.getAccount().then((currentAccount) => {
        $(".login").hide()
        $(".personal").show()
        $(".currentAccount").html(currentAccount.name)

        this.$http.post(this.globalData.domain + this.sendOutUrl, {
          orderNo: item.orderNo,
          account: currentAccount.name
        }, {
          'emulateJSON': true
        }).then(res => {
          if (res.data.success) {
            item.status = 4
          }
        })
      }, () => {
        // 未安装 scatter 或 登录失败
        this.toastInfo = this.$t('connect_scatter')
      })
    }
  },
  components: {
    loading
  }
}
</script>

<style scoped>
span {
  vertical-align: middle;
}

.support {
  padding: 40px 48px;
}

.dropdown {
  float: right;
  margin-top: 60px;
  border: 1px solid var(--light-grey-blue);
  padding: 16px 24px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.dropdown-menu {
  width: 100%;
  text-align: center;
  min-width: auto;
  margin-top: 8px;
  border-color: var(--light-grey-blue);
  padding: 8px 0;
}

.dropdown-menu li {
  padding: 8px 4px;
  font-size: 16px;
}

.support-list {
  margin-top: 140px;
}

.table>thead>tr>th {
  padding: 24px 24px 8px;
  border: none;
  color: var(--blueGrey);
  font-family: Gotham-Medium;
  font-weight: 500;
}

.table>thead>tr>th:last-child {
  padding: 24px 32px 8px;
}

.table>tbody>tr>td {
  padding: 24px;
  color: #000;
  border: none;
}

.table tr {
  border-bottom: 1px solid var(--paleBlue);
}

.table>tbody>tr:last-of-type {
  border: none;
}

.table-striped>tbody>tr:nth-of-type(odd) {
  background: #fff;
}

.table-striped>tbody>tr:nth-of-type(even) {
  background: var(--bgColor);
}

tr.list-null {
  border: none;
}

.list-null {
  padding: 120px 16px;
  text-align: center;
}

.list-null td {
  padding: 120px 16px;
  font-size: 16px;
  color: var(--blueGrey);
  text-align: center;
}

.status span {
  font-size: 16px;
  font-family: Gotham-Medium;
  font-weight: 500;
  color: var(--primaryColor);
  line-height: 24px;
  padding: 8px 16px;
  display: inline-block;
  min-width: 80px;
}

.status .status0 {
  background: var(--primaryColor);
  color: #FFF;
  border-radius: 4px;
  cursor: pointer;
}

.support-list li {
  border-top: 1px solid var(--paleBlue);
  padding: 16px;
  position: relative;
  color: #000;
}

.serial-number {
  float: left;
  padding: 0 16px 0 8px;
}

.support-info {
  overflow: hidden;
}

.support-list li .status {
  position: absolute;
  right: 16px;
  bottom: 16px;
}

.support-list li p {
  margin-bottom: 8px;
}

.support-list li h5 {
  font-size: 14px;
  font-family: Gotham-Medium;
  font-weight: 500;
  margin: 16px 0 8px;
}

.bottom-line {
  text-align: center;
  margin-top: 50px;
  position: relative;
}

.bottom-line span {
  display: inline-block;
  padding: 0 20px;
  background: #fff;
  position: relative;
  z-index: 10;
}

.bottom-line:after {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 0;
  border-top: 1px solid var(--paleBlue);
  z-index: 5;
}

@media (max-width: 992px) {
  .table>thead>tr>th {
    padding: 16px 10px 8px;
  }

  .table>tbody>tr>td {
    padding: 16px 10px;
  }
}

@media (max-width: 767px) {
  .support {
    padding: 24px 15px;
  }

  .dropdown {
    margin-top: 24px;
  }

  .support-list {
    margin-top: 92px;
  }
}
</style>
