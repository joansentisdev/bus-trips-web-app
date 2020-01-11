import React from 'react';

import { StoreProvider } from '../store';

import BusTripsMap from './BusTripsMap';
import TripsList from './TripsList';

function AppShell() {
  return (
    <StoreProvider>
      <TripsList />
      <BusTripsMap />
    </StoreProvider>
  );
}

export default AppShell;
