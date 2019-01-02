<template>
<div class="roadmap">
  <div class="container">
    <div class="mds-title">{{$t("roadmap")}}</div>
  </div>
  <div id="wrapper">
    <div id="scroller">
      <div class="scroll-box">
        <ul class="clearfix">
          <li class="mds-develop-list">
            <div class="develop-box">
              <div class="dev-date">2018 Q1</div>
              <div class="dev-des">
                <ul>
                  <li><span class="mds-des-dot">•</span>
                    <div>{{$t("roadmap_step1")}}</div>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li class="mds-develop-list">
            <div class="develop-box">
              <div class="dev-date">2018 Q2</div>
              <div class="dev-des">
                <ul>
                  <li><span class="mds-des-dot">•</span>
                    <div>{{$t("roadmap_step2_1")}}</div>
                  </li>
                  <li><span class="mds-des-dot">•</span>
                    <div>{{$t("roadmap_step2_2")}}</div>
                  </li>
                  <li><span class="mds-des-dot">•</span>
                    <div>{{$t("roadmap_step2_3")}}</div>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li class="mds-develop-list">
            <div class="develop-box">
              <div class="dev-date">2018 Q3</div>
              <div class="dev-des">
                <ul>
                  <li><span class="mds-des-dot">•</span>
                    <div>{{$t("roadmap_step3_1")}}</div>
                  </li>
                  <li><span class="mds-des-dot">•</span>
                    <div>{{$t("roadmap_step3_2")}}</div>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li class="mds-develop-list">
            <div class="develop-box">
              <div class="dev-date">2018 Q4</div>
              <div class="dev-des">
                <ul>
                  <li><span class="mds-des-dot">•</span>
                    <div>{{$t("roadmap_step4_1")}}</div>
                  </li>
                  <li><span class="mds-des-dot">•</span>
                    <div>{{$t("roadmap_step4_2")}}</div>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li class="mds-develop-list">
            <div class="develop-box">
              <div class="dev-date">2019 Q1</div>
              <div class="dev-des">
                <ul>
                  <li><span class="mds-des-dot">•</span>
                    <div>{{$t("roadmap_step5_1")}}</div>
                  </li>
                  <li><span class="mds-des-dot">•</span>
                    <div>{{$t("roadmap_step5_2")}}</div>
                  </li>
                  <li><span class="mds-des-dot">•</span>
                    <div>{{$t("roadmap_step5_3")}}</div>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li class="mds-develop-list">
            <div class="develop-box">
              <div class="dev-date">2019 Q2</div>
              <div class="dev-des">
                <ul>
                  <li><span class="mds-des-dot">•</span>
                    <div>{{$t("roadmap_step6_1")}}</div>
                  </li>
                  <li><span class="mds-des-dot">•</span>
                    <div>{{$t("roadmap_step6_2")}}</div>
                  </li>
                  <li><span class="mds-des-dot">•</span>
                    <div>{{$t("roadmap_step6_3")}}</div>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li class="mds-develop-list">
            <div class="develop-box">
              <div class="dev-date">2019 Q3</div>
              <div class="dev-des">
                <ul>
                  <li><span class="mds-des-dot">•</span>
                    <div>{{$t("roadmap_step7_1")}}</div>
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import IScroll from 'iscroll'
export default {
  mounted() {
    if (window.innerWidth >= 768) {
      /* eslint-disable no-new */
      new IScroll('#wrapper', {
        scrollX: true,
        scrollY: false,
        scrollbars: 'custom',
        interactiveScrollbars: true
      });
    }
  }
}
</script>

<style>
.mt-170 {
    margin-top: 170px!important;
}
.roadmap {
  background-color: #e1e6e9;
  overflow: hidden;
  position: relative;
  height: 900px;
  padding: 160px 0;
}

.develop-box .dev-date {
  font-family: Gotham-Medium;
  font-size: 20px;
  font-weight: 500;
  line-height: 1.5;
  color: #a9b9c1;
}

.develop-box .dev-des {

  font-size: 14px;
  line-height: 1.43;
  color: #607d8b;
  margin-top: 8px;
}

/*发展路线图的导航条*/
::-webkit-scrollbar {
    width: 0;
}
.iScrollHorizontalScrollbar {
  position: absolute;
  z-index: 9999;
  height: 24px;
  width: 300px;
  left: 50%;
  -webkit-transform: translateX(-50%);
  -moz-transform: translateX(-50%);
  -ms-transform: translateX(-50%);
  transform: translateX(-50%);
  bottom: 0;
  overflow: visible !important;
}

.iScrollHorizontalScrollbar:before {
  content: "";
  position: absolute;
  top: 11px;
  left: 0;
  height: 0;
  width: 100%;
  border-top: 2px solid #c8d2d7;
}

.iScrollHorizontalScrollbar .iScrollIndicator {
  position: absolute;
  width: 64px !important;
  height: 24px !important;
  background: url(../../static/img/icon/slide_btn@2x.png) no-repeat top left/cover;
}

#wrapper {
  position: absolute;
  z-index: 1;
  top: 328px;
  bottom: 80px;
  left: 0;
  right: 0;
  overflow: hidden;
}

#scroller {
  position: absolute;
  z-index: 1;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-transform: translateZ(0);
  -moz-transform: translateZ(0);
  -ms-transform: translateZ(0);
  -o-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-text-size-adjust: none;
  -moz-text-size-adjust: none;
  -ms-text-size-adjust: none;
  -o-text-size-adjust: none;
  text-size-adjust: none;
}

@media(max-width: 767px) {
  .scroll-box>ul {
    padding: 0 32px 0 42px;
    margin-top: 0;
  }

  .roadmap {
    height: auto;
    padding: 40px 0;
  }

  #wrapper {
    position: relative;
    left: auto;
    top: auto;
    bottom: auto;
    right: auto;
  }

  #scroller {
    position: relative;
  }

  .mds-develop-list {
    padding: 0 0 40px 32px;
    position: relative;
    border-left: 4px solid #c8d2d7;
  }

  .mds-develop-list:last-of-type {
    border: none;
    padding-bottom: 0;
  }

  .mds-develop-list:before {
    content: '';
    position: absolute;
    top: 0;
    left: -14px;
    width: 8px;
    height: 8px;
    -moz-border-radius: 50%;
    border-radius: 50%;
    -webkit-box-sizing: content-box;
    -moz-box-sizing: content-box;
    box-sizing: content-box;
    background-color: #c8d2d7;
    border: 8px solid #f2f5f6;
    -webkit-box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
  }

  .mds-develop-list:last-of-type:before {
    left: -10px;
  }

  .iScrollHorizontalScrollbar {
    display: none;
  }
}

/*大于等于768px屏幕 包含平板 sm+md+lg*/
@media (min-width: 768px) {
  .scroll-box>ul {
    width: 2100px;
    border-top: 4px solid #c8d2d7;
    padding-left: 132px;
    margin-top:170px;
  }

  .mds-develop-list {
    width: 263px;
    position: relative;
    border-left: 1px solid #c8d2d7;
    min-height: 170px;
    float: left;
    padding: 0 15px;
  }

  .mds-develop-list:nth-of-type(2n+1) {
    -webkit-transform: translateY(-170px);
    -moz-transform: translateY(-170px);
    -ms-transform: translateY(-170px);
    transform: translateY(-170px);
  }

  .mds-develop-list:before {
    content: '';
    position: absolute;
    top: -14px;
    left: -12px;
    -webkit-box-sizing: content-box;
    -moz-box-sizing: content-box;
    box-sizing: content-box;
    width: 8px;
    height: 8px;
    -moz-border-radius: 50%;
    border-radius: 50%;
    background-color: #c8d2d7;
    border: 8px solid #f2f5f6;
    -webkit-box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
  }

  .mds-develop-list:nth-of-type(2n+1):before {
    top: auto;
    bottom: -14px;
  }

  .develop-box {
    position: absolute;
    top:40px;
  }

  .mds-develop-list:nth-of-type(2n+1) .develop-box {
    top: 0;
  }
}

@media (min-width: 2100px) {
  .iScrollHorizontalScrollbar {
    display: none;
  }

  #scroller,
  .scroll-box,
  .scroll-box>ul {
    width: 100%;
  }

  .mds-develop-list {
    width: 14%;
  }
}
</style>
