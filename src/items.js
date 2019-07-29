class Items {
	constructor(priceInstance, subTotalInstance) {
		this.price = priceInstance;
		this.subTotal = subTotalInstance;
	}

	buildItems(array) {
		const itemsWithPrice = this.price.price(array);
		const itemsWithSubTotals = this.subTotal.calculate(itemsWithPrice);
		return itemsWithSubTotals;
	}
}
module.exports = Items;
