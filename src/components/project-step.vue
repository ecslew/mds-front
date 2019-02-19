<template>
<div class='create-project project-sm-container'>
  <div class="container">
    <div class="row">
      <div class="col-md-offset-2 col-md-8">
        <h4 class="title">{{$t('create_project')}}</h4>
        <!-- <div class="subtitle">{{$t('create_project_subtitle')}}</div> -->
        <div class="dropdown select-type">
          <div class="dropdown-toggle col-sm-9" data-toggle="dropdown">
            <i class="tri"></i>
            <span>{{project_type}}</span>
          </div>
          <p class="next col-sm-3" @click="nextStep">{{$t('next_step')}}</p>
          <ul class="dropdown-menu">
            <li value="1" class="active" @click="selectType">{{$t("project_type1")}}</li>
            <li value="0" @click="selectType">{{$t("project_type2")}}</li>
            <!-- <li value="0" @click="selectType">{{$t("project_type3")}}</li> -->
          </ul>
        </div>
        <div class="notice">{{$t('mds_notice1')}}{{$t('mds_notice2')}}</div>
      </div>
    </div>
    <div class="page"><span>1</span> / 2</div>
  </div>
  <mds-toast :toastInfo='toastInfo' :isWarn="isWarn" @toast="infoByToast"></mds-toast>
</div>
</template>

<script>
import mdsToast from '@/base/toast'
import user from 'static/js/user'
export default {
  data() {
    return {
      project_type: this.$t("project_type1"),
      type: 1,
      toastInfo: '',
      isWarn: true
    }
  },
  methods: {
    infoByToast: function (val) {
      this.toastInfo = val
    },
    selectType(e) {
      $('.dropdown-menu li').removeClass('active')
      e.target.className = "active"
      this.project_type = e.target.innerText
      this.type = e.target.value
    },
    nextStep() {
      user.getAccount().then((res) => {
        $(".login").hide()
        $(".personal").show()
        $(".currentAccount").html(res.name)
        if (this.project_type) {
          this.$router.push({
            path: '/projectRelease',
            query: {
              type: this.type
            }
          })
        }
      }, () => {
        // 未安装 scatter 或 登录失败
        this.toastInfo = this.$t('connect_scatter')
      })
    }
  },
  components: {
    mdsToast
  }
}
</script>

<style scoped>
.project-sm-container .col-md-8 {
  padding: 68px 68px 32px;
}

.select-type {
  float: none;
  line-height: 52px;
  margin: 120px 0 288px;
}

.select-type .dropdown-toggle {
  border-radius: 4px 0 0 4px;
  padding-left: 16px;
  background: var(--paleBlue);
  cursor: pointer;
}

.select-type .tri {
  margin-right: 10px;
}

.next {
  height: 52px;
  text-align: center;
  line-height: 52px;
  background: var(--primaryColor);
  font-family: Gotham-Medium;
  font-weight: 500;
  font-size: 16px;
  color: #fff;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
}

.select-type .dropdown-menu {
  top: 60px;
  border-radius: 4px;
  box-shadow: 0 2px 8px 0 rgba(175, 175, 175, 0.5);
  width: 100%;
  border: none;
  padding: 0;
}

.select-type li {
  line-height: 52px;
  border-bottom: 1px solid #e7ecf0;
  padding: 0 24px 0 44px;
  font-family: Gotham-Medium;
  font-weight: 500;
}

.select-type li:last-of-type {
  border: none;
}

.select-type li.active {
  background: url('../../static/img/icon/check_icon.png')no-repeat 8px center/24px;
}

.notice {
  color: #a9b9c1;
  text-align: center;
  line-height: 1.75;
}

@media (max-width: 767px) {
  .project-sm-container .col-md-8 {
    padding: 32px 15px;
  }

  .select-type {
    margin: 70px 0 150px;
  }
  .select-type .dropdown-toggle{
    border-radius: 4px;
  }
  .next {
    margin-top: 32px;
    border-radius: 4px;
  }
}
</style>
