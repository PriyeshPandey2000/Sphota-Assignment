import React from 'react';
import { BrowserRouter as Router, Route, Routes,Link,useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateCategory from './components/Admin/CreateCategory';
import CreateProduct from './components/Admin/CreateProduct';
import ViewSales from './components/Admin/ViewSales';
import ViewRevenue from './components/Admin/ViewRevenue';
import RecordSale from './components/User/RecordSale';
import FinalBill from './components/User/FinalBill';


const NavBar = () => {
  return (
   <nav className="bg-white py-4">
      <ul className="flex justify-center space-x-8">
        <li>
          <Link to="/admin/create-category" className="text-black hover:text-gray-500">
            Create Category
          </Link>
        </li>
        <li>
          <Link to="/admin/create-product" className="text-black hover:text-gray-500">
            Create Product
          </Link>
        </li>
        {/* <li>
          <Link to="/admin/view-sales" className="text-black hover:text-gray-500">
            View Sales
          </Link>
        </li> */}
        <li>
          <Link to="/admin/view-revenue" className="text-black hover:text-gray-500">
            View Revenue
          </Link>
        </li>
        <li>
          <Link to="/user/record-sale" className="text-black hover:text-gray-500">
            Record Sale
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const App = () => {
  
  return (
    <Router>
      <div>
      <NavBar />
     <Routes>
     <Route path="/admin/create-category" element={<CreateCategory />} />
        <Route path="/admin/create-product" element={<CreateProduct />} />
        <Route path="/admin/view-sales" element={<ViewSales />} />
        <Route path="/admin/view-revenue" element={<ViewRevenue />} />
        <Route path="/user/record-sale" element={<RecordSale />} />
        <Route path="/user/final-bill" element={<FinalBill />} />
        <Route path="/*" element={<CreateCategory />} />
        </Routes>
        <ToastContainer  />
        </div>
        </Router>
  );
};

export default App;
