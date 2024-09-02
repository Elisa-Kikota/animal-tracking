import '../styles/RealTime.css';
import "leaflet/dist/leaflet.css"

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
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import {Icon, divIcon} from "leaflet";
import MarkerClusterGroup from 'react-leaflet-cluster';

export default function RealTime() {
  const [animalData, setAnimalData] = useState([]);
  const [map] = useState(null);
  const [isLayerMenuVisible, setIsLayerMenuVisible] = useState(false);
  const [isReportMenuVisible, setIsReportMenuVisible] = useState(false);
  const [isPatrolMenuVisible, setIsPatrolMenuVisible] = useState(false);
  const [isAnimalMenuVisible, setIsAnimalMenuVisible] = useState(false);

  // markers
  // const markers = [
  //   {
  //     geocode: [-1.47311, 34.166586],
  //     popUp:"Hello, I am pop up 1"
  //   },
  //   {
  //     geocode: [-1.48311, 34.156586],
  //     popUp:"Hello, I am pop up 2"
  //   },
  //   {
  //     geocode: [-1.48311, 34.176586],
  //     popUp:"Hello, I am pop up 3"
  //   }
  // ];

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
  
          // Extract temp and activity from the location data
          const temp = location.temperature || 'N/A'; // Default to 'N/A' if temp is not available
          const activity = location.activity || 'N/A'; // Default to 'N/A' if activity is not available
  
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
    

        <MapContainer className="map" center={[-1.948, 34.1665]} zoom={16}>
  <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <MarkerClusterGroup
    chunkedLoading
    // iconCreateFunction={createCustomClusterIcon}
  >
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
            <img src={threeDIcon} alt="3D View" className="layer-icon" />
            3D View
          </button>
          <button className="btn" onClick={() => handleLayerChange('elisakikota/clzjjqpdi00jo01r37ot6asfi')}>
            <img src={heatmapIcon} alt="HeatMap" className="layer-icon" />
            HeatMap
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


    </div>
  );
}