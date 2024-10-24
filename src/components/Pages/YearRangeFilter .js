import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";
import "./YearRangeFilter.css"; // Import your CSS file

const YearRangeFilter = () => {
  const videoSources = [
    {
      quality: "1080p",
      src: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4",
    },
    {
      quality: "720p",
      src: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4",
    },
    {
      quality: "576p",
      src: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4",
    },
  ];

  const [selectedQuality, setSelectedQuality] = useState(videoSources[0].src);
  const [showQualityOptions, setShowQualityOptions] = useState(false);
  const playerRef = useRef(null); // Ref to access the React Player instance
  const [currentTime, setCurrentTime] = useState(0); // Store the current playback time
  const [isChangingQuality, setIsChangingQuality] = useState(false); // Flag to prevent re-seeking during quality change
  const [isPlaying, setIsPlaying] = useState(false); // Flag to control playback

  // Handle quality change
  const handleQualityChange = (src) => {
    if (playerRef.current) {
      setCurrentTime(playerRef.current.getCurrentTime()); // Get current playback time before changing quality
      setSelectedQuality(src); // Change quality
      setIsChangingQuality(true); // Set flag to indicate quality is changing
      setIsPlaying(true); // Set to play automatically after changing quality
    }
  };

  // When the player is ready, seek to the last known time if changing quality
  const handlePlayerReady = () => {
    if (isChangingQuality) {
      playerRef.current.seekTo(currentTime); // Seek back to the saved time
      setIsChangingQuality(false); // Reset flag after seeking
      playerRef.current.getInternalPlayer().play(); // Play the video after seeking
    }
  };

  // Handle when the video is playing or paused
  const handlePlayPause = (playing) => {
    if (!playing) {
      // Store the current time when paused
      setCurrentTime(playerRef.current.getCurrentTime());
      setIsPlaying(false); // Update playing state
    } else {
      setIsPlaying(true); // Update playing state
    }
  };

  return (
    <div className="video-player-wrapper">
      <ReactPlayer
        ref={playerRef} // Assign ref to React Player
        url={selectedQuality}
        controls
        playing={isPlaying} // Control playback with isPlaying state
        width="60%"
        height="60%"
        light="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg"
        onReady={handlePlayerReady} // Call this function when the player is ready
        onPause={() => handlePlayPause(false)} // Update current time when paused
        onPlay={() => handlePlayPause(true)} // Update current time when playing
        onSeek={(time) => setCurrentTime(time)} // Update current time when seeking
      />

      {/* Quality Selector Icon */}
      <div
        className="quality-icon"
        onClick={() => setShowQualityOptions((prev) => !prev)}
      >
        Q
      </div>

      {showQualityOptions && (
        <div className="quality-selector">
          {videoSources.map((source) => (
            <button
              key={source.quality}
              onClick={() => {
                handleQualityChange(source.src); // Change quality
                setShowQualityOptions(false); // Close the dropdown
              }}
              className={selectedQuality === source.src ? "active" : ""}
            >
              {source.quality}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default YearRangeFilter;
