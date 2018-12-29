export default {
  // protocol: 'http',
  // host: '39.108.231.157',
  // port: 30065,
  // chainId: '5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191',
  protocol: 'https',
  host: 'mainnet.eoscannon.io',
  port: 443,
  chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
  domain: 'http://rpcdev.xinchain.org',
  browsers: {
    mobile: !!navigator.userAgent.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
    android: navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1 //android终端
  }
}