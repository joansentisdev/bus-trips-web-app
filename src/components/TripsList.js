import React, { useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import axios from 'axios';

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
  const [{ trips }, dispatch] = useStore();

  const fetchTrips = async () => {
    try {
      const { data: trips } = await axios(
        'https://europe-west1-metropolis-fe-test.cloudfunctions.net/api/trips',
      );
      dispatch({ type: "updateTrips", trips });
    } catch (error) {
      // do nothing
    }
  };

  useEffect(() => {
    fetchTrips();
  },
  // eslint-disable-next-line
  []);

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
