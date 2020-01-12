import React, { createContext, useContext, useReducer } from 'react';
import tripsMock from '../utils/trips';

const StoreContext = createContext();
const initialState = { selectedTrip: null, trips: tripsMock };

const createReducer = handlers => (state, action) => {
  if (!handlers.hasOwnProperty(action.type)) {
    return state;
  }

  return handlers[action.type](state, action);
};

const reducer = createReducer({
  'selectTrip': (state, { trip }) => ({
    ...state,
    selectedTrip: trip,
  }),
  'updateTrips': (state, { trips }) => ({
    ...state,
    trips,
  }),
});

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={[state, dispatch]}>
      {children}
    </StoreContext.Provider>
  )
}

export const useStore = () => useContext(StoreContext);