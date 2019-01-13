//index.js
//获取应用实例
const app = getApp()
const apiUrl = "https://xiaochengxu.1200e.com/";

Page({
  data: {
    dataList: [],
    userInfo: {},
    hotId: 0,
    openStatus: false,
    openDialogImg: "",
    openDialogName: "",
    openCantact: "",
    hasUserInfo: true,
    indicatorDots: true,
    animationMiddleHeaderItem: null,
    shareFlag: true,
    indicatorColor: 'rgba(0,0,0,.5)',
    indicatorActiveColor: '#000000',
    autoplay: true,
    interval: 6000,
    duration: 500
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  hideOpenStatus() {
    this.setData({
      openStatus: false
    })
  },
  ani_smallbigOut: function () {
    var circleCount = 0;
    // 心跳的外框动画  
    this.animationMiddleHeaderItem = wx.createAnimation({
      duration: 1000, // 以毫秒为单位  
      timingFunction: 'ease',
      delay: 100,
      transformOrigin: '50% 50%',
      success: function (res) {}
    });
    setInterval(function () {
      if (circleCount % 2 == 0) {
        this.animationMiddleHeaderItem.scale(1.1).step();
      } else {
        this.animationMiddleHeaderItem.scale(1.0).step();
      }

      this.setData({
        animationMiddleHeaderItem: this.animationMiddleHeaderItem.export() //输出动画
      });

      circleCount++;
      if (circleCount == 1000) {
        circleCount = 0;
      }
    }.bind(this), 1000);

    var that = this;
    setTimeout(function () {
      clearInterval(this.timer)
      that.setData({
        shareFlag: false
      })
    }, 5000)

  },
  onLoad: function () {
    this.ani_smallbigOut();
    this.getData();
    var that = this;
    wx.getSetting({
      success: function (res) {
        console.log(11,res)
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              //从数据库获取用户信息
              // that.queryUsreInfo();
              //用户已经授权过
              if (app.globalData.openid){
                wx.request({
                  url: apiUrl + '/site/save-player',
                  data: {
                    openid: app.globalData.openid,
                    nickName: res.userInfo.nickName,
                    avatarUrl: res.userInfo.avatarUrl,
                    gender: res.userInfo.gender,
                    city: res.userInfo.city
                  },
                  header: {
                    'content-type': 'application/json'
                  },
                  success: function (res) {
                    //从数据库获取用户信息
                    // that.queryUsreInfo();
                    that.hideSq();
                    console.log("登录日志");
                  }
                });
              }
            }
          });
        }else{
          that.setData({
            hasUserInfo: false
          })
        }
      }
    })
  },
  hideSq(){
    this.setData({
      hasUserInfo: true
    })
  },
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      this.hideSq();
      //插入登录的用户的相关信息到数据库
      if (app.globalData.openid){
        wx.request({
          url: apiUrl + '/site/save-player',
          data: {
            openid: app.globalData.openid,
            nickName: e.detail.userInfo.nickName,
            avatarUrl: e.detail.userInfo.avatarUrl,
            gender: e.detail.userInfo.gender,
            city: e.detail.userInfo.city
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            //从数据库获取用户信息
            // that.queryUsreInfo();
            console.log("插入小程序登录用户信息成功！");
          }
        });
      }
      
    }else{
      this.setData({
        hasUserInfo: false
      })
    }
  },
  getData() {
    wx.request({
      url: apiUrl,
      header: {
        'Content-Type': 'application/json'
      },
      success: res => {
        var data = res.data.data;
        this.setData({
          dataList: data
        })
        wx.setNavigationBarTitle({
          title: data.app.appname
        })
      }
    })
  },
  jump: function (e) {
    let viewImg = e.currentTarget.dataset.preview;
    let type = e.currentTarget.dataset.type;
    let wxAppid = e.currentTarget.dataset.appid;
    let viewName = e.currentTarget.dataset.title;
    let viewIcon = e.currentTarget.dataset.icon;
    let contactInfo = e.currentTarget.dataset.contact;
    if (type == 1) {
      wx.previewImage({
        urls: viewImg
      })
    } else if (type == 2) {
      wx.navigateToMiniProgram({
        appId: wxAppid,
        success(res) {}
      })
    } else if (type == 3) {
      this.setData({
        openStatus: true,
        openDialogImg: viewIcon,
        openDialogName: viewName,
        openCantact: contactInfo
      })
    }
  },
  toDetail: function (e) {
    //点击跳转内页
    wx.navigateTo({
      url: `../detail/detail?url=${e.currentTarget.dataset.contentid}`
    })
  },

  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: this.data.dataList.share.title,
      imageUrl: this.data.dataList.share.logo,
      path: '/pages/list/list'
    }
  },
})