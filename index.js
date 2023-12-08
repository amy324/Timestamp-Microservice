// index.js
var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

// Timestamp Microservice
app.get("/api/:date?", function (req, res) {
  let inputDate = req.params.date;
  let dateObject;

  // Check if the input date is empty
  if (!inputDate) {
    dateObject = new Date();
  } else {
    // Check if the input date is a Unix timestamp
    if (/^\d+$/.test(inputDate)) {
      dateObject = new Date(parseInt(inputDate));
    } else {
      // Try to parse the input date
      dateObject = new Date(inputDate);
    }
  }

  // Check if the parsed date is valid
  if (isNaN(dateObject.getTime())) {
    res.json({ error: "Invalid Date" });
  } else {
    // Create the response object
    res.json({
      unix: dateObject.getTime(),
      utc: dateObject.toUTCString()
    });
  }
});


var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
