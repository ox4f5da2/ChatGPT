/**
 * 如果想调用微信服务接口，用这个写好的类即可
 */
const { APPID, SECRET } = require('../config.js');
const rp = require('request-promise-native');

const { writeFile, readFile } = require('fs');

class Wechat {
  constructor() {

  }

  // 获取accessToken
  getAcessToken() {
    const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${SECRET}`;

    return new Promise((resolve, reject) => {
      rp({ url, method: 'GET', json: true })
        .then(res => {
          // {"access_token":"ACCESS_TOKEN","expires_in":7200}
          res.expires_in = Date.now() - (expires_in - 300) * 1000; // 提前5分钟请求
          console.log(res);
          resolve(res);
        })
        .catch(err => reject('getAcessToken failed: ' + err))
    })
  }

  // 保存accessToken
  saveAccessToken(accessToken) {
    return new Promise((resolve, reject) => {
      writeFile('./accessToken.txt', JSON.stringify(accessToken), err => {
        if (err) {
          reject('accessToken 文件保存失败: ' + err);
        } else {
          resolve('accessToken 文件保存成功！');
        }
      });
    })
  }

  // 读取accessToken
  readAccessToken() {
    return new Promise((resolve, reject) => {
      readFile('./accessToken.txt', (err, data) => {
        if (err) {
          reject('accessToken 文件读取失败: ' + err);
        } else {
          resolve(JSON.parse(data));
        }
      });
    })
  }

  // 验证accessToken
  isValidAccessToken(data) {
    if (!data && !data.access_token && !data.expires_in) return false;
    return data.expires_in > Date.now();
  }

  // 用来获取没有过期的accessToken
  fetchAccessToken() {
    if (this.access_token && this.expires_in && this.isValidAccessToken(this)) {
      return Promise.resolve({
        access_token: this.access_token,
        expires_in: this.expires_in
      })
    }
    // 读取文件
    return this.readAccessToken()
      .then(async res => {
        // 如果accessToken没过期
        if (this.isValidAccessToken(res)) return Promise.resolve(res);
        else {
          // 如果过期就再获取一遍accessToken并保存
          const data = await this.getAcessToken();
          await this.saveAccessToken(data);
          return Promise.resolve(res);
        }
      })
      .catch(async () => {
        // 没有文件，再次获取accessToken
        const data = await this.getAcessToken();
        await this.saveAccessToken(data);
        return Promise.resolve(res);
      })
      .then(res => {
        this.access_token = res.access_token;
        this.expires_in = res.expires_in;
        return Promise.resolve(res);
      })
  }
}