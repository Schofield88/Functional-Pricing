const grandTotal = invoice => {
	const { items } = invoice.invoice;

	const finalOrderNet = items.reduce(
		(subTotalOne, subTotalTwo) => subTotalOne + subTotalTwo.sub_total,
		0,
	);
	const finalOrderVat = items.reduce(
		(subVatOne, subVatTwo) => subVatOne + subVatTwo.sub_vat,
		0,
	);

	const finalInvoice = {
		invoice: {
			order_net: finalOrderNet,
			order_vat: finalOrderVat,
			order_gross: finalOrderNet + finalOrderVat,
			items,
		},
	};
	return finalInvoice;
};

module.exports = grandTotal;
