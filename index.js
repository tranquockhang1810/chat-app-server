const express = require('express');
const app = express();
const cors = require('cors');
const swagger = require('./utils/swagger.js');

//ENV
require('dotenv').config();

//DATABASE
require('./db/mongo.db.js');

//FIREBASE
require('./config/firebase.js');

// swagger
swagger(app);

//CORS
var corsOptionsDelegate = function (req, callback) {
  var corsOptions = { origin: true };
  callback(null, corsOptions);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptionsDelegate));

//routes
app.use(require("./routes/index"));

//error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  return res.status(status).json({
    error: {
      code: status,
      message: message
    }
  });
});

app.listen(process.env.PORT, () => console.log(`Chat App is listening on port ${process.env.PORT}!`));