new Promise((resolve, reject) => {
  // console.log(1)
  resolve()
  // reject()
}).then(res => {
  console.log(2)
}).then(res => {
  console.log(3)
}).then(res => {
  console.log(4)
}).then(res => {
  console.log(5)
}).then(res => {
  console.log(6)
}).catch(err => {
  console.log("err")
})
