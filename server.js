const express = require("express");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");
const app = express();
const port = 9801;

app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

let messages = [];

app.post("/chat", async (req, res) => {
  const { message } = req.body;
  messages.push({ role: "user", content: message });
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: messages,
  });
  const completion_text = completion.data.choices[0].message.content;
  messages.push({ role: "assistant", content: completion_text });
  res.send({ message: completion_text });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
