"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _welcome = _interopRequireDefault(require("../controllers/welcome"));

var router = _express["default"].Router(); // ------------------Welcome Page-----------------


router.get('/', _welcome["default"]);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=routes.js.map