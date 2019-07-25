const subTotal = itemsArray => {
	const itemsWithSubTotals = itemsArray.map(item => {
		const { product_id, quantity, unit_price, unit_vat } = item;
		const newEntry = {
			product_id,
			quantity,
			unit_price,
			unit_vat,
			sub_total: quantity * unit_price,
			sub_vat: quantity * unit_vat,
		};
		return newEntry;
	});

	return itemsWithSubTotals;
};

module.exports = subTotal;
