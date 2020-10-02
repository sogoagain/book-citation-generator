import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

import rootReducer, { RootState } from './reducer';

const store = configureStore({ reducer: rootReducer });

export type DispatchType = typeof store.dispatch;

export const useTypedDispatch = () => useDispatch<DispatchType>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
