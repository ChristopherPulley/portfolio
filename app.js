// Portfolio V3
// Christopher Pulley

// Required Packages
const express = require("express"),
  bodyParser = require("body-parser"),
  flash = require("connect-flash");

// Environment Variables
const app = express(),
  myPort = 3000;

const session_key = process.env.session_key;

// express-router routes
const indexRoutes = require("./routes/index");

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));

// session middleware
app.use(
  require("express-session")({
    secret: session_key,
    resave: true,
    saveUninitialized: true
  })
);

// flash middleware
app.use(flash());

// share these values with index.js routes
app.use((req, res, next) => {
  // allow messages to be seen by all routes
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next(); // must have or app will stop
});

// tells app to use above required route files from routes directory
app.use(indexRoutes);

// Using /views .ejs files for res. calls
app.set("view engine", "ejs");

app.listen(process.env.port || myPort, function() {
  console.log("App.js Running on Port 3000: Press Ctrl^C to exit");
  //  var timer = setInterval(function() {
  //    console.log(`Listening for Request on Port ${myPort}`);
  //  }, 1000);
});
