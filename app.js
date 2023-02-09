const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
require('dotenv').config();
app.use(express.json());
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const port = process.env.PORT || 3000;
const empModel = require('./Modals/Random');

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("mongoose is connected")
}).catch((err) => console.log(err));


app.post('/', async (req, res) => {
    try {
        const doc = new empModel({
            name: req.body.name
        });
        await doc.save();
        res.status(200).send(req.body);
    } catch (err) {
        res.status(404).send(err.message);
    }

})


app.get('/', (req, res) => {
    res.render('home');

})

app.listen(port, () => console.log(`listening at ${port}`));