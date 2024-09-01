const initialState = {
    userGrowth: [],
    revenue: [],
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USER_GROWTH':
        return { ...state, userGrowth: action.payload };
      case 'SET_REVENUE':
        return { ...state, revenue: action.payload };
      default:
        return state;
    }
  };
  
  export default rootReducer;
  