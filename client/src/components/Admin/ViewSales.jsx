import React, { useEffect, useState } from 'react';
import { getSales } from '../../services/api';

const ViewSales = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const { data } = await getSales();
        setSales(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSales();
  }, []);

  return (
    <div>
      <h2>Sales for Today</h2>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale._id}>
              <td>{sale.product.name}</td>
              <td>{sale.product.category.name}</td>
              <td>{sale.product.price}</td>
              <td>{sale.quantity}</td>
              <td>{sale.product.price * sale.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewSales;
