import { React, createContext, useContext, useReducer } from "react";
import reducer, { initialState } from "./reducers/reducer.js";

export const DataContext = createContext();

export const DataProvider = ({ children }) => (
  <DataContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </DataContext.Provider>
);

export const useDataLayerValue = () => useContext(DataContext);
