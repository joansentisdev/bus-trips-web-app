import React from 'react';
import { createUseStyles } from 'react-jss';
import { ArrowRight, Calendar, Check, Circle, MapPin, X } from 'react-feather';
import classNames from 'classnames';
import moment from 'moment';

import { useStore } from "../store";

const statusColorMap = {
  ongoing: '#4caf50',
  scheduled: '#ff8f00',
  cancelled: '#e53935',
  finalized: '#7e57c2',
};

const useStyles = createUseStyles({
  tripCard: {
    display: 'flex',
    position: 'relative',
    background: '#0d1521',
    borderRadius: 8,
    marginRight: 16,
    minWidth: 320,
    maxWidth: 320,
    height: 80,
    color: '#ffffff',
    cursor: 'pointer',
    border: 'thin solid transparent',
    transition: '.2s all ease-in-out',
    '&:hover': {
      minWidth: 340,
      maxWidth: 340,
    },
    '@media(min-width: 800px)': {
      marginBottom: 16,
      marginLeft: 0,
    },
  },
  tripCardActive: {
    minWidth: 340,
    maxWidth: 340,
    border: 'thin solid',
  },
  tripCardPath: {
    flex: 1,
    padding: [12, 0, 12, 16],
  },
  tripCardPathItem: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 14,
    fontWeight: 600,
    '&:not(:last-of-type)': {
      position: 'relative',
      paddingBottom: 16,
      '&:before': {
        content: '""',
        position: 'absolute',
        top: 18,
        bottom: -2,
        left: 5,
        width: 1.5,
        background: 'rgba(255, 255, 255,.4)',
        borderRadius: 8,
      },
      '&:after': {
        content: '""',
        position: 'absolute',
        bottom: 6,
        left: 20,
        width: 'calc(100% - 20px)',
        height: 1,
        background: 'rgba(255, 255, 255,.1)',
        borderRadius: 8,
      },
    },
    '& svg': {
      marginRight: 8,
      strokeWidth: 3,
      color: '#5c6bc0',
    },
  },
  tripCardDuration: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: 80,
    fontSize: 18,
    '& > div': {
      fontSize: 14,
    },
  },
  tripCardStatus: ({ status }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -8,
    right: -8,
    width: 24,
    height: 24,
    background: statusColorMap[status],
    borderRadius: '50%',
    '& svg': {
      color: '#ffffff',
    },
  }),
});

function TripCard({ trip }) {
  const classes = useStyles(trip);
  const [{ selectedTrip }, dispatch] = useStore();
  const iconsize = 12;

  const getTripDuration = () => moment.duration(moment(trip.endTime).diff(trip.startTime)).as('minutes');

  const getStatusIcon = () => {
    const statusIconsMap = {
      ongoing: <ArrowRight size={iconsize} />,
      scheduled: <Calendar size={iconsize} />,
      cancelled: <X size={iconsize} />,
      finalized: <Check size={iconsize} />,
    };

    return statusIconsMap[trip.status];
  };

  const selectTrip = () => {
    dispatch({ type: "selectTrip", trip })
  };

  return (
    <div
      className={classNames(classes.tripCard, { [classes.tripCardActive]: selectedTrip === trip })}
      onClick={selectTrip}>
      <div className={classes.tripCardPath}>
        <div className={classes.tripCardPathItem}>
          <Circle size={iconsize} />
          {trip.origin.address}
        </div>
        <div className={classes.tripCardPathItem}>
          <MapPin size={iconsize} />
          {trip.destination.address}
        </div>
      </div>
      <div className={classes.tripCardDuration}>
        {getTripDuration()}
        <div>
          min
        </div>
      </div>
      <div className={classes.tripCardStatus}>
        {getStatusIcon()}
      </div>
    </div>
  );
}

export default TripCard;
