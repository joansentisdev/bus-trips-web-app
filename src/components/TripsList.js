import React from 'react';
import { createUseStyles } from 'react-jss';

import TripCard from './TripCard';

const useStyles = createUseStyles({
  tripsList: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    width: 360,
    padding: [12, 12, 24, 12],
    overflow: 'auto',
    zIndex: 1,
  },
});

function TripsList({ trips }) {
  const classes = useStyles();

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
