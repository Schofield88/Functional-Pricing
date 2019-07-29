const fs = require('fs');
const getUnitPriceAndVat = require('./getPriceAndVat');

class Price {
	price(itemsArray) {
		const rawPricingJson = fs.readFileSync('pricing.json');
		const pricingData = JSON.parse(rawPricingJson);

		// remaps the array of order items to include pricing data
		const itemsWithPrice = itemsArray.map(item => {
			const newEntry = item;
			const unitPriceAndVat = getUnitPriceAndVat(item, pricingData);
			newEntry.unit_price = unitPriceAndVat.unitPrice;
			newEntry.unit_vat = unitPriceAndVat.vat;
			return newEntry;
		});

		return itemsWithPrice;
	}
}

module.exports = Price;
