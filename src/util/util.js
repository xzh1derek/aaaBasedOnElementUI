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

  getNewReq(self, payload) {
    setTimeout(function () {
      self.axios({
        method: "get",
        url: "/mail",
        params: {
          // userId: self.userInfoData.username//得改
          userId: localStorage.token//得改
        }
      })
      //如果查询成功,本地缓存用户信息
        .then((res) => {
          // console.log(123465)
          // console.log(res)
          self.payload = res.data
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
  },


  // 定义一个深拷贝函数  接收目标target参数
  deepClone(target) {
    // 定义一个变量
    let result;
    // 如果当前需要深拷贝的是一个对象的话
    if (typeof target === 'object') {
      // 如果是一个数组的话
      if (Array.isArray(target)) {
        result = []; // 将result赋值为一个数组，并且执行遍历
        for (let i in target) {
          // 递归克隆数组中的每一项
          result.push(target[i])
        }
        // 判断如果当前的值是null的话；直接赋值为null
      } else if (target === null) {
        result = null;
        // 判断如果当前的值是一个RegExp对象的话，直接赋值
      } else if (target.constructor === RegExp) {
        result = target;
      } else {
        // 否则是普通对象，直接for in循环，递归赋值对象的所有值
        result = {};
        for (let i in target) {
          result[i] = target[i];
        }
      }
      // 如果不是对象的话，就是基本数据类型，那么直接赋值
    } else {
      result = target;
    }
    // 返回最终结果
    return result;
  },


  /**
   * 从对象的集合中获得某一个属性
   * @param objList 母对象集合
   * @param propName 从对象中获取属性的属性名
   * @returns {Array}
   */
  getPropFormListObj(objList, propName) {
    let length = objList.length;
    let arr = [];
    arr.length = length;
    for (let i = 0; i < objList.length; i++) {
      arr[i] = objList[i][propName]
    }
    console.log(arr);
    return arr;
  }

}
