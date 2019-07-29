const grandTotal = require('../../src/grandTotal');

describe('GrandTotal', () => {
	it('calulates the various order totals', () => {
		const invoice = {
			invoice: {
				order_net: 0,
				order_vat: 0,
				order_gross: 0,
				items: [
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
				],
			},
		};

		const finalInvoice = {
			invoice: {
				order_net: 2099,
				order_vat: 120,
				order_gross: 2219,
				items: [
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
				],
			},
		};

		expect(grandTotal(invoice)).toEqual(finalInvoice);
	});
});
