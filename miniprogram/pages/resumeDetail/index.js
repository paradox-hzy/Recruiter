Page({
    data: {
        src: '',
    },

    onLoad(options) {
        this.setData({
            src: options.src
        });
    },

    save() {
        wx.showLoading({
            title: '',
        });
        wx.cloud.downloadFile({
            fileID: this.data.src,
            success: res => {
                console.log(res.tempFilePath)
                wx.saveImageToPhotosAlbum({
                    filePath: res.tempFilePath,
                    success(res) {
                        wx.hideLoading();
                        wx.showToast({
                            title: '保存成功',
                            icon: 'success',
                            duration: 2000
                        })
                    },
                    fail(e) {
                        wx.hideLoading();
                        wx.showToast({
                            title: '保存失败',
                            icon: 'error',
                            duration: 2000
                        })
                        console.log(e);
                    }
                })
            },
            fail(e) {
                wx.hideLoading();
                wx.showToast({
                    title: '下载失败',
                    icon: 'error',
                    duration: 2000
                })
            }
        })
    }
})