// pages/product/product.js

import {
  Product
} from 'product-model.js';
import {
  Cart
} from '../cart/cart-model.js';

var product = new Product();
var cart = new Cart();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    countsArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    productCounts: 1,
    currentTabsIndex: 0,
    cartTotalCounts: 0,
    product: null,
    loadingHidden: false,
    hiddenSmallImg: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 获取页面传递过来的参数id的值
    var id = options.id;
    this.data.id = id;
    this._loadData();
  },

  _loadData: function() {
    console.log(cart.getCartTotalCounts())
    product.getDetailInfo(this.data.id, (data) => {
      this.setData({
        product: data,
        cartTotalCounts: cart.getCartTotalCounts()
      })
    });
  },

  bindPickerChange: function(event) {
    // 当前选择的picker组件的值的下标
    var index = event.detail.value;
    var selectedCount = this.data.countsArray[index];
    this.setData({
      productCounts: selectedCount
    })
  },

  onTabsItemTap: function(event) {
    var index = product.getDataSet(event, 'index');
    this.setData({
      currentTabsIndex: index
    })
  },


  onAddingToCartTap: function(event) {
    //防止快速点击
    if (this.data.isFly) {
      return;
    }
    this.addToCart();
    this._flyToCartEffect(event);
    // 更新右上角购物车商品数量
    // var counts = this.data.cartTotalCounts + this.data.productCounts;
    // this.setData({
    //   cartTotalCounts: cart.getCartTotalCounts()
    // })
  },

  addToCart: function() {
    var tempObj = {};
    var keys = ['id', 'name', 'main_img_url', 'price'];

    for (var key in this.data.product) {
      if (keys.indexOf(key) >= 0) {
        tempObj[key] = this.data.product[key];
      }
    }

    cart.add(tempObj, this.data.productCounts);
  },

  /**
   *  点击购物车按钮跳转
   */
  onCartTap: function() {
    // 跳转到tap栏下的要使用switchTap
    wx.switchTab({
      url: '/pages/cart/cart',
    })
  },

  /*加入购物车动效*/
  _flyToCartEffect: function(events) {
    //获得当前点击的位置，距离可视区域左上角
    var touches = events.touches[0];
    var diff = {
        x: '25px',
        y: 25 - touches.clientY + 'px'
      },
      style = 'display: block;-webkit-transform:translate(' + diff.x + ',' + diff.y + ') rotate(350deg) scale(0)'; //移动距离
    this.setData({
      isFly: true,
      translateStyle: style
    });
    var that = this;
    setTimeout(() => {
      that.setData({
        isFly: false,
        translateStyle: '-webkit-transform: none;', //恢复到最初状态
        isShake: true,
      });
      setTimeout(() => {
        var counts = that.data.cartTotalCounts + that.data.productCounts;
        that.setData({
          isShake: false,
          cartTotalCounts: counts
        });
      }, 200);
    }, 1000);
  },


})