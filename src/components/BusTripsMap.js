import React, { useEffect, useState } from 'react';
import { GoogleApiWrapper, Map, Marker, Polyline } from 'google-maps-react';

import mapStyles from '../utils/darkMapStyles';
import busStopIcon from '../assets/icons/bus-stop.png';

function BusTripsMap({ trip }) {
  const [markers, setMarkers] = useState([]);
  const [mapOptions, setMapOptions] = useState({
    center: { lat: 0, lang: 0 },
    zoom: 3,
  });
  const getRoutePath = () => window.google.maps.geometry.encoding.decodePath(trip.route);

  useEffect(() => {
    if (!trip) {
      return;
    }

    // Re-center the map based on the route path
    const bounds = new window.google.maps.LatLngBounds();
    const polyline = getRoutePath();
    polyline.forEach((item) => bounds.extend(item));
    setMapOptions({
      center: bounds.getCenter(),
      zoom: 12,
    });

    // Update the markers
    setMarkers([
      trip.origin.point,
      trip.destination.point,
      ...trip.stops.map(({ point }) => point).filter((stop) => !!stop),
    ]);
  },
  // eslint-disable-next-line
  [trip]);

  const renderPolyline = () => trip ? <Polyline path={getRoutePath()} strokeColor={'#3f51b5'} /> : null;
  const renderMarkers = () => markers.map((marker, i) => <Marker key={i} position={{
    lat: marker._latitude,
    lng: marker._longitude,
  }}
  icon={{
    url: busStopIcon,
    anchor: new window.google.maps.Point(16,16),
    scaledSize: new window.google.maps.Size(32,32)
  }} />);

  return (
    <Map
      google={window.google}
      zoom={mapOptions.zoom}
      styles={mapStyles}
      center={mapOptions.center}
      disableDefaultUI={true}
      zoomControl={true}>
      {renderPolyline()}
      {renderMarkers()}
    </Map>
  );
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyD1aCwKJ42a5xoT7lk4EEgdHueW0vMY8TA',
  libraries: ['geometry'],
})(BusTripsMap); 
