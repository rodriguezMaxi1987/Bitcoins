import apiCall from "../api/axios";

const initialState = {
  data: null,
  error: "",
  item: false,
  loading: false,
};

export const GET_DATA_START = "GET_DATA_START";
export const GET_DATA_SUCCESS = "GET_DATA_SUCCESS";
export const GET_DATA_ERROR = "GET_DATA_ERROR";
export const CLEAR_STATE = "CLEAR_STATE";

export const INITIAL_STATE = "INITIAL_STATE";

export default function BitcoinData(state = initialState, action) {
  switch (action.type) {
    case GET_DATA_START:
      return { ...state, data: null, item: true, loading: true, error: "" };
    case GET_DATA_SUCCESS:
      return { ...state, data: action.payload, item: true, loading: false };
    case GET_DATA_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
        item: false,
        data: null,
      };
    case INITIAL_STATE:
      return { ...state };
    case CLEAR_STATE:
      return { ...state, data: null, loading: false, item: false, error: "" };
    default:
      return { ...state };
  }
}

export const getDataStart = () => {
  return {
    type: GET_DATA_START,
  };
};

export const getDataSuccess = (response) => {
  return {
    type: GET_DATA_SUCCESS,
    payload: response,
  };
};

export const getDataError = (error) => {
  return {
    type: GET_DATA_ERROR,
    payload: error,
  };
};

export const clearState = () => {
  return {
    type: CLEAR_STATE,
  };
};

export const getData = () => {
  return async (dispatch) => {
    try {
      const url = `https://ripio.com/api/v1/rates/`;
      dispatch(getDataStart());
      const res = await apiCall(url, "get");
      (res.id = 1),
        (res.currency = "Bitcoin"),
        (res.image = require("../../assets/images/bitcoin.png")),
        dispatch(getDataSuccess([res]));
    } catch (error) {
      dispatch(
        getDataError(
          error.response?.data?.status === "error" ? error : "ERROR NO MANEJADO"
        )
      );
    }
  };
};
