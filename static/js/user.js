import globalData from 'static/js/config-dev.js'
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
          reject('connect fail');
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
            reject('connect fail')
          }
        });
      } else {
        reject('connect fail');
      }
    })

  }

  getEos() {
    return ScatterJS.scatter.eos(this.network, Eos);
  }
}

/* eslint-disable no-new */
let user = new User
export default user