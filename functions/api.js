const express = require('express');
const serverless = require('serverless-http');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');

let token = "5283022542:AAEJIHViWYV1-eZ3aYmxTeyNBmV-jkL6fZY";
const TelegramBot = require("node-telegram-bot-api");
const bot = new TelegramBot(token, { polling: true });

const allowCrossDomain = (req, res, next) => {
  res.header(`Access-Control-Allow-Origin`, `*`);
  res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
  res.header(`Access-Control-Allow-Headers`, `Content-Type`);
  res.header('Content-Type', 'application/json');
  next();
};

let dataBase = {
  "default": "null"
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(allowCrossDomain);

router.get('/', (req, res) => {
  try {
    res.send(JSON.stringify(dataBase));
  } catch (error) {
    res.send('Ошибка при отправке данных.')
  }
})

router.post('/', (req, res) => {
  try {
    dataBase = JSON.parse(req.body);
  } catch (error) {
    res.send('Ошибка при записи полученных данных в базу.')
  }
  try {
    bot.sendMessage(379468875, JSON.stringify(dataBase));
  } catch (error) {
    res.send('Ошибка при отправке данных боту.')
  }
  res.send("Данные успешно записаны.");
})

app.use(`/.netlify/functions/api`, router);
module.exports.handler = serverless(app);
