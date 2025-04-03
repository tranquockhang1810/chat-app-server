const express = require('express');
const http = require("http");
const cors = require('cors');
const swagger = require('./utils/swagger.js');
const { initializeSocket } = require("./sockets/socket");
const ResponseFormatter = require('./utils/ResponseFormatter.js');

//ENV
require('dotenv').config();

//DATABASE
require('./db/mongo.db.js');

//SERVER
const app = express();

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

  return res.status(status).json(ResponseFormatter.error(message, status));
});

//WebSocket
const server = http.createServer(app);
initializeSocket(server);

server.listen(process.env.PORT, "0.0.0.0", () =>
  console.log(`Chat App is listening on port ${process.env.PORT}!`)
);