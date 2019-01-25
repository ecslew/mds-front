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

<style scoped>
::-webkit-scrollbar {
  width: 0;
}

@import '../../static/css/roadmap.css'
</style>
