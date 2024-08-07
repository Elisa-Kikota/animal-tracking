import reportsIcon from '../assets/reports.png';
import patrolsIcon from '../assets/patrols.png';
import layersIcon from '../assets/layers.png';
import outdoorsIcon from '../assets/outdoors.png';
import lightIcon from '../assets/light.png';
import darkIcon from '../assets/dark.png';
import satelliteIcon from '../assets/satellite.png';
import threeDIcon from '../assets/3d.png';
import heatmapIcon from '../assets/heatmap.png';

import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import '../styles/RealTime.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiZWxpc2FraWtvdGEiLCJhIjoiY2x6MTkwYWRiMnE0ZTJpcjR5bzFjMzNrZyJ9.HRBoAER-bGLPEcdhbUsW_A';

const RealTime = () => {
  const [animalData, setAnimalData] = useState([]);
  const [map, setMap] = useState(null);
  const [isLayerMenuVisible, setIsLayerMenuVisible] = useState(false);

  useEffect(() => {
    const mapInstance = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [34.85770, -6.009865],
      zoom: 6,
      attributionControl: false  // Disable default attribution control
    });

    mapInstance.on('load', () => {
      fetch('http://localhost:5000/animals')
        .then(response => response.json())
        .then(data => {
          setAnimalData(data);
          data.forEach(animal => {
            new mapboxgl.Marker({ element: createMarkerElement(animal.icon) })
              .setLngLat([animal.location.lng, animal.location.lat])
              .setPopup(new mapboxgl.Popup({ offset: 25 }).setText(`${animal.name} (${animal.species})`))
              .addTo(mapInstance);
          });
        })
        .catch(error => console.error('Error fetching animal data:', error));
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

  const toggleLayerMenu = () => {
    setIsLayerMenuVisible(!isLayerMenuVisible);
    const layerMenu = document.getElementById('layer-menu');
    layerMenu.classList.toggle('show', isLayerMenuVisible);
    layerMenu.classList.toggle('hide', !isLayerMenuVisible);
  };

  return (
    <div className="realtime-container">
      <div id="map" style={{ width: '100%', height: '100%' }}></div>
      <div className="fixed-sidebar">
        <button className="sidebar-button">
          <img src={reportsIcon} alt="Reports" className="sidebar-icon" />
          <span>Reports</span>
        </button>
        <button className="sidebar-button">
          <img src={patrolsIcon} alt="Patrols" className="sidebar-icon" />
          <span>Patrols</span>
        </button>
        <button className="sidebar-button" onClick={toggleLayerMenu}>
          <img src={layersIcon} alt="Layers" className="sidebar-icon" />
          <span>Layers</span>
        </button>
        <div id="layer-menu" className="layer-menu hide">
          <button onClick={() => handleLayerChange('mapbox/outdoors-v11')}>
            <img src={outdoorsIcon} alt="Outdoors" className="layer-icon" />
            Outdoors
          </button>
          <button onClick={() => handleLayerChange('mapbox/light-v10')}>
            <img src={lightIcon} alt="Light" className="layer-icon" />
            Light
          </button>
          <button onClick={() => handleLayerChange('mapbox/dark-v10')}>
            <img src={darkIcon} alt="Dark" className="layer-icon" />
            Dark
          </button>
          <button onClick={() => handleLayerChange('mapbox/satellite-v9')}>
            <img src={satelliteIcon} alt="Satellite" className="layer-icon" />
            Satellite
          </button>
          <button onClick={() => handleLayerChange('elisakikota/clzjmuy7i00jx01r37jx58xy9')}>
            <img src={threeDIcon} alt="3D View" className="layer-icon" />
            3D View
          </button>
          <button onClick={() => handleLayerChange('elisakikota/clzjjqpdi00jo01r37ot6asfi')}>
            <img src={heatmapIcon} alt="HeatMap" className="layer-icon" />
            HeatMap
          </button>
        </div>
      </div>
      <div className="animal-list">
        <h3>Animal List</h3>
        <ul>
          {animalData.map(animal => (
            <li key={animal.id}>
              <img src={animal.icon} alt={animal.name} style={{ width: '20px', height: '20px' }} />
              {animal.name} ({animal.species})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RealTime;
