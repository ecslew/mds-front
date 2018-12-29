<template>
<div :class="[{ishome:isHome},'mds-nav']">
  <nav class="header-nav">
    <div class="container">
      <div class="navbar-header">
        <router-link to="/" class="navbar-brand">MDS</router-link>
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                  data-target="#mds-nav" aria-expanded="true">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <div class="mobile-login hidden-sm hidden-md hidden-lg" @click="login" v-show='!isLogin'>{{$t("login")}}</div>
        <div class="dropdown personal hidden-sm hidden-md hidden-lg" v-show='isLogin'>
          <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" role="button">{{currentAccount?currentAccount.name:''}}<span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li>
              <router-link to="/projectCreate">{{$t("create_a_project")}}</router-link>
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
        <div class="collapse-close hidden-sm hidden-md hidden-lg">×</div>
        <ul class="nav navbar-nav navbar-right">
          <li><a href="/" class="ico-book hidden-sm hidden-md hidden-lg">{{$t("home")}}</a></li>
          <li><a href="http://www.mathwallet.org/en/">{{$t("MathWallet")}}</a></li>
          <li><a href="http://doc.medishares.org/whitepaper/MediShares.Whitepaper.EN.pdf" target="_blank">{{$t("WhitePaper")}}</a></li>
          <li><a href="http://blog.medishares.org/?page_id=610" target="_blank">{{$t("career")}}</a></li>
          <li><a href="https://medium.com/@MediShares" target="_blank">{{$t("help")}}</a></li>
          <div class="dropdown">
            <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" role="button">{{$t("lang")}}<span class="caret"></span></a>
            <ul class="dropdown-menu">
              <li><a href="javascript:;" name="cn" @click="changeLang">中文</a></li>
              <li><a href="javascript:;" name="en" @click="changeLang">English</a></li>
              <li><a href="javascript:;" name="ko" @click="changeLang">한국어</a></li>
            </ul>
          </div>
          <div class="login pull-left hidden-xs" @click="login" v-show='!isLogin'>{{$t("login")}}</div>
          <div class="dropdown personal hidden-xs" v-show='isLogin'>
            <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" role="button">{{currentAccount?currentAccount.name:''}}<span class="caret"></span></a>
            <ul class="dropdown-menu">
              <li>
                <router-link to="/projectCreate">{{$t("create_a_project")}}</router-link>
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
        </ul>
      </div>
    </div>
  </nav>
  <div class="modal text-center" id="login">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">{{$t("log_mds")}}</h4>
        <div class="start" @click="loginByScatter">{{$t("log_scatter")}}</div>
        <div class="loginInfo">{{$t("log_scatter_tip")}}</div>
        <p class="no-scatter">{{$t("log_no_scatter")}} <a href="https://get-scatter.com/">{{$t("download_here")}}</a></p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import user from 'static/js/user'
export default {
  name: 'mdsNav',
  data() {
    return {
      isHome: false,
      isLogin: false,
      currentAccount: null
    }
  },
  created() {
    if (this.$route.path == '/') {
      this.isHome = true
    } else {
      this.isHome = false
    }
  },
  mounted() {
    if (this.$route.path == '/') {
      this.isHome = true
    } else {
      this.isHome = false
    }
    this.loginByScatter()
  },
  methods: {
    changeLang(event) {
      this.$i18n.setUserLanguage(event.target.name)
    },
    login() {
      $("#login").modal('show');
    },
    loginByScatter() {
      user.getAccount().then((currentAccount) => {
        this.currentAccount = currentAccount;
        $('#login').modal('hide')
        this.isLogin = true
      }, (err) => {
        alert(err);
      });
    },
    logout() {
      user.logout().then((currentAccount) => {
        this.currentAccount = currentAccount
        this.isLogin = false
      }, (err) => {
        alert(err);
      });

    }
  },
  watch: {
    $route(to, from) {
      if (this.$route.path == '/') {
        this.isHome = true
      } else {
        this.isHome = false
      }
    }
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
}

.ishome .scroll-nav {
  background: #020308;
}

.header-nav a {
  color: #2c363f;
}

.navbar-toggle .icon-bar {
  background: #2c363f;
}

.ishome a {
  color: #fff;
}

.ishome .navbar-toggle .icon-bar {
  background: #fff;
}

.navbar-brand {
  font-size: 20px;
}

.dropdown-menu {
  min-width: 80px;
  text-align: center;
  border: none;
}

.personal .dropdown-menu {
  min-width: 120px;
}

.navbar-brand:after {
  display: none;
}

.header-nav a:hover,
.header-nav a:focus,
nav .open>a {
  background: transparent !important;
}

.navbar-nav .open .dropdown-menu>li>a {
  padding: 10px;
}

.dropdown a {
  padding: 10px 15px;
  display: block;
  line-height: 20px;
}

.login {
  padding: 6px 10px;
  border: 1px solid #2c363f;
  border-radius: 4px;
  margin: 8px 10px;
}

.ishome .login {
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

.modal-title {
  margin-top: 24px;
}

.loginInfo {
  padding: 96px 24px 32px;
  font-family: Gotham-Medium;
  font-size: 16px;
  line-height: 1.5;
  color: #607d8b;
}

.no-scatter {
  padding: 32px 0 8px;
  font-size: 16px;
  font-family: Gotham-Medium;
  color: #607d8b;
}

.no-scatter a {
  color: #2196f3 !important;
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
    color: #2c363f;
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

  .modal-title {
    margin: 0;
  }

  .loginInfo {
    padding: 24px 0;
  }

  .no-scatter {
    padding: 24px 0 0;
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
}
</style>
