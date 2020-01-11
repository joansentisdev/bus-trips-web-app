import React from 'react';
import { createUseStyles } from 'react-jss';
import { ArrowRight, Check, Circle, Clock, MapPin, X } from 'react-feather';
import classNames from 'classnames';
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
    marginRight: 12,
    width: 320,
    height: 80,
    color: '#ffffff',
    cursor: 'pointer',
    transition: '.2s width ease-in-out',
    '&:hover': {
      width: 340,
    },
    '@media(min-width: 800px)': {
      marginBottom: 16,
      marginLeft: 0,
    },
  },
  tripCardActive: {
    width: 340,
    border: 'thin solid',
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
});

function TripCard({ trip }) {
  const classes = useStyles(trip);
  const [{ selectedTrip }, dispatch] = useStore();
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
      <div className={classes.tripCardStatus}>
        {getStatusIcon()}
      </div>
    </div>
  );
}

export default TripCard;
