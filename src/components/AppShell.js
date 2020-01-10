import React from 'react';
import BusLinesMap from './BusLinesMap';
import TripsList from './TripsList';

function AppShell() {
  return (
    <div>
      <TripsList />
      <BusLinesMap />
    </div>
  );
}

export default AppShell;
