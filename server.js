const PORT = 8000;

const express = require('express');
const app = express();
const http = require("http").Server (app);
http.listen (process.env.PORT || PORT, () => {
    console.log (`Server started`)
});

const api = require ("./api/api.js");
const machine = require ("./api/model/Machine.js");
const user = require ("./api/model/User.js");

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

let arborescence = {}
arborescence["machine"] = machine;
arborescence["user"] = user;

const prefix = '/api';

Object.keys (arborescence).forEach ((key) => {
    console.log (prefix + "/" + key)
    app.route (prefix + '/' + key)
        .get (api.getElems (arborescence[key]))
        .post (api.postElem (arborescence[key]))
        .put (api.updateElem (arborescence[key]));
    app.route (prefix + "/count/" + key)
        .get (api.countElems (arborescence[key]));
});

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/dbLab')
    .then(() => {
        console.log("Successfully connect to MongoDB.");
    })
    .catch(err => {
        console.error("Connection error", err);
    });
