const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './../client/public')));

const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log(`Boggle is listening on port ${port}`);
});