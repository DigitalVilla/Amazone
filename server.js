const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const ejsMate = require('ejs-mate');
const ejs = require('ejs');

//conect to DB
mongoose
    .connect('mongodb://SaitVilla:root1212@ds141294.mlab.com:41294/amazon', {useNewUrlParser: true})
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err))

// initialize express
const app = express();

//Middleware
app.use(express.static(__dirname+'/public'))
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.engine('ejs',ejsMate);
app.set('view engine','ejs');

// server routes
const users = require('./routes/api/users');
app.use('/api/users', users);
const main = require('./routes/main');
app.use('/', main);

const port = process.env.PORT || 3000;

app.listen(port, (err) => {
    if (err) throw err;
    console.log('Server Running on port:' + port);
})
