const subTotal = require('../../src/subTotal');

describe('SubTotal', () => {
	it('adds the sub-totals to the items array', () => {
		const items = [
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

		const itemsWithSubTotals = [
			{
				product_id: 1,
				quantity: 1,
				unit_price: 599,
				unit_vat: 120,
				sub_total: 599,
				sub_vat: 120,
			},
			{
				product_id: 2,
				quantity: 5,
				unit_price: 250,
				unit_vat: 0,
				sub_total: 1250,
				sub_vat: 0,
			},
			{
				product_id: 3,
				quantity: 1,
				unit_price: 250,
				unit_vat: 0,
				sub_total: 250,
				sub_vat: 0,
			},
		];
		expect(subTotal(items)).toEqual(itemsWithSubTotals);
	});
});
