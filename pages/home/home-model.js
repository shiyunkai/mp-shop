import {Base} from '../../utils/base.js';

class Home extends Base{

// 构建函数
  constructor(){
    super();
  }

  getBannerData(id, callback){

    var params = {
      url: 'banner/'+id,
      sCallback: function(res){
        callback && callback(res.items);
      }
    }

    this.request(params);

    /*
    // 小程序里面只有异步，
    // 不能使用var result = wx.request 接收异步方法返回结果
    // 只能通过回调函数返回结果 
    wx.request({
      url: 'http://zerg.com/api/v1/banner/'+id,
      method: 'GET',
      success: function(res){
        //console.log(res.data);
        callBack(res)
      }
    })
    */
  }

  getThemeData(callback) {
    var params = {
      url: 'theme?ids=1,2,3',
      sCallback: function (data) {
        callback && callback(data)
      }
    }

    this.request(params);
  }

  getProductsData(callback) {
    var params = {
      url: 'product/recent',
      sCallback: function (data) {
        callback && callback(data)
      }
    }

    this.request(params);
  }



}



// 必须export外部才能使用import导入
export {Home}