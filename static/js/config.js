import dataDev from 'static/js/config-dev.js'
import dataPro from 'static/js/config-pro.js'

let globalData = process.env.NODE_ENV === 'production' ? dataPro : dataDev

globalData.browsers = {
  mobile: !!navigator.userAgent.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
  android: navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1 //android终端
}

export default globalData