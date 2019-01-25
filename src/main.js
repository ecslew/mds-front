// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import resource from 'vue-resource'
import i18n from 'static/js/i18n'
import globalData from 'static/js/config.js'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'static/css/index.css'
import clipboard from 'clipboard'
import ScatterJS from 'scatterjs-core'
import ScatterEOS from 'scatterjs-plugin-eosjs'
// import VueAMap from 'vue-amap'
import BaiduMap from 'vue-baidu-map'

ScatterJS.plugins(new ScatterEOS())

/*注册到vue原型上*/
Vue.prototype.globalData = globalData;
Vue.prototype.clipboard = clipboard;

Vue.config.productionTip = false
Vue.use(resource)

// Vue.use(VueAMap);
// VueAMap.initAMapApiLoader({
//   key: 'de4716dea081f7dbc69b1c3ece16462a',
//   plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.Geolocation', 'AMap.CircleEditor'],
//   uiVersion: '1.0', // ui库版本，不配置不加载,
//   // 默认高德 sdk 版本为 1.4.4
//   v: '1.4.4'
// });


Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: '7DgMV2aoB7prwOXNndQH2Yp8T1juwYGl'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  components: { App },
  template: '<App/>'
})