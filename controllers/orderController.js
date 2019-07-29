const price = require('../src/price');
const subTotal = require('../src/subTotal');
const grandTotal = require('../src/grandTotal');

exports.process = (req, res, next) => {
	const orderJson = req.body.order.items;
	const final = grandTotal(subTotal(price(orderJson)));

	res.json(final);
};
