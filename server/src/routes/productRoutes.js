const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Category = require('../models/Category');


router.post('/', async (req, res) => {
  try {
    const { name, category, price } = req.body;
    const product = new Product({ name, category, price });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('category');
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post('/categories', async (req, res) => {
  try {
    const { name, gstRate } = req.body;
    const category = new Category({ name, gstRate });
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
