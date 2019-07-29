const Price = require('../src/price');
const Items = require('../src/items');
const subTotal = require('../src/subTotal');
const grandTotal = require('../src/grandTotal');

exports.process = (req, res, next) => {
	const price = new Price();
	const items = new Items(price, subTotal);

	const orderJson = req.body.order.items;
	const customer = {
		invoice: {
			order_net: 0,
			order_vat: 0,
			order_gross: 0,
			items: items.buildItems(orderJson),
		},
	};

	const final = grandTotal(customer);

	res.json(final);
};
