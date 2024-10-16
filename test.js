const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = 3000;

app.use(bodyParser.json());

const url = 'mongodb://localhost:27017';
const dbName = 'mongodbBudget';
let db;

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) {
        console.error('Failed to connect to the database');
        throw err;
    }
    db = client.db(dbName);
    console.log('Connected to the database');
});


app.get('/budget', (req, res) => {
    db.collection('budgets').find({}).toArray((err, result) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(result);
    });
});

app.post('/budget', (req, res) => {
    const newEntry = req.body;
    db.collection('budgets').insertOne(newEntry, (err, result) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.status(201).send(result.ops[0]);
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});