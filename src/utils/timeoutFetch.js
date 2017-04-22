export default function timeout(ms, promise) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      reject(new Error("timeout"))
    }, ms)
    promise.then(resolve, reject)
  })
}

export const MAX_FETCH_TIME = 1000; // fetch延迟时间 超过该时间视为连接超时

// 使用方式 封装原有fetch 加入超时检测功能，超时时抛出异常
// timeout(1000, fetch('/hello')).then(function(response) {
//   // process response
// }).catch(function(error) {
//   // might be a timeout error
// })