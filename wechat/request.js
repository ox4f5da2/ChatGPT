const request = require('request');

// 机器人接口的API，此处使用的青云客机器人，也可以使用其他的API
const URL = "http://api.qingyunke.com/api.php?key=free&appid=0&msg=";

module.exports = payload => {
  /**
   * 根据自己想用的 API 接口规范进行更改即可，不用 chatGPT 是因为微信
   * 官方要求必须在5秒内回复，否则就报错，所以大部分情况都会报错，所以我就
   * 放弃使用这个了，国内也有很多好用的 AI 接口，比如青云客就是免费的，其
   * 他的接口或多或少都要收费，这个算良心了。
   */
  return new Promise((resolve, reject) => {
    request.get(`${URL}${encodeURI(payload.msg)}`, function (error, response, body) {
      if (error) reject('request failed: ' + error);
      const result = JSON.parse(body).content.replaceAll('{br}', '\n');
      resolve(result);
    });
  })
}