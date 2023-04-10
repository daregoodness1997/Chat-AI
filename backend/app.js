require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('openai Backend');
});
app.post('/', async (req, res) => {
  const { prompt } = req.body;
  let result;

  try {
    // const response = await openai.createCompletion({ prompt });
    response = await openai
      .createCompletion({
        model: 'text-davinci-003',
        prompt: `${prompt}`,
        temperature: 0,
        max_tokens: 50,
        top_p: 1,
        frequency_penalty: 0.5,
        presence_penalty: 0,
      })
      .then(res => {
        console.log(res.data);
        result = res.data;
      });
    res.status(200).json({ status: 'success', data: result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 'error', data: err });
  }
});

const PORT = process.env.PORT || 8080;
const start = async () => {
  try {
    app.listen(PORT, console.log('Server started at port ' + PORT));
  } catch (err) {
    console.error(err);
  }
};

start();
