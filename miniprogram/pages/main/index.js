// pages/main/index.js
Page({
    data: {
        openID: '',
        nickName: '',
        portrait: '',
    },

    onLoad() {
        this.setData({
            openID: wx.getStorageSync('openID'),
            nickName: wx.getStorageSync('nickName'),
            portrait: wx.getStorageSync('portrait')
        })
        this.onShow()

        console.log(this.data.openID)
    },

    logout() {
        wx.clearStorageSync()
        wx.reLaunch({
            url: '/pages/login/index',
        });
    },

    text() {
        wx.navigateTo({
          url: '/pages/instruction/index',
        })
    },

    about() {
        wx.navigateTo({
            url: '/pages/about/index',
          })
    }
})