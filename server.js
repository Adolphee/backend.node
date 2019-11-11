const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const api = require('./routes/users');
const user = require('./routes/user');
const submitForm = require('./routes/submitForm');
const session = require('express-session');
const HOST = "https://cepbruxelles.herokuapp.com";
const PORT = process.env.PORT || 3010;

// Middleware
app.use((req,res,next) => {
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static('./public'));

// The route to get all the different data and post data from and to database
app.use('/api', api);

// The route to handle login & registration
app.use('/user', user);

// The route to handle the contact form
app.use('/contact', submitForm);

app.get('/home', (req, res) => {
  res.sendFile(__dirname + '/public/home.html', 'index');
});

app.get('/auth/signout', (req, res) => {
  console.log(HOST);
  response.writeHead(302, {
    'Location': HOST
    //add other headers here...
  });
  response.end();
});

app.get('/', (req, res) => {
  // TODO: check param 'logout=true'
  if(req.params.logout){
    setCookie("userid", null, -1);
  }
  if(getCookie("userid") > 0){
    res.send('/public/home.html', 'index');
  } else {
    res.sendFile('/public/login.html', 'index');
  }
});

app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});