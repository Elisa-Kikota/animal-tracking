import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isSidebarOpen, setCurrentPage }) => {
  return (
    <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
      <ul>
        <li>
          <Link to="/" onClick={() => setCurrentPage('/')}>Welcome</Link>
        </li>
        <li>
          <Link to="/real_time" onClick={() => setCurrentPage('/real_time')}>Real Time</Link>
        </li>
        <li>
          <Link to="/view_users" onClick={() => setCurrentPage('/view_users')}>View Users</Link>
        </li>
        <li>
          <Link to="/view_animals" onClick={() => setCurrentPage('/view_animals')}>View Animals</Link>
        </li>
        <li>
          <Link to="/analysis" onClick={() => setCurrentPage('/analysis')}>Analysis</Link>
        </li>
        <li>
          <Link to="/change_password" onClick={() => setCurrentPage('/change_password')}>Change Password</Link>
        </li>
        <li>
          <Link to="/signout" onClick={() => setCurrentPage('/signout')}>Signout</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
