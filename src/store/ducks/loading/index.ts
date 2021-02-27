import { createReducer } from 'reduxsauce';
import { Types } from './actions';
import { LoadingState } from './types';

/* Initial State */
const initialState: LoadingState = {
  loadingProcesses: 0,
  loading: false,
};

// Reducer Handlers
const start = (state = initialState) => ({
  ...state,
  loadingProcesses: state.loadingProcesses + 1,
  loading: true,
});

const stop = (state = initialState) => {
  if (state.loadingProcesses > 1) {
    return { ...state, loadingProcesses: state.loadingProcesses - 1 };
  }
  return { ...state, loadingProcesses: 0, loading: false };
};

// Mapping our action types to our reducer functions
const loading = {
  [Types.START]: start,
  [Types.STOP]: stop,
};

export default createReducer(initialState, loading);
