//app.js
import { Token } from 'utils/token.js';

App({
  onLaunch: function () {
    // 校验令牌
    var token = new Token();
    token.verify();
  },
  globalData: {
    userInfo: null
  }
})