// pages/cart/cart.js

import { Cart } from 'cart-model.js'

var cart = new Cart();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   * 只会执行一次
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面显示/页面重新渲染
   *  每次页面显示都会执行
   */
  onShow: function () {
    console.log()
    var cartData = cart.getCartDataFromLocal();
  
    var cal = this._calcTotalAccountAndCounts(cartData);

    this.setData({
      selectedCounts: cal.selectedCounts,
      selectedTypeCounts: cal.selectedTypeCounts,
      account: cal.account,
      cartData: cartData
    })
  },

  /**
   * 生命周期函数--监听页面离开
   */
  onHide: function(){
    // 退出页面时保存更改的数据
    cart.execSetStorageSync(this.data.cartData);
  },

  /**
   *  计算购物车商品总价格和总数量 
   */
  _calcTotalAccountAndCounts: function(data){
    var len = data.length,
    // 被选中商品的总价格
    account = 0,
    // 被选中商品的总数量
    selectedCounts = 0,
    // 被选中商品的种类的总数
    selectedTypeCounts = 0;
    // 避免0.05 + 0.01 = 0.060000000000000005 问题
    let multiple = 100;

    for(let i = 0; i < len; i++){
      if(data[i].selectStatus){
        account += data[i].counts * multiple * Number(data[i].price) * multiple;
        selectedCounts += data[i].counts;
        selectedTypeCounts++;
      }
    }

    return {
      selectedCounts: selectedCounts,
      selectedTypeCounts: selectedTypeCounts,
      account: account / (multiple*multiple)
    }

  },

  /**
   *  购物车选中状态切换
   */
  toggleSelect:function(event){
    var id = cart.getDataSet(event, 'id'),
      status = cart.getDataSet(event, 'status'),
      index = this._getProductIndexById(id);

    this.data.cartData[index].selectStatus = !status;
    this._resetCartData();
  },

  /**
   *  购物车全选状态切换
   */
  toggleSelectAll: function(event){
    var status = cart.getDataSet(event, 'status') == 'true';
    var data = this.data.cartData;
    var len = data.length;
    for(let i = 0; i < len; i++){
      data[i].selectStatus = !status;
    }

    this._resetCartData();
  },

  /**
   *  改变购物车商品数量
   */
  changeCounts: function(event){
    // 点击的增加数量还是减少
    var type = cart.getDataSet(event, 'type'),
      id = cart.getDataSet(event, 'id'),
      index = this._getProductIndexById(id),
      counts = 1;

      if(type == 'add'){
        cart.addCounts(id);
      }else{
        counts = -1;
        cart.cutCounts(id);
      }
      this.data.cartData[index].counts += counts;
      this._resetCartData();
  },

  /**
   *  删除购物车商品
   */
  delete: function(event){
    var id = cart.getDataSet(event, 'id'),
      index = this._getProductIndexById(id);

      this.data.cartData.splice(index, 1);
      cart.delete(id);
      this._resetCartData();
  },

  /**
   *  根据商品id得到 商品所在购物车列表中的下标
   */
  _getProductIndexById: function(id){
    var data = this.data.cartData,
      len = data.length;
      for( let i = 0; i < len; i++){
        if( data[i].id == id){
          return i;
        }
      }
  },


  /**
   *  重新计算总金额和商品总数
   */
  _resetCartData: function(){
    var newData = this._calcTotalAccountAndCounts(this.data.cartData);
    this.setData({
      selectedCounts: newData.selectedCounts,
      selectedTypeCounts: newData.selectedTypeCounts,
      account: newData.account,
      cartData: this.data.cartData
    })
  }

})