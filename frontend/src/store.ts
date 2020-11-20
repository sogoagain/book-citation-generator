import { configureStore, ThunkAction } from '@reduxjs/toolkit';
import { Action } from 'redux';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import rootReducer, { RootState } from './reducer';

export type ThunkType = ThunkAction<void, RootState, unknown, Action<string>>;
export type ThunkDispatchType = ThunkDispatch<RootState, unknown, Action>;
export type ThunkGetStateType = () => RootState;

const store = configureStore({ reducer: rootReducer });

export const useTypedDispatch = () => useDispatch<ThunkDispatchType>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
