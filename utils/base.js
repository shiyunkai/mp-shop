
import { Config } from '../utils/config.js';
import { Token } from '../utils/token.js';

class Base{
  constructor(){
    this.baseRequestUrl = Config.restUrl;
  }

  /**
   * 发送请求
   *  params 请求参数
   *  noRefetch true——不做未授权重试机制
   */
  request(params, noRefetch){

    var that = this;
    var url = this.baseRequestUrl + params.url;

    if(!params.type){
      params.type = 'GET'
    }

    wx.request({
      url: url,
      method: params.type,
      data: params.data,
      header: {
        'content-type': 'application/json',
        'token': wx.getStorageSync('token')
      },

      success: function(res){
        // 获取请求状态码
        var code = res.statusCode.toString();
        var startChar = code.charAt(0);
        
        if(startChar == '2'){
          // 此次请求正常
          params.sCallback && params.sCallback(res.data)
        }else{
          if (code == '401'){
            // 令牌失效
            // 重新获取令牌，重新发送请求
            if(!noRefetch){
              that._refetch(params);
            }           
          }
        }
      },

      fail: function(err){
        console.log(err)
      }
    })
  }

  /* 获得元素上绑定的值 */
  getDataSet(event, key){
    return event.currentTarget.dataset[key];
  }

  _refetch(params){
    var token = new Token();
    token.getTokenFromServer((token)=>{
      this.request(params, true);
    })
  }
}

export {Base}