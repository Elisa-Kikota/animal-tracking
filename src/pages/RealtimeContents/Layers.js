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
