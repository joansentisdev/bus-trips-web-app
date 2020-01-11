import React, { useEffect, useState } from 'react';
import { GoogleApiWrapper, InfoWindow, Map, Marker, Polyline } from 'google-maps-react';
import axios from 'axios';

import { useStore } from "../store";
import mapStyles from '../utils/darkMapStyles';
import busStopIcon from '../assets/icons/circle.svg';
import spinnerIcon from '../assets/icons/spinner.svg';

function BusTripsMap() {
  const [{ selectedTrip }] = useStore();
  const [stops, setStops] = useState([]);
  const [activeMarker, setActiveMarker] = useState();
  const [selectedStop, setSelectedStop] = useState();
  const [mapOptions, setMapOptions] = useState({
    center: { lat: 0, lang: 0 },
    zoom: 3,
  });

  const getRoutePath = () => selectedTrip ? window.google.maps.geometry.encoding.decodePath(selectedTrip.route) : [];

  const resetInfoWindow = () => {
    setActiveMarker(null);
    setSelectedStop(null);
  };

  const onMarkerClick = (stop) => async (props, marker) => {
    resetInfoWindow();
    setActiveMarker(marker);

    if (['origin', 'destination'].includes(stop.id)) {
      setSelectedStop(stop);
      return;
    }

    try {
      const { data } = await axios(
        `https://europe-west1-metropolis-fe-test.cloudfunctions.net/api/stops/${stop.id}`,
      );
      setSelectedStop(data);
    } catch (error) {
      // do nothing
    }
  };

  useEffect(() => {
    if (!selectedTrip) {
      return;
    }

    resetInfoWindow();

    // Re-center the map based on the route path
    const bounds = new window.google.maps.LatLngBounds();
    const polyline = getRoutePath();
    polyline.forEach((item) => bounds.extend(item));
    setMapOptions({
      center: bounds.getCenter(),
      zoom: 12,
    });

    // Update the stops
    setStops([
      { ...selectedTrip.origin, id: 'origin' },
      { ...selectedTrip.destination, id: 'destination' },
      ...selectedTrip.stops.filter((stop) => Object.keys(stop).length !== 0),
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
          onClick={onMarkerClick(stop)}
        />
      ))}
      <Polyline path={getRoutePath()} strokeColor={'#3f51b5'} />
      <InfoWindow
        marker={activeMarker}
        visible={Boolean(activeMarker)}
        onClose={resetInfoWindow}>
        {selectedStop ? (
          <div>
            {selectedStop.address}
          </div>
        ) : <img src={spinnerIcon} alt="spinner" />}
      </InfoWindow>
    </Map>
  );
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyD1aCwKJ42a5xoT7lk4EEgdHueW0vMY8TA',
  libraries: ['geometry'],
})(BusTripsMap); 
