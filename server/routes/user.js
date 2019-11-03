const express = require('express');
const router = express.Router();
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');
const db = require('../database/db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

router.get('/users', (req, res) => {
    const tenten = "select * from users;";
    db.query(tenten, (err, results, fields) => {
        if (err) {
            console.log(err);
            return;
        }
        res.send(results);
    });
});

router.post('/register', (req, res) => {
    let { username, pwd } = req.body;
    console.log(username, pwd);
    if (username == 'jarno' && pwd == '1234') {
        req.session.sid = username;
        res.send('logged in');
        console.log(req.session);
        
    } else {
        res.send('not logged in');
    }

    
});

module.exports = router;