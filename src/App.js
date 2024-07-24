import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Welcome from './pages/Welcome';
import RealTime from './pages/RealTime';
import ViewUsers from './pages/ViewUsers';
import ViewAnimals from './pages/ViewAnimals';
import Analysis from './pages/Analysis';
import ChangePassword from './pages/ChangePassword';
import './App.css';

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className={`app-container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <Navbar toggleSidebar={toggleSidebar} />
        <Sidebar isSidebarOpen={isSidebarOpen} />
        <div className="content-container">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/real_time" element={<RealTime />} />
            <Route path="/view_users" element={<ViewUsers />} />
            <Route path="/view_animals" element={<ViewAnimals />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/change_password" element={<ChangePassword />} />
            <Route path="/signout" element={<div>Signout Page</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
