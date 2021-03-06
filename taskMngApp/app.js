const express =  require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

const users = require('./routes/users');
const tasks = require('./routes/tasks');


// Connect to database
mongoose.connect(config.database, (err) =>{
    if(err){
        console.error("Database connect error! " + err);
    }
});

// On Connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database '+ config.database);
});

// On database Error
mongoose.connection.on('error', (err) => {
    console.log('Database error: '+ err);
});

const app = express();

// Port Number
const port = 3000;

// CORS Middleware 
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

// Password Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users',users);
app.use('',tasks);


app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, () => {
    console.log('Server started on port '+ port);
});


