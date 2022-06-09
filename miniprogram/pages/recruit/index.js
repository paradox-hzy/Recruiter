// pages/recruit/index.js
Page({
    data: {
        isEnterprise: true,
    },

    radioChange(e) {
        this.setData({
            isEnterprise: e.detail.value == "enterprise" ? true : false,
        })
    },

    checkNum(num) {
        return num > 0 && num % 1 == 0;
    },

    checkMsg(data) {
        let failed = 0;
        if (data.jobtitle === null) failed = 1;
        if (data.salary === null || data.salary === NaN || !this.checkNum(data.salary)) failed = 1;
        if (data.number === null || data.number === NaN || !this.checkNum(data.number)) failed = 1;
        if (data.location === null) failed = 1;
        return !failed;
    },

    formSubmit(e) {
        const data = {
            recruiterID: wx.getStorageSync('openID'),
            isEnterprise: this.data.isEnterprise,
            jobtitle: e.detail.value.jobtitle,
            salary: parseInt(Number(e.detail.value.salary)),
            number: parseInt(Number(e.detail.value.number)),
            location: e.detail.value.location,
            note: e.detail.value.note,
        }
        if (this.checkMsg(data)) {
            wx.showLoading({
                title: '',
            });
            wx.cloud.callFunction({
                name: 'pushRecruitment',
                data: {
                    msg: data,
                }
            }).then((resp) => {
                wx.hideLoading();
                wx.reLaunch({
                    url: '/pages/myRecruit/index',
                });
            }).catch((e) => {
                console.log(e);
                wx.hideLoading();
                wx.showToast({
                    title: '提交失败',
                    icon: 'error',
                    duration: 2000
                })
            });
        } else {
            wx.showToast({
                title: '内容错误',
                icon: 'error',
                duration: 2000
            })
        }
    },

    formReset(e) {
        this.setData({
            isEnterprise: true,
        })
    }
})