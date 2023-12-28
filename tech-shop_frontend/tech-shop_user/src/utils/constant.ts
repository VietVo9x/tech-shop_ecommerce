import { Res_CartItem } from '../types/response.type';

export const perPage = 9;

//tong so cart
export const calculateTotalQuantity = (cartData: Res_CartItem[]): number => {
  return cartData.reduce((total: number, cartItem: Res_CartItem) => {
    return total + cartItem.quantity;
  }, 0);
};

//tong tien cart
export const totalPriceCart = (cart: Res_CartItem[]) => {
  let totalPrice = 0;
  // eslint-disable-next-line array-callback-return
  cart.map((item) => {
    totalPrice += item.quantity * item.product.price;
  });
  return totalPrice;
};

//format tien
export function formatCurrency(amount: number): string {
  return `$ ${amount.toFixed(2)}`;
}

//format date
export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString();
};
