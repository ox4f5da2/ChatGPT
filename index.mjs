import config from './config.mjs';
import fetch from 'node-fetch';
import { WechatyBuilder } from 'wechaty';
const wechaty = WechatyBuilder.build();
const person = new Set();

wechaty
  .on('scan', qrcode => {
    console.log(`Scan QR Code to login!\nhttps://wechaty.js.org/qrcode/${encodeURIComponent(qrcode)}`)
  })
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
        message.say(`你好👋，${talker.name()}！${config.HELLO}`);
      }
      console.log(`Message: ${talker} ${text}`);
      if (text !== "") {
        if (message.type() !== 7) {
          message.say(config.ERROR);
        } else {
          const response = await fetch(`${config.HOST}/chatgpt?question=${text}`);
          const result = await response.json();
          let answer = result.status === 400 ? "无法获取答案🥹!" : result.data.text;
          try {
            if (ifInRoom) ifInRoom.say(answer, talker);
            else message.say(answer);
            console.log(`Message: <ChatGPT-AI> ${answer}`);
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