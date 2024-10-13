import React, { useRef, useEffect } from 'react';
import './styles/DrumPad.css';

const DrumPad = ({ soundKey, sound, volume, power, setDisplayText }) => {
  const audioRef = useRef(null); // Use a ref to access the <audio> element

  const playSound = () => {
    console.log('Power status:', power);
    if (power && audioRef.current) { // check if power is on and ref is available
      const audio = audioRef.current;

      console.log('Audio element:', audio);
      console.log('Audio URL:', sound.url);
      console.log('Volume:', volume);

      // Set the volume and play the audio
      audio.volume = volume;
      audio.play()
        .then(() => console.log('Audio played successfully'))
        .catch((error) => console.error('Error playing audio:', error));

      setDisplayText(sound.name); // Update display with sound name
    } else {
      console.log('Power is off or audioRef is not available');
    }
  };

  // Handle keydown events to trigger the sound
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key.toUpperCase() === soundKey) {
        playSound(); // Play the sound if the key matches
      }
    };

    // Add event listener for keydown
    window.addEventListener('keydown', handleKeyDown);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [soundKey, power, setDisplayText]); // Dependencies include soundKey, power, and setDisplayText

  return (
    <button
      className="drum-pad"
      id={sound.name}
      style={{ backgroundColor: 'grey', marginTop: '10px', boxShadow: 'black 3px 3px 5px' }}
      onClick={playSound}
    >
      <audio ref={audioRef} className="clip" id={soundKey} src={sound.url}></audio>
      {soundKey}
    </button>
  );
};

export default DrumPad;
