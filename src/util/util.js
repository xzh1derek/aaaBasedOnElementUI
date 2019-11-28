//因为函数里this的指向问题,所以函数一定要在调用前,先用self绑定接收this,然后把self传给函数
export default {
  hello() {
    console.log("hello world")
  },


  feedbackInfo(self, data) {
    let applyRes = {
      text: "",
      type: ""
    };
    switch (data) {
      case 0:
        applyRes.text = "操作成功";
        applyRes.type = "successful";
        break;
      case 1:
        applyRes.text = "用户不存在";
        applyRes.type = "warning";
        break;
      case 2:
        applyRes.text = "操作失败!您已经在队里了";
        applyRes.type = "error";
        break;
      case 3:
        applyRes.text = "操作失败!该队伍已满或不接受申请";
        applyRes.type = "warning";
        break;
      case 4:
        applyRes.text = "操作失败!尚有未被处理的申请,不能继续申请";
        applyRes.type = "warning";
        break;
      case 5:
        applyRes.text = "操作失败!您的队伍已满员或者不接受申请";
        applyRes.type = "warning";
        break;
      case 6:
        applyRes.text = "操作失败!该用户已经组队";
        applyRes.type = "warning";
        break;
      case 7:
        applyRes.text = "操作失败!您的队伍已满员";
        applyRes.type = "warning";
        break;
    }
    self.$message({
      message: applyRes.text,
      type: applyRes.type,
      duration: 1500,
      showClose: true
    });
  },

  getNewReq(self) {
    setTimeout(function () {
      self.axios({
        method: "get",
        url: "/mail",
        params: {
          userId: self.userInfoData.username//得改
        }
      })
      //如果查询成功,本地缓存用户信息
        .then((res) => {
          self.newRequest = res.data
        })
        //如果查询失败,提醒用户重新登录
        .catch(err => {
          self.$message({
            message: "信息加载失败,请稍后再试",
            type: "error",
            duration: 1500,
            showClose: true
          })
        })
    }, 100)
  }

}
