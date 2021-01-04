"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _swaggerJsdoc = _interopRequireDefault(require("swagger-jsdoc"));

var _cors = _interopRequireDefault(require("cors"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

require("dotenv/config");

var _index = _interopRequireDefault(require("./models/index"));

var _index2 = _interopRequireDefault(require("./routes/index"));

var _applicationError = _interopRequireDefault(require("./utils/Errors/applicationError"));

var _swaggerDoc = _interopRequireDefault(require("./config/swaggerDoc"));

var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use((0, _cookieParser["default"])());
var port = process.env.PORT || 3000; // routes

app.use(_express["default"].json());
app.use((0, _cors["default"])());
app.use(_express["default"].urlencoded({
  extended: false
})); // routes

app.use('/api/v1/', _index2["default"]); // app.use(cors());
// documentation route

var swaggerDocs = (0, _swaggerJsdoc["default"])(_swaggerDoc["default"]);
app.use('/documentation', _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(swaggerDocs)); // catch all 404 errors

app.all('*', function (req, res, next) {
  var err = new _applicationError["default"]('Page Requested not found', 404);
  next(err);
}); // db connection check

var sequelize = _index["default"].sequelize;
sequelize.authenticate().then(function () {
  return console.log('Database connected...');
})["catch"](function (err) {
  return console.log("Error: ".concat(err));
});
app.use(function (err, req, res, next) {
  var statusCode = err.status || 500;
  res.status(statusCode).json({
    status: statusCode,
    error: err.message,
    stack: err.stack
  });
  next(err);
});
app.listen(port, function () {
  console.log("CORS-enabled web server listening on port ".concat(port, "  ..."));
}).on('error', function (err) {
  if (err.errno === 'EADDRINUSE') {
    console.log("----- Port ".concat(port, " is busy, trying with port ").concat(port + 1, " -----"));
    app.listen(port + 1);
  } else {
    console.log(err);
  }
});
var _default = app;
exports["default"] = _default;