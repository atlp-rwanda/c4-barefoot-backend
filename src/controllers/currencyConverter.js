import fx from 'money';
import express from 'express';
import rates from '../routes/api/currencyConverter.json';


const currency = (req, res)=> {
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
     }
module.exports = currency;