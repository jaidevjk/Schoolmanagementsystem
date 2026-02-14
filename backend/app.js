console.log("Application Started");
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongoose = require("mongoose");

const bodyParser = require('body-parser');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRuter = require('./routes/admin');

var gallery1Ruter = require('./routes/gallery1');
var enquiryRuter = require('./routes/enquirey');
var contactusRuter = require('./routes/contactus');
var galleryRuter = require('./routes/gallery');
var iframelinkRuter = require('./routes/iframelinks');
var visitorsRoutes = require("./routes/visitors");

var app = express();



// Parses urlencoded bodies
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

const corsOptions = {
  origin: '*',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}

app.use(cors(corsOptions));

// Set EJS as templating engine 
app.set("view engine", "ejs");

// Source - https://stackoverflow.com/a/55639024
// Posted by Noodles, modified by community. See post 'Timeline' for change history
// Retrieved 2026-02-12, License - CC BY-SA 4.0

//mongodb://monishakrishna465_db_user:23DSC035K>@main-shard-00-00-03xkr.mongodb.net:27017,main-shard-00-01-03xkr.mongodb.net:27017,main-shard-00-02-03xkr.mongodb.net:27017/main?ssl=true&replicaSet=Main-shard-0&authSource=admin&retryWrites=true
//mongodb+srv://monishakrishna465_db_user:23DSC035K@cluster0.3jrss8l.mongodb.net/?appName=Cluster0
// let mongoConnUrl = "mongodb://monishakrishna465_db_user:23DSC035K@cluster0.3jrss8l.mongodb.net/?appName=Cluster0";
let mongoConnUrl = "mongodb+srv://monishakrishna465_db_user:23DSC035K@cluster0.3jrss8l.mongodb.net/";
mongoose.connect(mongoConnUrl, { useNewUrlParser: true });
let db = mongoose.connection;
db.on("error", function (error) { console.log("Error came in connecting" + error); });
db.on("open", function () { console.log("yes, we are connected to mongodb and the database") });


app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin',);
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
/*app.use(express.static(path.join(__dirname, '/client')));

// for connecing frontend in heroku
app.use(express.static(path.join(__dirname, 'client','build')));*/

// app.get('*', function (req, res) {
//   res.sendFile(path.join(__dirname, './client/build'));
// });

//app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRuter);
app.use('/gallery1', gallery1Ruter);
app.use('/enquiry', enquiryRuter);
app.use('/contactusenquiry', contactusRuter);
app.use('/gallery', galleryRuter);
app.use("/visitors", visitorsRoutes);

//For cors error-policy
// app.use(cors({
//   origin: 'http://localhost:3000'
// }))

app.disable('etag');

// // for heroku deployment
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/public"));
// }
// //app.use(routes);
// app.get("*", function (req, res) {
//   res.sendFile(path.join(__dirname, "./client/public/index.html"));
// });

app.use(express.static(__dirname + "/client"));
if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets
  // lik our main.js file or main.css file
  app.use(express.static("client/build"));
  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//const PORT = process.env.PORT || 4003;

//app.listen(PORT,()=>console.log("connected to server"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


//mongodb+srv://monishakrishna465_db_user:23DSC035K@cluster0.3jrss8l.mongodb.net/?appName=Cluster0
