import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import '../styles/RealTime.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiZWxpc2FraWtvdGEiLCJhIjoiY2x6MTkwYWRiMnE0ZTJpcjR5bzFjMzNrZyJ9.HRBoAER-bGLPEcdhbUsW_A';

const RealTimeTracking = () => {
    const [animalData, setAnimalData] = useState([]);

    useEffect(() => {
        // Fetch the animal data from your API
        fetch('/api/animals')
            .then(response => response.json())
            .then(data => setAnimalData(data));

        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [34.85770, -6.009865], // Initial map center -6.009865, 34.857700
            zoom: 6
        });

        animalData.forEach(animal => {
            new mapboxgl.Marker()
                .setLngLat([animal.longitude, animal.latitude])
                .setPopup(new mapboxgl.Popup({ offset: 25 }).setText(`${animal.name} (${animal.species})`))
                .addTo(map);
        });

        return () => map.remove();
    }, [animalData]);

    return <div id="map" style={{ width: '100%', height: '100vh' }}></div>;
};

export default RealTimeTracking;
