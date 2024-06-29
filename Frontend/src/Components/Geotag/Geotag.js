import React, { useState } from 'react';
import MapComponent from './Marker';

// Helper function to generate random points within a given radius
const getRandomPointsWithinRadius = (latitude, longitude, radiusInMeters, numPoints) => {
  const points = [];
  for (let i = 0; i < numPoints; i++) {
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * radiusInMeters / 111300; // Convert meters to degrees
    const newLat = latitude + distance * Math.cos(angle);
    const newLng = longitude + distance * Math.sin(angle);
    points.push({ lat: newLat, lng: newLng, text: `Garbage Collector ${i + 1}` });
  }
  return points;
};

function GeoTag() {
  const [userLocation, setUserLocation] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [mapVisible, setMapVisible] = useState(false);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });

          // Create dummy points within 500 meters
          const dummyPoints = getRandomPointsWithinRadius(latitude, longitude, 500, 4);
          setMarkers([{ lat: latitude, lng: longitude, text: 'Your Location' }, ...dummyPoints]);
          setMapVisible(true); // Show map once location is fetched
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div>
      {/* <h1>Geolocation App</h1> */}
      <button style={{backgroundColor:'green', border:'none',  padding:'1rem' ,borderRadius:'10px', marginTop:'2rem', color:'white'}} onClick={getUserLocation}>Get My Location</button>
      {mapVisible && (
        <div style={{ height: '500px', width: '100%', marginTop: '20px' }}>
          <MapComponent
            center={userLocation ? { lat: userLocation.latitude, lng: userLocation.longitude } : { lat: 0, lng: 0 }}
            zoom={15}
            markers={markers}
          />
        </div>
      )}
    </div>
  );
}

export default GeoTag;
