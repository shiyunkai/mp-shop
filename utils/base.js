
import {Config} from '../utils/config.js';

class Base{
  constructor(){
    this.baseRequestUrl = Config.restUrl;
  }

  request(params){
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
        /*
        if(params.sCallback){
          params.sCallback(res)
        }
        */
        params.sCallback && params.sCallback(res.data)
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
}

export {Base}