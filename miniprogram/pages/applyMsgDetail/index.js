Page({
    data: {
        applyid: '',
        applyInfo: null,
    },

    onLoad(options) {
        this.setData({
            applyid: options.applyid
        });
        wx.showLoading({
            title: '',
        });
        wx.cloud.callFunction({
            name: 'getApplyById',
            data: {
                applyid: this.data.applyid,
            }
        }).then((resp) => {
            this.setData({
                applyInfo: resp.result.data[0]
            })
            wx.hideLoading();
        }).catch((e) => {
            console.log(e);
            wx.hideLoading();
            wx.showToast({
                title: '加载失败',
                icon: 'error',
                duration: 2000
            })
        });
    },

    shwoResume() {
        wx.navigateTo({
            url: `/pages/resumeDetail/index?src=${this.data.applyInfo.resume}`,
        })
    }
})