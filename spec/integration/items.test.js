const Items = require('../../src/items');
const Price = require('../../src/price');
const SubTotal = require('../../src/subTotal');

jest.mock('../../src/price');
jest.mock('../../src/subTotal');

Price.mockImplementation(() => ({
	price: jest.fn(arrayOfStuff => [
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
	]),
}));

SubTotal.mockImplementation(() => ({
	calculate: jest.fn(arrayWithPrice => [
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
	]),
}));

describe('Items', () => {
	it('returns the built items array', () => {
		const itemsArray = [
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

		const populatedItemsArray = [
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

		const priceMock = new Price();
		const subTotalMock = new SubTotal();
		const items = new Items(priceMock, subTotalMock);

		expect(items.buildItems(itemsArray)).toEqual(populatedItemsArray);
		expect(priceMock.price).toHaveBeenCalledWith(itemsArray);
		expect(subTotalMock.calculate).toHaveBeenCalled();
	});
});
