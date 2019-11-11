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

router.route('/auth/').post(function (req, res) {
    let query = `select * from users where username = ? and password = ?; `;
    db.query(query, [req.body.username,req.body.password], (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        if(results.length < 1){
            return res.status(401).json("Invalid credentials.");
        } else {
            return res.send(results[0]);
        }
    });
});

router.route('/users').post(function (req, res) {
    let fields = [req.body.username, req.body.password, req.body.firstname, req.body.lastname, req.body.email];
    let query = `insert into users (username,password,firstname,lastname,email) values (?,?,?,?,?);`;
    db.query(query, fields,(err, results) => {
        if (err) {
            console.log(err);
            return res.status(400).json(res);
        } else {
            return res.status(201).send(results);
        }
    });
});

router.get('/users/:id', (req, res) => {
    let id = req.params.id;
    const query = "select * from users where id = ?;";
    db.query(query, [id], (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).json(err);
        }
        res.status(200).json(results[0]);
    });
});

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

module.exports = router;
