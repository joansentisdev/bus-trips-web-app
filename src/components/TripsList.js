import React from 'react';
import { createUseStyles } from 'react-jss';

import { useStore } from "../store";

import TripCard from './TripCard';

const useStyles = createUseStyles({
  tripsList: {
    display: 'flex',
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    padding: [12, 12, 24, 12],
    overflow: 'auto',
    zIndex: 1,
    '@media(min-width: 800px)': {
      display: 'block',
      top: 0,
      right: 'auto',
    },
  },
});

function TripsList() {
  const classes = useStyles();
  const [{ trips }] = useStore();

  return (
    <div className={classes.tripsList}>
      {trips.map((trip, i) => (
        <TripCard
          key={i} 
          trip={trip} />
      ))}
    </div>
  );
}

export default TripsList;
