// Basic required import for Nodejs
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var ejs = require("ejs");

// Create an instance of exxpress for our app
var app = (module.exports = express());
app.use(bodyParser.json());
app.use(cors());
app.set("views", "./views");
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

app.get("/", (req, res, next) => {
  res.render("index", { user: [1, 2, 3, 4] });
});

app.get("/api/timestamp/:dateVal", (req, res, next) => {
  // get the dateVal from the path
  let dateVal = req.params.dateVal;

  // Check the dateVal is a number or string
  if (isNaN(dateVal)) {
    // Check if the dateVal string is valid or not
    let valid = new Date(dateVal).getTime();

    if (valid > 0) {
      let utcDate = new Date(dateVal);
      res.json({
        unix: valid,
        utc: utcDate.toUTCString()
      });
    } else {
      res.json({
        error: "Invalid Date"
      });
    }
  } else {
    let unixDate = dateVal;
    let utcDate = new Date(dateVal * 1000);

    res.json({
      unix: unixDate,
      utc: utcDate.toUTCString()
    });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server Working");
});
