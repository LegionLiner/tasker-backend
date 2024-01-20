const express = require('express');
const serverless = require('serverless-http');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const fs = require('fs');

const allowCrossDomain = (req, res, next) => {
  res.header(`Access-Control-Allow-Origin`, `*`);
  res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
  res.header(`Access-Control-Allow-Headers`, `Content-Type`);
  next();
};

let dataBase = {
  "lol": "some string"
}
// app.use(router);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(allowCrossDomain);

router.get('/', (req, res) => {
    // fs.readFile('data.json', (err, data) => {
    //     if (err) {
    //       res.send(err);
    //       return;
    //     }
    // })
    
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(JSON.stringify(dataBase));
})

router.post('/', (req, res) => {
  dataBase = JSON.stringify(req.body);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.send(dataBase);
 // res.send("Файл успешно записан");
    // fs.writeFile("data.json", JSON.stringify(req.body), (error) => {
    //     if (error) {
    //         return console.log(error);
    //     }
    //     res.send("Файл успешно записан");
    // });
})

app.use(`/.netlify/functions/api`, router);
module.exports.handler = serverless(app);
