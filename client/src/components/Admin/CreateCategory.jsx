import React, { useState } from 'react';
import { createCategory } from '../../services/api';
import { toast } from 'react-toastify';

const CreateCategory = () => {
  const [name, setName] = useState('');
  const [gstRate, setGstRate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCategory({ name, gstRate });
      toast.success('Category created successfully!');
      setName('');
      setGstRate('');
    } catch (err) {
      toast.error('Failed to create category!');
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <h2 className="text-xl mb-4 font-semibold">Create Category</h2>
        <div className="mb-4">
          <label htmlFor="categoryName" className="block text-gray-700">Category Name:</label>
          <input
            type="text"
            id="categoryName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-white text-black w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="gstRate" className="block text-gray-700">GST Rate (%):</label>
          <input
            type="number"
            id="gstRate"
            value={gstRate}
            onChange={(e) => setGstRate(e.target.value)}
            className=" bg-white text-black w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Create Category
        </button>
      </form>
    </div>
  );
};

export default CreateCategory;
