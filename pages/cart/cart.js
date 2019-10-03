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
   * 生命周期函数--监听页面显示
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

  }

})