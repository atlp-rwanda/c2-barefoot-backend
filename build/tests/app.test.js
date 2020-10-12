"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _chai = require("chai");

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

(0, _chai.use)(_chaiHttp["default"]);
describe('testing welcome router', function () {
  it('Should get welcome message', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var res;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _chai.request)(_app["default"]).get('/');

          case 2:
            res = _context.sent;
            (0, _chai.expect)(res).to.have.status([200]);
            (0, _chai.expect)(res.type).to.equal('application/json');
            (0, _chai.expect)(res.body).to.have.property('message');
            (0, _chai.expect)(res.body).to.have.property('status');
            (0, _chai.expect)(res.body.message).to.equal('Welcome to Barefoot Nomad');
            (0, _chai.expect)(res.body.status).to.equal(200);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
});
//# sourceMappingURL=app.test.js.map