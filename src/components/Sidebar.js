import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Clock, Users, PawPrint, BarChart2, Lock, LogOut } from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ isSidebarOpen, setCurrentPage }) => {
  const menuItems = [
    { path: '/', text: 'Welcome', icon: Home },
    { path: '/real_time', text: 'Real Time', icon: Clock },
    { path: '/view_users', text: 'View Users', icon: Users },
    { path: '/view_animals', text: 'View Animals', icon: PawPrint },
    { path: '/analysis', text: 'Analysis', icon: BarChart2 },
    { path: '/change_password', text: 'Change Password', icon: Lock },
    { path: '/signout', text: 'Signout', icon: LogOut },
  ];

  return (
    <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
      <ul>
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link to={item.path} onClick={() => setCurrentPage(item.path)}>
              <item.icon size={24} />
              <span>{item.text}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;