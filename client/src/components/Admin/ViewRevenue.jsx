import React, { useEffect, useState } from 'react';
import { getRevenue } from '../../services/api';

const ViewRevenue = () => {
  const [period, setPeriod] = useState('day');
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const { data } = await getRevenue(period);
        const truncatedRevenue = parseFloat(data.totalRevenue).toFixed(3);
        setRevenue(truncatedRevenue);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRevenue();
  }, [period]);

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-black">Total Revenue</h2>
      <div className="flex items-center mb-4">
        <label htmlFor="period" className="text-sm mr-2">Period:</label>
        <select
          id="period"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="bg-white text-black border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="day">Day</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
        </select>
      </div>
      <div className="text-3xl font-bold text-indigo-600">{revenue}</div>
    </div>
  );
};

export default ViewRevenue;
