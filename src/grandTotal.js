const grandTotal = itemsWithSubTotals => {
	const finalOrderNet = itemsWithSubTotals.reduce(
		(subTotalAccumulator, subTotalTwo) =>
			subTotalAccumulator + subTotalTwo.sub_total,
		0,
	);
	const finalOrderVat = itemsWithSubTotals.reduce(
		(subVatAccumulator, subVatTwo) => subVatAccumulator + subVatTwo.sub_vat,
		0,
	);

	const finalInvoice = {
		invoice: {
			order_net: finalOrderNet,
			order_vat: finalOrderVat,
			order_gross: finalOrderNet + finalOrderVat,
			items: itemsWithSubTotals,
		},
	};
	return finalInvoice;
};

module.exports = grandTotal;
