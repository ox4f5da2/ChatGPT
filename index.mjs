const express = require('express');
const sha1 = require('sha1');
const app = express();

const TOKEN = 'karlfang666'; // 你自己的token

app.use(express.json())

app.post('/', async (req, res) => {
  console.log('消息推送', req.body)
  res.send('success') // 不进行任何回复，直接返回success，告知微信服务器已经正常收到。
});

app.get('/', async (req, res) => {
  console.log('消息推送', req.query)
  const { signature, timestamp, nonce, echostr } = req.query;
  // 先将 timestamp, nonce, TOKEN 按字典排序并组合成一个字符串
  const plainText = [timestamp, nonce, TOKEN].sort().join('');
  // 然后对得到的字符串进行 sha1 加密
  const CipherText = sha1(plainText);
  // 最后将加密得到的字符串与 signature 进行对比，如果相同则验证通过
  if (signature === CipherText) {
    res.send(echostr);
  } else {
    res.end('error');
  }
});

app.listen(80, function(){
  console.log('服务启动成功！')
})