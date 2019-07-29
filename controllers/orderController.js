const price = require('../src/price');
const subTotal = require('../src/subTotal');
const grandTotal = require('../src/grandTotal');

exports.process = (req, res, next) => {
	// THIS IS NOT MY COMPOSER
	const compose = (...functions) => value =>
		functions.reduceRight((acc, func) => func(acc), value);

	const orderJson = req.body.order.items;
	const final = compose(
		grandTotal,
		subTotal,
		price,
	);

	res.json(final(orderJson));
};
