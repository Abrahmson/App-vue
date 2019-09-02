// import axios from 'axios'
// export default function ajax (url, data = {}, methods = 'GET') {
//   return new Promise((resolve) => {
//     let promise

//     // 执行异步ajax请求
//     if (methods === 'GET') {
//       // get请求
//       promise = axios.get(url, {
//         params: data
//       })
//     } else {
//       // post请求
//       promise = axios.post(url, data)
//     }
//     promise.then(
//       response => {
//         resolve(response.data)
//       },
//       error => {
//         alert('请求异常：' + error.message)
//       }
//     )
//   })
// }

import axios from 'axios'
export default function ajax(url, data={}, method='GET') {
  return new Promise((resolve, reject) => {
    let promise
    // 执行异步ajax请求
    if(method==='GET') {
      promise = axios.get(url, {params: data}) // params配置, 指定的是query参数
    } else {
      promise = axios.post(url, data)
    }
    promise.then(
      response => {  // 如果成功了, 调用resolve()
        resolve(response.data)
      },
      error => { // 如果失败了, 不调用reject(), 而是提示错误信息
        alert('请求异常: ' + error.message)
      }
    )
  })
}