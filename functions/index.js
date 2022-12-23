require('dotenv').config();
require('./utils/db.js')();
const jwt = require('jsonwebtoken')
const functions = require("firebase-functions");
const express = require('express');
const cors = require('cors');
const app = express()

app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.static('public'));
//Auth Middleware
app.use((req, res, next) => {
    if(req.headers?.authorization?.split(' ')[0] === 'Bearer'){
        jwt.verify(req.headers.authorization.split(' ')[1], process.env.APP_KEY, (err, decoded) => {
            if(err) req.user = undefined;
            req.user = decoded;
            next();
        });
    }
    else {
        req.user = undefined;
        next();
    }
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "*");
    next();
    });

app.use((req, res, next) => {
    next();
})

app.use('/api/users', require('./routes/users.js'));
app.use('/api/games', require('./routes/games.js'));

// use if running locally:
// app.listen(3005, () => {
//     console.log(`App listening on port 3005`);
// });

exports.games = functions.https.onRequest(app);