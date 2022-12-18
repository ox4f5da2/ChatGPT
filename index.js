const express = require('express');
const auth = require('./wechat/auth.js');
const { PORT } = require('./config.js');

const app = express();

app.use(auth());

app.listen(PORT, () => console.log(`微信公众号的 ${PORT} 端口服务启动成功^_^`));