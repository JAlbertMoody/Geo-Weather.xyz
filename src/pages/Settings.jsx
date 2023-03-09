import React, { useState } from 'react';


export default function Settings() {
  const [isMetric, setIsMetric] = useState(JSON.parse(localStorage.getItem("units")) || false);


  const toggleSwitch = () => {
    localStorage.setItem("units", JSON.stringify(!isMetric));
    setIsMetric(!isMetric);
  };
  


  return (
    <div className="Settings">
      <div className="Settings--Block">
        <h2>Units</h2>
        <div className='Units--Container'>
            <span className={isMetric ? 'imperial' : 'active imperial'}>
            Imperial
            </span>
            <label className="switch">
            <input type="checkbox" onChange={toggleSwitch} checked={isMetric} />
            <span className="slider round"></span>
            </label>
            <span className={isMetric ? 'active metric' : 'metric'}>Metric</span>
        </div>
      </div>
    </div>
  );
}