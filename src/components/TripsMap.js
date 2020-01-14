import React, { useEffect, useState } from 'react';
import { GoogleApiWrapper, Map, Marker, Polyline } from 'google-maps-react';

import { useStore } from "../store";
import mapStyles from '../utils/darkMapStyles';
import busStopIcon from '../assets/icons/circle.svg';

function TripsMap() {
  const [{ selectedTrip }] = useStore();
  const [stops, setStops] = useState([]);
  const [mapOptions, setMapOptions] = useState({
    center: { lat: 0, lang: 0 },
    zoom: 3,
  });

  const getRoutePath = () => selectedTrip ? window.google.maps.geometry.encoding.decodePath(selectedTrip.route) : [];

  useEffect(() => {
    if (!selectedTrip) {
      return;
    }

    // Re-center the map based on the route path
    const bounds = new window.google.maps.LatLngBounds();
    const polyline = getRoutePath();
    polyline.forEach((item) => bounds.extend(item));
    setMapOptions({
      center: bounds.getCenter(),
      zoom: 11,
    });

    // Update the stops
    setStops([
      selectedTrip.origin,
      selectedTrip.destination,
      ...selectedTrip.stops,
    ]);
  },
  // eslint-disable-next-line
  [selectedTrip]);

  return (
    <Map
      google={window.google}
      zoom={mapOptions.zoom}
      styles={mapStyles}
      center={mapOptions.center}
      disableDefaultUI={true}>
      {stops.map((stop, i) => (
        <Marker
          key={i}
          position={{
            lat: stop.point._latitude,
            lng: stop.point._longitude,
          }}
          icon={{
            url: busStopIcon,
            anchor: new window.google.maps.Point(12,12),
            scaledSize: new window.google.maps.Size(24,24)
          }}
        />
      ))}
      <Polyline path={getRoutePath()} strokeColor={'#3f51b5'} />
    </Map>
  );
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyASbQRSFT6Y8Wu__Os28cZsGYwmFL77oaY',
  libraries: ['geometry'],
})(TripsMap); 
