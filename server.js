const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const budgetModel = require('./budgetData');
const cors = require('cors');

const app = express();
const port = 3000;

app.use('/', express.static('public'));
app.use(cors());
app.use(bodyParser.json());

let url = 'mongodb://localhost:27017/mongodbBudget';

app.get('/budget', (req, res) => {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('Connected to MongoDB');
            budgetModel.find({})
                .then(data => {
                    res.json(data);
                    console.log(data);
                    mongoose.connection.close();
                })
                .catch(err => {
                    res.status(500).send(err);
                    console.log(err);
                });
        });
});
    
    app.post('/budget', (req, res) => {
        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                console.log('Connected to MongoDB');
                budgetModel.create(req.body)
                    .then(data => {
                        res.json(data);
                        console.log(data);
                        mongoose.connection.close();
                    })
                    .catch(err => {
                        res.status(500).send(err);
                        console.log(err);
                    });
            })
    });

    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
    });