const getPriceAndVat = require('../../src/getPriceAndVat');

describe('getPriceAndVat', () => {
  it('returns the correct price and VAT', () => {
    const item = { product_id: 1, quantity: 1 }
    const pricingData = {
      prices: [
        { product_id: 1, price: 599, vat_band: 'standard' },
        { product_id: 2, price: 250, vat_band: 'zero' },
        { product_id: 3, price: 250, vat_band: 'zero' },
        { product_id: 4, price: 1000, vat_band: 'zero' },
        { product_id: 5, price: 1250, vat_band: 'standard' }
      ],
      vat_bands: { standard: 0.2, zero: 0 }
    }

    const unitPriceAndVat = { vat: 120, unitPrice: 599 }

    expect(getPriceAndVat(item, pricingData)).toEqual(unitPriceAndVat);
  });
});
