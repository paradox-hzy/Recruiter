Page({
    data: {
        jobid: '',
        jobInfo: '',
    },

    onLoad(options) {
        this.setData({
            jobid: options.jobid
        });
        wx.showLoading({
            title: '',
        });
        wx.cloud.callFunction({
            name: 'getJobById',
            data: {
                jobid: this.data.jobid,
            }
        }).then((resp) => {
            this.setData({
                jobInfo: resp.result.data[0]
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

    job_apply(e) {
        // console.log(this.data.jobid);
        wx.navigateTo({
            url: `/pages/jobApply/index?jobid=${this.data.jobid}`,
        })
    }
})