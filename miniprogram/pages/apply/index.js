// pages/home/index.js
Page({
    data: {
        searchCriteria: {
            isEnterprise: null,
            jobtitle: null,
            minsalary: null,
        },
        index: 0,
        array: ['所有', '企业', '个人'],
        jobs: '',
    },

    getData() {
        wx.showLoading({
            title: '',
        });
        wx.cloud.callFunction({
            name: 'selectJobs',
            data: this.data.searchCriteria,
        }).then((resp) => {
            this.setData({
                jobs: resp.result.data
            });
            wx.hideLoading();
        }).catch((e) => {
            console.log(e);
            wx.hideLoading();
            wx.showToast({
                title: '获取失败',
                icon: 'error',
                duration: 2000
            })
        });
    },

    onLoad() {
        this.getData()
    },

    detail(e) {
        wx.navigateTo({
            url: `/pages/jobDetail/index?jobid=${e.currentTarget.dataset.jobid}`,
        })
    },

    pickerChange(e) {
        this.setData({
            index: e.detail.value
        })
    },

    searchSubmit(e) {
        if (this.data.index == 0) {
            this.data.searchCriteria.isEnterprise = null;
        } else if (this.data.index == 1) {
            this.data.searchCriteria.isEnterprise = true;
        } else {
            this.data.searchCriteria.isEnterprise = false;
        }
        if (e.detail.value.minsalary !== null && e.detail.value.minsalary != '') {
            this.data.searchCriteria.minsalary = parseInt(Number(e.detail.value.minsalary));
            if(this.data.searchCriteria.minsalary == NaN || !(this.data.searchCriteria.minsalary > 0 && this.data.searchCriteria.minsalary % 1 == 0)) {
                wx.showToast({
                    title: '搜索条件错误',
                    icon: 'error',
                    duration: 2000
                })
                return;
            }
        }
        this.data.searchCriteria.jobtitle = e.detail.value.jobtitle;

        this.onLoad()
    },

    searchReset(e) {
        this.pickerChange({
            detail: {
                value: 0
            }
        })
        this.data.searchCriteria.isEnterprise = null;
        this.data.searchCriteria.minsalary = null;
        this.data.searchCriteria.jobtitle = null;

        this.onLoad()
    }
})