// pages/login/index.js

const {
    envList
} = require('../../envList.js');

Page({
    onLoad() {
        if (wx.getStorageSync('openID')) {
            wx.reLaunch({
                url: '/pages/home/index',
            });
        }
    },

    login() {
        wx.getUserProfile({
            desc: '获取个人信息',
            lang: 'zh_CN',
            success(info) {
                wx.setStorageSync('nickName', info.userInfo.nickName)
                wx.setStorageSync('portrait', info.userInfo.avatarUrl)
                wx.showLoading({
                    title: '',
                });
                wx.cloud.callFunction({
                    name: 'getOpenID',
                }).then((resp) => {
                    wx.setStorageSync('openID', resp.result.openid)
                    wx.hideLoading();
                    wx.reLaunch({
                        url: '/pages/home/index',
                    });
                })
            },
            fail(e) {
                console.log('登录失败', e)
            }
        })
    },
})