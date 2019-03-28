import Vue from 'vue'
import vueI18n from 'vue-i18n'
import mathWallet from 'math-js-sdk'
Vue.use(vueI18n)

/*
设置一下网站支持的语言种类
  */
var webLanguage = ['cn', 'en', 'ko'];

/**
 * cookie操作
 */
var getCookie = function(name, value, options) {
  if (typeof value != 'undefined') { // name and value given, set cookie
    options = options || {};
    if (value === null) {
      value = '';
      options.expires = -1;
    }
    var expires = '';
    if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
      var date;
      if (typeof options.expires == 'number') {
        date = new Date();
        date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
      } else {
        date = options.expires;
      }
      expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
    }
    var path = options.path ? '; path=' + options.path : '';
    var domain = options.domain ? '; domain=' + options.domain : '';
    var s = [cookie, expires, path, domain, secure].join('');
    var secure = options.secure ? '; secure' : '';
    var c = [name, '=', encodeURIComponent(value)].join('');
    var cookie = [c, expires, path, domain, secure].join('')
    document.cookie = cookie;
  } else { // only name given, get cookie
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
        var cookie = jQuery.trim(cookies[i]);
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) == (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
};

/**
 * 获取浏览器语言类型
 */
var getNavLanguage = function() {
  var navLanguage = (navigator.browserLanguage || navigator.language).toLowerCase();
  switch (navLanguage) {
    case 'zh-cn' || 'zh-tw' || 'zh-hk':
      navLanguage = 'cn';
      break;
    case 'ko':
      navLanguage = 'ko'
      break;
    default:
      navLanguage = 'en';
  }
  return navLanguage;
}

let i18n = new vueI18n({
  locale: 'en', // 语言标识
  //this.$i18n.locale // 通过切换locale的值来实现语言切换
  messages: {
    'cn': require('static/lang/cn'),
    'en': require('static/lang/en'),
    'ko': require('static/lang/ko')
  }
})

function isJSON(str) {
  if (typeof str == 'string') {
    try {
      var obj = JSON.parse(str);
      if (typeof obj == 'object' && obj) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
  console.log('It is not a string!')
}

i18n.setUserLanguage = function(lang) {
  if (isJSON(lang)) {
    lang = JSON.parse(lang).language;
  }
  if (!webLanguage.includes(lang)) {
    lang = 'en'
  }
  getCookie("userLanguage", lang, {
    expires: 30,
    path: '/'
  });
  i18n.locale = lang;
}

if (mathwallet.isMath()) {
  //接收app提供的语言参数
  mathwallet.getLanguage().then((lang) => {
    i18n.setUserLanguage(lang)
  });
} else {
  var cookieLang = getCookie('userLanguage') ? getCookie('userLanguage') : getNavLanguage();
  i18n.setUserLanguage(cookieLang);
}
export default i18n