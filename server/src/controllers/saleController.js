const Sale = require('../models/Sale');
const Product = require('../models/Product');

const recordSale = async (req, res) => {
  try {
    const sales = req.body;
    const salePromises = sales.map(async (sale) => {
      const product = await Product.findById(sale.product);
      if (!product) {
        throw new Error('Product not found');
      }
      const newSale = new Sale({
        product: sale.product,
        quantity: sale.quantity,
        date: new Date(),
      });
      return newSale.save();
    });
    await Promise.all(salePromises);
    res.status(201).json({ message: 'Sales recorded successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSales = async (req, res) => {
  try {
    const sales = await Sale.find().populate({
      path: 'product',
      populate: {
        path: 'category',
        model: 'Category'
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getSalesForDay = async (req, res) => {
  const { date } = req.params;
  try {
    const sales = await Sale.find({
      date: {
        $gte: new Date(date).setHours(0, 0, 0),
        $lt: new Date(new Date(date).setHours(23, 59, 59)),
      },
    }).populate({
      path: 'product',
      populate: {
        path: 'category',
        model: 'Category'
      }
    });
    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { recordSale, getSales,getSalesForDay };
