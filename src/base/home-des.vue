<template>
<div class="home-des">
  <!-- 什么是 MediShares -->
  <div class="mds-des">
    <div class="container">
      <div class="mds-title">{{$t('mediShares_des')}}</div>
      <ul class="row">
        <li class="col-sm-4 col-xs-12"><span class="mds-des-dot">•</span>
          <div>{{$t('mediShares_des1')}}</div>
        </li>
        <li class="col-sm-4 col-xs-12"><span class="mds-des-dot">•</span>
          <div>{{$t('mediShares_des2')}}</div>
        </li>
        <li class="col-sm-4 col-xs-12"><span class="mds-des-dot">•</span>
          <div>{{$t('mediShares_des3')}}</div>
        </li>
      </ul>
    </div>
  </div>
  <!-- MediShares 的优势 -->
  <div class="mds-superiority">
    <div class="container">
      <div class="mds-title">{{$t('mediShares_adv')}}</div>
      <ul class="row">
        <li class="col-xs-12 col-sm-4"><span class="mds-sup-icon"><img src="static/img/icon/advantage_icon_1@2x.png"></span>
          <div>{{$t('mediShares_adv1')}}</div>
        </li>
        <li class="col-xs-12 col-sm-4"><span class="mds-sup-icon"><img src="static/img/icon/advantage_icon_2@2x.png"></span>
          <div>{{$t('mediShares_adv2')}}</div>
        </li>
        <li class="col-xs-12 col-sm-4"><span class="mds-sup-icon"><img src="static/img/icon/advantage_icon_3@2x.png"></span>
          <div>{{$t('mediShares_adv3')}}</div>
        </li>
        <li class="col-xs-12 col-sm-4"><span class="mds-sup-icon"><img src="static/img/icon/advantage_icon_4@2x.png"></span>
          <div>{{$t('mediShares_adv4')}}</div>
        </li>
        <li class="col-xs-12 col-sm-4"><span class="mds-sup-icon"><img src="static/img/icon/advantage_icon_5@2x.png"></span>
          <div>{{$t('mediShares_adv5')}}</div>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
export default {

}
</script>

<style scoped>
/*什么是 MediShares*/

.mds-des {
  padding: 160px 0;
  color: #2c363f;
  line-height: 1.5;
}



/*MediShares 的优势*/

.mds-superiority {
  background: #fff;
  padding: 160px 0;
}

.mds-superiority li {
  padding: 60px 50px 20px;
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
@media (max-width: 767px) {
  .mds-des li {
    margin-bottom: 32px;
  }
  .mds-superiority li {
    padding: 0 15px 32px;
  }
}
</style>
