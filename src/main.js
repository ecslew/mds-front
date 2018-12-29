// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import resource from 'vue-resource'
import i18n from 'static/js/i18n'
import globalData from 'static/js/config-dev.js'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'static/css/index.css'
import 'static/js/common.js'
import clipboard from 'clipboard'

import ScatterJS from 'scatterjs-core'
import ScatterEOS from 'scatterjs-plugin-eosjs'

ScatterJS.plugins(new ScatterEOS())

/*注册到vue原型上*/
Vue.prototype.globalData = globalData;
Vue.prototype.clipboard = clipboard;

Vue.config.productionTip = false
Vue.use(resource)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  components: { App },
  template: '<App/>'
})