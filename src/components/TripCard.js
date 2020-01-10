import React from 'react';
import { createUseStyles } from 'react-jss';
import { ArrowRight, Check, Circle, Clock, MapPin, X } from 'react-feather';

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
    marginBottom: 16,
    minHeight: 80,
    color: '#ffffff',
  },
  tripCardPath: {
    flex: 1,
    padding: [12, 24, 12, 16],
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
  tripCardInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    minWidth: 100,
  },
  tripCardStatus: ({ status }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -4,
    right: -4,
    width: 24,
    height: 24,
    background: statusColorMap[status],
    borderRadius: '50%',
    '& svg': {
      color: '#ffffff',
    },
  }),
  tripCardAction: {
    border: 0,
    background: '#3f51b5',
    borderRadius: [8, 0, 8, 0],
    fontSize: 14,
    fontWeight: 600,
    color: '#ffffff',
    padding: [12, 20, 12, 20],
    outline: 0,
    cursor: 'pointer',
  },
});

function TripCard({ trip, onSelectTrip }) {
  const classes = useStyles(trip);
  const iconsize = 12;

  const getStatusIcon = () => {
    const statusIconsMap = {
      ongoing: <ArrowRight size={iconsize} />,
      scheduled: <Clock size={iconsize} />,
      cancelled: <X size={iconsize} />,
      finalized: <Check size={iconsize} />,
    };

    return statusIconsMap[trip.status];
  };

  const selectTrip = () => {
    onSelectTrip(trip);
  };

  return (
    <div className={classes.tripCard}>
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
      <div className={classes.tripCardInfo}>
        <div className={classes.tripCardStatus}>
          {getStatusIcon()}
        </div>
        <button
          className={classes.tripCardAction}
          onClick={selectTrip}>
          See trip
        </button>
      </div>
    </div>
  );
}

export default TripCard;
