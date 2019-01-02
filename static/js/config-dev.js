export default {
  protocol: 'http',
  host: 'kylin.meet.one',
  port: 8888,
  chainId: '5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191',
  domain: 'http://rpcdev.xinchain.org',
  contract: 'eostest51111',
  browsers: {
    mobile: !!navigator.userAgent.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
    android: navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1 //android终端
  }
}