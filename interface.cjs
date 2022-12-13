const { Configuration, OpenAIApi } = require("openai");
const express = require("express");

const app = express();

// 初始化 chatgpt 接口
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // 环境变量
});

const openai = new OpenAIApi(configuration);

app.get('/chatgpt', async (req, res) => {
  const question = req.query.question;
  if (!question) {
    res.send({
      message: "The query must contain the query parameter!",
      status: 400
    })
  } else {
    const result = await openai.createCompletion({
      model: "text-davinci-003", // 接口类型
      prompt: question,
      max_tokens: 3000, // 结果的长度
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.6,
    });
    const answer = result.data.choices[0].text.replaceAll("\n", "");
    res.send({
      message: "Get the result of the problem successfully!",
      data: {
        text: answer
      },
      status: 200
    })
  }
})

app.listen(3000, () => console.log("running..."))