import { useEffect, useReducer, useRef, useState } from "react";

interface State<T> {
  data?: T;
  error?: Error;
  revalidate: () => void;
}

type Action<T> =
  | { type: "loading" }
  | { type: "completed"; payload: T }
  | { type: "error"; payload: Error };


/**
 * Fetch is called twice in devmode due to react 18 new stricmode.
 * https://github.com/facebook/react/issues/24502
 */

export function useGet<T = unknown>(url: string, options?: RequestInit): State<T> {
  const cancelRequest = useRef(false);
  const [retrigger, setRetrigger] = useState(false);

  const revalidate = () => setRetrigger(!retrigger);

  const initialState: State<T> = {
    error: undefined,
    data: undefined,
    revalidate,
  };

  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case "loading":
        return { ...initialState };
      case "completed":
        return { ...initialState, data: action.payload };
      case "error":
        return { ...initialState, error: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    if (!url) return;

    cancelRequest.current = false;

    const fetchData = async () => {
      dispatch({ type: "loading" });

      try {
        const response = await fetch(url, { ...options });
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = (await response.json()) as T;

        if (cancelRequest.current) return;

        dispatch({ type: "completed", payload: data });
      } catch (error) {
        if (cancelRequest.current) return;

        dispatch({ type: "error", payload: error as Error });
      }
    };

    void fetchData();

    return () => {
      cancelRequest.current = true;
    };
  }, [url, retrigger]);

  return { ...state, revalidate };
}
