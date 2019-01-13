//获取应用实例
const app = getApp()


Page({
  data: {
    dataList: [],
    openStatus: false,
    openDialogImg: "",
    openDialogName: "",
    openCantact: "",
  },
  onLoad: function (options) {
    wx.showLoading({
			title: '加载中...',
			mask: true
		});

    var detailAPI;
    if(options.url == 0){
      detailAPI = "https://xiaochengxu.1200e.com/site/goods-by-recommend";
    }else{
      detailAPI = `https://xiaochengxu.1200e.com/site/goods-by-category?cid=${options.url}`
    }
    wx.request({
			url: detailAPI,
			header: {
				'content-type': 'application/json' // 默认值
			},
			success: res=> {
        let data = res.data.data;
        this.setData({
          dataList: data
        })
        
        setTimeout(function () {
          wx.hideLoading()
        }, 300);
			}
		})
  },
  hideOpenStatus() {
    this.setData({
      openStatus: false
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
    } else if(type == 2){
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
})
