<template>
<div class='project-basic'>
  <div class="container">
    <div class="col-sm-8 col-sm-offset-2 basic">
      <div class="title">{{$t('basic_project_information')}}</div>
      <div class="subtitle">{{$t('submit_information')}}</div>
      <form class="basic-form" accept-charset="utf-8" id="form" enctype="multipart/form-data">
        <label>{{$t('project_title')}}</label>
        <input type="text" class="basic-input" name="title" v-model="title" :placeholder="$t('project_title_pl')">
        <label>{{$t('tell_story')}}</label>
        <div id="story">
          <div v-if="!isFocus" class="story_pl">{{$t('tell_story_pl')}}</div>
        </div>
        <label>{{$t('position_photo')}}</label>
        <div class="photo-container">
          <div class='photo' :style="{background: imgUrl?'url(' + imgUrl +')no-repeat center/cover':'#e1e6e9'}">
            <input type="file" name="photo" id="photo" ref="photo" @change="uploadPic">
            <template v-if='!isLoad'>
              <img src="static/img/icon/web_con_pic.png" width="72">
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
        <label>{{$t('target_amount')}}</label>
        <p class="basic-group">
          <input class="basic-input" type="number" v-model="amount" name="amount" :placeholder="$t('target_amount_pl')">
        </p>
          <a @click="toggleShow" class="amount-set">{{$t('amount_setting')}}</a>
          <template v-if="isShow">
            <label>{{$t('transfer_limit')}}</label>
            <div class="row">
              <p class="col-sm-6 basic-group">
                <input class="basic-input" type="number" v-model="amount1" name="amount1">
            </p>
                <p class="col-sm-6 basic-group">
                  <input class="basic-input" type="number" v-model="amount2" name="amount2">
            </p>
            </div>
          </template>
          <label for="date">{{$t('end_date')}}</label>
          <input class="basic-input" type="date" v-model="date" name="date" :placeholder="$t('end_date_pl')">
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
        <router-link to="/" data-dismiss="modal">{{$t('view_project')}}</router-link>
      </div>
    </div>
  </div>
  <alert :info='alertInfo' :title='alertTitle'></alert>
</div>
</template>

<script>
import alert from '@/base/alert'
import 'wangeditor/release/wangEditor.css'
import E from 'wangeditor'
export default {
  data() {
    return {
      alertInfo: '',
      alertTitle: '',
      title: '',
      imgUrl: '',
      story: '',
      amount: '',
      amount1: '',
      amount2: '',
      date: '',
      checked: false,
      isLoad: false,
      isFocus: false,
      isShow: false
    }
  },
  mounted() {
    if (E == undefined) {
      location.reload();
    }
    const editor = new E('#story')
    const that = this
    // editor.customConfig.uploadImgServer = '/article/upload'
    // editor.customConfig.debug = location.href.indexOf('wangeditor_debug_mode=1') > 0
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
      '上传': that.$t('upload'),
      '网络图片': that.$t('web_image'),
      '图片': that.$t('picture'),
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
      that.story = html.replace(/<div class="story_pl">&\s*\S*&<\/div>/g, '')
    }
    editor.create()
  },
  methods: {
    nextStep() {
      const that = this
      let params = {
        title: that.title,
        story: that.story,
        imgUrl: that.imgUrl,
        amount: that.amount,
        amount1: that.amount1,
        amount2: that.amount2,
        date: that.date
      }
      if (this.checked) {
        this.$http.post('/', params).then(res => {
          console.info(res.data)
          $('#myModal').modal('show')
        }, error => {
          console.info(error)
        })

      } else {
        this.alertInfo = this.$t('agree_terms')
        $('#alert').modal('show')
      }
    },
    uploadPic(event) {
      //获取的图片文件
      var fileList = event.target.files[0];
      console.log(event.target);

      if (fileList) {
        this.imgUrl = window.URL.createObjectURL(fileList);
        this.isLoad = true
      }
    },
    deletePic(event) {
      this.imgUrl = ''
      this.isLoad = false
    },
    toggleShow() {
      this.isShow = true
    }
  },
  components: {
    alert
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
