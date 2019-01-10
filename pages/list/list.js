//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    indicatorDots: true,
    animationMiddleHeaderItem: null,
    shareFlag: true,
		indicatorColor: 'rgba(0,0,0,.5)',
		indicatorActiveColor: '#000000',
		autoplay: true,
		interval: 6000,
    duration: 500,
    imgUrls: [
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1547114585438&di=ab5dc6b3dfb456fe95daff7169e492c5&imgtype=0&src=http%3A%2F%2Fe.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F83025aafa40f4bfb0f815ad60e4f78f0f63618db.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1547114585437&di=e2ac35efb4ba7170d3a30c6f8b77476d&imgtype=0&src=http%3A%2F%2Ff.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F7c1ed21b0ef41bd5f81eae7e5cda81cb38db3dee.jpg',
    ],
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  ani_smallbigOut: function(){
    var circleCount = 0;  
      // 心跳的外框动画  
      this.animationMiddleHeaderItem = wx.createAnimation({  
        duration:1000,    // 以毫秒为单位  
        timingFunction: 'linear',  
        delay: 100,  
        transformOrigin: '50% 50%',  
        success: function (res) {  
        }  
      });  
      setInterval(function() {  
        if (circleCount % 2 == 0) {  
          this.animationMiddleHeaderItem.scale(1.1).step();  
        } else {  
          this.animationMiddleHeaderItem.scale(1.0).step();  
        }  
          
        this.setData({  
          animationMiddleHeaderItem: this.animationMiddleHeaderItem.export()  //输出动画
        });  
          
        circleCount++;  
        if (circleCount == 1000) {  
          circleCount = 0;  
        }  
      }.bind(this), 1000);  
    
    var that = this;
    setTimeout(function(){
      that.setData({
        shareFlag: false
      })
    },5000)

  },
  onLoad: function () {
    this.ani_smallbigOut();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
