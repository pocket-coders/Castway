require('dotenv').config()

const express = require('express');
const favicon = require('serve-favicon')
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');


// export/environment
const app = express();
port = process.env.PORT || 3000;

// favicon
app.use(favicon(__dirname + '/public/favicon.ico'));

// Express handlebars -- optional depending on how we implement React
var handlebars = exphbs.create({
    defaultLayout: "main",
    helpers: {
      section: function(name, options) { 
        if (!this._sections) this._sections = {};
          this._sections[name] = options.fn(this); 
          return null;
        }
    }    
});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// static scripts and styles in public
app.use(express.static('public'));
// logging
app.use(morgan(':status :method :url :res[content-length] - :response-time ms'));

// MIDDLEWARE cors
app.use(cors())

// MIDDLEWARE body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())


// controllers
require('./controllers/index')(app);

// start
app.listen(port, console.log('App listening on port ' + port));

// module
module.exports = app;
