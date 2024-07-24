import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Import the CSS file

const Sidebar = ({ isSidebarOpen }) => {
  return (
    <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
      <ul>
        <li>
          <Link to="/">Welcome</Link>
        </li>
        <li>
          <Link to="/real_time">Real Time</Link>
        </li>
        <li>
          <Link to="/view_users">View Users</Link>
        </li>
        <li>
          <Link to="/view_animals">View Animals</Link>
        </li>
        <li>
          <Link to="/analysis">Analysis</Link>
        </li>
        <li>
          <Link to="/change_password">Change Password</Link>
        </li>
        <li>
          <Link to="/signout">Signout</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
