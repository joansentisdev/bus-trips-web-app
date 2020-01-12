import React from 'react';

import { StoreProvider } from '../store';

import TripsMap from './TripsMap';
import TripsList from './TripsList';

function AppShell() {
  return (
    <StoreProvider>
      <TripsList />
      <TripsMap />
    </StoreProvider>
  );
}

export default AppShell;
