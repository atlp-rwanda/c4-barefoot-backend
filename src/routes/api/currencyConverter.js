import fx from 'money';
import express from 'express';
import rates from './currencyConverter.json';
const router = express.Router();

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
 *            type: signed integer
 *            description: The http status code
 *            example: 200
 *          message:
 *            type: string
 *            description: Success message
 *            example: Welcome to Barefoot Nomad
 */
router.get('/converter/:money', (req, res)=> {
        const moneyFrom = req.query.from.slice(1, req.query.from.length - 1)
        const moneyTo = req.query.to.slice(1, req.query.from.length - 1)
        const base = moneyFrom
        const data = rates.currencyRate.find( element => element.base == moneyFrom)
        fx.base = data.base;
        fx.rates = data.rates
        
        fx.settings = { from: moneyFrom, to: moneyTo };
        const value = fx.convert(req.params.money); // 647.71034
        const result = {}
        result[moneyTo] = value
        res.json(
            result
        )
     });
export default router;