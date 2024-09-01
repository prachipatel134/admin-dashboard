import { getUserGrowth, getRevenue,fetchTweetVolume } from '../services/api';

export const fetchUserGrowth = () => async dispatch => {
  const response = await getUserGrowth();
  dispatch({ type: 'SET_USER_GROWTH', payload: response.data });
};

export const fetchRevenue = () => async dispatch => {
  const response = await getRevenue();
  dispatch({ type: 'SET_REVENUE', payload: response.data });
};
