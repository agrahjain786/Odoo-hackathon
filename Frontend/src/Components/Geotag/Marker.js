import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Icon } from '@iconify/react';
import mapMarker from '@iconify-icons/mdi/map-marker';

const Marker = ({ text, highlight }) => (
  <div style={{ position: 'relative', transform: 'translate(-50%, -50%)', zIndex: highlight ? 2 : 1 }}>
    <Icon icon={mapMarker} style={{ fontSize: '24px', color: highlight ? 'blue' : 'red' }} />
    <div style={{ fontSize: '12px', color: highlight ? 'blue' : 'black', marginTop: '12px' }}>{text}</div>
  </div>
);

const MapComponent = ({ center, zoom, markers }) => {
  return (
    <div style={{ height: '500px', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={center}
        defaultZoom={zoom}
        center={center}
        zoom={zoom}
        draggable={false} // Disable map dragging
      >
        {/* Render markers */}
        {markers.map((marker, index) => (
          <Marker
            key={index}
            lat={marker.lat}
            lng={marker.lng}
            text={marker.text}
            highlight={marker.highlight}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default MapComponent;
