require('dotenv').config()

// Declarations
import express from "express"
import bodyParser from "body-parser";
import morgan from "morgan";

// const favicon = require('serve-favicon')
// const exphbs = require('express-handlebars');

// Handlers
import * as indexController from "./controllers/index"

// export/environment
const app = express();
const port = process.env.PORT || 4000;

// favicon
// app.use(favicon(__dirname + '/public/resources/favicon.ico'));

// static scripts and styles in public
// app.use(express.static('public'));

// view engine
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


app.use(morgan('tiny'));

// MIDDLEWARE body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

// controllers
app.get("/", indexController.indexHandler)

// START
app.listen(port);

module.exports = app;
