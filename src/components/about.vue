<template>
<div class="about">
  <div class="mds-top">
    <div class="container">
      <img src="static/img/icon/header_logo@2x.png" class="header-logo">
      <div class="mds-top-title">{{$t('slogan')}}</div>
      <div class="slogan">{{$t('mediShares_slogan')}}</div>
      <div class="exchange">
        <p>{{$t('mediShares_exchange')}}</p>
        <ul>
          <li><a target="_blank" href="https://www.huobi.pro/zh-cn/mds_eth/exchange/"><img src="static/img/exchange/huobi.pro@2x.png"></a></li>
          <li><a target="_blank" href="https://gate.io/trade/MDS_ETH"><img src="static/img/exchange/gate.io@2x.png"></a></li>
          <li><a target="_blank" href="https://www.cex.com/market/mds_usdt"><img src="static/img/exchange/cex.com@2x.png"></a></li>
          <li><a target="_blank" href="https://otcbtc.com/sell_offers?utf8=%E2%9C%93&currency=mds&fiat_currency=cny"><img src="static/img/exchange/OTCBTC@2x.png"></a></li>
        </ul>
      </div>
    </div>
  </div>
  <!-- 什么是 MediShares -->
  <div class="mds-des bgfff">
    <div class="container">
      <div class="mds-title">{{$t('mediShares_des')}}</div>
      <ul class="row">
        <li class="col-sm-4"><span class="mds-des-dot">•</span>
          <div>{{$t('mediShares_des1')}}</div>
        </li>
        <li class="col-sm-4"><span class="mds-des-dot">•</span>
          <div>{{$t('mediShares_des2')}}</div>
        </li>
        <li class="col-sm-4"><span class="mds-des-dot">•</span>
          <div>{{$t('mediShares_des3')}}</div>
        </li>
      </ul>
    </div>
  </div>
  <!-- MediShares 的优势 -->
  <div class="mds-superiority pd-160">
    <div class="container">
      <div class="mds-title">{{$t('mediShares_adv')}}</div>
      <ul class="row">
        <li class="col-sm-4"><span class="mds-sup-icon"><img src="static/img/advantage/advantage_icon_1@2x.png"></span>
          <div>{{$t('mediShares_adv1')}}</div>
        </li>
        <li class="col-sm-4"><span class="mds-sup-icon"><img src="static/img/advantage/advantage_icon_2@2x.png"></span>
          <div>{{$t('mediShares_adv2')}}</div>
        </li>
        <li class="col-sm-4"><span class="mds-sup-icon"><img src="static/img/advantage/advantage_icon_3@2x.png"></span>
          <div>{{$t('mediShares_adv3')}}</div>
        </li>
        <li class="col-sm-4"><span class="mds-sup-icon"><img src="static/img/advantage/advantage_icon_4@2x.png"></span>
          <div>{{$t('mediShares_adv1')}}</div>
        </li>
        <li class="col-sm-4"><span class="mds-sup-icon"><img src="static/img/advantage/advantage_icon_5@2x.png"></span>
          <div>{{$t('mediShares_adv4')}}</div>
        </li>
      </ul>
    </div>
  </div>
  <!-- 应用场景 -->
  <div class="mds-application pd-160">
    <div class="container">
      <div class="mds-title">{{$t('mediShares_apl')}}</div>
      <ul class="row  mds-apl-list mt-100">
        <li class="col-sm-4">
          <div class="mds-apl-detail">
            <div class="mds-apl-title">{{$t('mediShares_apl_title1')}}</div>
            <div class="mds-apl-info">
              {{$t('mediShares_apl_info1')}}
            </div>
          </div>
        </li>
        <li class="col-sm-4">
          <div class="mds-apl-detail">
            <div class="mds-apl-title">{{$t('mediShares_apl_title2')}}</div>
            <div class="mds-apl-info">
              {{$t('mediShares_apl_info2')}}
            </div>
          </div>
        </li>
        <li class="col-sm-4">
          <div class="mds-apl-detail">
            <div class="mds-apl-title">{{$t('mediShares_apl_title3')}}</div>
            <div class="mds-apl-info">
              {{$t('mediShares_apl_info3')}}
            </div>
          </div>
        </li>
        <li class="col-sm-4">
          <div class="mds-apl-detail">
            <div class="mds-apl-title">{{$t('mediShares_apl_title4')}}</div>
            <div class="mds-apl-info">
              {{$t('mediShares_apl_info4')}}
            </div>
          </div>
        </li>
        <li class="col-sm-4">
          <div class="mds-apl-detail">
            <div class="mds-apl-title">{{$t('mediShares_apl_title5')}}</div>
            <div class="mds-apl-info">
              {{$t('mediShares_apl_info5')}}
            </div>
          </div>
        </li>
        <li class="col-sm-4">
          <div class="mds-apl-detail">
            <div class="mds-apl-title">{{$t('mediShares_apl_title6')}}</div>
            <div class="mds-apl-info">
              {{$t('mediShares_apl_info6')}}
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <!-- 保障合约市场 -->
  <div class="mds-market bgfff pd-160">
    <div class="container">
      <div class="mds-title">{{$t('mediShares_market')}}</div>
      <ul class="row  mt-120">
        <li class="col-sm-4 mds-market-list list1">
          <div class="mds-market-title">{{$t('mediShares_market_title1')}}</div>
          <ul class="mds-apl-info">
            <li><span class="mds-des-dot">•</span>
              <div>{{$t('mediShares_market_info1')}}</div>
            </li>
            <li><span class="mds-des-dot">•</span>
              <div>{{$t('mediShares_market_info2')}}</div>
            </li>
            <li><span class="mds-des-dot">•</span>
              <div>{{$t('mediShares_market_info3')}}</div>
            </li>
          </ul>
        </li>
        <li class="col-sm-4 mds-market-list list2">
          <div class="mds-market-title">{{$t('mediShares_market_title2')}}</div>
        </li>
        <li class="col-sm-4 mds-market-list list3">
          <div class="mds-market-title">{{$t('mediShares_market_title3')}}</div>
        </li>
      </ul>
    </div>
  </div>
  <!-- 合作伙伴 -->
  <div class="mds-partner pd-160 center-align">
    <div class="container">
      <div class="mds-title">{{$t('partners')}}</div>
      <ul class="mt-40">
        <li class="mds-partner-list">
          <a href="https://infocorp.io/" target="_blank"><img src="static/img/partner/partner_7_logo@2x.png" ></a>
        </li>
        <li class="mds-partner-list">
          <a href="http://fenbushi.vc/" target="_blank"><img src="static/img/partner/partner_3_logo@2x.png" ></a>
        </li>
        <li class="mds-partner-list">
          <a href="https://delphy.org/" target="_blank"><img src="static/img/partner/partner_6_logo@2x.png" ></a>
        </li>
        <li class="mds-partner-list">
          <a href="http://scry.info" target="_blank"><img src="static/img/partner/partner_5_logo@2x.png" ></a>
        </li>
        <li class="mds-partner-list">
          <a href="https://genaro.network/en/" target="_blank"><img src="static/img/partner/partner_8_logo@2x.png" ></a>
        </li>
        <li class="mds-partner-list">
          <a href="https://www.irisnet.org/" target="_blank"><img src="static/img/partner/partner_9_logo@2x.png" ></a>
        </li>
        <li class="mds-partner-list">
          <a href="http://www.zhongtuobang.com/" target="_blank"><img src="static/img/partner/partner_4_logo@2x.png" ></a>
        </li>
      </ul>
    </div>
  </div>
  <foot></foot>
</div>
</template>

<script>
import foot from '@/base/foot'
export default {
  components: {
    foot
  }
}
</script>

<style>
.pd-160 {
  padding: 160px 0 !important;
}

.mt-120 {
  margin-top: 120px !important;
}

.mt-100 {
  margin-top: 100px !important;
}

.mt-40 {
  margin-top: 40px !important;
}

.bgfff {
  background-color: #fff !important;
}

.center-align {
  text-align: center !important;
}

.mds-top .header-logo {
  width: 182px;
  margin-top: 20px;
}

.mds-top-title {
  font-size: 32px;
  line-height: 1.88;
  margin-top: 96px;
}

.exchange {
  margin-top: 80px;
  padding: 80px 0 0;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.exchange>p {
  font-family: Gotham-Medium;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  margin-bottom: 50px;
}

.exchange li {
  display: inline-block;
  margin: 10px;
}

.exchange li a {
  display: inline-block;
}

.exchange li img {
  height: 60px;
}

/*什么是 MediShares*/
.mds-des {
  padding: 120px 0 160px;
  color: #2c363f;
  line-height: 1.5;
}

.mds-des ul {
  margin-top: 80px;
  font-size: 14px;
  font-weight: normal;
  line-height: 1.43;
}

/*MediShares 的优势*/
.mds-superiority ul {
  margin-top: 20px;
}

.mds-superiority li {
  padding: 100px 50px 0;

  color: #2c363f;
}

.mds-sup-icon {
  float: left;
  width: 32px;
  height: 32px;
  margin-right: 15px;
  background-color: #2c363f;
  -moz-border-radius: 50%;
  border-radius: 50%;
  overflow: hidden;
}

.mds-sup-icon>img {
  width: 100%;
}

.mds-sup-icon+div {
  overflow: hidden;
}

/*应用场景*/
.mds-application {
  background-color: #607d8b;
}

.mds-application .mds-title {
  color: #fff;
}

.mds-apl-list>li {
  margin-top: 20px;
}

.mds-apl-detail {
  background-color: #fff;
  background-repeat: no-repeat;
  background-size: 344px;
  background-position: right bottom;
  padding: 40px 32px;
  height: 240px;
  border-radius: 2px;
}

.mds-apl-list>li:nth-of-type(1)>.mds-apl-detail {
  background-image: url(../../static/img/application/scenario_icon_1@2x.png);
}

.mds-apl-list>li:nth-of-type(2)>.mds-apl-detail {
  background-image: url(../../static/img/application/scenario_icon_2@2x.png);
}

.mds-apl-list>li:nth-of-type(3)>.mds-apl-detail {
  background-image: url(../../static/img/application/scenario_icon_3@2x.png);
}

.mds-apl-list>li:nth-of-type(4)>.mds-apl-detail {
  background-image: url(../../static/img/application/scenario_icon_4@2x.png);
}

.mds-apl-list>li:nth-of-type(5)>.mds-apl-detail {
  background-image: url(../../static/img/application/scenario_icon_5@2x.png);
}

.mds-apl-list>li:nth-of-type(6)>.mds-apl-detail {
  background-image: url(../../static/img/application/scenario_icon_6@2x.png);
}

.mds-apl-title {
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  color: #2c363f;
  font-family: Gotham-Medium;
}

.mds-apl-info {
  margin-top: 9px;
  font-size: 12px;
  line-height: 1.5;
  color: #607d8b;
  position: relative;
  z-index: 1;
}

/*保障合约市场*/
.mds-market-list {
  padding-right: 60px;
}

.mds-market-list:before {
  position: absolute;
  top: -40px;
  left: 0;
  font-family: Gotham-Light;
  font-size: 160px;
  font-weight: 300;
  line-height: 1.0;
  color: #f2f5f6;
  z-index: 0;
}

.mds-market-list.list1:before {
  content: '1';
}

.mds-market-list.list2:before {
  content: '2';
}

.mds-market-list.list3:before {
  content: '3';
}

.mds-market-title {
  font-size: 14px;
  font-weight: 500;
  line-height: 1.43;
  color: #2c363f;
  font-family: Gotham-Medium;
  position: relative;
  z-index: 1;
}

/*合作伙伴*/
.mds-partner-list {
  height: 64px;
  margin-top: 40px;
}

.mds-partner-list>a {
  display: inline-block;
  height: 100%;
}

.mds-partner-list img {
  width: auto;
  height: 100%;
}

/*小于992px屏幕 xs+sm*/
@media (max-width: 991px) {

  /*应用场景*/
  .mds-apl-detail {
    height: 360px;
  }
}

/*小于768px屏幕 手机 xs*/
@media (max-width: 767px) {

  /*公共类*/
  .pd-160 {
    padding: 60px 0 !important;
  }

  .mt-120,
  .mt-40 {
    margin-top: 0px !important;
  }

  .mt-100 {
    margin-top: 40px !important;
  }

  /*头部*/

  .mds-top-title {
    font-size: 24px;
    margin-top: 80px;
    line-height: 1.33;
  }

  .exchange {
    margin-top: 40px;
    padding-top: 40px;
  }

  .exchange p {
    margin-bottom: 25px;
  }

  /*什么是 MediShares*/
  .mds-des {
    padding: 60px 0 80px;
  }

  .mds-des li {
    margin-top: 40px;
    padding: 0;
  }

  .mds-des>.container>ul,
  .mds-superiority>.container>ul,
  .mds-market>.container>ul {
    margin: 0;
  }

  /*优势*/
  .mds-superiority li {
    padding: 40px 0 0;
  }

  /*应用场景*/
  .mds-apl-detail {
    height: auto;
  }

  /*保障合约市场*/
  .mds-market-list:before {
    display: none;
  }

  .mds-market-list {
    margin-bottom: 40px;
    padding: 0;
  }

}

/*大于等于768px屏幕 包含平板 sm+md+lg*/
@media (min-width: 768px) {
  .mds-partner-list {
    width: auto;
    padding: 0;
    margin: 40px 24px 0;
    display: inline-block;
    float: none;
  }
}
</style>
