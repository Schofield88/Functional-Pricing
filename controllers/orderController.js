const Price = require('../src/price');
const Items = require('../src/items');
const SubTotal = require('../src/subTotal');
const GrandTotal = require('../src/grandTotal');

exports.process = (req, res, next) => {
  const price = new Price();
  const subTotal = new SubTotal();
  const items = new Items(price, subTotal);
  const grandTotal = new GrandTotal();

  const orderJson = req.body.order.items;
  const customer = {
    invoice: {
      order_net: 0,
      order_vat: 0,
      order_gross: 0,
      items: items.buildItems(orderJson),
    },
  };

  const final = grandTotal.calculate(customer);

  res.json(final);
};
