import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import '../styles/RealTime.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiZWxpc2FraWtvdGEiLCJhIjoiY2x6MTkwYWRiMnE0ZTJpcjR5bzFjMzNrZyJ9.HRBoAER-bGLPEcdhbUsW_A';

const RealTime = () => {
  const [animalData, setAnimalData] = useState([]);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [34.85770, -6.009865],
      zoom: 6,
    });

    fetch('http://localhost:5000/api/animals')
      .then(response => response.json())
      .then(data => {
        setAnimalData(data);
        data.forEach(animal => {
          new mapboxgl.Marker({ element: createMarkerElement(animal.icon) })
            .setLngLat([animal.lng, animal.lat])
            .setPopup(new mapboxgl.Popup({ offset: 25 }).setText(`${animal.name} (${animal.species})`))
            .addTo(map);
        });
      })
      .catch(error => console.error('Error fetching animal data:', error));

    return () => map.remove();
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

  return (
    <div className="realtime-container">
      <div id="map" style={{ width: '100%', height: '100vh' }}></div>
      <div className="animal-list">
        <h3>Animal List</h3>
        <ul>
          {animalData.map(animal => (
            <li key={animal.id}>
              <img src={animal.icon} alt={animal.name} style={{ width: '20px', height: '20px' }} />
              {animal.name} ({animal.species}) at {new Date(animal.timestamp).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RealTime;
