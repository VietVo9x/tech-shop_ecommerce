import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Res_UserInfoLogin } from '../../types/response.type';
import { initialUser } from '../../utils/common/initial-state';
export interface I_authState {
  isLogin: boolean;
  user: Res_UserInfoLogin;
}
const initialState = {
  isLogin: false,
  user: initialUser,
};
const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    loginSuccess: (state: I_authState, action: PayloadAction<Res_UserInfoLogin>) => {
      state.user = action.payload;
      state.isLogin = true;
    },
    logout: (state: I_authState) => {
      state.user = initialState.user;
      state.isLogin = false;
    },
  },
});
export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
