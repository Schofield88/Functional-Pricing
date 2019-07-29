const getPriceAndVat = (item, pricingData) => {
	const itemPricingInfo = pricingData.prices.find(
		price => price.product_id === item.product_id,
	);

	const unitPrice = itemPricingInfo.price;
	const vatBand = itemPricingInfo.vat_band;
	const rate = pricingData.vat_bands[vatBand];
	const vat = Math.round(unitPrice * rate);

	return { vat, unitPrice };
};

module.exports = getPriceAndVat;
