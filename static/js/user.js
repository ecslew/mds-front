import globalData from 'static/js/config.js'
import Eos from 'eosjs'

class User {
  constructor() {
    this.network = {
      blockchain: 'eos',
      protocol: globalData.protocol,
      host: globalData.host,
      port: globalData.port,
      chainId: globalData.chainId
    }
    this.currentAccount = null
  }

  getAccount() {
    return new Promise((resolve, reject) => {
      if (this.currentAccount) {
        return resolve(this.currentAccount);
      }

      ScatterJS.scatter.connect('Medishares').then(connected => {
        if (connected) {
          // 登录，获取 EOS 账户
          ScatterJS.scatter.getIdentity({
            accounts: [this.network]
          }).then(result => {
            if (result.accounts[0]) {
              this.currentAccount = result.accounts[0];
              return resolve(this.currentAccount);
            }
          }).catch(error => {
            reject('error:' + JSON.stringify(error));
          });

        } else {
          reject('connectFail');
        }
      });
    });
  }

  logout() {
    return new Promise((resolve, reject) => {
      if (this.currentAccount) {
        ScatterJS.scatter.connect('Medishares').then(connected => {
          if (connected) {
            // 删除之前的登录账户
            ScatterJS.scatter.forgetIdentity()
            if (this.currentAccount) {
              this.currentAccount = null
              return resolve(this.currentAccount)
            }
          } else {
            reject('connectFail')
          }
        });
      } else {
        reject('connectFail');
      }
    })

  }

  getEos() {
    return ScatterJS.scatter.eos(this.network, Eos);
  }

  getPosition() {
    return new Promise((resolve, reject) => {
      let geolocation = new BMap.Geolocation();
      //调用百度地图api 中的获取当前位置接口
      geolocation.getCurrentPosition(function(r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          //获取当前位置经纬度
          let myGeo = new BMap.Geocoder();
          myGeo.getLocation(new BMap.Point(r.point.lng, r.point.lat), function(result) {
            if (result) {
              resolve(result)
            } else {
              reject()
            }
          });
        } else {
          reject()
        }
      });
    })
  }
}

/* eslint-disable no-new */
let user = new User
export default user