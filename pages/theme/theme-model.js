import {Base} from '../../utils/base.js'

class Theme extends Base{

  constructor() {
    super();
  }

  /* 获取主题下的商品列表 */
  getProductsData(id, callback){
    var param = {
      url: 'theme/'+ id,
      sCallback: function (data){
        callback && callback(data);
      }
    }

    this.request(param);
  }
}

export {Theme}
