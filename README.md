# ChatGPT 微信聊天机器人

## 更新日志
[2022.12.17]: 增加黑名单功能

## 部署 AI 接口
- 首先你需要注册一个 ChatGPT 的账号；
- 然后获取一个 **API key**；
- 接着将 **API key** 填入 `interface.cjs` 文件中第 8 行的 `apiKey` 即可；
- 最后开启服务，可以自己测试接口是否正常等等。
  

## 部署步骤
- 首先在项目根目录运行 `npm i` 按照 `node_modules` 文件；
- 其次将 `config.js` 文件按照注释内容填写完整；
- 接着在当前项目的根目录下的终端中输入 `export OPENAI_API_KEY=你的API key`；
- 然后将 `interface.cjs` 文件部署到服务器上，可进行接口测试一下，看看是否能正常获取内容；
- 最后在服务器上运行 `index.js` 文件，然后扫码登录后就能拥有一个聊天机器人🤖️啦。

> 因为官方提供的接口可能比在网页上聊天会少很多服务，所以可能看着没有网页版的智能，但是因为官方加了一层验证后，原本的第三方库目前无法使用(作者尝试过按照 issue 里的解决，但是失败了)，所以只能放弃转而使用官方的提供的 API 接口，官方的示例文档可以点击[这里](https://beta.openai.com/examples)查看。


## 写在最后
- 更加详细的说明，我已经在 CSDN 上发布，可以查看[从0开始部署自己的微信机器人](https://blog.csdn.net/ox4f5da2/article/details/128314267?spm=1001.2014.3001.5501)
- 如果喜欢的话可以给颗 🌟，谢谢大家的支持！


## 开源协议
**[MIT](./LICENSE)**