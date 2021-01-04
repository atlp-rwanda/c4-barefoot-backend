"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _welcome = _interopRequireDefault(require("../../controllers/welcome"));

var router = _express["default"].Router();
/**
 * @swagger
 *
 * /api/v1:
 *    get:
 *      summary: A route that shows the landing page
 *      description: This is the first page you meet when starting the app.
 *      tags: [Landing Page]
 *      responses:
 *        "200":
 *          description: The landing page has loaded
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/landing'
 * components:
 *    schemas:
 *      landing:
 *        type: object
 *        properties:
 *          status:
 *            type: integer
 *            description: The http status code
 *            example: 200
 *          message:
 *            type: string
 *            description: Success message
 *            example: Welcome to Barefoot Nomad
 */


router.get('/', _welcome["default"]);
var _default = router;
exports["default"] = _default;