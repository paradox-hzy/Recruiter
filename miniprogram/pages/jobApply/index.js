// pages/jobApply/index.js
Page({
    data: {
        jobid: '',
        haveResume: false,
        resumeId: '',
        resumeShow: '',
        resumeSrc: '',
    },

    onLoad(options) {
        this.setData({
            jobid: options.jobid
        });
        console.log(this.data.jobid);
    },

    uploadImg() {
        wx.showLoading({
            title: '',
        });
        const data = {
            jobID: this.data.jobid,
            recruiterID: wx.getStorageSync('openID'),
        }
        wx.cloud.callFunction({
            name: 'getResumeId',
            data: {
                msg: data,
            }
        }).then((resp) => {
            this.setData({
                resumeId: resp.result,
                resumeShow: `${resp.result.substring(0, 7)}...${resp.result.substring(resp.result.length-5, resp.result.length)}.png`
            })

            wx.chooseImage({
                count: 1
            }).then((chooseResult) => {
                wx.cloud.uploadFile({
                    cloudPath: `${this.data.resumeId}.png`,
                    filePath: chooseResult.tempFilePaths[0],
                    config: {
                        env: this.data.envId
                    }
                }).then(res => {
                    this.setData({
                        resumeSrc: res.fileID,
                        haveResume: true,
                    })
                    console.log(this.data.resumeSrc);
                    wx.hideLoading();
                }).catch((e) => {
                    console.log(e);
                    wx.hideLoading();
                });
            }).catch(() => {
                wx.hideLoading();
            })
        }).catch((e) => {
            console.log(e);
            wx.hideLoading();
        });
    },

    clearImg() {
        wx.cloud.callFunction({
            name: 'deleteResume',
            data: {
                _id: this.data.resumeId,
            }
        });

        wx.cloud.deleteFile({
            fileList: [this.data.resumeSrc],
        });

        this.setData({
            haveResume: false,
            resumeId: '',
            resumeShow: '',
            resumeSrc: '',
        })
    },

    checkAge(num) {
        return num !== null && num !== NaN && num > 0 && num % 1 == 0 && num <= 150;
    },

    checkPhone(str) {
        if (str === null) return false;
        if (str.length != 11) return false;
        for (let i = 0; i < str.length; i++)
            if (str[i] < '0' || str[i] > '9') return false;
        return true;
    },

    checkEmail(str) {
        if (str === null) return false;
        var emailRegExp = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        return emailRegExp.test(str);
    },

    checkMsg(data) {
        let failed = 0;
        if (data.name === null) failed = 1;
        if (!this.checkAge(data.age)) failed = 1;
        if (data.education === null) failed = 1;
        if (!this.checkPhone(data.phone)) failed = 1;
        if (!this.checkEmail(data.email)) failed = 1;
        if (!this.data.haveResume) failed = 1;
        return !failed;
    },

    formSubmit(e) {
        const data = {
            jobID: this.data.jobid,
            name: e.detail.value.name,
            age: parseInt(Number(e.detail.value.age)),
            education: e.detail.value.education,
            phone: e.detail.value.phone,
            email: e.detail.value.email,
            resume: this.data.resumeSrc,
            note: e.detail.value.note,
            star: false
        };
        if (this.checkMsg(data)) {
            wx.showLoading({
                title: '',
            });
            wx.cloud.callFunction({
                name: 'submitApply',
                data: {
                    msg: data,
                }
            }).then((resp) => {
                wx.hideLoading();
                wx.reLaunch({
                    url: '/pages/home/index',
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
        if (this.data.haveResume) {
            this.clearImg();
        }
    }
})