Page({
    data: {
        openID: '',
        jobs: '',
    },

    onShow() {
        this.setData({
            openID: wx.getStorageSync('openID'),
        });
        wx.showLoading({
            title: '',
        });
        wx.cloud.callFunction({
            name: 'getJobByRecruiter',
            data: {
                openID: this.data.openID,
            }
        }).then((resp) => {
            this.setData({
                jobs: resp.result.data
            });
            wx.hideLoading();
        }).catch((e) => {
            console.log(e);
            wx.hideLoading();
        });
    },

    detail(e) {
        wx.navigateTo({
            url: `/pages/applyDetail/index?jobid=${e.currentTarget.dataset.jobid}`,
        })
    },

    recruit() {
        wx.navigateTo({
            url: '/pages/recruit/index',
        })
    },

    edit(e) {
        wx.navigateTo({
            url: `/pages/editRecruit/index?jobid=${e.currentTarget.dataset.jobid}`,
        })
    },

    delete(e) {
        wx.showModal({
            content: '是否删除该信息',
            success(res) {
                if (res.confirm) {
                    wx.showLoading({
                        title: '',
                    });
                    wx.cloud.callFunction({
                        name: 'deleteJob',
                        data: {
                            jobID: e.currentTarget.dataset.jobid,
                        }
                    }).then((resp) => {
                        wx.hideLoading();
                        wx.reLaunch({
                            url: '/pages/myRecruit/index',
                        });
                    }).catch((e) => {
                        console.log(e);
                        wx.hideLoading();
                    });
                }
            }
        })
    }
})