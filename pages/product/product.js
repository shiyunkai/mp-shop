// pages/product/product.js

import { Product } from 'product-model.js';
import { Cart } from '../cart/cart-model.js';

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
    product: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取页面传递过来的参数id的值
    var id = options.id;
    this.data.id = id;
    this._loadData();
  },

  _loadData: function(){
    console.log(cart.getCartTotalCounts())
    product.getDetailInfo(this.data.id, (data)=> {
      this.setData({
        product: data,
        cartTotalCounts: cart.getCartTotalCounts()
      })
    });
  },

  bindPickerChange: function(event){
    // 当前选择的picker组件的值的下标
    var index = event.detail.value;
    var selectedCount = this.data.countsArray[index];
    this.setData({
      productCounts: selectedCount
    })
  },

  onTabsItemTap: function(event){
    var index = product.getDataSet(event, 'index');
    this.setData({
      currentTabsIndex: index
    })
  },


  onAddingToCartTap: function(event){
    this.addToCart();
    // 更新右上角购物车商品数量
    var counts = this.data.cartTotalCounts + this.data.productCounts;
    this.setData({
      cartTotalCounts: cart.getCartTotalCounts()
    })
  },

  addToCart:function(){
    var tempObj = {};
    var keys = ['id','name','main_img_url','price'];

    for(var key in this.data.product){
      if(keys.indexOf(key) >=0 ){
        tempObj[key] = this.data.product[key];
      }
    }

    cart.add(tempObj, this.data.productCounts);
  }


})