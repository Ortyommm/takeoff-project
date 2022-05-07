import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const store = configureStore({ reducer: reducers });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
