const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const saleRoutes = require('./routes/saleRoutes');
const revenueRoutes = require('./routes/revenueRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors()); 


mongoose.connect('mongodb+srv://priyeshpandey2000:niFj4XmEOrdqUiPC@cluster0.7yhhiap.mongodb.net/gst_app?retryWrites=true&w=majority');


app.use('/api/products', productRoutes);
app.use('/api/sales', saleRoutes);
app.use('/api/revenue', revenueRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
