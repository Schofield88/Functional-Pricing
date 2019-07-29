const price = require('../../src/price');

describe('Pricer', () => {
	it('adds the pricing data to the array', () => {

		const items = [
			{
				product_id: 1,
				quantity: 1,
			},
			{
				product_id: 2,
				quantity: 5,
			},
			{
				product_id: 3,
				quantity: 1,
			},
		];
		const itemsWithPrice = [
			{
				product_id: 1,
				quantity: 1,
				unit_price: 599,
				unit_vat: 120,
			},
			{
				product_id: 2,
				quantity: 5,
				unit_price: 250,
				unit_vat: 0,
			},
			{
				product_id: 3,
				quantity: 1,
				unit_price: 250,
				unit_vat: 0,
			},
		];

		expect(price(items)).toEqual(itemsWithPrice);
	});
});
