/*******************************************
 *  Top 25 iTunes Movies Web App
 ******************************************/

const express = require('express');
const hbs = require('express-handlebars');

//Set default port to 5000 unless already specified in 
// environment variable
port = process.env.PORT || 5000;

//Instantiate Express App
const app = express();

//Setup Handlebars view engine with template settings
app.engine('hbs', hbs({defaultLayout: 'main', extname: 'hbs'}));
//Use handlebars as the templating engine
app.set('view engine', 'hbs');

//Use Middleware
app.use(require('sanitize').middleware);

//Setup Public directory
app.use(express.static('public'));



//Load Routes
// Since there can be so many routes it's usually a good idea to
// separate them into a structure that makes sense.
// Our instantiated express app also needs to be passed in so we
// can create our routes.
require('./routes/router.js')(app);

//Lastly we need to tell express which port to listen to
app.listen(port, function(){
    console.log('Top Moves Listening on ' + port);
});