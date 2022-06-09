Page({
    data: {
        jobid: '',
        applys: [],
    },

    getData() {
        wx.showLoading({
            title: '',
        });
        wx.cloud.callFunction({
            name: 'getApplyByJobID',
            data: {
                jobID: this.data.jobid,
            }
        }).then((resp) => {
            this.setData({
                applys: resp.result.data
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

    onLoad(options) {
        this.setData({
            jobid: options.jobid
        });
        this.getData();
    },

    resume(e) {
        wx.navigateTo({
            url: `/pages/resumeDetail/index?src=${e.currentTarget.dataset.src}`,
        })
    },

    applyMsg(e) {
        wx.navigateTo({
            url: `/pages/applyMsgDetail/index?applyid=${e.currentTarget.dataset.applyid}`,
        })
    },

    star(e) {
        wx.showLoading({
            title: '',
        });
        wx.cloud.callFunction({
            name: 'starApply',
            data: {
                applyid: e.currentTarget.dataset.applyid,
                state: JSON.parse(e.currentTarget.dataset.state)
            }
        }).then((resp) => {
            this.getData();
        }).catch((e) => {
            console.log(e);
            wx.showToast({
                title: '加载失败',
                icon: 'error',
                duration: 2000
            })
        });
    }
})