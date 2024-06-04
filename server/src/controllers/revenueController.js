const Sale = require('../models/Sale');

const getRevenue = async (req, res) => {
  const period = req.query.period; 
  let match = {};

  switch (period) {
    case 'day':
      match = { date: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) } };
      break;
    case 'month':
      match = { date: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) } };
      break;
    case 'year':
      match = { date: { $gte: new Date(new Date().getFullYear(), 0, 1) } };
      break;
    default:
      return res.status(400).json({ error: 'Invalid period' });
  }

  try {
    const sales = await Sale.aggregate([
      { $match: match },
      {
        $lookup: {
          from: 'products',
          localField: 'product',
          foreignField: '_id',
          as: 'product',
        },
      },
      { $unwind: '$product' },
      {
        $lookup: {
          from: 'categories',
          localField: 'product.category',
          foreignField: '_id',
          as: 'product.category',
        },
      },
      { $unwind: '$product.category' },
      {
        $group: {
          _id: null,
          totalRevenue: { 
            $sum: { 
              $add: [
                { $multiply: ['$product.price', '$quantity'] },
                { $multiply: ['$product.price', '$quantity', { $divide: ['$product.category.gstRate', 100] }] }
              ]
            }
          },
        },
      },
    ]);

    const totalRevenue = sales[0]?.totalRevenue || 0;
    res.status(200).json({ totalRevenue });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getRevenue };
