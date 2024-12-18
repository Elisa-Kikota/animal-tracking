# Project Documentation


# Directory: src


### File: App.css
```
html, body, #root {
  height: 100%;
  margin: 0;
  padding: 0;
}

body {
  overflow: hidden; /* Prevents scrolling on the body */
}

.app-container {
  display: flex;
  transition: margin-left 0.3s;
  flex-direction: column;
  height: 100vh;
}

.sidebar-open .content-container {
  margin-left: 160px; /* Width of the sidebar */
}

.navbar {
  flex-shrink: 0; /* Prevents navbar from shrinking */
}

.content-container {
  flex: 1;
  transition: margin-left 0.3s;
  
  margin-top: 64px; /* Adjust based on your navbar height */
  /* padding: 20px; */
}

.content-container.shifted {
  margin-left: 200px; /* Should match the open width of your sidebar */
}
```


### File: App.js
```
import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Welcome from './pages/Welcome';
import RealTime from './pages/RealTime';
import ViewUsers from './pages/ViewUsers';
import ViewAnimals from './pages/ViewAnimals';
import Analysis from './pages/Analysis';
import ChangePassword from './pages/ChangePassword';
import './App.css';
import './styles/Transitions.css';

const pageOrder = [
  '/welcome',
  '/real_time',
  '/view_users',
  '/view_animals',
  '/analysis',
  '/change_password',
  '/signout'
];

const AppContent = () => {
  const location = useLocation();
  const prevLocationRef = useRef(location);
  const [direction, setDirection] = useState('up');

  useEffect(() => {
    const prevIndex = pageOrder.indexOf(prevLocationRef.current.pathname);
    const currentIndex = pageOrder.indexOf(location.pathname);

    if (currentIndex > prevIndex) {
      setDirection('up');
    } else if (currentIndex < prevIndex) {
      setDirection('down');
    }

    prevLocationRef.current = location;
  }, [location]);

  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        timeout={{ enter: 300, exit: 300 }}
        classNames={`page-${direction}`}
      >
        <Routes location={location}>
          <Route path="/" element={<Welcome />} />
          <Route path="/real_time" element={<RealTime />} />
          <Route path="/view_users" element={<ViewUsers />} />
          <Route path="/view_animals" element={<ViewAnimals />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/change_password" element={<ChangePassword />} />
          <Route path="/signout" element={<div>Signout Page</div>} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};

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
          <AppContent />
        </div>
      </div>
    </Router>
  );
}

export default App;

```


### File: App.test.js
```
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

```


## Directory: assets


## Directory: assets\old


## Directory: assets\screenshots


## Directory: components


### File: components\Navbar.css
```
/* Navbar styling */
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: var(--navbar-sidebar-color);
    color: white;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1001;
  }
  
  .navbar .menu-icon {
    cursor: pointer;
  }
  
  .navbar .logo img {
    height: 40px; /* Adjust based on your logo size */
  }
  
  .navbar .nav-icons {
    display: flex;
    align-items: center;
  }
  
  .navbar .nav-icons img {
    height: 30px; /* Adjust based on your icon size */
    margin-left: 20px;
  }
  
```


### File: components\Navbar.js
```
import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Logo from '../assets/logo.png'; // Ensure this path points to your logo

const navbarColor = '#3f51b'; // Define your common color
// Greened const navbarColor = '#3f501b'; // Define your common color

function Navbar({ toggleSidebar }) {
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: navbarColor }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleSidebar}>
          <MenuIcon />
        </IconButton>
        <img src={Logo} alt="Logo" style={{ width: 40, height: 40, marginRight: 10 }} />
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          AI-Powered Animal Tracking System
        </Typography>
        <IconButton color="inherit">
          <NotificationsIcon />
        </IconButton>
        <IconButton color="inherit">
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

```


### File: components\Sidebar.css
```
.sidebar {
  position: fixed;
  top: 60px; /* Adjust based on your navbar height */
  left: 0;
  height: calc(100vh - 60px);
  background-color:rgb(31, 118, 206);
  transition: width 0.3s ease;
  overflow: hidden;
  width: 60px; /* Width when closed */
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.sidebar.open {
  width: 220px; /* Width when open */
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.sidebar li {
  margin: 10px 0;
}

.sidebar a {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  color: #333;
  text-decoration: none;
  white-space: nowrap;
}

.sidebar a:hover {
  background-color: #157ee7;
}

.sidebar svg {
  min-width: 24px;
  margin-right: 15px;
}

.sidebar span {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.sidebar.open span {
  opacity: 1;
}
```


### File: components\Sidebar.js
```
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
```


### File: firebase.js
```
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtNxcTTljrMmTx3W_Srv0Na0sBeCUDkxI",
  authDomain: "animal-tracking-01.firebaseapp.com",
  projectId: "animal-tracking-01",
  storageBucket: "animal-tracking-01.appspot.com",
  messagingSenderId: "29693013811",
  appId: "1:29693013811:web:2cfc9743a521185aba5846",
  measurementId: "G-7MQ80W5KXT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
```


### File: index.css
```
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  }
  
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
    }

```


### File: index.js
```
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

```


## Directory: pages


### File: pages\Analysis.js
```
import React from 'react';

function Analysis() {
  return <div>Analysis Page</div>;
}

export default Analysis;

```


### File: pages\ChangePassword.js
```
import React from 'react';

function ChangePassword() {
  return <div>Change Password Page</div>;
}

export default ChangePassword;

```


### File: pages\chartConfig.js
```
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default ChartJS;
```


### File: pages\PieChart.js
```
import React, { useRef, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Typography } from '@mui/material';
import ChartJS from './chartConfig';

function PieChart({ data }) {
  const chartRef = useRef(null);

  useEffect(() => {
    // Destroy the previous chart instance when component unmounts or data changes
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [data]);

  const chartData = {
    labels: Object.keys(data),
    datasets: [{
      data: Object.values(data),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false
  };

  return (
    <>
      <Typography variant="h6">Species Distribution</Typography>
      <Pie ref={chartRef} data={chartData} options={options} />
    </>
  );
}

export default PieChart;
```


### File: pages\RealTime - simple.js
```
import '../styles/RealTime.css';
import "leaflet/dist/leaflet.css";
import React, { useState } from 'react';
import Reports from './RealtimeContents/Reports';
import Animals from './RealtimeContents/Animals';
import Layers from './RealtimeContents/Layers';
import Patrols from './RealtimeContents/Patrols';
import Map from './RealtimeContents/Map'; // Import the new Map component

import reportsIcon from '../assets/reports.png';
import patrolsIcon from '../assets/patrols.png';
import layersIcon from '../assets/layers.png';
import animalIcon from '../assets/animal.png';

export default function RealTime() {
  const [isLayerMenuVisible, setIsLayerMenuVisible] = useState(false);
  const [isReportMenuVisible, setIsReportMenuVisible] = useState(false);
  const [isPatrolMenuVisible, setIsPatrolMenuVisible] = useState(false);
  const [isAnimalMenuVisible, setIsAnimalMenuVisible] = useState(false);

  const toggleReportMenu = () => {
    setIsReportMenuVisible(!isReportMenuVisible);
    setIsLayerMenuVisible(false);
    setIsPatrolMenuVisible(false);
    setIsAnimalMenuVisible(false);
  };

  const togglePatrolMenu = () => {
    setIsReportMenuVisible(false);
    setIsPatrolMenuVisible(!isPatrolMenuVisible);
    setIsLayerMenuVisible(false);
    setIsAnimalMenuVisible(false);
  };

  const toggleLayerMenu = () => {
    setIsReportMenuVisible(false);
    setIsPatrolMenuVisible(false);
    setIsLayerMenuVisible(!isLayerMenuVisible);
    setIsAnimalMenuVisible(false);
  };

  const toggleAnimalMenu = () => {
    setIsReportMenuVisible(false);
    setIsPatrolMenuVisible(false);
    setIsLayerMenuVisible(false);
    setIsAnimalMenuVisible(!isAnimalMenuVisible);
  };

  return (
    <div className="realtime-container">
      <Sidebar
        isReportMenuVisible={isReportMenuVisible}
        isPatrolMenuVisible={isPatrolMenuVisible}
        isLayerMenuVisible={isLayerMenuVisible}
        isAnimalMenuVisible={isAnimalMenuVisible}
        toggleReportMenu={toggleReportMenu}
        togglePatrolMenu={togglePatrolMenu}
        toggleLayerMenu={toggleLayerMenu}
        toggleAnimalMenu={toggleAnimalMenu}
      />
      <Map />
      {isLayerMenuVisible && <Layers />}
      {isReportMenuVisible && <Reports />}
      {isPatrolMenuVisible && <Patrols />}
      {isAnimalMenuVisible && <Animals />}
    </div>
  );
}

const Sidebar = () => {
  const [isReportMenuVisible, setIsReportMenuVisible] = useState(false);
  const [isPatrolMenuVisible, setIsPatrolMenuVisible] = useState(false);
  const [isLayerMenuVisible, setIsLayerMenuVisible] = useState(false);
  const [isAnimalMenuVisible, setIsAnimalMenuVisible] = useState(false);

  const toggleReportMenu = () => {
    setIsReportMenuVisible(!isReportMenuVisible);
    setIsPatrolMenuVisible(false);
    setIsLayerMenuVisible(false);
    setIsAnimalMenuVisible(false);
  };

  const togglePatrolMenu = () => {
    setIsReportMenuVisible(false);
    setIsPatrolMenuVisible(!isPatrolMenuVisible);
    setIsLayerMenuVisible(false);
    setIsAnimalMenuVisible(false);
  };

  const toggleLayerMenu = () => {
    setIsReportMenuVisible(false);
    setIsPatrolMenuVisible(false);
    setIsLayerMenuVisible(!isLayerMenuVisible);
    setIsAnimalMenuVisible(false);
  };

  const toggleAnimalMenu = () => {
    setIsReportMenuVisible(false);
    setIsPatrolMenuVisible(false);
    setIsLayerMenuVisible(false);
    setIsAnimalMenuVisible(!isAnimalMenuVisible);
  };

  return (
    <div className="fixed-sidebar">
      <button className="sidebar-button" onClick={toggleReportMenu}>
        <img src={reportsIcon} alt="Reports" className="sidebar-icon" />
        <span>Reports</span>
      </button>
      <button className="sidebar-button" onClick={togglePatrolMenu}>
        <img src={patrolsIcon} alt="Patrols" className="sidebar-icon" />
        <span>Patrols</span>
      </button>
      <button className="sidebar-button" onClick={toggleLayerMenu}>
        <img src={layersIcon} alt="Layers" className="sidebar-icon" />
        <span>Layers</span>
      </button>
      <button className="sidebar-button" onClick={toggleAnimalMenu}>
        <img src={animalIcon} alt="Animals" className="sidebar-icon" />
        <span>Animals</span>
      </button>
    </div>
  );
};

```


### File: pages\RealTime copy 2.js
```
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase';
import reportsIcon from '../assets/reports.png';
import patrolsIcon from '../assets/patrols.png';
import layersIcon from '../assets/layers.png';
import animalIcon from '../assets/animal.png';
import elephantIcon from '../assets/elephant.png';
import lionIcon from '../assets/lion.png';
import giraffeIcon from '../assets/giraffe.png';
import rhinoIcon from '../assets/rhino.png';
import leopardIcon from '../assets/leopard.png';
import locationIcon from '../assets/location.png';

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { Icon, divIcon } from 'leaflet';
import '../styles/RealTime.css';

const RealTime = () => {
  const [animalData, setAnimalData] = useState([]);
  const [isLayerMenuVisible, setIsLayerMenuVisible] = useState(false);
  const [isReportMenuVisible, setIsReportMenuVisible] = useState(false);
  const [isPatrolMenuVisible, setIsPatrolMenuVisible] = useState(false);
  const [isAnimalMenuVisible, setIsAnimalMenuVisible] = useState(false);

  useEffect(() => {
    const animalSpecies = ['Elephants', 'Giraffes', 'Lions', 'Leopards', 'Rhinos'];
    
    animalSpecies.forEach((species) => {
      const animalsRef = ref(database, `Animals/${species}`);
      onValue(animalsRef, (snapshot) => {
        const data = snapshot.val();
        const animalArray = Object.keys(data).map((key) => {
          const animal = data[key];
          const latestTimestamp = Object.keys(animal.location).sort().pop();
          const latestTime = Object.keys(animal.location[latestTimestamp]).sort().pop();
          const location = animal.location[latestTimestamp][latestTime];
          return {
            ...animal,
            id: key,
            species: species.slice(0, -1),
            location: {
              Lat: parseFloat(location.Lat),
              Lng: parseFloat(location.Long),
            },
            date: latestTimestamp,
            time: latestTime,
          };
        });

        setAnimalData((prevData) => [...prevData, ...animalArray]);
      }, (error) => {
        console.error('Error fetching animal data:', error);
      });
    });
  }, []);

  const createCustomClusterIcon = (cluster) => {
    return new divIcon({
      html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
      className: "custom-marker-cluster",
    });
  };

  const createMarkerIcon = (species) => {
    let iconUrl;
    switch (species) {
      case 'Elephant':
        iconUrl = elephantIcon;
        break;
      case 'Lion':
        iconUrl = lionIcon;
        break;
      case 'Giraffe':
        iconUrl = giraffeIcon;
        break;
      case 'Rhino':
        iconUrl = rhinoIcon;
        break;
      case 'Leopard':
        iconUrl = leopardIcon;
        break;
      default:
        iconUrl = animalIcon;
        break;
    }
    return new Icon({
      iconUrl,
      iconSize: [38, 38],
    });
  };

  const toggleMenu = (menuSetter) => {
    menuSetter(prev => !prev);
    setIsReportMenuVisible(false);
    setIsPatrolMenuVisible(false);
    setIsLayerMenuVisible(false);
    setIsAnimalMenuVisible(false);
  };

  return (
    <div className="realtime-container">
      <MapContainer center={[34.166586, -1.948311]} zoom={13} style={{ width: '100%', height: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createCustomClusterIcon}
        >
          {animalData.map(animal => (
            <Marker key={animal.id} position={[animal.location.Lat, animal.location.Lng]} icon={createMarkerIcon(animal.species)}>
              <Popup>
                <div>
                  <strong>{animal.species}</strong><br />
                  Sex: {animal.sex}<br />
                  Age: {animal.age} years<br />
                  Date: {animal.date}<br />
                  Time: {animal.time}
                </div>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>

      {/* <div className="fixed-sidebar">
        <button className="sidebar-button" onClick={() => toggleMenu(setIsReportMenuVisible)}>
          <img src={reportsIcon} alt="Reports" className="sidebar-icon" />
          <span>Reports</span>
        </button>
        <button className="sidebar-button" onClick={() => toggleMenu(setIsPatrolMenuVisible)}>
          <img src={patrolsIcon} alt="Patrols" className="sidebar-icon" />
          <span>Patrols</span>
        </button>
        <button className="sidebar-button" onClick={() => toggleMenu(setIsLayerMenuVisible)}>
          <img src={layersIcon} alt="Layers" className="sidebar-icon" />
          <span>Layers</span>
        </button>
        <button className="sidebar-button" onClick={() => toggleMenu(setIsAnimalMenuVisible)}>
          <img src={animalIcon} alt="Animals" className="sidebar-icon" />
          <span>Animals</span>
        </button>
      </div> */}
    </div>
  );
};

export default RealTime;

```


### File: pages\RealTime copy 3.js
```
import '../styles/RealTime.css';
import "leaflet/dist/leaflet.css"

import { ref, onValue } from 'firebase/database';
import { database } from '../firebase'; // Adjust the path if needed

import FireIcon from '../assets/Fire.png'
import HumanWildlifeContactIcon from '../assets/Human_Wildlife_Contact.png'
import InjuredAnimalIcon from '../assets/Injured_Animal.png'
import InvasiveSpeciesIcon from '../assets/Invasive_Species_Sighting.png'
import RainfallIcon from '../assets/Rainfall.png'
import RhinoSightingIcon from '../assets/Rhino_Sighting.png'
import WildlifeSightingIcon from '../assets/Wildlife_Sighting.png'
// import ctIcon from '../assets/CT_Icon_Sighting.png';

import reportsIcon from '../assets/reports.png';
import patrolsIcon from '../assets/patrols.png';
import layersIcon from '../assets/layers.png';
import animalIcon from '../assets/animal.png';
import remoteControlIcon from '../assets/Remote Control Tag.png'

import outdoorsIcon from '../assets/outdoors.png';
import lightIcon from '../assets/light.png';
import darkIcon from '../assets/dark.png';
import satelliteIcon from '../assets/satellite.png';
import threeDIcon from '../assets/3d.png';
import heatmapIcon from '../assets/heatmap.png';
import locationIcon from '../assets/location.png'

import CTIcon from '../assets/CT_Icon_Sighting.png';
import fireIcon from '../assets/Fire.png';
import humanWildlifeIcon from '../assets/Human_Wildlife_Contact.png';
import injuredAnimalIcon from '../assets/Injured_Animal.png';
import invasiveSpeciesIcon from '../assets/Invasive_Species_Sighting.png';
import rainfallIcon from '../assets/Rainfall.png';
import rhinoSightingIcon from '../assets/Rhino_Sighting.png';
import wildlifeSightingIcon from '../assets/Wildlife_Sighting.png';

import elephantIcon from '../assets/elephant.png'
import lionIcon from '../assets/lion.png';
import giraffeIcon from '../assets/giraffe.png';
import rhinoIcon from '../assets/rhino.png';
import leopardIcon from '../assets/leopard.png';

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from "leaflet";
import MarkerClusterGroup from 'react-leaflet-cluster';

export default function RealTime() {
  const [animalData, setAnimalData] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [map] = useState(null);
  const [isLayerMenuVisible, setIsLayerMenuVisible] = useState(false);
  const [isReportMenuVisible, setIsReportMenuVisible] = useState(false);
  const [isPatrolMenuVisible, setIsPatrolMenuVisible] = useState(false);
  const [isAnimalMenuVisible, setIsAnimalMenuVisible] = useState(false);
  const [isRemoteControlMenuVisible, setIsRemoteControlMenuVisible] = useState(false);

  const [selectedReport, setSelectedReport] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    const animalSpecies = ['Elephants', 'Giraffes', 'Lions', 'Leopards', 'Rhinos'];
    const fetchedData = [];

    animalSpecies.forEach((species) => {
      const animalsRef = ref(database, `Animals/${species}`);
      onValue(animalsRef, (snapshot) => {
        const data = snapshot.val();
        const animalArray = Object.keys(data).map((key) => {
          const animal = data[key];
          const latestTimestamp = Object.keys(animal.location).sort().pop();
          const latestTime = Object.keys(animal.location[latestTimestamp]).sort().pop();
          const location = animal.location[latestTimestamp][latestTime];

          return {
            ...animal,
            id: key,
            species: species.slice(0, -1),
            location: {
              Lat: parseFloat(location.Lat),
              Lng: parseFloat(location.Long),
            },
            date: latestTimestamp,
            time: latestTime,
          };
        });
        fetchedData.push(...animalArray);
        setAnimalData(fetchedData);
      }, (error) => {
        console.error('Error fetching animal data:', error);
      });
    });
  }, []);

  useEffect(() => {
    const reportCategories = [
      'CT_Icon_Sighting',
      'Fire',
      'Human_Wildlife_Contact',
      'Injured_Animal',
      'Invasive_Species_Sighting',
      'Rainfall',
      'Rhino_Sighting',
      'Wildlife_Sighting'
    ];
    const fetchedReports = [];

    reportCategories.forEach((category) => {
      const reportsRef = ref(database, `Reports/${category}`);
      onValue(reportsRef, (snapshot) => {
        const data = snapshot.val();
        const reportArray = Object.keys(data).map((key) => {
          const report = data[key];
          return {
            ...report,
            id: key,
            category,
            location: {
              Lat: parseFloat(report.location.Lat),
              Lng: parseFloat(report.location.Long),
            },
            timestamp: report.timestamp
          };
        });
        fetchedReports.push(...reportArray);
        setReportData(fetchedReports);
      }, (error) => {
        console.error('Error fetching report data:', error);
      });
    });
  }, []);

  const handleLayerChange = (style) => {
    if (map) {
      map.setStyle(`mapbox://styles/${style}`);
    }
  };

  const toggleReportMenu = () => {
    setIsReportMenuVisible(!isReportMenuVisible);
    setIsLayerMenuVisible(false);
    setIsPatrolMenuVisible(false);
    setIsAnimalMenuVisible(false);
    setIsRemoteControlMenuVisible(false);
  };

  const togglePatrolMenu = () => {
    setIsReportMenuVisible(false);
    setIsPatrolMenuVisible(!isPatrolMenuVisible);
    setIsLayerMenuVisible(false);
    setIsAnimalMenuVisible(false);
    setIsRemoteControlMenuVisible(false);
  };

  const toggleLayerMenu = () => {
    setIsReportMenuVisible(false);
    setIsPatrolMenuVisible(false);
    setIsLayerMenuVisible(!isLayerMenuVisible);
    setIsAnimalMenuVisible(false);
    setIsRemoteControlMenuVisible(false);
  };

  const toggleAnimalMenu = () => {
    setIsReportMenuVisible(false);
    setIsPatrolMenuVisible(false);
    setIsLayerMenuVisible(false);
    setIsAnimalMenuVisible(!isAnimalMenuVisible);
    setIsRemoteControlMenuVisible(false);
  };

  const toggleRemoteControlMenu = () => {
    setIsReportMenuVisible(false);
    setIsPatrolMenuVisible(false);
    setIsLayerMenuVisible(false);
    setIsAnimalMenuVisible(false);
    setIsRemoteControlMenuVisible(!isRemoteControlMenuVisible);
  };

  const openModal = (report) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedReport(null);
    setIsModalOpen(false);
  };

  const ReportModal = ({ report, onClose }) => {
    if (!report) return null;

    return (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={onClose}>&times;</span>
          <h2>{report.category.replace(/_/g, ' ')}</h2>
          <p><strong>Reported by:</strong> {report.reported_by}</p>
          <p><strong>Report Time:</strong> {report.time}</p>
          <p><strong>Location:</strong> Lat: {report.location.Lat}, Long: {report.location.Long}</p>
          {report.species && <p><strong>Species:</strong> {report.species}</p>}
          {report.cause_of_injury && <p><strong>Cause of Injury:</strong> {report.cause_of_injury}</p>}
          {report.cause_of_fire && <p><strong>Fire Cause:</strong> {report.cause_of_fire}</p>}
          <p><strong>Action Taken:</strong> {report.action_taken}</p>
          <p><strong>Notes:</strong> {report.notes}</p>
          {report.pictures && (
            <div>
              <h3>Attached Images</h3>
              {report.pictures.map((img, index) => (
                <img key={index} src={img} alt="Attached" className="attached-image" />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };


  return (
    <div className="realtime-container">
      <div className="fixed-sidebar">
        <button className="sidebar-button" onClick={toggleReportMenu}>
          <img src={reportsIcon} alt="Reports" className="sidebar-icon" />
          <span>Reports</span>
        </button>
        <button className="sidebar-button" onClick={togglePatrolMenu}>
          <img src={patrolsIcon} alt="Patrols" className="sidebar-icon" />
          <span>Patrols</span>
        </button>
        <button className="sidebar-button" onClick={toggleLayerMenu}>
          <img src={layersIcon} alt="Layers" className="sidebar-icon" />
          <span>Layers</span>
        </button>
        <button className="sidebar-button" onClick={toggleAnimalMenu}>
          <img src={animalIcon} alt="Animals" className="sidebar-icon" />
          <span>Animals</span>
        </button>
        <button className="sidebar-button" onClick={toggleRemoteControlMenu}>
          <img src={remoteControlIcon} alt="Remote Control" className="sidebar-icon" />
          <span>Remote<br></br>Control</span>
        </button>
      </div>


      <MapContainer className="map" center={[-1.948, 34.1665]} zoom={16}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MarkerClusterGroup chunkedLoading>
          {reportData.map(report => {
            const reportIcon = new Icon({
              iconUrl:
                report.category === 'CT_Icon_Sighting' ? CTIcon :
                  report.category === 'Fire' ? fireIcon :
                    report.category === 'Human_Wildlife_Contact' ? humanWildlifeIcon :
                      report.category === 'Injured_Animal' ? injuredAnimalIcon :
                        report.category === 'Invasive_Species_Sighting' ? invasiveSpeciesIcon :
                          report.category === 'Rainfall' ? rainfallIcon :
                            report.category === 'Rhino_Sighting' ? rhinoSightingIcon :
                              wildlifeSightingIcon, // Default icon
              iconSize: [38, 38]
            });

            return (
              <Marker
                key={report.id}
                position={[report.location.Lat, report.location.Lng]}
                icon={reportIcon}
              >
                <Popup>
                  <div style={{ padding: '0px', borderRadius: '1px' }}>
                    <strong>{report.category.replace(/_/g, ' ')}</strong><br />
                    Location: {report.location.Lat}, {report.location.Long}<br />
                    Timestamp: {report.timestamp}
                  </div>
                </Popup>
              </Marker>
            );
          })}

          {animalData.map(animal => {
            // Determine the icon based on species
            const speciesIcon = new Icon({
              iconUrl:
                animal.species.toLowerCase() === 'elephant' ? elephantIcon :
                  animal.species.toLowerCase() === 'lion' ? lionIcon :
                    animal.species.toLowerCase() === 'giraffe' ? giraffeIcon :
                      animal.species.toLowerCase() === 'rhino' ? rhinoIcon :
                        animal.species.toLowerCase() === 'leopard' ? leopardIcon :
                          animalIcon, // Default icon for other species
              iconSize: [38, 38] // Adjust size as needed
            });

            return (
              <Marker
                key={animal.id} // Ensure each marker has a unique key
                position={[animal.location.Lat, animal.location.Lng]}
                icon={speciesIcon} // Use species-specific icon
              >
                <Popup>
                  <div style={{ padding: '0px', borderRadius: '1px' }}>
                    <strong>{animal.name}</strong><br />
                    Sex: {animal.sex}<br />
                    Age: {animal.age} years<br />
                    Temp: {animal.temp} °C<br />
                    Activity: {animal.activity}
                  </div>
                </Popup>

              </Marker>
            );
          })}
        </MarkerClusterGroup>
      </MapContainer>

      <div id="layer-menu" className={`layer-menu ${isLayerMenuVisible ? 'show' : 'hide'}`}>
        <button className="btn" onClick={() => handleLayerChange('mapbox/outdoors-v11')}>
          <img src={outdoorsIcon} alt="Outdoors" className="layer-icon" />
          Outdoors
        </button>
        <button className="btn" onClick={() => handleLayerChange('mapbox/light-v10')}>
          <img src={lightIcon} alt="Light" className="layer-icon" />
          Light
        </button>
        <button className="btn" onClick={() => handleLayerChange('mapbox/dark-v10')}>
          <img src={darkIcon} alt="Dark" className="layer-icon" />
          Dark
        </button>
        <button className="btn" onClick={() => handleLayerChange('mapbox/satellite-v9')}>
          <img src={satelliteIcon} alt="Satellite" className="layer-icon" />
          Satellite
        </button>
        <button className="btn" onClick={() => handleLayerChange('elisakikota/clzjmuy7i00jx01r37jx58xy9')}>
          <img src={threeDIcon} alt="3D" className="layer-icon" />
          3D
        </button>
        <button className="btn" onClick={() => handleLayerChange('mapbox/heatmap-v10')}>
          <img src={heatmapIcon} alt="Heatmap" className="layer-icon" />
          Heatmap
        </button>
      </div>

      <div id="report-menu" className={`report-menu ${isReportMenuVisible ? 'show' : 'hide'}`}>
        <div className="report-header">
          <span className="plus-sign">+</span>
          <span className="report-title">Reports</span>
          <span className="close-sign" onClick={toggleReportMenu}>x</span>
        </div>
        <div className="report-filters">
          <input type="text" placeholder="Search..." className="search-bar" />
          <button className="filter-btn">Filters</button>
          <button className="date-btn">Dates</button>
          <button className="date-updated-btn">Date Updated</button>
        </div>
        <div className="report-summary">
          <span>{reportData.length} results from about <b> {/* time logic here */} ago until now</b></span>
        </div>
        <div className="report-list">
          {reportData.map((report) => (
            <div
              key={report.id}
              className="report-item"
              onClick={() => openModal(report)} // Open modal on click
            >
              <img src={
                report.category === 'CT_Icon_Sighting' ? CTIcon :
                  report.category === 'Fire' ? FireIcon :
                    report.category === 'Human_Wildlife_Contact' ? HumanWildlifeContactIcon :
                      report.category === 'Injured_Animal' ? InjuredAnimalIcon :
                        report.category === 'Invasive_Species_Sighting' ? InvasiveSpeciesIcon :
                          report.category === 'Rainfall' ? RainfallIcon :
                            report.category === 'Rhino_Sighting' ? RhinoSightingIcon :
                              WildlifeSightingIcon  // Default icon for other categories
              } alt="report" className="report-image" />
              <span className="entry-number">{report.id}</span>
              <span className="report-name">{report.category.replace(/_/g, ' ')}</span>
              <span className="report-day-time">
                <div className="report-date"> {/* Date logic here */} </div>
                <div className="report-time"> {/* Time logic here */} </div>
              </span>
              <button className="locate-icon">
                <img src={locationIcon} alt="locationIcon" className="layer-icon" />
              </button>
            </div>
          ))}
        </div>

      </div>

      <div id="patrol-menu" className={`patrol-menu ${isPatrolMenuVisible ? 'show' : 'hide'}`}>
        <div className="patrol-header">
          <span className="plus-sign">+</span>
          <span className="report-title">Patrol Officers</span>
          <span className="close-sign" onClick={togglePatrolMenu}>x</span>
        </div>
        <div className="patrol-filters">
          <input type="text" placeholder="Search..." className="search-bar" />
          <button className="filter-btn">Filters</button>
          <button className="date-btn">Dates</button>
          <button className="date-updated-btn">Date Updated</button>
        </div>
        <div className="patrol-summary">
          <span>1 results from about <b> {/* time logic here */} ago until now</b></span>
        </div>
        <div className="patrol-list">
          {/* Replace with dynamic data */}
          <div className="patrol-item">
            <img src={patrolsIcon} alt="patrol" className="patrol-image" />
            <span className="entry-number">1</span>
            <span className="report-name">Elisa Kikota</span>
            <span className="report-day-time">
              <div classname="patrol-date">9th Aug 2024</div>
              <div classname="patrol-time">12:30 PM</div>
            </span>
            <button className="locate-icon">{<img src={locationIcon} alt="locationIcon" className="layer-icon" />}</button>
          </div>
          {/* Repeat for other reports */}
        </div>
      </div>

      <div id="animal-menu" className={`animal-menu ${isAnimalMenuVisible ? 'show' : 'hide'}`}>
        <div className="animal-header">
          <span className="plus-sign">+</span>
          <span className="animal-title">Animals</span>
          <span className="close-sign" onClick={() => setIsAnimalMenuVisible(false)}>x</span>
        </div>
        <div className="animal-filters">
          <input type="text" placeholder="Search..." className="search-bar" />
          <button className="filter-btn">Filters</button>
          <button className="date-btn">Dates</button>
          <button className="date-updated-btn">Date Updated</button>
        </div>
        <div className="animal-summary">
          <span>{animalData.length} results from about <b>{/* time logic here */} ago until now</b></span>
        </div>
        <div className="animal-list">
          {animalData.map((animal) => (
            <div key={animal.id} className="animal-item">
              <img src={
                animal.species.toLowerCase() === 'elephant' ? elephantIcon :
                  animal.species.toLowerCase() === 'lion' ? lionIcon :
                    animal.species.toLowerCase() === 'rhino' ? rhinoIcon :
                      animal.species.toLowerCase() === 'leopard' ? leopardIcon :
                        giraffeIcon // Default for giraffe and others
              } alt="animal" className="animal-image" />
              <span className="entry-number">{animal.id}</span>
              <span className="animal-name">{animal.name}</span>
              <span className="animal-day-time">
                <div className="animal-date">{animal.date}</div>
                <div className="animal-time">{animal.time}</div>
              </span>
              <button className="locate-icon">
                <img src={locationIcon} alt="locationIcon" className="layer-icon" />
              </button>
            </div>
          ))}
        </div>

      </div>

      <div id="remote-control-menu" className={`remote-control-menu ${isRemoteControlMenuVisible ? 'show' : 'hide'}`}>
        <div className="remote-control-header">
          <span className="plus-sign">+</span>
          <span className="remote-control-title">Remote Control Tag</span>
          <span className="close-sign" onClick={toggleReportMenu}>x</span>
        </div>
        <div className="remote-control-filters">
          <input type="text" placeholder="Search..." className="search-bar" />
          <button className="filter-btn">Filters</button>
          <button className="date-btn">Dates</button>
          <button className="date-updated-btn">Date Updated</button>
        </div>
        <div className="remote-control-summary">
          <span>{reportData.length} results from about <b> {/* time logic here */} ago until now</b></span>
        </div>
        <div className="remote-control-list">
          {animalData.map((animal) => (
            <div key={animal.id} className="animal-item">
              <img src={
                animal.species.toLowerCase() === 'elephant' ? elephantIcon :
                  animal.species.toLowerCase() === 'lion' ? lionIcon :
                    animal.species.toLowerCase() === 'rhino' ? rhinoIcon :
                      animal.species.toLowerCase() === 'leopard' ? leopardIcon :
                        giraffeIcon // Default for giraffe and others
              } alt="animal" className="animal-image" />
              <span className="entry-number">{animal.id}</span>
              <span className="animal-name">{animal.name}</span>
              <span className="animal-day-time">
                <div className="animal-date">{animal.date}</div>
                <div className="animal-time">{animal.time}</div>
              </span>
              <button className="locate-icon">
                <img src={locationIcon} alt="locationIcon" className="layer-icon" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <ReportModal report={selectedReport} onClose={closeModal} />
      )}


    </div>
  );
}

```


### File: pages\RealTime copy.js
```
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase'; // Adjust the path if needed


import reportsIcon from '../assets/reports.png';
import patrolsIcon from '../assets/patrols.png';
import layersIcon from '../assets/layers.png';
import outdoorsIcon from '../assets/outdoors.png';
import lightIcon from '../assets/light.png';
import darkIcon from '../assets/dark.png';
import satelliteIcon from '../assets/satellite.png';
import animalIcon from '../assets/animal.png';
import threeDIcon from '../assets/3d.png';
import heatmapIcon from '../assets/heatmap.png';
import locationIcon from '../assets/location.png'


import elephantIcon from '../assets/elephant.png'
import lionIcon from '../assets/lion.png';
import giraffeIcon from '../assets/giraffe.png';
import rhinoIcon from '../assets/rhino.png';
import leopardIcon from '../assets/leopard.png';


import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import '../styles/RealTime.css';


mapboxgl.accessToken = 'pk.eyJ1IjoiZWxpc2FraWtvdGEiLCJhIjoiY2x6MTkwYWRiMnE0ZTJpcjR5bzFjMzNrZyJ9.HRBoAER-bGLPEcdhbUsW_A';
// mapboxgl.accessToken = 'pk.eyJ1IjoiZWxpc2FraWtvdGEiLCJhIjoiY20wMmRsY2gzMDAyczJ2cjFpZ2FudnR0ayJ9.LI2OnTDNopBb5YcHHJ2Xqg';

const RealTime = () => {
  const [animalData, setAnimalData] = useState([]);
  const [map, setMap] = useState(null);
  const [isLayerMenuVisible, setIsLayerMenuVisible] = useState(false);
  const [isReportMenuVisible, setIsReportMenuVisible] = useState(false);
  const [isPatrolMenuVisible, setIsPatrolMenuVisible] = useState(false);
  const [isAnimalMenuVisible, setIsAnimalMenuVisible] = useState(false);


  useEffect(() => {
    const mapInstance = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [34.166586,-1.948311],
      zoom: 17.3,
      attributionControl: false,
    });
  
    mapInstance.on('load', () => {
      const animalSpecies = ['Elephants', 'Giraffes', 'Lions', 'Leopards', 'Rhinos'];
      
      animalSpecies.forEach((species) => {
        const animalsRef = ref(database, `Animals/${species}`);
        onValue(animalsRef, (snapshot) => {
          const data = snapshot.val();
          const animalArray = Object.keys(data).map((key) => {
            const animal = data[key];
            const latestTimestamp = Object.keys(animal.location).sort().pop();
            const latestTime = Object.keys(animal.location[latestTimestamp]).sort().pop();
            const location = animal.location[latestTimestamp][latestTime];
  
            return {
              ...animal,
              id: key,
              species: species.slice(0, -1), // Convert 'Elephants' to 'Elephant'
              location: {
                Lat: parseFloat(location.Lat),
                Lng: parseFloat(location.Long),
              },
              date: latestTimestamp, // This is the latest date
              time: latestTime,      // This is the latest time
            };
          });
  
          setAnimalData((prevData) => [...prevData, ...animalArray]);
  
          animalArray.forEach((animal) => {
            if (!isNaN(animal.location.Lat) && !isNaN(animal.location.Lng)) {
              new mapboxgl.Marker({ element: createMarkerElement(animal.species) })
                .setLngLat([animal.location.Lng, animal.location.Lat])
                .setPopup(new mapboxgl.Popup({ offset: 25 })
                .setHTML(
                  `<div 
                      style="
                        background-color: #f0f0f0; 
                        padding: 10px;
                        border-radius:20;"
                      width:30;>
                    <strong>${animal.species}</strong><br />
                    Sex: ${animal.sex}<br />
                    Age: ${animal.age} years<br />
                    Date: ${animal.date}<br /> 
                    Time: ${animal.time} 
                  </div>`
                ))
                .addTo(mapInstance);
            } else {
              console.error('Invalid coordinates for animal:', animal);
            }
          });
          
        }, (error) => {
          console.error('Error fetching animal data:', error);
        });
      });
    });
  
    setMap(mapInstance);
  
    return () => mapInstance.remove();
  }, []);
  


  const createMarkerElement = (species) => {
    const markerDiv = document.createElement('div');
    markerDiv.className = 'marker';
    let iconUrl;
  
    switch (species) {
      case 'Elephant':
        iconUrl = elephantIcon;
        break;
      case 'Lion':
        iconUrl = lionIcon;
        break;
      case 'Giraffe':
        iconUrl = giraffeIcon;
        break;
      case 'Rhino':
        iconUrl = rhinoIcon;
        break;
      case 'Leopard':
        iconUrl = leopardIcon;
        break;
      default:
        iconUrl = animalIcon; // Fallback icon
        break;
    }
  
    markerDiv.style.backgroundImage = `url(${iconUrl})`;
    markerDiv.style.backgroundSize = 'cover';
    markerDiv.style.width = '32px';
    markerDiv.style.height = '32px';
    return markerDiv;
  };
  

  const handleLayerChange = (style) => {
    if (map) {
      map.setStyle(`mapbox://styles/${style}`);
    }
  };


  const toggleReportMenu = () => {
    setIsReportMenuVisible(!isReportMenuVisible);
    setIsLayerMenuVisible(false);
    setIsPatrolMenuVisible(false);
    setIsAnimalMenuVisible(false);
  };

  const togglePatrolMenu = () => {
    setIsReportMenuVisible(false);
    setIsPatrolMenuVisible(!isPatrolMenuVisible);
    setIsLayerMenuVisible(false);
    setIsAnimalMenuVisible(false);
  };

  const toggleLayerMenu = () => {
    setIsReportMenuVisible(false);
    setIsPatrolMenuVisible(false);
    setIsLayerMenuVisible(!isLayerMenuVisible);
    setIsAnimalMenuVisible(false);
  };

  const toggleAnimalMenu = () => {
    setIsReportMenuVisible(false); 
    setIsPatrolMenuVisible(false);
    setIsLayerMenuVisible(false);
    setIsAnimalMenuVisible(!isAnimalMenuVisible);
  };
  
  

  return (
    <div className="realtime-container">
      <div id="map" style={{ width: '100%', height: '100%' }}></div>
      <div className="fixed-sidebar">
      <button className="sidebar-button" onClick={toggleReportMenu}>
          <img src={reportsIcon} alt="Reports" className="sidebar-icon" />
          <span>Reports</span>
        </button>
        <button className="sidebar-button" onClick={togglePatrolMenu}>
          <img src={patrolsIcon} alt="Patrols" className="sidebar-icon" />
          <span>Patrols</span>
        </button>
        <button className="sidebar-button" onClick={toggleLayerMenu}>
          <img src={layersIcon} alt="Layers" className="sidebar-icon" />
          <span>Layers</span>
        </button>
        <button className="sidebar-button" onClick={toggleAnimalMenu}>
          <img src={animalIcon} alt="Animals" className="sidebar-icon" />
          <span>Animals</span>
        </button>

        <div id="layer-menu" className={`layer-menu ${isLayerMenuVisible ? 'show' : 'hide'}`}>
          <button className="btn" onClick={() => handleLayerChange('mapbox/outdoors-v11')}>
            <img src={outdoorsIcon} alt="Outdoors" className="layer-icon" />
            Outdoors
          </button>
          <button className="btn" onClick={() => handleLayerChange('mapbox/light-v10')}>
            <img src={lightIcon} alt="Light" className="layer-icon" />
            Light
          </button>
          <button className="btn" onClick={() => handleLayerChange('mapbox/dark-v10')}>
            <img src={darkIcon} alt="Dark" className="layer-icon" />
            Dark
          </button>
          <button className="btn" onClick={() => handleLayerChange('mapbox/satellite-v9')}>
            <img src={satelliteIcon} alt="Satellite" className="layer-icon" />
            Satellite
          </button>
          <button className="btn" onClick={() => handleLayerChange('elisakikota/clzjmuy7i00jx01r37jx58xy9')}>
            <img src={threeDIcon} alt="3D View" className="layer-icon" />
            3D View
          </button>
          <button className="btn" onClick={() => handleLayerChange('elisakikota/clzjjqpdi00jo01r37ot6asfi')}>
            <img src={heatmapIcon} alt="HeatMap" className="layer-icon" />
            HeatMap
          </button>
        </div>
      </div>
      
      <div id="report-menu" className={`report-menu ${isReportMenuVisible ? 'show' : 'hide'}`}>
        <div className="report-header">
          <span className="plus-sign">+</span>
          <span className="report-title">Reports</span>
          <span className="close-sign" onClick={toggleReportMenu}>x</span>
        </div>
        <div className="report-filters">
          <input type="text" placeholder="Search..." className="search-bar" />
          <button className="filter-btn">Filters</button>
          <button className="date-btn">Dates</button>
          <button className="date-updated-btn">Date Updated</button>
        </div>
        <div className="report-summary">
          <span>1 results from about <b> {/* time logic here */} ago until now</b></span>
        </div>
        <div className="report-list">
          {/* Replace with dynamic data */}
          <div className="report-item">
            <img src={reportsIcon} alt="Report" className="report-image" />
            <span className="entry-number">2</span>
            <span className="report-name">Antelope Injury</span>
            <span className="report-day-time">
              <div classname="report-date">9th Aug 2024</div>
              <div classname="report-time">12:30 PM</div>
            </span>
            <button className="locate-icon">{ <img src={locationIcon} alt="locationIcon" className="layer-icon" />}</button>
          </div>
          {/* Repeat for other reports */}
        </div>
      </div>

      <div id="patrol-menu" className={`patrol-menu ${isPatrolMenuVisible ? 'show' : 'hide'}`}>
        <div className="patrol-header">
          <span className="plus-sign">+</span>
          <span className="report-title">Patrol Officers</span>
          <span className="close-sign" onClick={togglePatrolMenu}>x</span>
        </div>
        <div className="patrol-filters">
          <input type="text" placeholder="Search..." className="search-bar" />
          <button className="filter-btn">Filters</button>
          <button className="date-btn">Dates</button>
          <button className="date-updated-btn">Date Updated</button>
        </div>
        <div className="patrol-summary">
          <span>1 results from about <b> {/* time logic here */} ago until now</b></span>
        </div>
        <div className="patrol-list">
          {/* Replace with dynamic data */}
          <div className="patrol-item">
            <img src={patrolsIcon} alt="patrol" className="patrol-image" />
            <span className="entry-number">1</span>
            <span className="report-name">Elisa Kikota</span>
            <span className="report-day-time">
              <div classname="patrol-date">9th Aug 2024</div>
              <div classname="patrol-time">12:30 PM</div>
            </span>
            <button className="locate-icon">{ <img src={locationIcon} alt="locationIcon" className="layer-icon" />}</button>
          </div>
          {/* Repeat for other reports */}
        </div>
      </div>
      
      <div id="animal-menu" className={`animal-menu ${isAnimalMenuVisible ? 'show' : 'hide'}`}>
        <div className="animal-header">
          <span className="plus-sign">+</span>
          <span className="animal-title">Animals</span>
          <span className="close-sign" onClick={() => setIsAnimalMenuVisible(false)}>x</span>
        </div>
        <div className="animal-filters">
          <input type="text" placeholder="Search..." className="search-bar" />
          <button className="filter-btn">Filters</button>
          <button className="date-btn">Dates</button>
          <button className="date-updated-btn">Date Updated</button>
        </div>
        <div className="animal-summary">
          <span>{animalData.length} results from about <b>{/* time logic here */} ago until now</b></span>
        </div>
        <div className="animal-list">
          {animalData.map((animal) => (
            <div key={animal.id} className="animal-item">
              <img src={
                animal.species.toLowerCase() === 'elephant' ? elephantIcon :
                animal.species.toLowerCase() === 'lion' ? lionIcon :
                animal.species.toLowerCase() === 'rhino' ? rhinoIcon :
                animal.species.toLowerCase() === 'leopard' ? leopardIcon :
                giraffeIcon // Default for giraffe and others
              } alt="animal" className="animal-image" />
              <span className="entry-number">{animal.id}</span>
              <span className="animal-name">{animal.name}</span>
              <span className="animal-day-time">
                <div className="animal-date">{animal.date}</div>
                <div className="animal-time">{animal.time}</div>
              </span>
              <button className="locate-icon">
                <img src={locationIcon} alt="locationIcon" className="layer-icon" />
              </button>
            </div>
        ))}
      </div>

      </div>
);


    </div>
  );
};

export default RealTime;

```


### File: pages\RealTime.js
```
import '../styles/RealTime.css';
import "leaflet/dist/leaflet.css"

import React, { useEffect, useState } from 'react';
import { ref, update, onValue } from 'firebase/database';
import { database } from '../firebase'; // Adjust the path if needed

import ReportMenu from './ReportMenu';  // Adjust the path as needed


// import ctIcon from '../assets/CT_Icon_Sighting.png';

import reportsIcon from '../assets/reports.png';
import patrolsIcon from '../assets/patrols.png';
import layersIcon from '../assets/layers.png';
import animalIcon from '../assets/animal.png';
import remoteControlIcon from '../assets/Remote Control Tag.png'

import outdoorsIcon from '../assets/outdoors.png';
import lightIcon from '../assets/light.png';
import darkIcon from '../assets/dark.png';
import satelliteIcon from '../assets/satellite.png';
import threeDIcon from '../assets/3d.png';
import heatmapIcon from '../assets/heatmap.png';
import locationIcon from '../assets/location.png'

import CTIcon from '../assets/CT_Icon_Sighting.png';
import fireIcon from '../assets/Fire.png';
import humanWildlifeIcon from '../assets/Human_Wildlife_Contact.png';
import injuredAnimalIcon from '../assets/Injured_Animal.png';
import invasiveSpeciesIcon from '../assets/Invasive_Species_Sighting.png';
import rainfallIcon from '../assets/Rainfall.png';
import rhinoSightingIcon from '../assets/Rhino_Sighting.png';
import wildlifeSightingIcon from '../assets/Wildlife_Sighting.png';

import elephantIcon from '../assets/elephant.png'
import lionIcon from '../assets/lion.png';
import giraffeIcon from '../assets/giraffe.png';
import rhinoIcon from '../assets/rhino.png';
import leopardIcon from '../assets/leopard.png';

import { Icon } from "leaflet";
import MarkerClusterGroup from 'react-leaflet-cluster';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';

export default function RealTime() {
  const [animalData, setAnimalData] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [map] = useState(null);
  const [isLayerMenuVisible, setIsLayerMenuVisible] = useState(false);
  const [isReportMenuVisible, setIsReportMenuVisible] = useState(false);
  const [isPatrolMenuVisible, setIsPatrolMenuVisible] = useState(false);
  const [isAnimalMenuVisible, setIsAnimalMenuVisible] = useState(false);
  const [isRemoteControlMenuVisible, setIsRemoteControlMenuVisible] = useState(false);

  const [selectedReport, setSelectedReport] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    const animalSpecies = ['Elephants', 'Giraffes', 'Lions', 'Leopards', 'Rhinos'];

    animalSpecies.forEach((species) => {
      const animalsRef = ref(database, `Animals/${species}`);
      onValue(animalsRef, (snapshot) => {
        const data = snapshot.val();
        const animalArray = Object.keys(data).map((key) => {
          const animal = data[key];
          const latestTimestamp = Object.keys(animal.location).sort().pop();
          const latestTime = Object.keys(animal.location[latestTimestamp]).sort().pop();
          const location = animal.location[latestTimestamp][latestTime];

          return {
            ...animal,
            id: key,
            species: species.slice(0, -1),
            location: {
              Lat: parseFloat(location.Lat),
              Lng: parseFloat(location.Long),
            },
            upload_interval: parseInt(animal.upload_interval) || 0, // Parse as integer, default to 0
            date: latestTimestamp,
            time: latestTime,
          };
        });

        setAnimalData(prevData => {
          const updatedData = [...prevData];
          animalArray.forEach(newAnimal => {
            const index = updatedData.findIndex(animal => animal.id === newAnimal.id);
            if (index !== -1) {
              updatedData[index] = newAnimal;
            } else {
              updatedData.push(newAnimal);
            }
          });
          return updatedData;
        });
      }, (error) => {
        console.error('Error fetching animal data:', error);
      });
    });
  }, []);

  useEffect(() => {
    const reportCategories = [
      'CT_Icon_Sighting',
      'Fire',
      'Human_Wildlife_Contact',
      'Injured_Animal',
      'Invasive_Species_Sighting',
      'Rainfall',
      'Rhino_Sighting',
      'Wildlife_Sighting'
    ];

    const reportsRef = ref(database, 'Reports');

    const unsubscribe = onValue(reportsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const fetchedReports = reportCategories.flatMap(category => {
          const categoryReports = data[category] || {};
          return Object.entries(categoryReports).map(([key, report]) => ({
            ...report,
            id: key,
            category,
            location: {
              Lat: parseFloat(report.location.Lat),
              Lng: parseFloat(report.location.Long),
            },
            timestamp: report.timestamp
          }));
        });
        setReportData(fetchedReports);
      }
    }, (error) => {
      console.error('Error fetching report data:', error);
    });

    return () => unsubscribe();
  }, []);

  // const fetchedReports = [];


  // reportCategories.forEach((category) => {
  //   const reportsRef = ref(database, `Reports/${category}`);
  //   onValue(reportsRef, (snapshot) => {
  //     const data = snapshot.val();
  //     const reportArray = Object.keys(data).map((key) => {
  //       const report = data[key];
  //       return {
  //         ...report,
  //         id: key,
  //         category,

  //         location: {
  //           Lat: parseFloat(report.location.Lat),
  //           Lng: parseFloat(report.location.Long),
  //         },
  //         timestamp: report.timestamp
  //       };
  //     });
  //     fetchedReports.push(...reportArray);
  //     setReportData(fetchedReports);
  //   }, (error) => {
  //     console.error('Error fetching report data:', error);
  //   });
  // });


  const handleLayerChange = (style) => {
    if (map) {
      map.setStyle(`mapbox://styles/${style}`);
    }
  };

  const toggleReportMenu = () => {
    setIsReportMenuVisible(!isReportMenuVisible);
    setIsLayerMenuVisible(false);
    setIsPatrolMenuVisible(false);
    setIsAnimalMenuVisible(false);
    setIsRemoteControlMenuVisible(false);
  };

  const togglePatrolMenu = () => {
    setIsReportMenuVisible(false);
    setIsPatrolMenuVisible(!isPatrolMenuVisible);
    setIsLayerMenuVisible(false);
    setIsAnimalMenuVisible(false);
    setIsRemoteControlMenuVisible(false);
  };

  const toggleLayerMenu = () => {
    setIsReportMenuVisible(false);
    setIsPatrolMenuVisible(false);
    setIsLayerMenuVisible(!isLayerMenuVisible);
    setIsAnimalMenuVisible(false);
    setIsRemoteControlMenuVisible(false);
  };

  const toggleAnimalMenu = () => {
    setIsReportMenuVisible(false);
    setIsPatrolMenuVisible(false);
    setIsLayerMenuVisible(false);
    setIsAnimalMenuVisible(!isAnimalMenuVisible);
    setIsRemoteControlMenuVisible(false);
  };

  const toggleRemoteControlMenu = () => {
    setIsReportMenuVisible(false);
    setIsPatrolMenuVisible(false);
    setIsLayerMenuVisible(false);
    setIsAnimalMenuVisible(false);
    setIsRemoteControlMenuVisible(!isRemoteControlMenuVisible);
  };

  const openModal = (report) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedReport(null);
    setIsModalOpen(false);
  };

  const ReportModal = ({ report, onClose }) => {
    if (!report) return null;

    return (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={onClose}>&times;</span>
          <h2>{report.category.replace(/_/g, ' ')}</h2>
          <p><strong>Reported by:</strong> {report.reported_by}</p>
          <p><strong>Report Time:</strong> {report.time}</p>
          <p><strong>Location:</strong> Lat: {report.location.Lat}, Long: {report.location.Lng}</p>
          {report.species && <p><strong>Species:</strong> {report.species}</p>}
          {report.cause_of_injury && <p><strong>Cause of Injury:</strong> {report.cause_of_injury}</p>}
          {report.cause_of_fire && <p><strong>Fire Cause:</strong> {report.cause_of_fire}</p>}
          <p><strong>Action Taken:</strong> {report.action_taken}</p>
          <p><strong>Notes:</strong> {report.notes}</p>
          {report.pictures && (
            <div>
              <h3>Attached Images</h3>
              {report.pictures.map((img, index) => (
                <img key={index} src={img} alt="Attached" className="attached-image" />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const handleIntervalChange = (e, animalId, species) => {
    const newIntervalString = e.target.value;
    const newInterval = newIntervalString === '' ? 0 : parseInt(newIntervalString, 10);

    if (isNaN(newInterval)) {
      console.error('Invalid input: Not a number');
      return; // Exit the function if input is not a valid number
    }

    // Update local state immediately to reflect in the input field
    setAnimalData(prevData =>
      prevData.map(animal =>
        animal.id === animalId
          ? { ...animal, upload_interval: newInterval }
          : animal
      )
    );

    // Clear the previous timeout to prevent multiple updates
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Set a new timeout to update Firebase after a short delay
    const timeoutId = setTimeout(() => {
      const pluralSpecies = species === 'Elephant' ? 'Elephants' :
        species === 'Lion' ? 'Lions' :
          species === 'Giraffe' ? 'Giraffes' :
            species === 'Rhino' ? 'Rhinos' :
              species === 'Leopard' ? 'Leopards' : species;

      // Update Firebase after the delay
      const animalRef = ref(database, `Animals/${pluralSpecies}/${animalId}`);
      update(animalRef, {
        upload_interval: newInterval
      })
        .then(() => {
          console.log("Upload interval updated successfully in Firebase");
        })
        .catch((error) => {
          console.error("Error updating upload interval in Firebase:", error);
          // Revert local state if Firebase update fails
          setAnimalData(prevData =>
            prevData.map(animal =>
              animal.id === animalId
                ? { ...animal, upload_interval: animal.upload_interval }
                : animal
            )
          );
        });
    }, 1000); // Update Firebase after 1 second delay

    setTypingTimeout(timeoutId); // Store the timeout ID
  };

  return (
    <div className="realtime-container">
      <div className="fixed-sidebar">
        <button className="sidebar-button" onClick={toggleReportMenu}>
          <img src={reportsIcon} alt="Reports" className="sidebar-icon" />
          <span>Reports</span>
        </button>
        <button className="sidebar-button" onClick={togglePatrolMenu}>
          <img src={patrolsIcon} alt="Patrols" className="sidebar-icon" />
          <span>Patrols</span>
        </button>
        <button className="sidebar-button" onClick={toggleLayerMenu}>
          <img src={layersIcon} alt="Layers" className="sidebar-icon" />
          <span>Layers</span>
        </button>
        <button className="sidebar-button" onClick={toggleAnimalMenu}>
          <img src={animalIcon} alt="Animals" className="sidebar-icon" />
          <span>Animals</span>
        </button>
        <button className="sidebar-button" onClick={toggleRemoteControlMenu}>
          <img src={remoteControlIcon} alt="Remote Control" className="sidebar-icon" />
          <span>Remote<br></br>Control</span>
        </button>
      </div>

      <MapContainer className="map" center={[-1.948, 34.1665]} zoom={16} zoomControl={false}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MarkerClusterGroup chunkedLoading>
          {reportData.map(report => {
            const reportIcon = new Icon({
              iconUrl:
                report.category === 'CT_Icon_Sighting' ? CTIcon :
                  report.category === 'Fire' ? fireIcon :
                    report.category === 'Human_Wildlife_Contact' ? humanWildlifeIcon :
                      report.category === 'Injured_Animal' ? injuredAnimalIcon :
                        report.category === 'Invasive_Species_Sighting' ? invasiveSpeciesIcon :
                          report.category === 'Rainfall' ? rainfallIcon :
                            report.category === 'Rhino_Sighting' ? rhinoSightingIcon :
                              wildlifeSightingIcon, // Default icon
              iconSize: [38, 38]
            });

            return (
              <Marker
                key={report.id}
                position={[report.location.Lat, report.location.Lng]}
                icon={reportIcon}
              >
                <Popup>
                  <div style={{ padding: '0px', borderRadius: '1px' }}>
                    <strong>{report.category.replace(/_/g, ' ')}</strong><br />
                    Location: {report.location.Lat}, {report.location.Long}<br />
                    Timestamp: {report.timestamp}
                  </div>
                </Popup>
              </Marker>
            );
          })}

          {animalData.map(animal => {
            // Determine the icon based on species
            const speciesIcon = new Icon({
              iconUrl:
                animal.species.toLowerCase() === 'elephant' ? elephantIcon :
                  animal.species.toLowerCase() === 'lion' ? lionIcon :
                    animal.species.toLowerCase() === 'giraffe' ? giraffeIcon :
                      animal.species.toLowerCase() === 'rhino' ? rhinoIcon :
                        animal.species.toLowerCase() === 'leopard' ? leopardIcon :
                          animalIcon, // Default icon for other species
              iconSize: [38, 38] // Adjust size as needed
            });

            return (
              <Marker
                key={animal.id} // Ensure each marker has a unique key
                position={[animal.location.Lat, animal.location.Lng]}
                icon={speciesIcon} // Use species-specific icon
              >
                <Popup>
                  <div style={{ padding: '0px', borderRadius: '1px' }}>
                    <strong>{animal.name}</strong><br />
                    Sex: {animal.sex}<br />
                    Age: {animal.age} years<br />
                    Temp: {animal.temp} °C<br />
                    Activity: {animal.activity}
                  </div>
                </Popup>

              </Marker>
            );
          })}
        </MarkerClusterGroup>
        <ZoomControl position="bottomright" />
      </MapContainer>

      <div id="layer-menu" className={`layer-menu ${isLayerMenuVisible ? 'show' : 'hide'}`}>
        <button className="btn" onClick={() => handleLayerChange('mapbox/outdoors-v11')}>
          <img src={outdoorsIcon} alt="Outdoors" className="layer-icon" />
          Outdoors
        </button>
        <button className="btn" onClick={() => handleLayerChange('mapbox/light-v10')}>
          <img src={lightIcon} alt="Light" className="layer-icon" />
          Light
        </button>
        <button className="btn" onClick={() => handleLayerChange('mapbox/dark-v10')}>
          <img src={darkIcon} alt="Dark" className="layer-icon" />
          Dark
        </button>
        <button className="btn" onClick={() => handleLayerChange('mapbox/satellite-v9')}>
          <img src={satelliteIcon} alt="Satellite" className="layer-icon" />
          Satellite
        </button>
        <button className="btn" onClick={() => handleLayerChange('elisakikota/clzjmuy7i00jx01r37jx58xy9')}>
          <img src={threeDIcon} alt="3D" className="layer-icon" />
          3D
        </button>
        <button className="btn" onClick={() => handleLayerChange('mapbox/heatmap-v10')}>
          <img src={heatmapIcon} alt="Heatmap" className="layer-icon" />
          Heatmap
        </button>
      </div>

      <ReportMenu
        isReportMenuVisible={isReportMenuVisible}
        toggleReportMenu={toggleReportMenu}
        reportData={reportData}
        openModal={openModal}
      />

      <div id="patrol-menu" className={`patrol-menu ${isPatrolMenuVisible ? 'show' : 'hide'}`}>
        <div className="patrol-header">
          <span className="plus-sign">+</span>
          <span className="report-title">Patrol Officers</span>
          <span className="close-sign" onClick={togglePatrolMenu}>x</span>
        </div>
        <div className="patrol-filters">
          <input type="text" placeholder="Search..." className="search-bar" />
          <button className="filter-btn">Filters</button>
          <button className="date-btn">Dates</button>
          <button className="date-updated-btn">Date Updated</button>
        </div>
        <div className="patrol-summary">
          <span>1 results from about <b> {/* time logic here */} ago until now</b></span>
        </div>
        <div className="patrol-list">
          {/* Replace with dynamic data */}
          <div className="patrol-item">
            <img src={patrolsIcon} alt="patrol" className="patrol-image" />
            <span className="entry-number">1</span>
            <span className="report-name">Elisa Kikota</span>
            <span className="report-day-time">
              <div classname="patrol-date">9th Aug 2024</div>
              <div classname="patrol-time">12:30 PM</div>
            </span>
            <button className="locate-icon">{<img src={locationIcon} alt="locationIcon" className="layer-icon" />}</button>
          </div>
          {/* Repeat for other reports */}
        </div>
      </div>

      <div id="animal-menu" className={`animal-menu ${isAnimalMenuVisible ? 'show' : 'hide'}`}>
        <div className="animal-header">
          <span className="plus-sign">+</span>
          <span className="animal-title">Animals</span>
          <span className="close-sign" onClick={() => setIsAnimalMenuVisible(false)}>x</span>
        </div>
        <div className="animal-filters">
          <input type="text" placeholder="Search..." className="search-bar" />
          <button className="filter-btn">Filters</button>
          <button className="date-btn">Dates</button>
          <button className="date-updated-btn">Date Updated</button>
        </div>
        <div className="animal-summary">
          <span>{animalData.length} results from about <b>{/* time logic here */} ago until now</b></span>
        </div>
        <div className="animal-list">
          {animalData.map((animal) => (
            <div key={animal.id} className="animal-item">
              <img src={
                animal.species.toLowerCase() === 'elephant' ? elephantIcon :
                  animal.species.toLowerCase() === 'lion' ? lionIcon :
                    animal.species.toLowerCase() === 'rhino' ? rhinoIcon :
                      animal.species.toLowerCase() === 'leopard' ? leopardIcon :
                        giraffeIcon // Default for giraffe and others
              } alt="animal" className="animal-image" />
              <span className="entry-number">{animal.id}</span>
              <span className="animal-name">{animal.name}</span>
              <span className="animal-day-time">
                <div className="animal-date">{animal.date}</div>
                <div className="animal-time">{animal.time}</div>
              </span>
              <button className="locate-icon">
                <img src={locationIcon} alt="locationIcon" className="layer-icon" />
              </button>
            </div>
          ))}
        </div>

      </div>

      <div id="remote-control-menu" className={`remote-control-menu ${isRemoteControlMenuVisible ? 'show' : 'hide'}`}>
        <div className="remote-control-header">
          <span className="plus-sign">+</span>
          <span className="remote-control-title">Remote Control Tag</span>
          <span className="close-sign" onClick={toggleReportMenu}>x</span>
        </div>
        <div className="remote-control-filters">
          <input type="text" placeholder="Search..." className="search-bar" />
          <button className="filter-btn">Filters</button>
          <button className="date-btn">Dates</button>
          <button className="date-updated-btn">Date Updated</button>
        </div>
        <div className="remote-control-summary">
          <span>{reportData.length} results from about <b>{/* time logic here */} ago until now</b></span>
        </div>
        <div className="remote-control-list">
          {animalData.map((animal) => (
            <div key={animal.id} className="animal-item">
              <img src={
                animal.species.toLowerCase() === 'elephant' ? elephantIcon :
                  animal.species.toLowerCase() === 'lion' ? lionIcon :
                    animal.species.toLowerCase() === 'rhino' ? rhinoIcon :
                      animal.species.toLowerCase() === 'leopard' ? leopardIcon :
                        giraffeIcon // Default for giraffe and others
              } alt="animal" className="animal-image" />

              <span className="entry-number">{animal.id}</span>
              <span className="animal-name">{animal.name}</span>

              {/* Added text box for upload interval */}
              <span className="animal-upload-interval">
                <input
                  type="number"
                  value={animal.upload_interval}
                  placeholder="Enter Interval"
                  className='interval-input'
                  onChange={(e) => handleIntervalChange(e, animal.id, animal.species)}
                />

              </span>


              <span className="animal-day-time">
                <div className="animal-date">{animal.date}</div>
                <div className="animal-time">{animal.time}</div>
              </span>

              <button className="locate-icon">
                <img src={locationIcon} alt="locationIcon" className="layer-icon" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <ReportModal report={selectedReport} onClose={closeModal} />
      )}


    </div>
  );
}

```


## Directory: pages\RealtimeContents


### File: pages\RealtimeContents\Animals.js
```
import React, { useEffect, useState } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { ref, onValue } from 'firebase/database';
import { Icon } from 'leaflet';
import elephantIcon from '../../assets/elephant.png';
import lionIcon from '../../assets/lion.png';
import giraffeIcon from '../../assets/giraffe.png';
import rhinoIcon from '../../assets/rhino.png';
import leopardIcon from '../../assets/leopard.png';
import { database } from '../../firebase'; // Adjusted path
import '../../styles/RealTime.css';

export default function Animals({ isVisible, toggleAnimalMenu }) {
  const [animalData, setAnimalData] = useState([]);

  useEffect(() => {
    if (!isVisible) return;

    const animalSpecies = ['Elephants', 'Giraffes', 'Lions', 'Leopards', 'Rhinos'];
    const fetchedData = [];

    animalSpecies.forEach((species) => {
      const animalsRef = ref(database, `Animals/${species}`);
      onValue(animalsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const animalArray = Object.keys(data).map((key) => {
            const animal = data[key];
            const latestTimestamp = Object.keys(animal.location).sort().pop();
            const latestTime = Object.keys(animal.location[latestTimestamp]).sort().pop();
            const location = animal.location[latestTimestamp][latestTime];
            const temp = location.temperature || 'N/A';
            const activity = location.activity || 'N/A';

            return {
              ...animal,
              id: key,
              species: species.slice(0, -1),
              location: { Lat: parseFloat(location.Lat), Lng: parseFloat(location.Long) },
              date: latestTimestamp,
              time: latestTime,
              temp,
              activity,
            };
          });
          fetchedData.push(...animalArray);
          setAnimalData(fetchedData);
        }
      }, (error) => console.error('Error fetching animal data:', error));
    });
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {animalData.map(animal => {
        const speciesIcon = new Icon({
          iconUrl: animal.species.toLowerCase() === 'elephant' ? elephantIcon :
                    animal.species.toLowerCase() === 'lion' ? lionIcon :
                    animal.species.toLowerCase() === 'giraffe' ? giraffeIcon :
                    animal.species.toLowerCase() === 'rhino' ? rhinoIcon :
                    leopardIcon,
          iconSize: [38, 38]
        });

        return (
          <Marker key={animal.id} position={[animal.location.Lat, animal.location.Lng]} icon={speciesIcon}>
            <Popup>
              <div style={{ padding: '0px', borderRadius: '1px' }}>
                <strong>{animal.name}</strong><br />
                Sex: {animal.sex}<br />
                Age: {animal.age} years<br />
                Temp: {animal.temp} °C<br /> 
                Activity: {animal.activity}
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}

```


### File: pages\RealtimeContents\Layers.js
```
import React from 'react';
import outdoorsIcon from '../../assets/outdoors.png';
import lightIcon from '../../assets/light.png';
import darkIcon from '../../assets/dark.png';
import satelliteIcon from '../../assets/satellite.png';
import threeDIcon from '../../assets/3d.png';
import heatmapIcon from '../../assets/heatmap.png';
import '../../styles/RealTime.css';

export default function Layers({ isVisible, handleLayerChange }) {
  if (!isVisible) return null;

  return (
    <div id="layer-menu" className={`layer-menu ${isVisible ? 'show' : 'hide'}`}>
      <button className="btn" onClick={() => handleLayerChange('mapbox/outdoors-v11')}>
        <img src={outdoorsIcon} alt="Outdoors" className="layer-icon" />
        Outdoors
      </button>
      <button className="btn" onClick={() => handleLayerChange('mapbox/light-v10')}>
        <img src={lightIcon} alt="Light" className="layer-icon" />
        Light
      </button>
      <button className="btn" onClick={() => handleLayerChange('mapbox/dark-v10')}>
        <img src={darkIcon} alt="Dark" className="layer-icon" />
        Dark
      </button>
      <button className="btn" onClick={() => handleLayerChange('mapbox/satellite-v9')}>
        <img src={satelliteIcon} alt="Satellite" className="layer-icon" />
        Satellite
      </button>
      <button className="btn" onClick={() => handleLayerChange('elisakikota/clzjmuy7i00jx01r37jx58xy9')}>
        <img src={threeDIcon} alt="3D View" className="layer-icon" />
        3D View
      </button>
      <button className="btn" onClick={() => handleLayerChange('elisakikota/clzjjqpdi00jo01r37ot6asfi')}>
        <img src={heatmapIcon} alt="HeatMap" className="layer-icon" />
        HeatMap
      </button>
    </div>
  );
}

```


### File: pages\RealtimeContents\Map.js
```
import { ref, onValue } from 'firebase/database';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { Icon } from "leaflet";
import React, { useEffect, useState } from 'react';

import { database } from '../../firebase';  // Import the database

import elephantIcon from '../../assets/elephant.png';
import lionIcon from '../../assets/lion.png';
import giraffeIcon from '../../assets/giraffe.png';
import rhinoIcon from '../../assets/rhino.png';
import leopardIcon from '../../assets/leopard.png';
import animalIcon from '../../assets/animal.png'; // Fallback icon

const Map = () => {
  const [animalData, setAnimalData] = useState([]); // Define local state

  useEffect(() => {
    const animalSpecies = ['Elephants', 'Giraffes', 'Lions', 'Leopards', 'Rhinos'];
    const fetchedData = [];
  
    animalSpecies.forEach((species) => {
      const animalsRef = ref(database, `Animals/${species}`);  // Use the imported database
      onValue(animalsRef, (snapshot) => {
        const data = snapshot.val();
        const animalArray = Object.keys(data).map((key) => {
          const animal = data[key];
          const latestTimestamp = Object.keys(animal.location).sort().pop();
          const latestTime = Object.keys(animal.location[latestTimestamp]).sort().pop();
          const location = animal.location[latestTimestamp][latestTime];
  
          const temp = location.temperature || 'N/A';
          const activity = location.activity || 'N/A';
  
          return {
            ...animal,
            id: key,
            species: species.slice(0, -1),
            location: {
              Lat: parseFloat(location.Lat),
              Lng: parseFloat(location.Long),
            },
            date: latestTimestamp,
            time: latestTime,
            temp: temp, 
            activity: activity, 
          };
        });
        fetchedData.push(...animalArray);
        setAnimalData(fetchedData);
      }, (error) => {
        console.error('Error fetching animal data:', error);
      });
    });
  }, []);

  return (
    <MapContainer className="map" center={[-1.948, 34.1665]} zoom={16}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MarkerClusterGroup chunkedLoading>
        {animalData.map(animal => {
          const speciesIcon = new Icon({
            iconUrl: 
              animal.species.toLowerCase() === 'elephant' ? elephantIcon :
              animal.species.toLowerCase() === 'lion' ? lionIcon :
              animal.species.toLowerCase() === 'giraffe' ? giraffeIcon :
              animal.species.toLowerCase() === 'rhino' ? rhinoIcon :
              animal.species.toLowerCase() === 'leopard' ? leopardIcon :
              animalIcon, 
            iconSize: [38, 38]
          });

          return (
            <Marker 
              key={animal.id}
              position={[animal.location.Lat, animal.location.Lng]} 
              icon={speciesIcon}
            >
              <Popup>
                <div style={{ padding: '0px', borderRadius: '1px' }}>
                  <strong>{animal.name}</strong><br />
                  Sex: {animal.sex}<br />
                  Age: {animal.age} years<br />
                  Temp: {animal.temp} °C<br /> 
                  Activity: {animal.activity}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default Map;

```


### File: pages\RealtimeContents\Patrols.js
```
import React from 'react';
import patrolsIcon from '../../assets/patrols.png';
import locationIcon from '../../assets/location.png';
import '../../styles/RealTime.css';

export default function Patrols({ isVisible, togglePatrolMenu }) {
  if (!isVisible) return null;

  return (
    <div id="patrol-menu" className={`patrol-menu ${isVisible ? 'show' : 'hide'}`}>
      <div className="patrol-header">
        <span className="plus-sign">+</span>
        <span className="report-title">Patrol Officers</span>
        <span className="close-sign" onClick={togglePatrolMenu}>x</span>
      </div>
      <div className="patrol-filters">
        <input type="text" placeholder="Search..." className="search-bar" />
        <button className="filter-btn">Filters</button>
        <button className="date-btn">Dates</button>
        <button className="date-updated-btn">Date Updated</button>
      </div>
      <div className="patrol-summary">
        <span>1 result from about <b>{/* time logic here */} ago until now</b></span>
      </div>
      <div className="patrol-list">
        <div className="patrol-item">
          <img src={patrolsIcon} alt="patrol" className="patrol-image" />
          <span className="entry-number">1</span>
          <span className="report-name">Elisa Kikota</span>
          <span className="report-day-time">
            <div className="patrol-date">9th Aug 2024</div>
            <div className="patrol-time">12:30 PM</div>
          </span>
          <button className="locate-icon"><img src={locationIcon} alt="locationIcon" className="layer-icon" /></button>
        </div>
        {/* Repeat for other patrol officers */}
      </div>
    </div>
  );
}

```


### File: pages\RealtimeContents\RealTime.css
```
.realtime-container {
  /* display: flex; */
  position: relative;
  height: 100vh; /* Use full viewport height */
  overflow:hidden; /* Prevent scrolling */
  }

  #map {
    flex: 1;
    height: 100vh;
    z-index:0;
}

.map {
  flex: 1;
  width: 100vw-70px;
  height:100vw-64px;
  z-index:0;
  margin-left: 70px;
}

.fixed-sidebar {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 70px;
  height:100vh-64px;
  background-color: rgba(31, 118, 206, 0.6);
  padding: 10px 0;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  /* z-index:1; */
}

.sidebar-button {
  background: none;
  border: none;
  color: white;
  text-align: center;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
}

.sidebar-button .sidebar-icon {
  display: block;
  width: 35px;
  height: 35px;
  margin-bottom: 5px;
}
.btn{
  display: flex;
  align-items: center;
  gap:5px;
}
.layer-menu {
  display: none;
  width: 110px;
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 10px;
  left: 80px;
  padding: 10px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content:space-around; /* Center items vertically */
  align-items: flex-start; /* Align items to the start horizontally */
  gap: 4px;
}

.layer-menu.img {
padding-right: 10px;
}

.layer-menu.show {
  display:block;
  animation: fadeIn 0.3s forwards;
}

.layer-menu.hide {
  animation: fadeOut 0.3s forwards;
}

.layer-menu button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 5px 10px;
}

.layer-icon {
  width: 30px;
  height: 30px;
  margin-right: 1px;
}


@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}




.report-menu {
  display: none;
  position: absolute;
  top: 10px;
  left: 80px;
  /* bottom: 0px; */
  width: 390px;
  background-color: #FDFDFD;
  padding: 0px;
  border-radius: 20px;
  color: rgb(0, 0, 0);
  z-index: 10;
  border-top-left-radius:20px;
  border-top-right-radius:20px;
}

.patrol-menu {
  display: none;
  position: absolute;
  top: 10px;
  left: 80px;
  /* bottom: 0px; */
  width: 390px;
  background-color: #FDFDFD;
  padding: 0px;
  border-radius: 20px;
  color: rgb(0, 0, 0);
  z-index: 10;
  border-top-left-radius:20px;
  border-top-right-radius:20px;
}

.animal-menu {
  display: none;
  position: absolute;
  top: 10px;
  left: 80px;
  /* bottom: 0px; */
  width: 390px;
  background-color: #FDFDFD;
  padding: 0px;
  border-radius: 20px;
  color: rgb(0, 0, 0);
  z-index: 10;
  border-top-left-radius:20px;
  border-top-right-radius:20px;
}

.remote-control-menu {
  display: none;
  position: absolute;
  top: 10px;
  left: 80px;
  /* bottom: 0px; */
  width: 400px;
  background-color: #FDFDFD;
  padding: 0px;
  border-radius: 20px;
  color: rgb(0, 0, 0);
  z-index: 10;
  border-top-left-radius:20px;
  border-top-right-radius:20px;
}

.report-menu.show {
  display: block;
}

.patrol-menu.show {
  display: block;
}

.animal-menu.show {
  display: block;
}

.remote-control-menu.show {
  display: block;
}

.report-header, .report-filters, .report-summary, .report-list {
  margin-bottom: 15px;
}

.patrol-header, .patrol-filters, .patrol-summary, .report-list {
  margin-bottom: 15px;
}

.animal-header, .animal-filters, .animal-summary, .animal-list {
  margin-bottom: 15px;
}

.remote-control-header, .remote-control-filters, .remote-control-summary, .remote-control-list {
  margin-bottom: 15px;
}

.report-time{
  align-items: center;
}
.report-header {
  color: rgb(255, 255, 255);
  background-color: #1F76CE;
  display: flex;
  padding:8px;
  justify-content: space-between;
  align-items: center;
  border-top-left-radius:20px;
  border-top-right-radius:20px;
}

.patrol-header {
  color: rgb(255, 255, 255);
  background-color: #1F76CE;
  display: flex;
  padding:8px;
  justify-content: space-between;
  align-items: center;
  border-top-left-radius:20px;
  border-top-right-radius:20px;
}

.animal-header {
  color: rgb(255, 255, 255);
  background-color: #1F76CE;
  display: flex;
  padding:8px;
  justify-content: space-between;
  align-items: center;
  border-top-left-radius:20px;
  border-top-right-radius:20px;
}

.remote-control-header {
  color: rgb(255, 255, 255);
  background-color: #1F76CE;
  display: flex;
  padding:8px;
  justify-content: space-between;
  align-items: center;
  border-top-left-radius:20px;
  border-top-right-radius:20px;
}

.plus-sign {
  font-size: 24px;
}

.report-title {
  flex: 1;
  text-align: center;
  font-size: 18px;
}

.patrol-title {
  flex: 1;
  text-align: center;
  font-size: 18px;
}

.animal-title {
  flex: 1;
  text-align: center;
  font-size: 18px;
}

.remote-control-title {
  flex: 1;
  text-align: center;
  font-size: 18px;
}

.close-sign {
  cursor: pointer;
}

.report-filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.patrol-filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.animal-filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.remote-control-filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-bar {
  width: 40%;
  padding: 5px;
  margin: 4px;
  /* border-radius: 8px; */
}

.filter-btn, .date-btn, .date-updated-btn {
  background-color: #F2F2F4;
  border: none;
  padding: 5px;
  margin: 4px;
  cursor: pointer;
  color: #000000
  
}

.report-summary {
  border-top: 1px solid #61666b62;
  padding: 10px;
  padding-bottom: 0px;
  font-size: 14px;
}

.patrol-summary {
  border-top: 1px solid #61666b62;
  padding: 10px;
  padding-bottom: 0px;
  font-size: 14px;
}

.animal-summary {
  border-top: 1px solid #61666b62;
  padding: 10px;
  padding-bottom: 0px;
  font-size: 14px;
}

.remote-control-summary {
  border-top: 1px solid #61666b62;
  padding: 10px;
  padding-bottom: 0px;
  font-size: 14px;
}

.report-list {
  /* max-height: 200px; */
  overflow-y: auto;
}

.patrol-list {
  /* max-height: 200px; */
  overflow-y: auto;
}

.animal-list {
  /* max-height: 200px; */
  overflow-y: auto;
}

.remote-control-list {
  /* max-height: 200px; */
  overflow-y: auto;
}

.report-item {
  background-color: #1f76ce41;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.patrol-item {
  background-color: #1f76ce41;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.animal-item {
  /* top:100; */
  background-color: #1f76ce41;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.remote-control-item {
  /* top:100; */
  background-color: #1f76ce41;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.report-image {
  background-color: #1F76CE;
  width: 30px;
  height: 30px;
  padding:8px;
  margin-right: 10px;
}

.patrol-image {
  background-color: #1F76CE;
  width: 30px;
  height: 30px;
  padding:8px;
  margin-right: 10px;
}

.animal-image {
  background-color: #1F76CE;
  width: 30px;
  height: 30px;
  padding:8px;
  margin-right: 10px;
}

.remote-control-image {
  background-color: #1F76CE;
  width: 30px;
  height: 30px;
  padding:8px;
  margin-right: 10px;
}

.entry-number{
  /* margin-right: 10px; */
  width:15%;
  /* background-color: #CACCCE; */
}

.report-name{
  /* margin-right: 10px; */
  width:50%;
  /* background-color: #CACCCE; */
}

.patrol-name{
  /* margin-right: 10px; */
  width:50%;
  /* background-color: #CACCCE; */
}

.animal-name{
  /* margin-right: 10px; */
  width:50%;
  /* background-color: #CACCCE; */
}

.remote-control-name{
  /* margin-right: 10px; */
  width:50%;
  /* background-color: #CACCCE; */
}

.report-day-time {
  align-items: center;
  width:20%;
  font-size: 11px;
  /* margin-right: 10px; */
  /* background-color: #CACCCE; */
}

.patrol-day-time {
  align-items: center;
  width:20%;
  font-size: 11px;
  /* margin-right: 10px; */
  /* background-color: #CACCCE; */
}

.animal-day-time {
  align-items: center;
  width:20%;
  font-size: 11px;
  /* margin-right: 10px; */
  /* background-color: #CACCCE; */
}

.remote-control-day-time {
  align-items: center;
  width:20%;
  font-size: 11px;
  /* margin-right: 10px; */
  /* background-color: #CACCCE; */
}

.locate-icon {
  cursor: pointer;
  background: none;
  border: none;
  color: rgb(255, 255, 255);
}

.leaflet-container{
  height:100vh;
}

.leaflet-bottom.leaflet-right{
  height:0;
}

.leaflet-left{
  /* left:0; */
  right:10;
}

.leaflet-control-zoom.leaflet-bar.leaflet-control{
  /* margin-left:0; */
  right:10;
}

/* sizing of map container*/
.leaflet-container{
  height:100vh;
}

.cluster-icon{
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
  background-color: white;
  transform: translate(-25%,-25%);
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 900;
  font-size: 1.5rem;
}

.modal {
  display: block;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  margin-left:480px;
  margin-top:74px;
  background-color: #fefefe;
  /* margin: 15% auto; */
  padding: 20px;
  border: 1px solid #888;
  width:fit-content;
  border-radius: 20px;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.attached-image {
  width: 100px;
  margin-right: 10px;
}

.interval-input {
  width: 34px;
  margin-left: 0px;
  margin-right:10px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

```


### File: pages\RealtimeContents\RealTime.js
```
import '../styles/RealTime.css';
import "leaflet/dist/leaflet.css"

import React, { useEffect, useState } from 'react';
import { ref, update, onValue } from 'firebase/database';
import { database } from '../firebase'; // Adjust the path if needed

import ReportMenu from './ReportMenu';  // Adjust the path as needed


// import ctIcon from '../assets/CT_Icon_Sighting.png';

import reportsIcon from '../assets/reports.png';
import patrolsIcon from '../assets/patrols.png';
import layersIcon from '../assets/layers.png';
import animalIcon from '../assets/animal.png';
import remoteControlIcon from '../assets/Remote Control Tag.png'

import outdoorsIcon from '../assets/outdoors.png';
import lightIcon from '../assets/light.png';
import darkIcon from '../assets/dark.png';
import satelliteIcon from '../assets/satellite.png';
import threeDIcon from '../assets/3d.png';
import heatmapIcon from '../assets/heatmap.png';
import locationIcon from '../assets/location.png'

import CTIcon from '../assets/CT_Icon_Sighting.png';
import fireIcon from '../assets/Fire.png';
import humanWildlifeIcon from '../assets/Human_Wildlife_Contact.png';
import injuredAnimalIcon from '../assets/Injured_Animal.png';
import invasiveSpeciesIcon from '../assets/Invasive_Species_Sighting.png';
import rainfallIcon from '../assets/Rainfall.png';
import rhinoSightingIcon from '../assets/Rhino_Sighting.png';
import wildlifeSightingIcon from '../assets/Wildlife_Sighting.png';

import elephantIcon from '../assets/elephant.png'
import lionIcon from '../assets/lion.png';
import giraffeIcon from '../assets/giraffe.png';
import rhinoIcon from '../assets/rhino.png';
import leopardIcon from '../assets/leopard.png';

import { Icon } from "leaflet";
import MarkerClusterGroup from 'react-leaflet-cluster';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';

export default function RealTime() {
  const [animalData, setAnimalData] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [map] = useState(null);
  const [isLayerMenuVisible, setIsLayerMenuVisible] = useState(false);
  const [isReportMenuVisible, setIsReportMenuVisible] = useState(false);
  const [isPatrolMenuVisible, setIsPatrolMenuVisible] = useState(false);
  const [isAnimalMenuVisible, setIsAnimalMenuVisible] = useState(false);
  const [isRemoteControlMenuVisible, setIsRemoteControlMenuVisible] = useState(false);

  const [selectedReport, setSelectedReport] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    const animalSpecies = ['Elephants', 'Giraffes', 'Lions', 'Leopards', 'Rhinos'];

    animalSpecies.forEach((species) => {
      const animalsRef = ref(database, `Animals/${species}`);
      onValue(animalsRef, (snapshot) => {
        const data = snapshot.val();
        const animalArray = Object.keys(data).map((key) => {
          const animal = data[key];
          const latestTimestamp = Object.keys(animal.location).sort().pop();
          const latestTime = Object.keys(animal.location[latestTimestamp]).sort().pop();
          const location = animal.location[latestTimestamp][latestTime];

          return {
            ...animal,
            id: key,
            species: species.slice(0, -1),
            location: {
              Lat: parseFloat(location.Lat),
              Lng: parseFloat(location.Long),
            },
            upload_interval: parseInt(animal.upload_interval) || 0, // Parse as integer, default to 0
            date: latestTimestamp,
            time: latestTime,
          };
        });

        setAnimalData(prevData => {
          const updatedData = [...prevData];
          animalArray.forEach(newAnimal => {
            const index = updatedData.findIndex(animal => animal.id === newAnimal.id);
            if (index !== -1) {
              updatedData[index] = newAnimal;
            } else {
              updatedData.push(newAnimal);
            }
          });
          return updatedData;
        });
      }, (error) => {
        console.error('Error fetching animal data:', error);
      });
    });
  }, []);

  useEffect(() => {
    const reportCategories = [
      'CT_Icon_Sighting',
      'Fire',
      'Human_Wildlife_Contact',
      'Injured_Animal',
      'Invasive_Species_Sighting',
      'Rainfall',
      'Rhino_Sighting',
      'Wildlife_Sighting'
    ];
    const fetchedReports = [];

    reportCategories.forEach((category) => {
      const reportsRef = ref(database, `Reports/${category}`);
      onValue(reportsRef, (snapshot) => {
        const data = snapshot.val();
        const reportArray = Object.keys(data).map((key) => {
          const report = data[key];
          return {
            ...report,
            id: key,
            category,

            location: {
              Lat: parseFloat(report.location.Lat),
              Lng: parseFloat(report.location.Long),
            },
            timestamp: report.timestamp
          };
        });
        fetchedReports.push(...reportArray);
        setReportData(fetchedReports);
      }, (error) => {
        console.error('Error fetching report data:', error);
      });
    });
  }, []);

  const handleLayerChange = (style) => {
    if (map) {
      map.setStyle(`mapbox://styles/${style}`);
    }
  };

  const toggleReportMenu = () => {
    setIsReportMenuVisible(!isReportMenuVisible);
    setIsLayerMenuVisible(false);
    setIsPatrolMenuVisible(false);
    setIsAnimalMenuVisible(false);
    setIsRemoteControlMenuVisible(false);
  };

  const togglePatrolMenu = () => {
    setIsReportMenuVisible(false);
    setIsPatrolMenuVisible(!isPatrolMenuVisible);
    setIsLayerMenuVisible(false);
    setIsAnimalMenuVisible(false);
    setIsRemoteControlMenuVisible(false);
  };

  const toggleLayerMenu = () => {
    setIsReportMenuVisible(false);
    setIsPatrolMenuVisible(false);
    setIsLayerMenuVisible(!isLayerMenuVisible);
    setIsAnimalMenuVisible(false);
    setIsRemoteControlMenuVisible(false);
  };

  const toggleAnimalMenu = () => {
    setIsReportMenuVisible(false);
    setIsPatrolMenuVisible(false);
    setIsLayerMenuVisible(false);
    setIsAnimalMenuVisible(!isAnimalMenuVisible);
    setIsRemoteControlMenuVisible(false);
  };

  const toggleRemoteControlMenu = () => {
    setIsReportMenuVisible(false);
    setIsPatrolMenuVisible(false);
    setIsLayerMenuVisible(false);
    setIsAnimalMenuVisible(false);
    setIsRemoteControlMenuVisible(!isRemoteControlMenuVisible);
  };

  const openModal = (report) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedReport(null);
    setIsModalOpen(false);
  };

  const ReportModal = ({ report, onClose }) => {
    if (!report) return null;

    return (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={onClose}>&times;</span>
          <h2>{report.category.replace(/_/g, ' ')}</h2>
          <p><strong>Reported by:</strong> {report.reported_by}</p>
          <p><strong>Report Time:</strong> {report.time}</p>
          <p><strong>Location:</strong> Lat: {report.location.Lat}, Long: {report.location.Long}</p>
          {report.species && <p><strong>Species:</strong> {report.species}</p>}
          {report.cause_of_injury && <p><strong>Cause of Injury:</strong> {report.cause_of_injury}</p>}
          {report.cause_of_fire && <p><strong>Fire Cause:</strong> {report.cause_of_fire}</p>}
          <p><strong>Action Taken:</strong> {report.action_taken}</p>
          <p><strong>Notes:</strong> {report.notes}</p>
          {report.pictures && (
            <div>
              <h3>Attached Images</h3>
              {report.pictures.map((img, index) => (
                <img key={index} src={img} alt="Attached" className="attached-image" />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const handleIntervalChange = (e, animalId, species) => {
    const newIntervalString = e.target.value;
    const newInterval = newIntervalString === '' ? 0 : parseInt(newIntervalString, 10);

    if (isNaN(newInterval)) {
      console.error('Invalid input: Not a number');
      return; // Exit the function if input is not a valid number
    }

    // Update local state immediately to reflect in the input field
    setAnimalData(prevData =>
      prevData.map(animal =>
        animal.id === animalId
          ? { ...animal, upload_interval: newInterval }
          : animal
      )
    );

    // Clear the previous timeout to prevent multiple updates
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Set a new timeout to update Firebase after a short delay
    const timeoutId = setTimeout(() => {
      const pluralSpecies = species === 'Elephant' ? 'Elephants' :
        species === 'Lion' ? 'Lions' :
          species === 'Giraffe' ? 'Giraffes' :
            species === 'Rhino' ? 'Rhinos' :
              species === 'Leopard' ? 'Leopards' : species;

      // Update Firebase after the delay
      const animalRef = ref(database, `Animals/${pluralSpecies}/${animalId}`);
      update(animalRef, {
        upload_interval: newInterval
      })
        .then(() => {
          console.log("Upload interval updated successfully in Firebase");
        })
        .catch((error) => {
          console.error("Error updating upload interval in Firebase:", error);
          // Revert local state if Firebase update fails
          setAnimalData(prevData =>
            prevData.map(animal =>
              animal.id === animalId
                ? { ...animal, upload_interval: animal.upload_interval }
                : animal
            )
          );
        });
    }, 1000); // Update Firebase after 1 second delay

    setTypingTimeout(timeoutId); // Store the timeout ID
  };

  return (
    <div className="realtime-container">
      <div className="fixed-sidebar">
        <button className="sidebar-button" onClick={toggleReportMenu}>
          <img src={reportsIcon} alt="Reports" className="sidebar-icon" />
          <span>Reports</span>
        </button>
        <button className="sidebar-button" onClick={togglePatrolMenu}>
          <img src={patrolsIcon} alt="Patrols" className="sidebar-icon" />
          <span>Patrols</span>
        </button>
        <button className="sidebar-button" onClick={toggleLayerMenu}>
          <img src={layersIcon} alt="Layers" className="sidebar-icon" />
          <span>Layers</span>
        </button>
        <button className="sidebar-button" onClick={toggleAnimalMenu}>
          <img src={animalIcon} alt="Animals" className="sidebar-icon" />
          <span>Animals</span>
        </button>
        <button className="sidebar-button" onClick={toggleRemoteControlMenu}>
          <img src={remoteControlIcon} alt="Remote Control" className="sidebar-icon" />
          <span>Remote<br></br>Control</span>
        </button>
      </div>

      <MapContainer className="map" center={[-1.948, 34.1665]} zoom={16} zoomControl={false}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MarkerClusterGroup chunkedLoading>
          {reportData.map(report => {
            const reportIcon = new Icon({
              iconUrl:
                report.category === 'CT_Icon_Sighting' ? CTIcon :
                  report.category === 'Fire' ? fireIcon :
                    report.category === 'Human_Wildlife_Contact' ? humanWildlifeIcon :
                      report.category === 'Injured_Animal' ? injuredAnimalIcon :
                        report.category === 'Invasive_Species_Sighting' ? invasiveSpeciesIcon :
                          report.category === 'Rainfall' ? rainfallIcon :
                            report.category === 'Rhino_Sighting' ? rhinoSightingIcon :
                              wildlifeSightingIcon, // Default icon
              iconSize: [38, 38]
            });

            return (
              <Marker
                key={report.id}
                position={[report.location.Lat, report.location.Lng]}
                icon={reportIcon}
              >
                <Popup>
                  <div style={{ padding: '0px', borderRadius: '1px' }}>
                    <strong>{report.category.replace(/_/g, ' ')}</strong><br />
                    Location: {report.location.Lat}, {report.location.Long}<br />
                    Timestamp: {report.timestamp}
                  </div>
                </Popup>
              </Marker>
            );
          })}

          {animalData.map(animal => {
            // Determine the icon based on species
            const speciesIcon = new Icon({
              iconUrl:
                animal.species.toLowerCase() === 'elephant' ? elephantIcon :
                  animal.species.toLowerCase() === 'lion' ? lionIcon :
                    animal.species.toLowerCase() === 'giraffe' ? giraffeIcon :
                      animal.species.toLowerCase() === 'rhino' ? rhinoIcon :
                        animal.species.toLowerCase() === 'leopard' ? leopardIcon :
                          animalIcon, // Default icon for other species
              iconSize: [38, 38] // Adjust size as needed
            });

            return (
              <Marker
                key={animal.id} // Ensure each marker has a unique key
                position={[animal.location.Lat, animal.location.Lng]}
                icon={speciesIcon} // Use species-specific icon
              >
                <Popup>
                  <div style={{ padding: '0px', borderRadius: '1px' }}>
                    <strong>{animal.name}</strong><br />
                    Sex: {animal.sex}<br />
                    Age: {animal.age} years<br />
                    Temp: {animal.temp} °C<br />
                    Activity: {animal.activity}
                  </div>
                </Popup>

              </Marker>
            );
          })}
        </MarkerClusterGroup>
        <ZoomControl position="bottomright" />
      </MapContainer>

      <div id="layer-menu" className={`layer-menu ${isLayerMenuVisible ? 'show' : 'hide'}`}>
        <button className="btn" onClick={() => handleLayerChange('mapbox/outdoors-v11')}>
          <img src={outdoorsIcon} alt="Outdoors" className="layer-icon" />
          Outdoors
        </button>
        <button className="btn" onClick={() => handleLayerChange('mapbox/light-v10')}>
          <img src={lightIcon} alt="Light" className="layer-icon" />
          Light
        </button>
        <button className="btn" onClick={() => handleLayerChange('mapbox/dark-v10')}>
          <img src={darkIcon} alt="Dark" className="layer-icon" />
          Dark
        </button>
        <button className="btn" onClick={() => handleLayerChange('mapbox/satellite-v9')}>
          <img src={satelliteIcon} alt="Satellite" className="layer-icon" />
          Satellite
        </button>
        <button className="btn" onClick={() => handleLayerChange('elisakikota/clzjmuy7i00jx01r37jx58xy9')}>
          <img src={threeDIcon} alt="3D" className="layer-icon" />
          3D
        </button>
        <button className="btn" onClick={() => handleLayerChange('mapbox/heatmap-v10')}>
          <img src={heatmapIcon} alt="Heatmap" className="layer-icon" />
          Heatmap
        </button>
      </div>

      <ReportMenu
        isReportMenuVisible={isReportMenuVisible}
        toggleReportMenu={toggleReportMenu}
        reportData={reportData}
        openModal={openModal}
      />

      <div id="patrol-menu" className={`patrol-menu ${isPatrolMenuVisible ? 'show' : 'hide'}`}>
        <div className="patrol-header">
          <span className="plus-sign">+</span>
          <span className="report-title">Patrol Officers</span>
          <span className="close-sign" onClick={togglePatrolMenu}>x</span>
        </div>
        <div className="patrol-filters">
          <input type="text" placeholder="Search..." className="search-bar" />
          <button className="filter-btn">Filters</button>
          <button className="date-btn">Dates</button>
          <button className="date-updated-btn">Date Updated</button>
        </div>
        <div className="patrol-summary">
          <span>1 results from about <b> {/* time logic here */} ago until now</b></span>
        </div>
        <div className="patrol-list">
          {/* Replace with dynamic data */}
          <div className="patrol-item">
            <img src={patrolsIcon} alt="patrol" className="patrol-image" />
            <span className="entry-number">1</span>
            <span className="report-name">Elisa Kikota</span>
            <span className="report-day-time">
              <div classname="patrol-date">9th Aug 2024</div>
              <div classname="patrol-time">12:30 PM</div>
            </span>
            <button className="locate-icon">{<img src={locationIcon} alt="locationIcon" className="layer-icon" />}</button>
          </div>
          {/* Repeat for other reports */}
        </div>
      </div>

      <div id="animal-menu" className={`animal-menu ${isAnimalMenuVisible ? 'show' : 'hide'}`}>
        <div className="animal-header">
          <span className="plus-sign">+</span>
          <span className="animal-title">Animals</span>
          <span className="close-sign" onClick={() => setIsAnimalMenuVisible(false)}>x</span>
        </div>
        <div className="animal-filters">
          <input type="text" placeholder="Search..." className="search-bar" />
          <button className="filter-btn">Filters</button>
          <button className="date-btn">Dates</button>
          <button className="date-updated-btn">Date Updated</button>
        </div>
        <div className="animal-summary">
          <span>{animalData.length} results from about <b>{/* time logic here */} ago until now</b></span>
        </div>
        <div className="animal-list">
          {animalData.map((animal) => (
            <div key={animal.id} className="animal-item">
              <img src={
                animal.species.toLowerCase() === 'elephant' ? elephantIcon :
                  animal.species.toLowerCase() === 'lion' ? lionIcon :
                    animal.species.toLowerCase() === 'rhino' ? rhinoIcon :
                      animal.species.toLowerCase() === 'leopard' ? leopardIcon :
                        giraffeIcon // Default for giraffe and others
              } alt="animal" className="animal-image" />
              <span className="entry-number">{animal.id}</span>
              <span className="animal-name">{animal.name}</span>
              <span className="animal-day-time">
                <div className="animal-date">{animal.date}</div>
                <div className="animal-time">{animal.time}</div>
              </span>
              <button className="locate-icon">
                <img src={locationIcon} alt="locationIcon" className="layer-icon" />
              </button>
            </div>
          ))}
        </div>

      </div>

      <div id="remote-control-menu" className={`remote-control-menu ${isRemoteControlMenuVisible ? 'show' : 'hide'}`}>
        <div className="remote-control-header">
          <span className="plus-sign">+</span>
          <span className="remote-control-title">Remote Control Tag</span>
          <span className="close-sign" onClick={toggleReportMenu}>x</span>
        </div>
        <div className="remote-control-filters">
          <input type="text" placeholder="Search..." className="search-bar" />
          <button className="filter-btn">Filters</button>
          <button className="date-btn">Dates</button>
          <button className="date-updated-btn">Date Updated</button>
        </div>
        <div className="remote-control-summary">
          <span>{reportData.length} results from about <b>{/* time logic here */} ago until now</b></span>
        </div>
        <div className="remote-control-list">
          {animalData.map((animal) => (
            <div key={animal.id} className="animal-item">
              <img src={
                animal.species.toLowerCase() === 'elephant' ? elephantIcon :
                  animal.species.toLowerCase() === 'lion' ? lionIcon :
                    animal.species.toLowerCase() === 'rhino' ? rhinoIcon :
                      animal.species.toLowerCase() === 'leopard' ? leopardIcon :
                        giraffeIcon // Default for giraffe and others
              } alt="animal" className="animal-image" />

              <span className="entry-number">{animal.id}</span>
              <span className="animal-name">{animal.name}</span>

              {/* Added text box for upload interval */}
              <span className="animal-upload-interval">
                <input
                  type="number"
                  value={animal.upload_interval}
                  placeholder="Enter Interval"
                  className='interval-input'
                  onChange={(e) => handleIntervalChange(e, animal.id, animal.species)}
                />

              </span>


              <span className="animal-day-time">
                <div className="animal-date">{animal.date}</div>
                <div className="animal-time">{animal.time}</div>
              </span>

              <button className="locate-icon">
                <img src={locationIcon} alt="locationIcon" className="layer-icon" />
              </button>
            </div>
          ))}
        </div>
      </div>



      {isModalOpen && (
        <ReportModal report={selectedReport} onClose={closeModal} />
      )}


    </div>
  );
}

```


### File: pages\RealtimeContents\Reports.js
```
import React, { useState, useEffect } from 'react';
import reportsIcon from '../../assets/reports.png';
import locationIcon from '../../assets/location.png';
import '../../styles/RealTime.css';

export default function ReportMenu({ isVisible, toggleReportMenu, reportData, openModal }) {
  const [sortedReports, setSortedReports] = useState([]);
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    setSortedReports(reportData);
  }, [reportData]);

  const handleSort = (criteria) => {
    let sorted = [...sortedReports];
    if (criteria === 'dateUpdated') {
      sorted.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    }
    setSortedReports(sorted);
    setSortBy(criteria);
  };

  if (!isVisible) return null;

  return (
    <div id="report-menu" className={`report-menu ${isVisible ? 'show' : 'hide'}`}>
      <div className="report-header">
        <span className="plus-sign">+</span>
        <span className="report-title">Reports</span>
        <span className="close-sign" onClick={toggleReportMenu}>x</span>
      </div>
      <div className="report-filters">
        <input type="text" placeholder="Search..." className="search-bar" />
        <button className="filter-btn">Filters</button>
        <button className="date-btn">Dates</button>
        <button 
          className={`date-updated-btn ${sortBy === 'dateUpdated' ? 'active' : ''}`}
          onClick={() => handleSort('dateUpdated')}
        >
          Date Updated
        </button>
      </div>
      <div className="report-summary">
        <span>{sortedReports.length} results</span>
      </div>
      <div className="report-list">
        {sortedReports.map((report) => (
          <div key={report.id} className="report-item" onClick={() => openModal(report)}>
            <img src={reportsIcon} alt="Report" className="report-image" />
            <span className="entry-number">{report.id}</span>
            <span className="report-name">{report.category.replace(/_/g, ' ')}</span>
            <span className="report-day-time">
              <div className="report-date">{new Date(report.timestamp).toLocaleDateString()}</div>
              <div className="report-time">{new Date(report.timestamp)}</div>
            </span>
            <button className="locate-icon">
              <img src={locationIcon} alt="locationIcon" className="layer-icon" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
```


### File: pages\ReportMenu.js
```
import React, { useState, useMemo, useEffect } from 'react';
import '../styles/RealTime.css';
import { ChevronDown, ChevronUp } from 'lucide-react';

import FireIcon from '../assets/Fire.png'
import HumanWildlifeContactIcon from '../assets/Human_Wildlife_Contact.png'
import InjuredAnimalIcon from '../assets/Injured_Animal.png'
import InvasiveSpeciesIcon from '../assets/Invasive_Species_Sighting.png'
import RainfallIcon from '../assets/Rainfall.png'
import RhinoSightingIcon from '../assets/Rhino_Sighting.png'
import WildlifeSightingIcon from '../assets/Wildlife_Sighting.png'
import locationIcon from '../assets/location.png'
import CTIcon from '../assets/CT_Icon_Sighting.png';

const ReportMenu = ({ isReportMenuVisible, toggleReportMenu, reportData, openModal }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const [displayedReports, setDisplayedReports] = useState([]);

  const filteredAndSortedReports = useMemo(() => {
    return reportData
      .filter(report => 
        report.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.id.toString().includes(searchTerm)
      )
      .sort((a, b) => {
        const dateA = new Date(a.day);
        const dateB = new Date(b.day);
        return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
      });
  }, [reportData, searchTerm, sortOrder]);

  useEffect(() => {
    setDisplayedReports(filteredAndSortedReports.slice(0, 10));
  }, [filteredAndSortedReports]);

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc');
  };

  const loadMoreReports = () => {
    setDisplayedReports(prevReports => [
      ...prevReports,
      ...filteredAndSortedReports.slice(prevReports.length, prevReports.length + 10)
    ]);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    // Reset displayed reports when search term changes
    setDisplayedReports([]); 
  };

  return (
    <div id="report-menu" className={`report-menu ${isReportMenuVisible ? 'show' : 'hide'}`}>
      <div className="report-header">
        <span className="plus-sign">+</span>
        <span className="report-title">Reports</span>
        <span className="close-sign" onClick={toggleReportMenu}>x</span>
      </div>
      <div className="report-filters">
        <input 
          type="text" 
          placeholder="Search..." 
          className="search-bar" 
          value={searchTerm}
          onChange={handleSearch}
        />
        <button className="date-updated-btn" onClick={toggleSortOrder}>
          {sortOrder === 'desc' ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
          Date Updated
        </button>
      </div>
      <div className="report-summary">
        <span>{filteredAndSortedReports.length} results</span>
      </div>
      <div className="report-list">
        {displayedReports.map((report) => (
          <div
            key={report.id}
            className="report-item"
            onClick={() => openModal(report)}
          >
            <img src={getReportIcon(report.category)} alt="report" className="report-image" />
            <span className="entry-number">{report.id}</span>
            <span className="report-name">{report.category.replace(/_/g, ' ')}</span>
            <span className="report-day-time">
              <div className="report-date">{formatDate(report.day)}</div>
              <div className="report-time">{formatTime(report.time)}</div>
            </span>
            <button className="locate-icon">
              <img src={locationIcon} alt="locationIcon" className="layer-icon" />
            </button>
          </div>
        ))}
        {displayedReports.length < filteredAndSortedReports.length && (
          <button onClick={loadMoreReports} className="load-more-btn">Load More</button>
        )}
      </div>
    </div>
  );
};

const getReportIcon = (category) => {
  switch(category) {
    case 'CT_Icon_Sighting': return CTIcon;
    case 'Fire': return FireIcon;
    case 'Human_Wildlife_Contact': return HumanWildlifeContactIcon;
    case 'Injured_Animal': return InjuredAnimalIcon;
    case 'Invasive_Species_Sighting': return InvasiveSpeciesIcon;
    case 'Rainfall': return RainfallIcon;
    case 'Rhino_Sighting': return RhinoSightingIcon;
    default: return WildlifeSightingIcon;
  }
};

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
};

const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  return isNaN(date.getTime()) ? 'Invalid Time' : date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};

export default ReportMenu;
```


### File: pages\Signout.js
```
import React from 'react';

function Signout() {
  return <div>Signout Page</div>;
}

export default Signout;

```


### File: pages\ViewAnimals.js
```
import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TextField, Button, Box, Chip, IconButton, Dialog, DialogTitle, DialogContent, DialogActions,
  Select, MenuItem, FormControl, InputLabel, Grid
} from '@mui/material';
import { Search, Edit, Delete, Add, Map as MapIcon } from '@mui/icons-material';
import { ref, onValue, remove, update, set } from 'firebase/database';
import { database } from '../firebase'; // Adjust the import path as needed
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import PieChart from './PieChart'; // Adjust the import path as needed
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Import animal icons
import elephantIcon from '../assets/elephant.png';
import lionIcon from '../assets/lion.png';
import giraffeIcon from '../assets/giraffe.png';
import rhinoIcon from '../assets/rhino.png';
import leopardIcon from '../assets/leopard.png';

function ViewAnimals() {
  const [animals, setAnimals] = useState([]);
  const [filteredAnimals, setFilteredAnimals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [speciesFilter, setSpeciesFilter] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [animalStats, setAnimalStats] = useState({ total: 0, species: {} });
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    const animalsRef = ref(database, 'Animals');
    onValue(animalsRef, (snapshot) => {
      const data = snapshot.val();
      const animalList = data ? Object.entries(data).flatMap(([species, animals]) => 
        Object.entries(animals).map(([id, animal]) => ({
          id,
          species,
          ...animal,
          location: animal.location ? Object.values(animal.location).pop() : null
        }))
      ) : [];
      setAnimals(animalList);
      setFilteredAnimals(animalList);
      updateAnimalStats(animalList);
    });
  }, []);

  useEffect(() => {
    const filtered = animals.filter(animal => 
      animal.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (speciesFilter === '' || animal.species === speciesFilter)
    );
    setFilteredAnimals(filtered);
  }, [searchTerm, speciesFilter, animals]);

  const updateAnimalStats = (animalList) => {
    const stats = { total: animalList.length, species: {} };
    animalList.forEach(animal => {
      if (stats.species[animal.species]) {
        stats.species[animal.species]++;
      } else {
        stats.species[animal.species] = 1;
      }
    });
    setAnimalStats(stats);
  };

  const handleOpenDialog = (animal = null) => {
    setSelectedAnimal(animal);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedAnimal(null);
  };

  const handleSaveAnimal = (animalData) => {
    if (selectedAnimal) {
      update(ref(database, `Animals/${animalData.species}/${selectedAnimal.id}`), animalData);
    } else {
      // const newAnimalRef = ref(database, `Animals/${animalData.species}`);
      // const newAnimal = set(newAnimalRef, animalData);
    }
    handleCloseDialog();
  };

  const handleDeleteAnimal = (animalId, species) => {
    if (window.confirm('Are you sure you want to delete this animal?')) {
      remove(ref(database, `Animals/${species}/${animalId}`));
    }
  };

  const getAnimalIcon = (species) => {
    const iconUrl = species === 'Elephants' ? elephantIcon :
                    species === 'Lions' ? lionIcon :
                    species === 'Giraffes' ? giraffeIcon :
                    species === 'Rhinos' ? rhinoIcon :
                    species === 'Leopards' ? leopardIcon : null;
    
    return iconUrl ? new L.Icon({
      iconUrl,
      iconSize: [38, 38],
      iconAnchor: [19, 38],
      popupAnchor: [0, -38]
    }) : new L.Icon.Default();
  };

  const pieChartData = {
    labels: Object.keys(animalStats.species),
    datasets: [{
      data: Object.values(animalStats.species),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
    }]
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Animal Management
      </Typography>
      
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Box>
          <Chip label={`Total Animals: ${animalStats.total}`} color="primary" />
          {Object.entries(animalStats.species).map(([species, count]) => (
            <Chip key={species} label={`${species}: ${count}`} style={{ marginLeft: 8 }} />
          ))}
        </Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
        >
          Add New Animal
        </Button>
      </Box>

      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: 16, height: 300 }}>
            {animalStats.species && Object.keys(animalStats.species).length > 0 && (
              <PieChart data={animalStats.species} />
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: 16 }}>
            <Typography variant="h6">Last Known Locations</Typography>
            <Button startIcon={<MapIcon />} onClick={() => setShowMap(!showMap)}>
              {showMap ? 'Hide Map' : 'Show Map'}
            </Button>
            {showMap && (
              <MapContainer center={[-1.948, 34.1665]} zoom={8} style={{ height: '300px', marginTop: 16 }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {filteredAnimals.map(animal => (
                  animal.location && (
                    <Marker 
                      key={animal.id} 
                      position={[animal.location.Lat, animal.location.Lng]}
                      icon={getAnimalIcon(animal.species)}
                    >
                      <Popup>
                        <strong>{animal.name}</strong><br />
                        Species: {animal.species}<br />
                        Last seen: {new Date(animal.location.timestamp).toLocaleString()}
                      </Popup>
                    </Marker>
                  )
                ))}
              </MapContainer>
            )}
          </Paper>
        </Grid>
      </Grid>

      <Box display="flex" mb={3}>
        <TextField
          label="Search Animals"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <Search />
          }}
          style={{ marginRight: 16, flexGrow: 1 }}
        />
        <FormControl variant="outlined" style={{ minWidth: 120 }}>
          <InputLabel>Species</InputLabel>
          <Select
            value={speciesFilter}
            onChange={(e) => setSpeciesFilter(e.target.value)}
            label="Species"
          >
            <MenuItem value="">All</MenuItem>
            {Object.keys(animalStats.species).map(species => (
              <MenuItem key={species} value={species}>{species}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Species</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Sex</TableCell>
              <TableCell>Last Seen</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAnimals.map((animal) => (
              <TableRow key={animal.id}>
                <TableCell>{animal.name}</TableCell>
                <TableCell>{animal.species}</TableCell>
                <TableCell>{animal.age}</TableCell>
                <TableCell>{animal.sex}</TableCell>
                <TableCell>
                  {animal.location ? new Date(animal.location.timestamp).toLocaleString() : 'Unknown'}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenDialog(animal)}><Edit /></IconButton>
                  <IconButton onClick={() => handleDeleteAnimal(animal.id, animal.species)}><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AnimalDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onSave={handleSaveAnimal}
        animal={selectedAnimal}
      />
    </Container>
  );
}

function AnimalDialog({ open, onClose, onSave, animal }) {
  const [animalData, setAnimalData] = useState({
    name: '',
    species: '',
    age: '',
    sex: '',
    upload_interval: 60
  });

  useEffect(() => {
    if (animal) {
      setAnimalData(animal);
    } else {
      setAnimalData({
        name: '',
        species: '',
        age: '',
        sex: '',
        upload_interval: 60
      });
    }
  }, [animal]);

  const handleChange = (e) => {
    setAnimalData({ ...animalData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(animalData);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{animal ? 'Edit Animal' : 'Add New Animal'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Name"
          type="text"
          fullWidth
          value={animalData.name}
          onChange={handleChange}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel>Species</InputLabel>
          <Select
            name="species"
            value={animalData.species}
            onChange={handleChange}
          >
            <MenuItem value="Elephants">Elephants</MenuItem>
            <MenuItem value="Lions">Lions</MenuItem>
            <MenuItem value="Giraffes">Giraffes</MenuItem>
            <MenuItem value="Rhinos">Rhinos</MenuItem>
            <MenuItem value="Leopards">Leopards</MenuItem>
          </Select>
        </FormControl>
        <TextField
          margin="dense"
          name="age"
          label="Age"
          type="number"
          fullWidth
          value={animalData.age}
          onChange={handleChange}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel>Sex</InputLabel>
          <Select
            name="sex"
            value={animalData.sex}
            onChange={handleChange}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </Select>
        </FormControl>
        <TextField
          margin="dense"
          name="upload_interval"
          label="Upload Interval (minutes)"
          type="number"
          fullWidth
          value={animalData.upload_interval}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ViewAnimals;
```


### File: pages\ViewUsers.js
```
import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TextField, Button, Box, Chip, Avatar, IconButton, Dialog, DialogTitle, DialogContent, DialogActions,
  Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import { Search, Edit, Delete, Add } from '@mui/icons-material';
import { ref, onValue, remove, update, set, get } from 'firebase/database';
import { database } from '../firebase'; // Adjust the import path as needed

function ViewUsers() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userStats, setUserStats] = useState({ total: 0, active: 0, admins: 0 });

  useEffect(() => {
    const usersRef = ref(database, 'Users');
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      const userList = data ? Object.entries(data).map(([key, value]) => ({ id: key, ...value })) : [];
      setUsers(userList);
      setFilteredUsers(userList);
      updateUserStats(userList);
    });
  }, []);

  useEffect(() => {
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (roleFilter === '' || user.role === roleFilter)
    );
    setFilteredUsers(filtered);
  }, [searchTerm, roleFilter, users]);

  const updateUserStats = (userList) => {
    setUserStats({
      total: userList.length,
      active: userList.filter(user => user.status === 'active').length,
      admins: userList.filter(user => user.role === 'admin').length
    });
  };

  const handleOpenDialog = (user = null) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
  };

  const handleSaveUser = async (userData) => {
    if (selectedUser) {
      // Update existing user
      await update(ref(database, `Users/${selectedUser.id}`), userData);
    } else {
      // Add new user
      const nextIndex = await getNextUserIndex();
      await set(ref(database, `Users/${nextIndex}`), userData);
    }
    handleCloseDialog();
  };

  const getNextUserIndex = async () => {
    const usersRef = ref(database, 'Users');
    const snapshot = await get(usersRef);
    const data = snapshot.val();
    if (!data) return "1";
    const keys = Object.keys(data);
    const maxIndex = Math.max(...keys.map(Number));
    return (maxIndex + 1).toString();
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      await remove(ref(database, `Users/${userId}`));
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        User Management
      </Typography>

      <Box display="flex" justifyContent="space-between" mb={3}>
        <Box>
          <Chip label={`Total Users: ${userStats.total}`} color="primary" />
          <Chip label={`Active Users: ${userStats.active}`} color="success" style={{ marginLeft: 8 }} />
          <Chip label={`Admins: ${userStats.admins}`} color="secondary" style={{ marginLeft: 8 }} />
        </Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
        >
          Add New User
        </Button>
      </Box>

      <Box display="flex" mb={3}>
        <TextField
          label="Search Users"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <Search />
          }}
          style={{ marginRight: 16, flexGrow: 1 }}
        />
        <FormControl variant="outlined" style={{ minWidth: 120 }}>
          <InputLabel>Role</InputLabel>
          <Select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            label="Role"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="user">User</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Avatar src={user.avatar} alt={user.name} style={{ marginRight: 8 }} />
                    {user.name}
                  </Box>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Chip
                    label={user.status}
                    color={user.status === 'active' ? 'success' : 'default'}
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenDialog(user)}><Edit /></IconButton>
                  <IconButton onClick={() => handleDeleteUser(user.id)}><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <UserDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onSave={handleSaveUser}
        user={selectedUser}
      />
    </Container>
  );
}


function UserDialog({ open, onClose, onSave, user }) {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    role: 'user',
    status: 'active',
    avatar: ''
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(userData);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{user ? 'Edit User' : 'Add New User'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Name"
          type="text"
          fullWidth
          value={userData.name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="email"
          label="Email Address"
          type="email"
          fullWidth
          value={userData.email}
          onChange={handleChange}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel>Role</InputLabel>
          <Select
            name="role"
            value={userData.role}
            onChange={handleChange}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="user">User</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="dense">
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={userData.status}
            onChange={handleChange}
          >
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </Select>
        </FormControl>
        <TextField
          margin="dense"
          name="avatar"
          label="Avatar URL"
          type="text"
          fullWidth
          value={userData.avatar}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ViewUsers;
```


### File: pages\Welcome.js
```
import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, Grid, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase'; // Adjust the import path as needed
import backgroundImage from '../assets/background.jpg';


const Welcome = () => {
  const [stats, setStats] = useState({
    animalsTracked: 0,
    speciesCovered: 0,
    patrolOfficers: 0
  });

  useEffect(() => {
    const animalsRef = ref(database, 'Animals');
    const patrolOfficersRef = ref(database, 'PatrolOfficers');

    const fetchData = async () => {
      try {
        const animalsSnapshot = await new Promise((resolve, reject) => {
          onValue(animalsRef, resolve, reject);
        });

        const patrolOfficersSnapshot = await new Promise((resolve, reject) => {
          onValue(patrolOfficersRef, resolve, reject);
        });

        const animalsData = animalsSnapshot.val();
        const patrolOfficersData = patrolOfficersSnapshot.val();

        let totalAnimals = 0;
        const species = new Set();

        if (animalsData) {
          Object.keys(animalsData).forEach(speciesKey => {
            species.add(speciesKey);
            const speciesData = animalsData[speciesKey];
            totalAnimals += Object.keys(speciesData).length;
          });
        }

        const patrolOfficersCount = patrolOfficersData ? Object.keys(patrolOfficersData).length : 0;

        setStats({
          animalsTracked: totalAnimals,
          speciesCovered: species.size,
          patrolOfficers: patrolOfficersCount
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ 
      backgroundImage: `url(${backgroundImage})`, 
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      height: '100%', 
      color: 'white', 
      textAlign: 'center', 
      padding: '20px',
      overflowY: 'auto'
    }}>
      <Container maxWidth='lg' style={{ height: '100%' }}>
        <Box my={1}>
          <Typography variant="h2" component="h1" gutterBottom style={{ color: 'white' }}>
            Welcome to AI-Powered Animal Tracking System
          </Typography>
          <Typography variant="h5" component="p" gutterBottom style={{ color: 'white' }}>
            Efficient and reliable tracking of wildlife and domestic animals.
          </Typography>
          <Button variant="contained" color="primary" component={Link} to="/real_time" style={{ margin: '20px' }}>
            Start Tracking
          </Button>
          {/* <Button variant="outlined" color="secondary" component={Link} to="/learn_more">
            Learn More
          </Button> */}
        </Box>

        <Box my={4}>
          <Typography variant="h4" component="h2" gutterBottom style={{ color: 'white' }}>
            Statistics
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} style={{ padding: '20px', backgroundColor: 'rgba(0,0,0,0.7)' }}>
                <Typography variant="h2" component="p" style={{ color: 'white' }}>
                  {stats.animalsTracked.toLocaleString()}
                </Typography>
                <Typography component="p" style={{ color: 'white' }}>
                  Animals Tracked
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} style={{ padding: '20px', backgroundColor: 'rgba(0,0,0,0.7)' }}>
                <Typography variant="h2" component="p" style={{ color: 'white' }}>
                  {stats.speciesCovered.toLocaleString()}
                </Typography>
                <Typography component="p" style={{ color: 'white' }}>
                  Species Covered
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} style={{ padding: '20px', backgroundColor: 'rgba(0,0,0,0.7)' }}>
                <Typography variant="h2" component="p" style={{ color: 'white' }}>
                  {stats.patrolOfficers.toLocaleString()}
                </Typography>
                <Typography component="p" style={{ color: 'white' }}>
                  Patrol Officers
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>


        <Box my={4}>
          <Typography variant="h4" component="h2" gutterBottom style={{ color: 'white' }}>
            Success Stories
          </Typography>
          <Box display="flex" justifyContent="center">
            <Paper elevation={3} style={{ padding: '20px', width: '80%', backgroundColor: 'rgba(0,0,0,0.7)' }}>
              <Typography component="p" style={{ color: 'white' }}>
                "Using the Animal Tracking system has revolutionized how we monitor wildlife. The real-time data and analytics have been invaluable."
              </Typography>
              <Typography variant="h6" component="p" style={{ color: 'white' }}>
                - Jane Doe, Wildlife Researcher
              </Typography>
            </Paper>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Welcome;

```


### File: reportWebVitals.js
```
const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;

```


### File: server.js
```
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // replace with your MySQL username
  password: '', // replace with your MySQL password
  database: 'animal_tracking'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

app.get('/api/animals', (req, res) => {
  const query = `SELECT a.id, a.name, a.species, a.icon, l.timestamp, l.lat, l.lng
                 FROM animals a
                 JOIN locations l ON a.id = l.animal_id
                 ORDER BY l.timestamp`;
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching data:', error);
      res.status(500).send('Error fetching data');
      return;
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

```


### File: setupTests.js
```
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

```


## Directory: styles


### File: styles\PageTransition.js
```
import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './Transitions.css';

const PageTransition = ({ children, location }) => (
  <TransitionGroup>
    <CSSTransition
      key={location.key}
      timeout={{ enter: 300, exit: 300 }}
      classNames="page"
    >
      {children}
    </CSSTransition>
  </TransitionGroup>
);

export default PageTransition;

```


### File: styles\RealTime.css
```
.realtime-container {
  display: flex;
  /* top: 64px; */
  position: relative;
  height: 100vh; /* Use full viewport height */
  overflow:hidden; 
  /* Prevent scrolling */
  margin-left: 60px;
  }

  .sidebar-wrapper {
    display: flex;
    height: 100%;
  }

  #map {
    flex: 1;
    height: 100vh;
    z-index:0;
}

.new-sidebar {
  width: 200px; /* Adjust based on your new sidebar width */
  background-color: #f0f0f0; /* Adjust color as needed */
  height: 100%;
  overflow-y: auto;
}

.map {
  flex: 1;
  width: 100vw-70px;
  height:100vw-64px;
  z-index:0;
  margin-left: 0px;
}

.fixed-sidebar {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  /* padding-left: 70px; */
  bottom: 0;
  width: 70px;
  height:100%-64px;
  background-color: rgba(31, 118, 206, 0.6);
  flex-direction: column;
  align-items: center;
  gap: 20px;
  z-index:1;
}

.sidebar-button {
  background: none;
  border: none;
  color: white;
  text-align: center;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
}

.sidebar-button .sidebar-icon {
  display: block;
  width: 35px;
  height: 35px;
  margin-bottom: 5px;
}
.btn{
  display: flex;
  align-items: center;
  gap:5px;
}
.layer-menu {
  display: none;
  width: 110px;
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 10px;
  left: 80px;
  padding: 10px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content:space-around; /* Center items vertically */
  align-items: flex-start; /* Align items to the start horizontally */
  gap: 4px;
}

.layer-menu.img {
padding-right: 10px;
}

.layer-menu.show {
  display:block;
  animation: fadeIn 0.3s forwards;
}

.layer-menu.hide {
  animation: fadeOut 0.3s forwards;
}

.layer-menu button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 5px 10px;
}

.layer-icon {
  width: 30px;
  height: 30px;
  margin-right: 1px;
}


@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}




.report-menu {
  display: none;
  position: absolute;
  top: 10px;
  left: 80px;
  /* bottom: 0px; */
  width: 390px;
  background-color: #FDFDFD;
  padding: 0px;
  border-radius: 20px;
  color: rgb(0, 0, 0);
  z-index: 10;
  border-top-left-radius:20px;
  border-top-right-radius:20px;
}

.patrol-menu {
  display: none;
  position: absolute;
  top: 10px;
  left: 80px;
  /* bottom: 0px; */
  width: 390px;
  background-color: #FDFDFD;
  padding: 0px;
  border-radius: 20px;
  color: rgb(0, 0, 0);
  z-index: 10;
  border-top-left-radius:20px;
  border-top-right-radius:20px;
}

.animal-menu {
  display: none;
  position: absolute;
  top: 10px;
  left: 80px;
  /* bottom: 0px; */
  width: 390px;
  background-color: #FDFDFD;
  padding: 0px;
  border-radius: 20px;
  color: rgb(0, 0, 0);
  z-index: 10;
  border-top-left-radius:20px;
  border-top-right-radius:20px;
}

.remote-control-menu {
  display: none;
  position: absolute;
  top: 10px;
  left: 80px;
  /* bottom: 0px; */
  width: 400px;
  background-color: #FDFDFD;
  padding: 0px;
  border-radius: 20px;
  color: rgb(0, 0, 0);
  z-index: 10;
  border-top-left-radius:20px;
  border-top-right-radius:20px;
}

.report-menu.show {
  display: block;
}

.patrol-menu.show {
  display: block;
}

.animal-menu.show {
  display: block;
}

.remote-control-menu.show {
  display: block;
}

.report-header, .report-filters, .report-summary, .report-list {
  margin-bottom: 15px;
}

.patrol-header, .patrol-filters, .patrol-summary, .report-list {
  margin-bottom: 15px;
}

.animal-header, .animal-filters, .animal-summary, .animal-list {
  margin-bottom: 15px;
}

.remote-control-header, .remote-control-filters, .remote-control-summary, .remote-control-list {
  margin-bottom: 15px;
}

.report-time{
  align-items: center;
}
.report-header {
  color: rgb(255, 255, 255);
  background-color: #1F76CE;
  display: flex;
  padding:8px;
  justify-content: space-between;
  align-items: center;
  border-top-left-radius:20px;
  border-top-right-radius:20px;
}

.patrol-header {
  color: rgb(255, 255, 255);
  background-color: #1F76CE;
  display: flex;
  padding:8px;
  justify-content: space-between;
  align-items: center;
  border-top-left-radius:20px;
  border-top-right-radius:20px;
}

.animal-header {
  color: rgb(255, 255, 255);
  background-color: #1F76CE;
  display: flex;
  padding:8px;
  justify-content: space-between;
  align-items: center;
  border-top-left-radius:20px;
  border-top-right-radius:20px;
}

.remote-control-header {
  color: rgb(255, 255, 255);
  background-color: #1F76CE;
  display: flex;
  padding:8px;
  justify-content: space-between;
  align-items: center;
  border-top-left-radius:20px;
  border-top-right-radius:20px;
}

.plus-sign {
  font-size: 24px;
}

.report-title {
  flex: 1;
  text-align: center;
  font-size: 18px;
}

.patrol-title {
  flex: 1;
  text-align: center;
  font-size: 18px;
}

.animal-title {
  flex: 1;
  text-align: center;
  font-size: 18px;
}

.remote-control-title {
  flex: 1;
  text-align: center;
  font-size: 18px;
}

.close-sign {
  cursor: pointer;
}

.report-filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.patrol-filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.animal-filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.remote-control-filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-bar {
  width: 40%;
  padding: 5px;
  margin: 4px;
  /* border-radius: 8px; */
}

.filter-btn, .date-btn, .date-updated-btn {
  background-color: #F2F2F4;
  border: none;
  padding: 5px;
  margin: 4px;
  cursor: pointer;
  color: #000000
  
}

.report-summary {
  border-top: 1px solid #61666b62;
  padding: 10px;
  padding-bottom: 0px;
  font-size: 14px;
}

.patrol-summary {
  border-top: 1px solid #61666b62;
  padding: 10px;
  padding-bottom: 0px;
  font-size: 14px;
}

.animal-summary {
  border-top: 1px solid #61666b62;
  padding: 10px;
  padding-bottom: 0px;
  font-size: 14px;
}

.remote-control-summary {
  border-top: 1px solid #61666b62;
  padding: 10px;
  padding-bottom: 0px;
  font-size: 14px;
}

.report-list {
  /* max-height: 200px; */
  overflow-y: auto;
}

.patrol-list {
  /* max-height: 200px; */
  overflow-y: auto;
}

.animal-list {
  /* max-height: 200px; */
  overflow-y: auto;
}

.remote-control-list {
  /* max-height: 200px; */
  overflow-y: auto;
}

.report-item {
  background-color: #1f76ce41;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.patrol-item {
  background-color: #1f76ce41;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.animal-item {
  /* top:100; */
  background-color: #1f76ce41;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.remote-control-item {
  /* top:100; */
  background-color: #1f76ce41;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.report-image {
  background-color: #1F76CE;
  width: 30px;
  height: 30px;
  padding:8px;
  margin-right: 10px;
}

.patrol-image {
  background-color: #1F76CE;
  width: 30px;
  height: 30px;
  padding:8px;
  margin-right: 10px;
}

.animal-image {
  background-color: #1F76CE;
  width: 30px;
  height: 30px;
  padding:8px;
  margin-right: 10px;
}

.remote-control-image {
  background-color: #1F76CE;
  width: 30px;
  height: 30px;
  padding:8px;
  margin-right: 10px;
}

.entry-number{
  /* margin-right: 10px; */
  width:15%;
  /* background-color: #CACCCE; */
}

.report-name{
  /* margin-right: 10px; */
  width:50%;
  /* background-color: #CACCCE; */
}

.patrol-name{
  /* margin-right: 10px; */
  width:50%;
  /* background-color: #CACCCE; */
}

.animal-name{
  /* margin-right: 10px; */
  width:50%;
  /* background-color: #CACCCE; */
}

.remote-control-name{
  /* margin-right: 10px; */
  width:50%;
  /* background-color: #CACCCE; */
}

.report-day-time {
  align-items: center;
  width:20%;
  font-size: 11px;
  /* margin-right: 10px; */
  /* background-color: #CACCCE; */
}

.patrol-day-time {
  align-items: center;
  width:20%;
  font-size: 11px;
  /* margin-right: 10px; */
  /* background-color: #CACCCE; */
}

.animal-day-time {
  align-items: center;
  width:20%;
  font-size: 11px;
  /* margin-right: 10px; */
  /* background-color: #CACCCE; */
}

.remote-control-day-time {
  align-items: center;
  width:20%;
  font-size: 11px;
  /* margin-right: 10px; */
  /* background-color: #CACCCE; */
}

.locate-icon {
  cursor: pointer;
  background: none;
  border: none;
  color: rgb(255, 255, 255);
}

.leaflet-container{
  height:100vh;
}

.leaflet-bottom.leaflet-right{
  height:0;
}

.leaflet-left{
  /* left:0; */
  right:10;
}

.leaflet-control-zoom.leaflet-bar.leaflet-control{
  /* margin-left:0; */
  right:10;
}

/* sizing of map container*/
.leaflet-container{
  height:100vh;
}

.cluster-icon{
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
  background-color: white;
  transform: translate(-25%,-25%);
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 900;
  font-size: 1.5rem;
}

.modal {
  display: block;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  margin-left:540px;
  margin-top:74px;
  background-color: #fefefe;
  /* margin: 15% auto; */
  padding: 20px;
  border: 1px solid #888;
  width:fit-content;
  border-radius: 20px;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.attached-image {
  width: 100px;
  margin-right: 10px;
}

.interval-input {
  width: 34px;
  margin-left: 0px;
  margin-right:10px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

```


### File: styles\Transitions.css
```
/* For upward transitions */
.page-up-enter {
  opacity: 0;
  transform: translateY(100%);
}
.page-up-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 300ms, transform 300ms;
}
.page-up-exit {
  opacity: 1;
  transform: translateY(0);
}
.page-up-exit-active {
  opacity: 0;
  transform: translateY(-100%);
  transition: opacity 300ms, transform 300ms;
}

/* For downward transitions */
.page-down-enter {
  opacity: 0;
  transform: translateY(-100%);
}
.page-down-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 300ms, transform 300ms;
}
.page-down-exit {
  opacity: 1;
  transform: translateY(0);
}
.page-down-exit-active {
  opacity: 0;
  transform: translateY(100%);
  transition: opacity 300ms, transform 300ms;
}

```


### File: styles\Welcome.css
```
/* Ensure the entire container fills the viewport */
.welcome-container {
  background: url('../assets/background.jpeg') no-repeat center center fixed;
  background-size: cover;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
}

.welcome-content {
  background: rgba(0, 0, 0, 0.5); /* Optional: adds a dark overlay for better text visibility */
  /* padding: 20px; */
  border-radius: 10px;
}

.features {
  display: flex;
  justify-content: space-around;
  margin-top: 0px;
}

.feature {
  width: 200px;
  text-align: center;
}

.feature img {
  width: 100%;
  height: auto;
  border-radius: 10px;
}

```


# Directory: public


### File: index.html
```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <!--
      manifest.json provides metadata used when your web app is installed on a
      user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
    -->
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <!--
      Notice the use of %PUBLIC_URL% in the tags above.
      It will be replaced with the URL of the `public` folder during the build.
      Only files inside the `public` folder can be referenced from the HTML.

      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running `npm run build`.
    -->
    <title>Animal Tracking</title>
    <link rel="icon" href="%PUBLIC_URL%/logo.png"> 
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run `npm start` or `yarn start`.
      To create a production bundle, use `npm run build` or `yarn build`.
    -->
  </body>
</html>

```


### File: manifest.json
```
{
  "short_name": "React App",
  "name": "Create React App Sample",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    },
    {
      "src": "logo192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "logo512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}

```


### File: robots.txt
```
# https://www.robotstxt.org/robotstxt.html
User-agent: *
Disallow:

```


### File: _redirects
```
/* /index.html 200
```


# File: package.json
```
{
  "name": "animal-tracking",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@emotion/react": "^11.13.3",
    "@emotion/styled": "^11.13.0",
    "@mui/icons-material": "^5.16.7",
    "@mui/material": "^5.16.7",
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "axios": "^1.7.2",
    "chart.js": "^4.4.4",
    "cors": "^2.8.5",
    "express": "^4.19.2",
    "firebase": "^10.13.0",
    "leaflet": "^1.9.4",
    "lucide-react": "^0.441.0",
    "mapbox-gl": "^3.6.0",
    "mongodb": "^6.8.0",
    "mongoose": "^8.5.1",
    "mysql2": "^3.11.0",
    "react": "^18.3.1",
    "react-chartjs-2": "^5.2.0",
    "react-dom": "^18.3.1",
    "react-leaflet": "^4.2.1",
    "react-leaflet-cluster": "^2.1.0",
    "react-map-gl": "^7.1.7",
    "react-router-dom": "^6.26.1",
    "react-scripts": "^5.0.1",
    "react-transition-group": "^4.4.5",
    "socket.io-client": "^4.7.5",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "devDependencies": {
    "@babel/plugin-proposal-private-property-in-object": "^7.21.11"
  }
}

```

