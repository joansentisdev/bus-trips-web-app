import React from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

function BusLinesMap({ google }) {
  const initialCenter = { lat: 0, lng: 0 };
  const mapStyles = {
    width: '100%',
    height: '100%',
  };

  return (
    <Map
      google={google}
      zoom={3}
      style={mapStyles}
      initialCenter={initialCenter}
    />
  );
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyD1aCwKJ42a5xoT7lk4EEgdHueW0vMY8TA',
})(BusLinesMap);
