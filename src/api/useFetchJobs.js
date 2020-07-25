import { useReducer, useEffect } from "react";
import axios from "axios";

const BASE_URL =
  "https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json";
const ACTIONS = {
  MAKE_REQUEST: "make-request",
  GET_DATA: "get-data",
  ERROR: "error",
};

const initialState = {
  jobs: [],
  loading: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.MAKE_REQUEST:
      return { loading: true, jobs: [] };

    case ACTIONS.GET_DATA:
      return { ...state, loading: false, jobs: action.payload.jobs };

    case ACTIONS.ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        jobs: [],
      };

    default:
      return state;
  }
};

export default function useFetchJobs(params, pageNumber) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: ACTIONS.MAKE_REQUEST });
    axios
      .get(BASE_URL, {
        params: { markdown: true, page: pageNumber, ...params },
      })
      .then((res) => {
        dispatch({ type: ACTIONS.GET_DATA, payload: { jobs: res.data } });
      })
      .catch((e) => {
        dispatch({ type: ACTIONS.ERROR, payload: { error: e } });
      });
  }, [params, pageNumber]);
  return state;

  //   {
  //     jobs: [],
  //     loading: false,
  //     error: false,
  //   };
}