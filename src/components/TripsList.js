import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import axios from 'axios';

const useStyles = createUseStyles({
  tripsList: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    width: '25%',
    overflow: 'auto',
    zIndex: 1,
  },
});

function TripsList() {
  const classes = useStyles();
  const [trips, setTrips] = useState([]);

  const fetchTrips = async () => {
    try {
      const { data } = await axios(
        'https://europe-west1-metropolis-fe-test.cloudfunctions.net/api/trips',
      );
      setTrips(data);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  return (
    <div className={classes.tripsList}>
      {trips.map((trip, i) => (
        <li key={i}>
          {trip.description}
        </li>
      ))}
    </div>
  );
}

export default TripsList;
