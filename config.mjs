const HELLO = "我是 ChatGPT 聊天机器人，欢迎和我聊天😊！"; // 首次聊天的欢迎语句

const INTRO = "ding"; // 添加好友时的确认消息，只有好友的备注发送改文字才能自动通过

const ERROR = "目前不支持回复除文本消息之外的内容🥹"; // 当发送除文本之外的内容的提示

const NAME = "快乐的 AI (*^ω^*)"; // 你自己机器人的名字

const HOST = ""; // 部署服务器的域名或 IP 地址和端口号，如 http://1.2.3.4:8000

const BLACKLIST = []; // 用户黑名单(用户名)，如果收到这个用户的信息则不会发送

const config = {
  HELLO,
  INTRO,
  ERROR,
  NAME,
  HOST,
  BLACKLIST
}

export default config;