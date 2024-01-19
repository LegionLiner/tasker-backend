const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = express.json();
const app = express();
const fs = require('fs');

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(bodyParser.json());

app.get('/api', (req, res) => {
    console.log(req.url, "api");
    fs.readFile('data.json', (err, data) => {
        if (err) res.send(err)
        res.setHeader('Content-Type', 'application/json');
        res.json(data.toString());
    })
})

app.post('/api', (req, res) => {
    console.log(req.body, "api");

    fs.writeFile("data.json", JSON.stringify(req.body), (error) => {
        if (error) {
            return console.log(error);
        }
        res.send("Файл успешно записан");
    });
})



app.listen(1337, () => {
    console.log('Сервер запустился.');
})
