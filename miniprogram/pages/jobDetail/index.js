Page({
    data: {
        jobid: '',
    },
    
    onLoad(options) {
        this.setData({
            jobid: options.jobid
        })
        this.onShow()
    }
})