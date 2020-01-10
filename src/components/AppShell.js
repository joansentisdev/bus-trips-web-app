import React, { useEffect, useState } from 'react';
import axios from 'axios';

import tripsMock from '../utils/trips';

import BusLinesMap from './BusLinesMap';
import TripsList from './TripsList';

function AppShell() {
  const [trips, setTrips] = useState(tripsMock);

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

  return (
    <div>
      <TripsList trips={trips} />
      <BusLinesMap />
    </div>
  );
}

export default AppShell;
