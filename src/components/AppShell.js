import React, { useEffect, useState } from 'react';
import axios from 'axios';

import tripsMock from '../utils/trips';

import BusTripsMap from './BusTripsMap';
import TripsList from './TripsList';

function AppShell() {
  const [trips, setTrips] = useState(tripsMock);
  const [selectedTrip, setSelectedTrip] = useState();

  const fetchTrips = async () => {
    try {
      const { data } = await axios(
        'https://europe-west1-metropolis-fe-test.cloudfunctions.net/api/trips',
      );
      setTrips(data);
    } catch (error) {
      // do nothing
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const onSelectTrip = (trip) => {
    setSelectedTrip(trip);
  }

  return (
    <div>
      <TripsList trips={trips} onSelectTrip={onSelectTrip} />
      <BusTripsMap trip={selectedTrip} />
    </div>
  );
}

export default AppShell;
