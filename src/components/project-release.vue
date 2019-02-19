<template>
<div class='project-release project-sm-container'>
  <div class="container">
    <div class="row">
      <div class="col-md-8 col-md-offset-2">
        <div class="title">{{$t('basic_project_information')}}</div>
        <!-- <div class="subtitle">{{$t('submit_information')}}</div> -->
        <form class="basic-form" accept-charset="utf-8" ref="form" enctype="multipart/form-data">
          <!-- 筹款Token,比如：EOS，IQ，MEV. targetToken -->
          <input name="targetToken" type="text" v-model="addData.targetToken" class="hide">
          <!-- 筹款 Token 合约，EOS 请填写 eosio.token   targetTokenContract-->
          <input name="targetTokenContract" type="text" v-model="addData.targetTokenContract" class="hide">
          <!-- 项目名称 title-->
          <label>{{$t('project_title')}}</label>
          <input name="title" type="text" class="basic-input" v-model="addData.title" :placeholder="$t('project_title_pl')" v-focus autofocus>
          <!-- 项目简介 des -->
          <label>{{$t('tell_story')}}</label>
          <div id="story">
            <div v-if="!isFocus" class="story_pl">{{$t('tell_story_pl')}}</div>
          </div>
          <!-- 封面图片，注意name为数组，以后可能要传多张 photos[]-->
          <label>{{$t('position_photo')}}</label>
          <div class="photo-container">
            <div class='photo' :style="{background: addData.photos?'url(' + addData.photos +')no-repeat center/cover':'var(--paleBlue)'}">
              <input name="photos[]" type="file" @change="uploadPic">
              <template v-if='!isLoad'>
                <img src="static/img/icon/web_icon_pic.png" width="72">
                <h5>{{$t('position_photo_pl')}}</h5>
                <p class="photo-tip">{{$t('position_photo_tip')}}</p>
              </template>
            </div>
            <div class="photo-ext" v-if='isLoad'>
              <div class="pull-right">
                <span class="delete" @click="deletePic">{{$t('delete')}}</span>
                <span class="again">{{$t('upload_again')}}</span>
              </div>
              <div class="blank"></div>
            </div>
          </div>
          <!-- 添加产品档位 只有电商产品存在 type==1 -->
          <div class="gear" v-if="type==1">
            <a href="#gear_des" class="what-gear" data-toggle="modal">{{$t('what_is_gear')}}</a>
            <label>{{$t('add_gear')}}</label>
            <ul class="gear-list">
              <li v-for="(item, index) in gearList" :key="index">
                <span class="delete-gear" @click="deleteGear(index)">{{$t('delete')}}</span>
                <h3>{{$t('gear'+ item.level)}}</h3>
                <div class="gear-amount">{{$t('amount')}}</div>
                <div class="row">
                  <div class="col-sm-6 basic-group">
                    <input class="basic-input" type="number" v-model="item.money" :placeholder="$t('total_price')">
                    <span class="target-token">{{item.targetToken}}</span>
                  </div>
                  <div class="col-sm-6 basic-group">
                    <input class="basic-input" type="number" v-model="item.unitNum" :placeholder="$t('unit')">
                    <select id="unit" @change="changeUnit" v-model="item.unit">
                      <option value="jin">{{$t('unit_jin')}}</option>
                      <option value="kg">{{$t('unit_kg')}}</option>
                      <option value="piece">{{$t('unit_piece')}}</option>
                    </select>
                    <span class="tri"></span>
                  </div>
                </div>
              </li>
              <li class="continue-add" v-if="gearList.length<3" @click="addGear(gearList)">{{$t("continue_add")}}</li>
            </ul>
          </div>
          <!-- 筹款金额 targetAmount-->
          <label>{{$t('target_amount')}}</label>
          <div class="basic-group">
            <input name="targetAmount" class="basic-input" type="number" v-model="addData.amount" :placeholder="$t('target_amount_pl')">
            <span class="target-token" v-if="type==1">{{addData.targetToken}}</span>
            <template v-else>
              <select id="targetToken" @change="changeTargetToken" >
                <option value="EOS">EOS</option>
                <option value="EMDS">EMDS</option>
                <option value="EUSD">EUSD</option>
                <option value="EETH">EETH</option>
                <option value="EBTC">EBTC</option>
              </select>
              <span class="tri"></span>
            </template>
          </div>
          <!-- 电商产品不展示最低和最高额度 -->
          <template v-if="type!=1">
            <a @click="toggleShow" class="amount-set">{{$t('amount_setting')}}</a>
            <div v-show="isShow">
              <!-- 最低筹款金额 ，非必须 low  -->
              <label>{{$t('low_amount')}}</label>
              <p class="basic-group">
                <input class="basic-input" type="number" v-model="addData.low" :placeholder="$t('low_amount_pl')">
                <span class="target-token">{{addData.targetToken}}</span>
              </p>
              <!-- 最高筹款金额 ，非必须 high-->
              <label>{{$t('high_amount')}}</label>
              <p class="basic-group">
                <input class="basic-input" type="number" v-model="addData.high" :placeholder="$t('high_amount_pl')">
                <span class="target-token">{{addData.targetToken}}</span>
              </p>
            </div>
          </template>
          <!-- 筹款结束时间 endDate-->
          <label>{{$t('end_date')}}</label>
          <input class="basic-input" type="date" v-model="addData.endTime" :placeholder="$t('end_date_pl')" @change="dateToStamp">
          <input name="endDate" class="hide" type="text" v-model="addData.endTimeStamp" >
          <div class="agree">
            <input type="checkbox" v-model="checked">
            <div>{{$t('agree')}}<a href="#rule" data-toggle="modal">《{{$t('mds_city_rule')}}》</a></div>
          </div>
          <a class="confirm" @click="nextStep">{{$t('next_step')}}</a>
        </form>
      </div>
    </div>
  </div>
  <!-- Modal -->
  <div class="modal" id="successModal">
    <div class="modal-dialog" role="document">
      <div class="modal-content text-center">
        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
        <img src="static/img/icon/web_icon_success.png" width="92">
        <h4 class="modal-title">{{$t('release_success')}}</h4>
        <p class="info">{{$t('release_success_tip')}}</p>
        <router-link to="/" data-dismiss="modal" class="modal-close">{{$t('confirm')}}</router-link>
      </div>
    </div>
  </div>
  <div class="modal" id="rule">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
        <div class="platform_rules" v-html="$t('platform_rules')"></div>
      </div>
    </div>
  </div>
  <div class="modal" id="gear_des">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">{{$t('what_is_gear')}}</h4>
        <p>{{$t('gear_des')}}</p>
        <p class="example">{{$t('example')}}:</p>
        <ul class="example-list">
          <li>
            <img src="static/img/icon/example.png" width="64">
            <div class="exam-info">
              <h5>1 EOS/ 1 kg</h5>
              <p>{{$t('example_title')}}</p>
            </div>
          </li>
          <li>
            <img src="static/img/icon/example.png" width="64">
            <div class="exam-info">
              <h5>2 EOS/ 2.5 kg</h5>
              <p>{{$t('example_title')}}</p>
            </div>
          </li>
          <li>
            <img src="static/img/icon/example.png" width="64">
            <div class="exam-info">
              <h5>3 EOS/ 4 kg</h5>
              <p>{{$t('example_title')}}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="page">1 / <span>2</span></div>
  <alert-modal :info='alertInfo'></alert-modal>
  <mds-toast :toastInfo='toastInfo' :isWarn="isWarn" @toast="infoByToast"></mds-toast>
</div>
</template>

<script>
import alertModal from '@/base/alert'
import 'wangeditor/release/wangEditor.css'
import E from 'wangeditor'
import sha from 'js-sha256'
import user from 'static/js/user'
import mdsNav from '@/base/mdsNav'
import mdsToast from '@/base/toast'
export default {
  props: ['type'],
  data() {
    return {
      url: '/apiCrowdfunding/saveInfo',
      alertInfo: '',
      toastInfo: '',
      isWarn: false,
      checked: false, //是否同意规则
      isLoad: false, //是否上传封面图片
      isFocus: false, //富文本是否填写内容
      isShow: false, //金额设置是否展示
      addData: {
        desHash: '', //【 简介做 sha256 后的值 】
        endTimeStamp: '', //【 筹款结束时间 时间戳s 】
        amount: 0, //【 筹款金额 】
        creator: '', //【 项目发起者 】
        des: '', //【 项目简介 】
        endTime: '', //【  筹款结束时间 时间 】
        photos: '', //【 封面图片url 】
        targetAccount: '', //【 筹款账户 】
        targetToken: 'EOS', //【 筹款Token,比如：EOS，IQ，MEV 】
        targetTokenContract: 'eosio.token', //【 筹款 Token 合约，EOS 请填写 eosio.token 】
        targetTokenDecimals: 4,
        title: "", //【 项目名称 】
        low: 0, //【 最低筹款金额 ，非必须 】
        high: 0 //【 最高筹款金额 ，非必须 】
      },
      gearList: [{
        targetToken: 'EUSD', // token
        targetTokenContract: 'bitpietokens', // 合约地址
        targetTokenDecimal: 8, // 合约小数
        money: '', // 金额整形
        unitNum: '', // 单位数量
        unit: 'kg', // 单位
        level: 1 // 档位
      }]
    }
  },
  mounted() {
    this.editorConfig()
    if (this.type == 1) {
      this.addData.targetTokenDecimals = 8
      this.addData.targetToken = 'EUSD'
      this.addData.targetTokenContract = 'bitpietokens'
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
  methods: {
    infoByToast(val) {
      this.toastInfo = val
    },
    // 引入富文本编辑器
    editorConfig() {
      const editor = new E('#story')
      const that = this
      editor.customConfig.uploadImgServer = this.globalData.domain + '/apiCrowdfunding/uploadImg'
      editor.customConfig.zIndex = 10
      editor.customConfig.menus = [
        'list', // 列表
        'bold', // 粗体
        'fontSize', // 字号
        'italic', // 斜体
        'image', // 插入图片
        'justify' // 对齐方式
      ]
      editor.customConfig.lang = {
        '上传图片': that.$t('upload_image'),
        '网络图片': that.$t('web_image'),
        '图片链接': that.$t('image_link'),
        '插入': that.$t('insert'),
        '字号': that.$t('font_size'),
        '设置列表': that.$t('settings_list'),
        '有序列表': that.$t('ordered'),
        '无序列表': that.$t('unordered'),
        '对齐方式': that.$t('alignment'),
        '靠左': that.$t('left'),
        '居中': that.$t('center'),
        '靠右': that.$t('right')
      }
      editor.customConfig.onfocus = function () {
        that.isFocus = true
      }
      editor.customConfig.onchange = function (html) {
        that.isFocus = true
        that.addData.des = html.replace(/<div class="story_pl">&\s*\S*&<\/div>/g, '')
      }
      editor.create()
    },
    // 提交表单
    nextStep() {
      this.isWarn = true
      // 先做base64加密
      let Base64 = require('js-base64').Base64
      this.addData.des = Base64.encode(this.addData.des)
      // 再做sha256加密
      this.addData.desHash = sha.sha256(this.addData.des)

      // 判断是否登录
      user.getAccount().then((res) => {
        $(".login").hide()
        $(".personal").show()
        $(".currentAccount").html(res.name)

        this.addData.creator = res.name
        this.addData.targetAccount = res.name

        // 表单匹配
        if (!this.addData.title) {
          this.toastInfo = this.$t('form_match_title')
          return false
        }
        if (!this.addData.des) {
          this.toastInfo = this.$t('form_match_des')
          return false
        }
        if (!this.addData.photos) {
          this.toastInfo = this.$t('form_match_photos')
          return false
        }
        // 电商类项目
        if (this.type == 1) {
          let isGearListFalse = false
          this.gearList.some((item, index) => {
            if (item.money - 0 <= 0) {
              isGearListFalse = true
              this.toastInfo = this.$t('form_gear_money')
              return true
            }
            if (item.unitNum - 0 <= 0) {
              isGearListFalse = true
              this.toastInfo = this.$t('form_gear_unitNum')
              return true
            }
          })
          if (isGearListFalse) {
            return false
          }
        }
        if (this.addData.amount == 0) {
          this.toastInfo = this.$t('form_match_amount')
          return false
        }
        if (this.addData.amount < 0) {
          this.toastInfo = this.$t('form_match_no_negative')
          return false
        }
        if (this.addData.low < 0) {
          this.toastInfo = this.$t('form_match_no_negative')
          return false
        }
        if (this.addData.high < 0) {
          this.toastInfo = this.$t('form_match_no_negative')
          return false
        }
        if (this.addData.low == 0) {
          this.addData.low = 0.0001;
        }
        if (this.addData.high == 0) {
          this.addData.high = this.addData.amount;
        }
        if (this.addData.low - 0 > this.addData.high - 0) {
          this.toastInfo = this.$t('form_match_low')
          return false
        }
        if (this.addData.high - 0 > this.addData.amount - 0) {
          this.addData.high = this.addData.amount
        }
        if (!this.addData.endTime) {
          this.toastInfo = this.$t('form_match_endTime')
          return false
        }
        if (!this.checked) {
          this.toastInfo = this.$t('agree_terms')
          return false
        }

        // 生成表单数据
        const formData = new FormData(this.$refs.form)
        formData.append("creator", res.name)
        formData.append("targetAccount", res.name)
        formData.append("low", this.addData.low)
        formData.append("high", this.addData.high)
        formData.append("type", this.type)
        formData.append("des", this.addData.des)
        formData.append("desHash", this.addData.desHash)

        if (this.type == 1) {
          // 档位信息
          let gearJson = JSON.parse(JSON.stringify(this.gearList))
          gearJson.map((item) => {
            item.money = item.money * Math.pow(10, item.targetTokenDecimal)
          })
          formData.append("json", JSON.stringify(gearJson))
        }

        // 去除空文件元素
        try {
          for (let pair of formData.entries()) {
            if (pair[1] instanceof File && pair[1].name == '' && pair[1].size == 0) {
              formData.delete(pair[0]);
            }
          }
        } catch (e) {}

        const eos = user.getEos()
        // 创建项目提交到链上
        eos.transaction({
          actions: [{
            account: this.globalData.contract, // 合约名
            name: 'add', // 合约方法
            authorization: [{
              actor: this.addData.creator, // 登录当前账户
              permission: res.authority
            }],
            data: {
              "initiator": this.addData.creator, // 项目发起人
              "name": this.addData.title, // 项目名称
              "item_digest": this.addData.desHash, //this.addData.desHash, // 项目简介sha256 后的值 64 位
              "receiver": this.addData.targetAccount, // 收款人
              "min_fund": {
                amount: parseFloat(this.addData.low).toFixed(this.addData.targetTokenDecimals),
                precision: this.addData.targetTokenDecimals,
                symbol: this.addData.targetToken,
                contract: this.addData.targetTokenContract
              },
              "max_fund": {
                amount: parseFloat(this.addData.high).toFixed(this.addData.targetTokenDecimals),
                precision: this.addData.targetTokenDecimals,
                symbol: this.addData.targetToken,
                contract: this.addData.targetTokenContract
              },
              "target_fund": {
                amount: parseFloat(this.addData.amount).toFixed(this.addData.targetTokenDecimals),
                precision: this.addData.targetTokenDecimals,
                symbol: this.addData.targetToken,
                contract: this.addData.targetTokenContract

              },
              "deadline": this.addData.endTimeStamp // 结束时间 时间戳(s)
            }
          }]
        }).then(
          result => {
            // 成功，调用我们的接口
            this.$http.post(this.globalData.domain + this.url, formData, {
              cache: false,
              processData: false,
              contentType: false
            }).then(res => {
              if (res.data.success) {
                $('#successModal').modal('show')
              } else {
                this.alertInfo = res.data.message
                $('#alert').modal('show')
              }
            }, error => {
              console.log(error)
              this.alertInfo = this.$t('release_error')
              $('#alert').modal('show')
            })
          }
        ).catch(error => {
          // 失败
          console.log(error)
          this.alertInfo = this.$t('release_error')
          $('#alert').modal('show')
        })
      }, () => {
        // 未安装 scatter 或 登录失败
        this.toastInfo = this.$t('connect_scatter')
      })
    },
    uploadPic(event) {
      //获取的图片文件
      var fileList = event.target.files[0];
      if (fileList) {
        this.addData.photos = window.URL.createObjectURL(fileList);
        this.isLoad = true
      }
    },
    deletePic(event) {
      this.addData.photos = ''
      this.isLoad = false
    },
    toggleShow() {
      this.isShow = !this.isShow
    },
    dateToStamp() {
      this.addData.endTimeStamp = (new Date(this.addData.endTime)).getTime() / 1000
    },
    changeTargetToken(event) {
      const target = event.target.value
      this.addData.targetToken = target
      switch (target) {
        case 'EOS':
          this.addData.targetTokenDecimals = 4
          this.addData.targetTokenContract = 'eosio.token'
          break;
        case 'EMDS':
          this.addData.targetTokenDecimals = 4
          this.addData.targetTokenContract = 'medisharesbp'
          break;
        default:
          this.addData.targetTokenDecimals = 8
          this.addData.targetTokenContract = 'bitpietokens'
          break;
      }
    },
    changeUnit(event) {
      this.gearList.map((item) => {
        item.unit = event.target.value
      })
    },
    addGear() {
      if (this.gearList.length < 3 && this.gearList.length > 0) {
        this.gearList.push({
          targetToken: this.gearList[0].targetToken, // token
          targetTokenContract: this.gearList[0].targetTokenContract, // 合约地址
          targetTokenDecimal: this.gearList[0].targetTokenDecimal, // 合约小数
          money: '', // 金额整形
          unitNum: '', // 单位数量
          unit: this.gearList[0].unit, // 单位
          level: this.gearList.length + 1 // 档位
        })
      } else if (this.gearList.length == 0) {
        this.gearList.push({
          targetToken: 'EUSD', // token
          targetTokenContract: 'bitpietokens', // 合约地址
          targetTokenDecimal: 8, // 合约小数
          money: '', // 金额整形
          unitNum: '', // 单位数量
          unit: 'kg', // 单位
          level: 1 // 档位
        })
      } else {
        this.isWarn = true
        this.toastInfo = this.$t('continue_add_toast')
        return false
      }
    },
    deleteGear(index) {
      this.gearList.splice(index, 1)
      this.gearList.map((item, index) => {
        item.level = index + 1
      })
    }
  },
  watch: {
    type(to, from) {
      if (to == 1) {
        this.addData.targetTokenDecimals = 8
        this.addData.targetToken = 'EUSD'
        this.addData.targetTokenContract = 'bitpietokens'
      } else {
        this.addData.targetTokenDecimals = 4
        this.addData.targetToken = 'EOS'
        this.addData.targetTokenContract = 'eosio.token'
      }
    }
  },
  components: {
    alertModal,
    mdsToast
  }
}
</script>

<style scoped>
@import '../../static/css/basicForm.css'
</style>
