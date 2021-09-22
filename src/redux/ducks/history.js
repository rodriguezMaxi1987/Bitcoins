const initialState = {
    data:[]
};
  
  export const HISTORY_START = "HISTORY_START";
  export const HISTORY_SUCCESS = "HISTORY_SUCCESS";
  export const HISTORY_ERROR = "HISTORY_ERROR";
  export const CLEAR_STATE = "CLEAR_STATE";
  
  export const INITIAL_STATE = "INITIAL_STATE";
  
  export default function HistoryData(state = initialState, action) {
    switch (action.type) {
      case HISTORY_START:
        return {
          ...state,
          id: Math.random(),
          date: new Date,
          status: "En preceso",
        };
      case HISTORY_SUCCESS:
        return {
          ...state,
          data: state.data.concat(action.payload) 
        };
      case HISTORY_ERROR:
        return {
          ...state,
          data: [...state, action.payload]
        };
      case INITIAL_STATE:
        return { ...state };
      case CLEAR_STATE:
        return {
          ...state, data: []

        };
      default:
        return { ...state };
    }
  }
  
  export const historyStart = () => {
    return {
      type: HISTORY_START,
    };
  };
  
  export const historySuccess = (response) => {
   
    return {
      type: HISTORY_SUCCESS,
      payload:  response
    };
  };
  
  export const historyError = (error) => {
    return {
      type: HISTORY_ERROR,
      payload: error,
    };
  };
  
  export const clearState = () => {
    return {
      type: CLEAR_STATE,
    };
  };
  
  export const saveHistory = (data) => { 
    try {
      return (dispatch) => {
        dispatch(historySuccess(data));
      };
    } catch (error) {
      dispatch(historyError());
    }
  };
  