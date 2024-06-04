import React, { useState, useEffect } from 'react';
import { getProducts, getCategories, recordSale } from '../../services/api';
import { toast } from 'react-toastify';

const RecordSale = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sales, setSales] = useState([{ product: '', category: '', quantity: 1, gstRate: 0, price: 0 }]);
  const [totalBill, setTotalBill] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await getProducts();
        const categoriesData = await getCategories();
        setProducts(productsData.data);
        setCategories(categoriesData.data);
      } catch (err) {
        toast.error('Failed to fetch products or categories!');
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (index, field, value) => {
    const newSales = [...sales];
    newSales[index][field] = value;

    if (field === 'product') {
      const selectedProduct = products.find(prod => prod._id === value);
      if (selectedProduct) {
        newSales[index].price = selectedProduct.price;
        newSales[index].category = selectedProduct.category;
        const selectedCategory = categories.find(cat => cat._id === selectedProduct.category);
        newSales[index].gstRate = selectedCategory ? selectedCategory.gstRate : 0;
      }
    } else if (field === 'category') {
      const selectedCategory = categories.find(cat => cat._id === value);
      if (selectedCategory) {
        newSales[index].gstRate = selectedCategory.gstRate;
      }
    }

    setSales(newSales);
  };

  const handleAddProduct = () => {
    setSales([...sales, { product: '', category: '', quantity: 1, gstRate: 0, price: 0 }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await recordSale(sales);
      toast.success('Sale recorded successfully!');
      calculateTotalBill(); 
    } catch (err) {
      toast.error('Failed to record sale!');
      console.error(err);
    }
  };

  const calculateTotalBill = () => {
    let total = 0;
    sales.forEach(sale => {
      const productTotal = sale.price * sale.quantity;
      const gstAmount = (productTotal * sale.gstRate) / 100;
      total += productTotal + gstAmount;
    });
    setTotalBill(total);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg text-black mb-8"> 
      <form onSubmit={handleSubmit}>
        {sales.map((sale, index) => (
          <div key={index} className="mb-6"> 
            <div className="flex items-center mb-4"> 
              <select
                value={sale.product}
                onChange={(e) => handleChange(index, 'product', e.target.value)}
                className="bg-white text-black border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mr-2"
                required
              >
                <option value="">Select Product</option>
                {products.map((prod) => (
                  <option key={prod._id} value={prod._id}>
                    {prod.name}
                  </option>
                ))}
              </select>
              <select
                value={sale.category}
                onChange={(e) => handleChange(index, 'category', e.target.value)}
                className="bg-white text-black border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mr-2"
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                value={sale.quantity}
                onChange={(e) => handleChange(index, 'quantity', e.target.value)}
                min="1"
                className="bg-white text-black border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mr-2 px-2"
                required
              />
              <span>{sale.gstRate}% GST</span>
            </div>
            <div className="mb-2"> 
              <span>Price: {sale.price}</span>
              <span className="ml-4">Tax: {((sale.price * sale.quantity * sale.gstRate) / 100).toFixed(2)}</span> 
              <span className="ml-4">Total: {sale.price * sale.quantity + (sale.price * sale.quantity * sale.gstRate) / 100}</span> 
            </div>
          </div>
        ))}
        <button type="button" onClick={handleAddProduct} className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2">
          Add Product
        </button>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg">
          Submit
        </button>
      </form>
      {totalBill > 0 && <div className="mt-4">Total bill: {totalBill}</div>} 
    </div>
  );
};

export default RecordSale;
