const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

let history = [];

module.exports = async (req, res) => {
  const { messages } = req.body;
  history = messages;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
    });

    const reply = {
      role: "assistant",
      content: completion.data.choices[0].message.content,
    };

    res.status(200).json({ reply });
  } catch (error) {
    res.status(500).json({ reply: { role: "assistant", content: "Wystąpił błąd podczas generowania odpowiedzi." } });
  }
};