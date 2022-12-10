import { ChatGPTAPI } from 'chatgpt';
import config from './config.js';
import { WechatyBuilder } from 'wechaty'

let conversation = null;
const TIMEOUT = 2 * 60 * 1000;
const person = new Set();

async function init() {
  const api = new ChatGPTAPI({ sessionToken: config.TOKEN });
  await api.ensureAuth();
  conversation = api.getConversation();
}
// 初始化 ChatGPT 机器人
await init();

const wechaty = WechatyBuilder.build()
wechaty
  .on('scan', (qrcode, status) => console.log(`Scan QR Code to login: ${status}\nhttps://wechaty.js.org/qrcode/${encodeURIComponent(qrcode)}`))
  .on('login', user => console.log(`User ${user} logged in`))
  .on('message', async message => {
    const text = message.text();
    const talker = message.talker();
    const id = talker.id;
    const ifInRoom = message.room();
    const ifMention = ifInRoom && text.startsWith(`@${config.NAME}`);
    // 表示正在群聊中
    if (ifMention || !ifInRoom) {
      if (!message.self() && !person.has(id)) {
        person.add(id);
        message.say(config.HELLO);
      }
      console.log(`Message: ${talker} ${text}`);
      if (text !== "") {
        if (message.type() !== 7) {
          message.say(config.ERROR);
        } else {
          const response = await conversation.sendMessage(text, { timeoutMs: TIMEOUT });
          try {
            if (ifInRoom) ifInRoom.say(response, talker);
            else message.say(response);
            console.log(`Message: <ChatGPT-AI> ${response}`);
          } catch (e) {
            console.log("发送失败！");
          }
        }
      }
    }
  })
  .on('friendship', async friendship => {
    try {
      console.log(`received friend event.`)
      try {
        console.log(`received friend event from ${friendship.contact().name()}`)
        if (friendship.type() === 2 && friendship.hello() === config.INTRO) {
          await friendship.accept();
        }
      } catch (e) {
        console.error(e)
      }
    } catch (e) {
      console.error(e)
    }
  })
  .start();