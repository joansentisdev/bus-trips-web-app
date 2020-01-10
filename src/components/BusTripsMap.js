import React, { useEffect, useState } from 'react';
import { GoogleApiWrapper, Map, Polyline } from 'google-maps-react';

import mapStyles from '../utils/darkMapStyles';

function BusTripsMap({ trip }) {
  const [mapOptions, setMapOptions] = useState({
    center: { lat: 0, lang: 0 },
    zoom: 3,
  });
  const getRoutePath = () => window.google.maps.geometry.encoding.decodePath(trip.route);

  useEffect(() => {
    if (!trip) {
      return;
    }

    const bounds = new window.google.maps.LatLngBounds();
    const polyline = getRoutePath();
    polyline.forEach((item) => {
      bounds.extend(item);
    });
    setMapOptions({
      center: bounds.getCenter(),
      zoom: 12,
    });
  },
  // eslint-disable-next-line
  [trip]);

  return (
    <Map
      google={window.google}
      zoom={mapOptions.zoom}
      styles={mapStyles}
      center={mapOptions.center}
      disableDefaultUI={true}
      zoomControl={true}>
      {trip ? (
        <Polyline path={getRoutePath()} />
      ): null}
    </Map>
  );
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyD1aCwKJ42a5xoT7lk4EEgdHueW0vMY8TA',
  libraries: ['geometry'],
})(BusTripsMap); 
