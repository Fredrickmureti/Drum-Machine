import React, { useState, useEffect } from "react";
import DrumPad from "./components/DrumPad";
import ControlPanel from "./components/ControlPanel";
import './App.css';

// SoundsBanksData
const soundBanks = {
  heater: {
    Q: { name: 'Heater 1', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' },
    W: { name: 'Heater 2', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' },
    E: { name: 'Heater 3', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3' },
    A: { name: 'Heater 4', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3' },
    S: { name: 'Clap', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' },
    D: { name: 'Open-HH', url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' },
    Z: { name: "Kick n' Hat", url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' },
    X: { name: 'Kick', url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' },
    C: { name: 'Closed-HH', url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' },
  },
  chord: {
    Q: { name: 'Chord 1', url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3' },
    W: { name: 'Chord 2', url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3' },
    E: { name: 'Chord 3', url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3' },
    A: { name: 'Shaker', url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3' },
    S: { name: 'Open-HH', url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3' },
    D: { name: 'Closed-HH', url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3' },
    Z: { name: 'Punchy-Kick', url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3' },
    X: { name: 'Side-Stick', url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3' },
    C: { name: 'Snare', url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3' },
  },
};

const App = () => {
  const [volume, setVolume] = useState(0.5);
  const [power, setPower] = useState(true);
  const [displayText, setDisplayText] = useState('');
  const [currentBank, setCurrentBank] = useState('heater');

  useEffect(() => {
    // Keyboard event listener
    const handleKeyPress = (e) => {
      const key = e.key.toUpperCase(); // Get the pressed key
      if (soundBanks[currentBank][key]) {
        playSound(key);
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [currentBank, power]); // Add dependencies to ensure it updates with state

  const playSound = (key) => {
    if (!power) return; // Check if the power is on
    const sound = soundBanks[currentBank][key];
    const audio = new Audio(sound.url);
    audio.volume = volume; // Set the volume based on the prop
    audio.play();
    setDisplayText(sound.name); // Display the name of the sound
  };

  const togglePower = () => {
    setPower(!power);
    setDisplayText(power ? "Power Off" : "Power On");
  };

  const changeVolume = (newVolume) => {
    const volumeValue = parseFloat(newVolume);
    setVolume(volumeValue);
    setDisplayText(`Volume: ${Math.round(volumeValue * 100)}`);
  };

  const toggleBank = () => {
    setCurrentBank(currentBank === "heater" ? "chord" : "heater");
    setDisplayText(currentBank === "heater" ? "Chord Bank" : "Heater Bank");
  };

  return (
    <div className="inner-container" id="drum-machine">
      <div className="pad-bank">
        {Object.keys(soundBanks[currentBank]).map((key) => (
          <DrumPad
            key={key}
            soundKey={key}
            sound={soundBanks[currentBank][key]}
            power={power}
            volume={volume}
            setDisplayText={setDisplayText}
          />
        ))}
      </div>
      <div className="logo"></div>
      <ControlPanel
        changeVolume={changeVolume}
        togglePower={togglePower}
        toggleBank={toggleBank}
        volume={volume}
        bank={currentBank}
        power={power}
        currentBank={currentBank}
        displayText={displayText}
      />
    </div>
  );
};

export default App;
