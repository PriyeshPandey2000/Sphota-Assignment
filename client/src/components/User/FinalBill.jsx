import React, { useEffect, useState } from 'react';
import { getSales, getRevenue } from '../../services/api';

const FinalBill = () => {
  const [sales, setSales] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const { data } = await getSales();
        setSales(data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchRevenue = async () => {
      try {
        const { data } = await getRevenue('day'); 
        setTotalRevenue(data.totalRevenue);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSales();
    fetchRevenue();
  }, []);

  const calculateTotal = () => {
    return sales.reduce((acc, sale) => {
      const price = sale.product?.price || 0;
      const quantity = sale.quantity || 0;
      const gstRate = sale.product?.category?.gstRate || 0;

      const productTotal = price * quantity;
      const gstAmount = (productTotal * gstRate) / 100;
      return acc + productTotal + gstAmount;
    }, 0);
  };

  return (
    <div>
      <h2>Final Bill</h2>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>GST Rate</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale._id}>
              <td>{sale.product?.name}</td>
              <td>{sale.product?.category?.name}</td>
              <td>{sale.product?.price}</td>
              <td>{sale.quantity}</td>
              <td>{sale.product?.category?.gstRate}%</td>
              <td>
                {(sale.product?.price * sale.quantity) +
                  (sale.product?.price * sale.quantity * sale.product?.category?.gstRate) / 100}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="5">Total Revenue</td>
            <td>{totalRevenue}</td>
          </tr>
        </tfoot>
      </table>
      <h3>Total: {calculateTotal()}</h3>
    </div>
  );
};

export default FinalBill;
