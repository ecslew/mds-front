<template>
<div class='project-release'>
  <div class="container">
    <div class="col-md-8 col-md-offset-2 basic">
      <div class="title">{{$t('basic_project_information')}}</div>
      <div class="subtitle">{{$t('submit_information')}}</div>
      <form class="basic-form" accept-charset="utf-8" ref="form" enctype="multipart/form-data">
        <!-- 筹款Token,比如：EOS，IQ，MEV. targetToken -->
        <input name="targetToken" type="text" v-model="adddData.targetToken" class="hide">
        <!-- 筹款 Token 合约，EOS 请填写 eosio.token   targetTokenContract-->
        <input name="targetTokenContract" type="text" v-model="adddData.targetTokenContract" class="hide">
        <!-- 项目名称 title-->
        <label>{{$t('project_title')}}</label>
        <input name="title" type="text" class="basic-input" v-model="adddData.title" :placeholder="$t('project_title_pl')">
        <!-- 项目简介 des -->
        <label>{{$t('tell_story')}}</label>
        <div id="story">
          <div v-if="!isFocus" class="story_pl">{{$t('tell_story_pl')}}</div>
        </div>
        <textarea name="des" class="hide" v-model="adddData.des"></textarea>
        <!-- 简介做 MD5 后的值 desHash -->
        <input name="desHash" type="text" class="hide" v-model="adddData.desHash">
        <!-- 封面图片，注意name为数组，以后可能要传多张 photos[]-->
        <label>{{$t('position_photo')}}</label>
        <div class="photo-container">
          <div class='photo' :style="{background: adddData.photos?'url(' + adddData.photos +')no-repeat center/cover':'#e1e6e9'}">
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
        <!-- 筹款金额 targetAmount-->
        <label>{{$t('target_amount')}}</label>
        <div class="basic-group">
          <input name="targetAmount" class="basic-input" type="number" v-model="adddData.amount" :placeholder="$t('target_amount_pl')">
        </div>
          <a @click="toggleShow" class="amount-set">{{$t('amount_setting')}}</a>
          <template v-if="isShow">
            <label>{{$t('transfer_limit')}}</label>
            <div class="row">
              <!-- 最低筹款金额 ，非必须 low  -->
              <p class="col-sm-6 basic-group">
                <input name="low" class="basic-input" type="number" v-model="adddData.low" :placeholder="$t('low_amount_pl')">
              </p>
                <!-- 最高筹款金额 ，非必须 high-->
                <p class="col-sm-6 basic-group">
                  <input name="high" class="basic-input" type="number" v-model="adddData.high" :placeholder="$t('high_amount_pl')">
              </p>
            </div>
          </template>
          <!-- 筹款结束时间 endDate-->
          <label>{{$t('end_date')}}</label>
          <input class="basic-input" type="date" v-model="adddData.endTime" :placeholder="$t('end_date_pl')" @change="dateToStamp">
          <input name="endDate" class="hide" type="text" v-model="adddData.endTimeStamp" >
          <div class="agree">
            <input type="checkbox" v-model="checked">
            <div>{{$t('fundraising_rules')}}</div>
          </div>
          <a class="start" @click="nextStep">{{$t('next_step')}}</a>
      </form>
    </div>
  </div>
  <!-- Modal -->
  <div class="modal" id="myModal">
    <div class="modal-dialog" role="document">
      <div class="modal-content text-center">
        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
        <img src="static/img/icon/web_icon_success.png" width="92">
        <h4 class="modal-title">{{$t('release_success')}}</h4>
        <p>{{$t('release_success_tip')}}</p>
        <!-- <router-link to="/" data-dismiss="modal">{{$t('view_project')}}</router-link> -->
      </div>
    </div>
  </div>
  <alert-modal :info='alertInfo' :title='alertTitle'></alert-modal>
</div>
</template>

<script>
import alertModal from '@/base/alert'
import 'wangeditor/release/wangEditor.css'
import E from 'wangeditor'
import md5 from 'js-md5'
import user from 'static/js/user'
import mdsNav from '@/base/mdsNav'
export default {
  props: ['eosID'],
  data() {
    return {
      url: '/apiCrowdfunding/saveInfo',
      editUrl: '/apiCrowdfunding/getInfo?eosID=',
      alertInfo: '',
      alertTitle: '',
      checked: false, //是否同意规则
      isLoad: false, //是否上传封面图片
      isFocus: false, //富文本是否填写内容
      isShow: false, //金额设置是否展示
      adddData: {
        desHash: '', //【 简介做 MD5 后的值 】
        endTimeStamp: '', //【 筹款结束时间 时间戳s 】
        amount: 0, //【 筹款金额 】
        creator: '', //【 项目发起者 】
        des: '', //【 项目简介 】
        endTime: '', //【  筹款结束时间 时间 】
        photos: '', //【 封面图片url 】
        targetAccount: '', //【 筹款账户 】
        targetToken: 'EOS', //【 筹款Token,比如：EOS，IQ，MEV 】
        targetTokenContract: 'eosio.token', //【 筹款 Token 合约，EOS 请填写 eosio.token 】
        title: "", //【 项目名称 】
        low: 0, //【 最低筹款金额 ，非必须 】
        high: 0 //【 最高筹款金额 ，非必须 】
      }
    }
  },
  mounted() {
    this.editorConfig()
  },
  methods: {
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
        that.adddData.des = html.replace(/<div class="story_pl">&\s*\S*&<\/div>/g, '')
        that.adddData.desHash = md5(that.adddData.des)
      }
      editor.create()
    },
    // 提交表单
    nextStep() {
      const that = this
      // 判断是否登录
      user.getAccount().then((res) => {
        this.adddData.creator = res.name
        this.adddData.targetAccount = res.name
        $(".login").hide()
        $(".personal").show()
        $(".currentAccount").html(res.name)

        // 表单匹配
        if (!this.adddData.title) {
          this.alertInfo = "请填写标题"
          $('#alert').modal('show')
          return false
        }
        if (!this.adddData.des) {
          this.alertInfo = "请填写简介"
          $('#alert').modal('show')
          return false
        }
        if (!this.adddData.photos) {
          this.alertInfo = "请上传您的图片"
          $('#alert').modal('show')
          return false
        }
        if (this.adddData.amount == 0) {
          this.alertInfo = "请填写筹款目标金额"
          $('#alert').modal('show')
          return false
        }
        if (!this.adddData.endTime) {
          this.alertInfo = "请选择结束时间"
          $('#alert').modal('show')
          return false
        }
        if (!this.checked) {
          this.alertInfo = this.$t('agree_terms')
          $('#alert').modal('show')
          return false
        }
        if ( this.adddData.low == 0 ) {
          this.adddData.low = 0.0001;
        }
        if (this.adddData.low > this.adddData.high) {
          this.alertInfo = '最小值不能大于最大值';
          $('#alert').modal('show')
          return false
        }
        if ( this.adddData.high == 0 ) {
          this.adddData.high = this.adddData.amount;
        }

        if ( this.adddData.high-0 > this.adddData.amount-0 ) {
          this.alertInfo = '最大值不能大于目标金额';
          $('#alert').modal('show')
          return false
        }

        // 生成表单数据
        const formData = new FormData(this.$refs.form)
        formData.append("creator", res.name)
        formData.append("targetAccount", res.name)
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
              actor: that.adddData.creator, // 登录当前账户
              permission: 'active'
            }],
            data: {
              "initiator": that.adddData.creator, // 项目发起人
              "name": that.adddData.title, // 项目名称
              "item_digest": 'f4734448c81e0817d25416b2985cd6f9ba5d8c5756e1892353265ea109dcfc61',//that.adddData.desHash, // 项目简介md5 后的值 32 位
              "receiver": that.adddData.targetAccount, // 收款人
              "min_fund": 
              {
                      amount: parseFloat( that.adddData.low ).toFixed(4),
                      precision: 4,
                      symbol: that.adddData.targetToken,
                      contract: that.adddData.targetTokenContract
              },
              "max_fund": 
                    {
                      amount: parseFloat( that.adddData.high ).toFixed(4),
                      precision: 4,
                      symbol: that.adddData.targetToken,
                      contract: that.adddData.targetTokenContract
                    },
              "target_fund": 
              {
                amount: parseFloat( that.adddData.amount ).toFixed(4),
                precision: 4,
                symbol: that.adddData.targetToken,
                contract: that.adddData.targetTokenContract
              },
              "deadline": that.adddData.endTimeStamp // 结束时间 时间戳(s)
            }
          }]
        }).then(
          result => {
            console.log(result);
            // 成功，调用我们的接口
            that.$http.post(that.globalData.domain + that.url, formData, {
              cache: false,
              processData: false,
              contentType: false
            }).then(res => {
              console.log(res)
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
      }, (err) => {
        alert(err)
      })
    },
    uploadPic(event) {
      //获取的图片文件
      var fileList = event.target.files[0];
      if (fileList) {
        this.adddData.photos = window.URL.createObjectURL(fileList);
        this.isLoad = true
      }
    },
    deletePic(event) {
      this.adddData.photos = ''
      this.isLoad = false
    },
    toggleShow() {
      this.isShow = true
    },
    dateToStamp() {
      this.adddData.endTimeStamp = (new Date(this.adddData.endTime)).getTime() / 1000
    }
  },
  components: {
    alertModal
  }
}
</script>

<style scoped>
.basic {
  margin-top: 32px;
  margin-bottom: 34px;
  background: #fff;
  padding: 32px;
}

.basic-form {
  padding: 32px 0;
}

.basic-form label {
  font-family: Gotham-Medium;
  margin: 32px 0 16px;
  line-height: 1.43;
}

.photo-container {
  border: 1px solid #e7ecf0;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}

.basic-form .photo {
  text-align: center;
  padding: 48px 16px;
  color: #2c363f;
  height: 240px;
}

.photo input {
  width: 100%;
  height: 100%;
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
}

.photo h5 {
  font-family: Gotham-Medium;
  font-size: 14px;
  line-height: 1.43;
  margin: 16px 0 8px;
}

.photo-ext {
  border-top: 1px solid #e7ecf0;
}

.photo-ext .blank {
  overflow: hidden;
  position: relative;
  z-index: 100;
  height: 52px;
}

.photo-ext .delete {
  color: #f44336;
  display: inline-block;
  cursor: pointer;
  position: relative;
  z-index: 100;
  padding: 16px;
}

.photo-ext .again {
  color: #2196f3;
  display: inline-block;
  cursor: pointer;
  padding: 16px;
}

.amount-set {
  display: block;
  text-align: right;
  color: #2196f3 !important;
  margin-top: 8px;
}

.sel {
  position: absolute;
  right: 0;
  top: 0;
}

.agree {
  padding: 32px 0 66px;
  position: relative;
}

.agree input[type='checkbox'] {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 10;
}

.agree div {
  padding-left: 30px;
  background: url('../../static/img/icon/web_icon_agreement_no.png')no-repeat left center/18px;
}

.agree input:checked+div {
  background: url('../../static/img/icon/web_icon_agreement_yes.png')no-repeat left center/18px;
}

.start {
  margin: 0;
}

.modal-content p {
  font-family: Gotham-Medium;
  color: #607d8b;
  font-size: 16px;
  margin: 8px 0 196px;
}

@media (max-width: 768px) {
  .basic {
    padding: 24px 16px 32px;
  }

  .basic-form {
    padding: 0;
  }

  .basic-group:last-of-type .basic-input {
    margin-top: 16px;
  }

  .modal-content p {
    margin-bottom: 100px;
  }
}
</style>
