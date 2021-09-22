const initialState = {
  id: null,
  saldo: 500000.0,
  amount: null,
  currency: "BTC",
  comicion: null,
  direccion: null,
  descripcion: "Send bitconis",
  date: null,
  status: null,
};

export const TRANSACTION_START = "TRANSACTION_START";
export const TRANSACTION_SUCCESS = "TRANSACTION_SUCCESS";
export const TRANSACTION_ERROR = "TRANSACTION_ERROR";
export const CLEAR_STATE = "CLEAR_STATE";

export const INITIAL_STATE = "INITIAL_STATE";

export default function BitcoinData(state = initialState, action) {
  switch (action.type) {
    case TRANSACTION_START:
      return {
        ...state,
        id: Math.random(),
        date: new Date().toISOString().replace(/T/, " ").replace(/\..+/, ""),
        status: "En preceso",
      };
    case TRANSACTION_SUCCESS:
      return {
        ...state,
        amount: action.payload.amount,
        comicion: action.payload.comicion,
        direccion: action.payload.direccion,
        saldo: action.payload.saldo,
        status: action.payload.status,
      };
    case TRANSACTION_ERROR:
      return {
        ...state,
        status: action.payload.status,
        direccion: action.payload.direccion,
        saldo: action.payload.saldo,
        status: action.payload.status,
      };
    case INITIAL_STATE:
      return { ...state };
    case CLEAR_STATE:
      return {
        ...state,
        id: null,
        saldo: 500000.0,
        amount: null,
        currency: "BTC",
        comicion: null,
        direccion: null,
        descripcion: "Send bitconis",
        date: null,
        status: null,
      };
    default:
      return { ...state };
  }
}

export const transactionStart = () => {
  return {
    type: TRANSACTION_START,
  };
};

export const transactionSuccess = (response) => {
  return {
    type: TRANSACTION_SUCCESS,
    payload: response,
  };
};

export const transactionError = (error) => {
  return {
    type: TRANSACTION_ERROR,
    payload: error,
  };
};

export const clearState = () => {
  return {
    type: CLEAR_STATE,
  };
};

export const enviarBitcoins = (data) => {
  const copyState = [initialState];

  try {
    return (dispatch) => {
      dispatch(transactionStart());
      let payload = {
        id: data.id,
        amount: data.amount,
        comicion: data.comicion,
        direccion: data.direccion,
        saldo: data.saldo,
        status: "SUCCESS",
      };
      dispatch(transactionSuccess(payload));
    };
  } catch (error) {
    dispatch(transactionError());
  }
};
