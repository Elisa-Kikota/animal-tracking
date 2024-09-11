import React from 'react';
import reportsIcon from '../../assets/reports.png';
import locationIcon from '../../assets/location.png';
import '../../styles/RealTime.css';

export default function Reports({ isVisible }) {
  if (!isVisible) return null;

  return (
    <div id="report-menu" className={`report-menu ${isVisible ? 'show' : 'hide'}`}>
      <div className="report-header">
        <span className="plus-sign">+</span>
        <span className="report-title">Reports</span>
        <span className="close-sign">x</span>
      </div>
      <div className="report-filters">
        <input type="text" placeholder="Search..." className="search-bar" />
        <button className="filter-btn">Filters</button>
        <button className="date-btn">Dates</button>
        <button className="date-updated-btn">Date Updated</button>
      </div>
      <div className="report-summary">
        <span>1 result from about <b>{/* time logic here */} ago until now</b></span>
      </div>
      <div className="report-list">
        <div className="report-item">
          <img src={reportsIcon} alt="Report" className="report-image" />
          <span className="entry-number">2</span>
          <span className="report-name">Antelope Injury</span>
          <span className="report-day-time">
            <div className="report-date">9th Aug 2024</div>
            <div className="report-time">12:30 PM</div>
          </span>
          <button className="locate-icon"><img src={locationIcon} alt="locationIcon" className="layer-icon" /></button>
        </div>
        {/* Repeat for other reports */}
      </div>
    </div>
  );
}
