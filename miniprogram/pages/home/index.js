Page({
    data: {
        jobs: '',
    },

    onShow() {
        wx.cloud.callFunction({
            name: 'getAllJobs',
          }).then((resp) => {
            this.setData({
              jobs: resp.result.data
            });
          }).catch((e) => {
            console.log(e);
          });
    },

    detail(e) {
        wx.navigateTo({
          url: `/pages/jobDetail/index?jobid=${e.currentTarget.dataset.jobid}`,
        })
    }
})