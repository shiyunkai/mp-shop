
// pages/home/home.js
import {Home} from 'home-model.js';

var home = new Home();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._loadData();
  },

// 加下划线表示私有
  _loadData: function () {
    var id = 1;
    home.getBannerData(id, (res)=>{
      // 数据绑定
      this.setData({
        'bannerArr': res
      })
    });

    home.getThemeData((res)=>{
      this.setData({
        'themeArr': res
      })
    });

    home.getProductsData((res) => {
      this.setData({
        'productsArr': res
      })
    });


  },

  onProductsItemTap: function(event){
    // wxml中以data- 开头的标签的属性
    var id = home.getDataSet(event,'id');
  
    // 跳转
    wx.navigateTo({
      url: '../product/product?id='+id,
    })
  },

  onThemeItemTap: function (event) {
    // wxml中以data- 开头的标签的属性
    var id = home.getDataSet(event, 'id');
    var name = home.getDataSet(event, 'name');

    // 跳转
    wx.navigateTo({
      url: '../theme/theme?id=' + id+'&name='+name,
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})