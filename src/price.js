const fs = require('fs');
const getUnitPriceAndVat = require('./getPriceAndVat');

const price = itemsArray => {
	// dig out the pricing data from the json
	const rawPricingJson = fs.readFileSync('pricing.json');
	const pricingData = JSON.parse(rawPricingJson);
	// build items with price array of objects
	const itemsWithPrice = itemsArray.map(item => {
		const { product_id, quantity } = item;
		const unitPriceAndVat = getUnitPriceAndVat(item, pricingData);
		// build the new product object to go into the array
		const newEntry = {
			product_id,
			quantity,
			unit_price: unitPriceAndVat.unitPrice,
			unit_vat: unitPriceAndVat.vat,
		};
		return newEntry;
	});
	// here's your array of objects
	return itemsWithPrice;
};

module.exports = price;
