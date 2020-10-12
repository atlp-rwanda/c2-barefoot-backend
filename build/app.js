"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _routes = _interopRequireDefault(require("./routes/routes"));

var _swagger = _interopRequireDefault(require("../swagger.json"));

var app = (0, _express["default"])(); // routes

app.use('/', _routes["default"]); // docuemntation route

app.use('/api-docs', _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(_swagger["default"]));
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server started on port ".concat(port, " ..."));
});
var _default = app;
exports["default"] = _default;
//# sourceMappingURL=app.js.map