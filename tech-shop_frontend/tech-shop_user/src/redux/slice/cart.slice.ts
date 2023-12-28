import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface I_Total_Cart {
  quantity: number;
}
const initialState: I_Total_Cart = {
  quantity: 0,
};
const CartSlice = createSlice({
  name: 'cart', // ten luu tru trong store truy van tu useSelector
  initialState: initialState,
  reducers: {
    setTotalCart: (state, action: PayloadAction<number>) => {
      state.quantity = action.payload;
    },
  },
});

export const { setTotalCart } = CartSlice.actions; //lay action ra cho dispatch su dung
export default CartSlice.reducer; // cung cap reducer
