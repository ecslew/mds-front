<template>
<div class='project-release project-sm-container'>
  <div class="container">
    <div class="row">
      <div class="col-md-8 col-md-offset-2">
        <div class="title">{{$t('basic_project_information')}}</div>
        <div class="subtitle">{{$t('submit_information')}}</div>
        <form class="basic-form" accept-charset="utf-8" ref="form" enctype="multipart/form-data">
          <!-- 筹款Token,比如：EOS，IQ，MEV. targetToken -->
          <input name="targetToken" type="text" v-model="addData.targetToken" class="hide">
          <!-- 筹款 Token 合约，EOS 请填写 eosio.token   targetTokenContract-->
          <input name="targetTokenContract" type="text" v-model="addData.targetTokenContract" class="hide">
          <!-- 项目名称 title-->
          <label>{{$t('project_title')}}</label>
          <input name="title" type="text" class="basic-input" v-model="addData.title" :placeholder="$t('project_title_pl')" autofocus>
          <!-- 项目简介 des -->
          <label>{{$t('tell_story')}}</label>
          <div id="story">
            <div v-if="!isFocus" class="story_pl">{{$t('tell_story_pl')}}</div>
          </div>
          <textarea name="des" class="hide" v-model="addData.des"></textarea>
          <!-- 简介做 sha256 后的值 desHash -->
          <input name="desHash" type="text" class="hide" v-model="addData.desHash">
          <!-- 封面图片，注意name为数组，以后可能要传多张 photos[]-->
          <label>{{$t('position_photo')}}</label>
          <div class="photo-container">
            <div class='photo' :style="{background: addData.photos?'url(' + addData.photos +')no-repeat center/cover':'var(--paleBlue)'}">
              <input name="photos[]" type="file" @change="uploadPic">
              <template v-if='!isLoad'>
                <img src="static/img/icon/web_icon_pic.png" width="72">
                <h5>{{$t('position_photo_pl')}}</h5>
                <p>{{$t('position_photo_tip')}}</p>
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
            <span class="what-gear" data-toggle="modal" data-target="#gear_des">{{$t('what_is_gear')}}</span>
            <label>{{$t('add_gear')}}</label>
            <ul class="gear-list">
              <li v-for="(item, index) in gear" :key="index">
                <span class="delete-gear" @click="deleteGear(index)">{{$t('delete')}}</span>
                <h3>{{$t('gear'+(index+1))}}</h3>
                <div class="gear-amount">{{$t('amount')}}</div>
                <div class="row">
                  <div class="col-sm-6 basic-group">
                    <input class="basic-input" type="number" v-model="item.sum" :placeholder="$t('total_price')">
                    <span class="target-token">EUSD</span>
                  </div>
                  <div class="col-sm-6 basic-group">
                    <input name="targetAmount" class="basic-input" type="number" v-model="item.unit" :placeholder="$t('unit')">
                    <select id="unit" @change="changeUnit">
                      <option value="1">{{$t('unit_jin')}}</option>
                      <option value="2">{{$t('unit_kg')}}</option>
                      <option value="3">{{$t('unit_piece')}}</option>
                    </select>
                    <span class="tri"></span>
                  </div>
                </div>
                <input name="unit" type="text" v-model="unit" class="hide">
              </li>
              <li class="continue-add" @click="addGear">{{$t("continue_add")}}</li>
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
          <a class="start" @click="nextStep">{{$t('next_step')}}</a>
        </form>
      </div>
    </div>
  </div>
  <!-- Modal -->
  <div class="modal" id="myModal">
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
  <div class="page">{{$t('step1_total2')}}</div>
  <alert-modal :info='alertInfo' :title='alertTitle'></alert-modal>
  <mds-toast :toastInfo='toastInfo' @toast="infoByToast"></mds-toast>
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
      alertTitle: '',
      toastInfo: '',
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
      unit: '',
      gear: [{
        sum: '',
        unit: ''
      }] //档位
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
        that.addData.desHash = sha.sha256(that.addData.des)
      }
      editor.create()
    },
    // 提交表单
    nextStep() {
      const that = this
      // 判断是否登录
      user.getAccount().then((res) => {
        this.addData.creator = res.name
        this.addData.targetAccount = res.name
        $(".login").hide()
        $(".personal").show()
        $(".currentAccount").html(res.name)

        // 表单匹配
        if (!this.addData.title) {
          this.alertInfo = this.$t('form_match_title')
          $('#alert').modal('show')
          return false
        }
        if (!this.addData.des) {
          this.alertInfo = this.$t('form_match_des')
          $('#alert').modal('show')
          return false
        }
        if (!this.addData.photos) {
          this.alertInfo = this.$t('form_match_photos')
          $('#alert').modal('show')
          return false
        }
        if (this.addData.amount == 0) {
          this.alertInfo = this.$t('form_match_amount')
          $('#alert').modal('show')
          return false
        }
        if (this.addData.amount < 0) {
          this.alertInfo = this.$t('form_match_no_negative')
          $('#alert').modal('show')
          return false
        }
        if (this.addData.low < 0) {
          this.alertInfo = this.$t('form_match_no_negative')
          $('#alert').modal('show')
          return false
        }
        if (this.addData.high < 0) {
          this.alertInfo = this.$t('form_match_no_negative')
          $('#alert').modal('show')
          return false
        }
        if (this.addData.low == 0) {
          this.addData.low = 0.0001;
        }
        if (this.addData.high == 0) {
          this.addData.high = this.addData.amount;
        }
        if (this.addData.low - 0 > this.addData.high - 0) {
          this.alertInfo = this.$t('form_match_low')
          $('#alert').modal('show')
          return false
        }
        if (this.addData.high - 0 > this.addData.amount - 0) {
          this.alertInfo = this.$t('form_match_high')
          $('#alert').modal('show')
          this.addData.high = this.addData.amount
          return false
        }
        if (!this.addData.endTime) {
          this.alertInfo = this.$t('form_match_endTime')
          $('#alert').modal('show')
          return false
        }
        if (!this.checked) {
          this.alertInfo = this.$t('agree_terms')
          $('#alert').modal('show')
          return false
        }

        // 生成表单数据
        const formData = new FormData(this.$refs.form)
        formData.append("creator", res.name)
        formData.append("targetAccount", res.name)
        formData.append("low", this.addData.low)
        formData.append("high", this.addData.high)

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
            account: that.globalData.contract, // 合约名
            name: 'add', // 合约方法
            authorization: [{
              actor: that.addData.creator, // 登录当前账户
              permission: 'active'
            }],
            data: {
              "initiator": that.addData.creator, // 项目发起人
              "name": that.addData.title, // 项目名称
              "item_digest": that.addData.desHash, //that.addData.desHash, // 项目简介sha256 后的值 64 位
              "receiver": that.addData.targetAccount, // 收款人
              "min_fund": {
                amount: parseFloat(that.addData.low).toFixed(that.addData.targetTokenDecimals),
                precision: that.addData.targetTokenDecimals,
                symbol: that.addData.targetToken,
                contract: that.addData.targetTokenContract
              },
              "max_fund": {
                amount: parseFloat(that.addData.high).toFixed(that.addData.targetTokenDecimals),
                precision: that.addData.targetTokenDecimals,
                symbol: that.addData.targetToken,
                contract: that.addData.targetTokenContract
              },
              "target_fund": {
                amount: parseFloat(that.addData.amount).toFixed(that.addData.targetTokenDecimals),
                precision: that.addData.targetTokenDecimals,
                symbol: that.addData.targetToken,
                contract: that.addData.targetTokenContract

              },
              "deadline": that.addData.endTimeStamp // 结束时间 时间戳(s)
            }
          }]
        }).then(
          result => {
            // 成功，调用我们的接口
            that.$http.post(that.globalData.domain + that.url, formData, {
              cache: false,
              processData: false,
              contentType: false
            }).then(res => {
              if (res.data.success) {
                $('#myModal').modal('show')
              } else {
                that.alertInfo = res.data.message
                $('#alert').modal('show')
              }
            }, error => {
              console.info(error)
            })
          }
        ).catch(
          error => {
            // 失败
            console.log(error)
          }
        )
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
      const target = event.target.value
      switch (target) {
        case '1':
          this.unit = this.$t('unit_jin')
          break;
        case '2':
          this.unit = this.$t('unit_kg')
          break;
        default:
          this.unit = this.$t('unit_piece')
          break;
      }
    },
    addGear() {
      if (this.gear.length < 3) {
        this.gear.push({
          sum: '',
          unit: ''
        })
      } else {
        this.toastInfo = this.$t('continue_add_toast')
        return false
      }
    },
    deleteGear(index) {
      this.gear.splice(index, 1)
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
