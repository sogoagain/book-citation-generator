import { configureStore, ThunkAction } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import rootReducer, { RootState } from './reducer';

const store = configureStore({ reducer: rootReducer });

export type DispatchType = typeof store.dispatch;
export type ThunkType = ThunkAction<void, RootState, unknown, Action<string>>;
export type ThunkDispatchType = ThunkDispatch<RootState, void, Action>;
export type ThunkGetStateType = () => RootState;

export const useTypedDispatch = () => useDispatch<DispatchType>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
