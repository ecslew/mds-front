<template>
<div :class="[{ishome:isHome},'mds-nav']">
  <nav class="header-nav">
    <div class="container">
      <div class="navbar-header">
        <router-link to="/" class="navbar-brand">MDS</router-link>
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                  data-target="#mds-nav" aria-expanded="true" @click="addWh100">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <div class="login mobile-login hidden-sm hidden-md hidden-lg" @click="login">{{$t("login")}}</div>
        <div class="dropdown personal hidden-sm hidden-md hidden-lg">
          <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" role="button"><span class="currentAccount"></span><span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li>
              <router-link to="/projectRelease">{{$t("create_a_project")}}</router-link>
            </li>
            <li>
              <router-link to="/myProject">{{$t("my_projects")}}</router-link>
            </li>
            <li>
              <router-link to="/projectBacked">{{$t("backed_projects")}}</router-link>
            </li>
            <li><a href="javascript:;" @click="logout">{{$t("logout")}}</a></li>
          </ul>
        </div>
      </div>
      <div class="collapse navbar-collapse" id="mds-nav">
        <div class="collapse-close hidden-sm hidden-md hidden-lg" @click="removeWh100">×</div>
        <ul class="nav navbar-nav navbar-right">
          <li @click="removeWh100">
            <router-link to="/" class="ico-book hidden-sm hidden-md hidden-lg">{{$t("home")}}</router-link>
          </li>
          <li @click="removeWh100">
            <router-link to="/about">{{$t("about")}}</router-link>
          </li>
          <li @click="removeWh100"><a :href="$t('news_link')" target="_blank">{{$t("news")}}</a></li>
          <li @click="removeWh100"><a :href="$t('mathwallet_link')" target="_blank">{{$t("MathWallet")}}</a></li>
          <div class="dropdown">
            <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" role="button">{{$t("lang")}}<span class="caret"></span></a>
            <ul class="dropdown-menu">
              <li><a href="javascript:;" name="cn" @click="changeLang">中文</a></li>
              <li><a href="javascript:;" name="en" @click="changeLang">English</a></li>
              <li><a href="javascript:;" name="ko" @click="changeLang">한국어</a></li>
            </ul>
          </div>
          <div class="login pc-login pull-left hidden-xs" @click="login">{{$t("login")}}</div>
          <div class="dropdown personal hidden-xs">
            <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" role="button"><span class="currentAccount"></span><span class="caret"></span></a>
            <ul class="dropdown-menu">
              <li @click="removeWh100">
                <router-link to="/projectRelease">{{$t("create_a_project")}}</router-link>
              </li>
              <li @click="removeWh100">
                <router-link to="/myProject">{{$t("my_projects")}}</router-link>
              </li>
              <li @click="removeWh100">
                <router-link to="/projectBacked">{{$t("backed_projects")}}</router-link>
              </li>
              <li @click="removeWh100"><a href="javascript:;" @click="logout">{{$t("logout")}}</a></li>
            </ul>
          </div>
        </ul>
      </div>
    </div>
  </nav>
  <login-modal></login-modal>
</div>
</template>

<script>
import user from 'static/js/user'
import loginModal from '@/base/login-modal'
export default {
  name: 'mdsNav',
  data() {
    return {
      isHome: false
    }
  },
  mounted() {
    this.isHomePage()
    // 导航固定
    this.navFix();
    $(window).scroll(() => {
      this.navFix();
    })
  },
  methods: {
    isHomePage() {
      if (this.$route.path == '/' || this.$route.path == '/about') {
        this.isHome = true
      } else {
        this.isHome = false
      }
    },
    changeLang(event) {
      this.$i18n.setUserLanguage(event.target.name)
      this.removeWh100()
    },
    login() {
      $("#login").modal('show');
    },
    logout() {
      user.logout().then((res) => {
        $(".currentAccount").html('')
        $(".login").show()
        $(".personal").hide()
      }, (err) => {
        alert(err);
      });
    },
    navFix() {
      if ($(window).scrollTop() >= ($('.mds-top').outerHeight() - $('.header-nav').outerHeight())) {
        $('.header-nav').addClass('scroll-nav');
      } else {
        $('.header-nav').removeClass('scroll-nav');
      }
    },
    addWh100() {
      $(document.documentElement).addClass('wh100');
      $(document.body).addClass('wh100');
    },
    removeWh100() {
      $('#mds-nav').removeClass('in');
      $(document.documentElement).removeClass('wh100');
      $(document.body).removeClass('wh100');
    }
  },
  watch: {
    $route(to, from) {
      if (to.path == '/' || to.path == '/about') {
        this.isHome = true
      } else {
        this.isHome = false
      }
      if (to.path == '/about') {
        $(".login").hide()
        $(".personal").hide()
      } else if ($(".currentAccount").html()) {
        $(".login").hide()
        $(".personal").show()
      } else {
        $(".login").show()
        $(".personal").hide()
      }
    }
  },
  components: {
    loginModal
  }
}
</script>

<style>
.mds-nav {
  height: 50px;
}

.mds-nav.ishome {
  height: 0;
}

.header-nav {
  background: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1030;
  text-align: center;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.ishome .header-nav {
  background: transparent;
  box-shadow: none;
  position: absolute;
}

.ishome .scroll-nav {
  background: #020308;
  position: fixed;
}

.header-nav a {
  color: #2c363f;
  text-transform: capitalize;
  display: inline-block;
}

.personal {
  display: none;
}

.personal>a {
  text-transform: none;
}

.navbar-toggle .icon-bar {
  background: #2c363f;
}

.ishome a {
  color: #fff !important;
}

.ishome .navbar-toggle .icon-bar {
  background: #fff;
}

.navbar-brand {
  font-size: 20px;
}

.ishome .navbar-brand {
  color: #fff !important;
}

.navbar-brand:after {
  display: none;
}

.header-nav a:hover,
.header-nav a:focus,
nav .open>a {
  background: transparent !important;
}

.header-nav .dropdown-menu {
  min-width: auto;
  text-align: center;
  border: none;
  padding: 10px 16px;
  right: auto;
}

.header-nav .dropdown-menu>li>a {
  padding: 4px 0;
  color: #2c363f !important;
}

.pc-login {
  padding: 6px 10px;
  border: 1px solid #2c363f;
  border-radius: 4px;
  margin: 8px 10px;
  text-transform: capitalize;
}

.ishome .pc-login {
  border: 1px solid #fff;
  color: #fff;
}

.mobile-login {
  padding: 15px;
  line-height: 20px;
  float: right;
}

.ishome .mobile-login {
  color: #fff;
}

@media (max-width: 767px) {
  #mds-nav {
    background: #fff;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  #mds-nav a {
    color: #2c363f !important;
    padding: 0;
    height: 60px;
    line-height: 60px;
    font-size: 24px;
  }

  .collapse-close {
    font-size: 28px;
    padding: 14px 20px;
    color: #607d8b;
    text-align: right;
  }

  .personal {
    float: right;
  }

  .personal a {
    padding: 15px;
  }
}

@media (min-width: 768px) {
  .dropdown {
    float: left;
    display: block;
  }

  .dropdown a {
    padding: 15px;
  }

  .personal {
    display: none;
  }
}
</style>
