import reportsIcon from '../assets/reports.png';
import patrolsIcon from '../assets/patrols.png';
import layersIcon from '../assets/layers.png';
import outdoorsIcon from '../assets/outdoors.png';
import lightIcon from '../assets/light.png';
import darkIcon from '../assets/dark.png';
import satelliteIcon from '../assets/satellite.png';
import threeDIcon from '../assets/3d.png';
import heatmapIcon from '../assets/heatmap.png';
import locationIcon from '../assets/location.png'

import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import '../styles/RealTime.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiZWxpc2FraWtvdGEiLCJhIjoiY2x6MTkwYWRiMnE0ZTJpcjR5bzFjMzNrZyJ9.HRBoAER-bGLPEcdhbUsW_A';

const RealTime = () => {
  const [animalData, setAnimalData] = useState([]);
  const [map, setMap] = useState(null);
  const [isLayerMenuVisible, setIsLayerMenuVisible] = useState(false);
  const [isReportMenuVisible, setIsReportMenuVisible] = useState(false);

  useEffect(() => {
    const mapInstance = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [39.24079, -6.77180],
      zoom: 17.3,
      attributionControl: false,
    });

    mapInstance.on('load', () => {
      fetch('http://localhost:5000/animals')
        .then((response) => response.json())
        .then((data) => {
          setAnimalData(data);
          data.forEach((animal) => {
            new mapboxgl.Marker({ element: createMarkerElement(animal.icon) })
              .setLngLat([animal.location.lng, animal.location.lat])
              .setPopup(new mapboxgl.Popup({ offset: 25 }).setText(`${animal.name} (${animal.species})`))
              .addTo(mapInstance);
          });
        })
        .catch((error) => console.error('Error fetching animal data:', error));
    });

    setMap(mapInstance);

    return () => mapInstance.remove();
  }, []);

  const createMarkerElement = (icon) => {
    const el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundImage = `url(${icon})`;
    el.style.width = '30px';
    el.style.height = '30px';
    el.style.backgroundSize = '100%';
    return el;
  };

  const handleLayerChange = (style) => {
    if (map) {
      map.setStyle(`mapbox://styles/${style}`);
    }
  };

  const [isPatrolMenuVisible, setIsPatrolMenuVisible] = useState(false);


  const toggleLayerMenu = () => {
    setIsLayerMenuVisible(!isLayerMenuVisible);
    setIsReportMenuVisible(false); // Close report menu if open
    setIsPatrolMenuVisible(false);
  };
  
  const toggleReportMenu = () => {
    setIsReportMenuVisible(!isReportMenuVisible);
    setIsLayerMenuVisible(false); // Close layer menu if open
    setIsPatrolMenuVisible(false);
  };

  const togglePatrolMenu = () => {
    setIsPatrolMenuVisible(!isPatrolMenuVisible);
    setIsLayerMenuVisible(false);
    setIsReportMenuVisible(false);
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
          <span className="report-title">Report</span>
          <span className="close-sign" onClick={toggleReportMenu}>x</span>
        </div>
        <div className="report-filters">
          <input type="text" placeholder="Search..." className="search-bar" />
          <button className="filter-btn">Filters</button>
          <button className="date-btn">Dates</button>
          <button className="date-updated-btn">Date Updated</button>
        </div>
        <div className="report-summary">
          <span>0 results from about <b> {/* time logic here */} ago until now</b></span>
        </div>
        <div className="report-list">
          {/* Replace with dynamic data */}
          <div className="report-item">
            <img src={reportsIcon} alt="Report" className="report-image" />
            <span className="entry-number">#123</span>
            <span className="report-name">Animal Report Name</span>
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
          <span className="report-title">Patrols</span>
          <span className="close-sign" onClick={toggleReportMenu}>x</span>
        </div>
        <div className="patrol-filters">
          <input type="text" placeholder="Search..." className="search-bar" />
          <button className="filter-btn">Filters</button>
          <button className="date-btn">Dates</button>
          <button className="date-updated-btn">Date Updated</button>
        </div>
        <div className="patrol-summary">
          <span>0 results from about <b> {/* time logic here */} ago until now</b></span>
        </div>
        <div className="patrol-list">
          {/* Replace with dynamic data */}
          <div className="patrol-item">
            <img src={patrolsIcon} alt="patrol" className="patrol-image" />
            <span className="entry-number">#123</span>
            <span className="report-name">Animal Report Name</span>
            <span className="report-day-time">
              <div classname="patrol-date">9th Aug 2024</div>
              <div classname="patrol-time">12:30 PM</div>
            </span>
            <button className="locate-icon">{ <img src={locationIcon} alt="locationIcon" className="layer-icon" />}</button>
          </div>
          {/* Repeat for other reports */}
        </div>
      </div>

    </div>
  );
};

export default RealTime;
