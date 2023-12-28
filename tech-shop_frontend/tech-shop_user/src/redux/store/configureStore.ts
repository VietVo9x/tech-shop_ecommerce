import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import AuthReducer from '../slice/auth.slice';
import CartReducer from '../slice/cart.slice';

export const store = configureStore({
  reducer: {
    cart: CartReducer,
    auth: AuthReducer,
  },
});

// export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
