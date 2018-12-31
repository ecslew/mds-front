<template>
<!-- 底部 -->
<footer class="foot">
  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-sm-4 medi-shares">
        <img src="static/img/icon/foot_logo@2x.png">
      </div>
        <div class="col-xs-12 col-sm-4">
          <ul class="contact-list">
            <li class="col-xs-6 col-sm-12">
              <a href="https://t.me/medishares" target="_blank">
              <span class="contact-icon"><img src="static/img/icon/sns-icon-github@2x.png"></span>
              <span>Telegram</span>
            </a>
            </li>
            <li class="col-xs-6 col-sm-12">
              <a href="https://github.com/MediShares" target="_blank">
              <span class="contact-icon"><img src="static/img/icon/sns_icon_github@2x.png"></span>
              <span>GitHub</span>
            </a>
            </li>
            <li class="col-xs-6 col-sm-12">
              <a href="https://twitter.com/MediShares" target="_blank">
              <span class="contact-icon"><img src="static/img/icon/sns_icon_twitter@2x.png"></span>
              <span>Twitter</span>
            </a>
            </li>
            <li class="col-xs-6 col-sm-12">
              <a href="http://weibo.com/MediShares" target="_blank">
              <span class="contact-icon"><img src="static/img/icon/sns_icon_weibo@2x.png"></span>
              <span>weibo</span>
            </a>
            </li>
            <li class="col-xs-6 col-sm-12">
              <a href="mailto:hello@medishares.org">
              <span class="contact-icon"><img src="static/img/icon/sns_icon_email@2x.png"></span>
              <span>Email</span>
            </a>
            </li>
            <li class="col-xs-6 col-sm-12">
              <a href="http://blog.medishares.org/" target="_blank">
              <span class="contact-icon"><img src="static/img/icon/sns_icon_blog@2x.png"></span>
              <span>Blog</span>
            </a>
            </li>
          </ul>
        </div>
        <div class="col-xs-8 col-sm-2 code-img">
          <img src="http://medishares.oss-cn-hongkong.aliyuncs.com/logo/qr_code.png" width="100%">
          <div class="code-tip">Join the wechat group</div>
        </div>
      </div>
      <div class="center-align copyright">© 2017 MediShares Foundation Ltd. All rights reserved. <a style="color:#607d8b;text-decoration: underline;" href="http://medishares.oss-cn-hongkong.aliyuncs.com/media/MDS_media_kit.zip">Download Media Kit</a></div>
    </div>
</footer>
</template>

<script>
export default {

}
</script>

<style scoped>
footer {
  background-color: #2c363f;
  padding: 120px 0 48px;
}

footer .row {
  padding-bottom: 120px;
}

footer .medi-shares {
  margin: 0;
}

footer .medi-shares>img {
  height: 40px;
}

footer .contact-list>li {
  margin-top: 24px;
  position: relative;
}

footer .contact-list .qq-code {
  position: absolute;
  left: 15px;
  bottom: 50px;
  width: 200px;
  display: none;
}

footer .contact-list>li:first-of-type {
  margin-top: 0;
}

footer .contact-list a {
  display: block;
}

footer .contact-icon {
  width: 40px;
  height: 40px;
  -moz-border-radius: 50%;
  border-radius: 50%;
  overflow: hidden;
  display: inline-block;
  margin-right: 16px;
  vertical-align: middle;
  overflow: hidden;
}

footer .contact-icon>img {
  width: 100%;
}

footer .contact-icon+span {
  font-family: Gotham-Medium;
  font-size: 16px;
  line-height: 1.25;
  color: #607d8b;
  vertical-align: middle;
}

.code-tip {
  font-family: Gotham-Medium;
  font-size: 12px;
  line-height: 1.33;
  color: #607d8b;
  margin-top: 24px;
  white-space: nowrap;
}

.copyright {
  font-size: 14px;
  line-height: 1.43;
  color: #607d8b;
  text-align: center;
}

@media (max-width: 767px) {
  footer {
    padding: 80px 15px 40px;
  }

  footer .medi-shares {
    margin-bottom: 60px;
  }

  footer .contact-list>li {
    padding: 0;
  }

  footer .contact-list>li:nth-of-type(2) {
    margin-top: 0;
  }

  footer .contact-icon {
    margin-right: 12px;
  }

  footer .code-img {
    margin-top: 80px;
  }

  footer .code-tip {
    margin-top: 16px;
  }

  footer .row {
    padding-bottom: 80px;
  }

  footer .contact-list .qq-code {
    left: 0;
    width: 150px;
  }
}

/*小于等于360px屏幕*/

@media (max-width: 360px) {
  footer .contact-icon {
    margin-right: 3px;
  }

  footer .contact-icon+span {
    font-size: 14px;
  }
}
</style>
