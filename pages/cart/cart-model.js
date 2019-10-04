
import { Base } from '../../utils/base.js'

class Cart extends Base{
  
  constructor(){
    super();
    this._storageKeyName = 'cart';
  }

  /**
   *  添加商品到购物车
   *  如果之前没有这样的商品，则直接添加一条新的记录，数量为counts
   *  如果有，则只将相应数量 + counts
   *  @params:
   *  item - {obj} 商品对象，
   *  counts - {int} 商品数目
   *  
   */
  add(item, counts){
    var cartData = this.getCartDataFromLocal();

    var isHasInfo = this._isHasThatOne(item.id, cartData);

    if(isHasInfo.index == -1){
      // 商品不存在购物车中
      item.counts = counts;
      // 设置选中状态
      item.selectStatus = true;
      cartData.push(item);
    }else{
      cartData[isHasInfo.index].counts += counts;
    }
    // 更新本地购物车
    wx.setStorageSync(this._storageKeyName, cartData);
  }

  /**
   * 从缓存中读取几辆数据
   *  flag: 是否只读取已选择的购物车
   */
  getCartDataFromLocal(flag){
    var res = wx.getStorageSync(this._storageKeyName);
    if(!res){
      res = [];
    }
    // 在下单的时候过滤不下单的商品
    if(flag){
      var newRes = [];
      for (let i=0; i<res.length; i++){
        if(res[i].selectStatus){
          newRes.push(res[i]);
        }
      }
      res = newRes;
    }
    return res;
  }

  /**
   *  获取购物车商品总数量
   *  flag 为true时表示只计算商品被选中时的购物车商品数量
   */
  getCartTotalCounts(flag){
    var data = this.getCartDataFromLocal();
    var counts = 0;

    for(let i = 0; i< data.length; i++){
      if(flag){
        if(data[i].selectStatus){
          counts += data[i].counts;
        }
      }else{
        counts += data[i].counts;
      }
    }

    return counts;
  }

  /**
   *  增加购物车商品数量
   */
  addCounts(id){
    this._changeCounts(id,1);
  }

  /**
   *  减少购物车商品数量
   */
  cutCounts(id) {
    this._changeCounts(id, -1);
  }

  /**
   *  删除购物车商品
   */
  delete(ids){
    if( !(ids instanceof Array)){
      // 转换成数组
      ids = [ids];
    }

    var cartData = this.getCartDataFromLocal();
    for (let i = 0; i < ids.length; i++){
      var hasInfo = this._isHasThatOne(ids[i], cartData);
      if(hasInfo.index != -1){
        cartData.splice(hasInfo.index, 1);
      }
    }
    // 更新
    wx.setStorageSync(this._storageKeyName, cartData);
  }

  /**
   *  本地缓存 保存/更新
   */
  execSetStorageSync(data){
    wx.setStorageSync(this._storageKeyName, data);
  }

  /**
   *  修改购物车商品数量
   *  params:
   *  id - {int} 商品id
   */
  _changeCounts(id, counts){
    var cartData = this.getCartDataFromLocal(),
      hasInfo = this._isHasThatOne(id, cartData);
      if(hasInfo.index != -1){
          if(hasInfo.data.counts > 1){
            cartData[hasInfo.index].counts += counts;
          }
      }
    wx.setStorageSync(this._storageKeyName, cartData);
  }

/**
 *  判断商品是否已经存在购物车中，并且返回这个商品的数据以及所在数组中的序号
 */
  _isHasThatOne(id, arr){
    var item,
    result = { index: -1 };
    for(let i = 0; i < arr.length; i++){
      item = arr[i];
      if(item.id == id){
        result = {
          index: i,
          data: item
        };
        break;
      }
    }
    return result;
  }
}

export { Cart }