import React from 'react';
import './styles/controlPanel.css';

const ControlPanel = ({ volume, changeVolume, togglePower, toggleBank, power, currentBank, displayText }) => {
  // Check if the current bank is 'chord'
  const isChordBank = currentBank === 'chord';

  return (
    <div className='controls-container'>
      {/* Power Control */}
      <div className='control' onClick={togglePower}>
        <p>Power</p>
        <div className='select'>
          <div 
            className='inner' 
            style={{ float: power ? "right" : "left" }}  // Move the toggle based on the power state
          ></div>
        </div>
      </div>

      {/* Display */}
      <p id="display">{displayText}</p>

      {/* Volume Control */}
      <div className='volume-slider'>
        <input 
          max="1"
          min="0"
          step="0.01"
          type="range"
          value={volume}
          onChange={(e) => changeVolume(e.target.value)}  // Volume slider
        />
      </div>

      {/* Bank Control */}
      <div className='control' onClick={toggleBank}>
        <p>Bank</p>
        <div className='select'>
          <div 
            className='inner' 
            style={{ float: isChordBank ? "right" : "left" }}  // Move the toggle based on the bank state
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
