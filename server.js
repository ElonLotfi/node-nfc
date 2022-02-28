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


let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const uri = 'mongodb+srv://mbds:mbds@premium.hsosy.mongodb.net/premium?retryWrites=true&w=majority';


const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  };

mongoose.connect(uri, options)
  .then(() => {
    console.log("Connecté à la base MongoDB assignments dans le cloud !");
    console.log("at URI = " + uri);
    console.log("vérifiez with data que cela fonctionne")
  },
    err => {
      console.log('Erreur de connexion: ', err);
    });