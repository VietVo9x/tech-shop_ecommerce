export interface Req_UserRegister {
  user_name: string;
  email: string;
  password: string;
  confirm_password: string;
}
export interface Req_UserLogin {
  email: string;
  password: string;
}
export interface Req_ProductCart {
  product_id: number;
  quantity: number;
}
export interface Req_CartUpdate {
  quantity: number;
}
export interface Req_UserUpdate {
  email: string;
  user_name: string;
  full_name: string;
  phone: string;
}
export interface Req_UpdatePassword {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
export interface Req_ShoppingCartOrder {
  name: string;
  image: string;
  quantity: number;
  productId: number;
  total_price: number;
}
export interface Req_ShippingAddress {
  id: number;
  address: string;
  phone: string;
  useId?: number;
  name: string;
}
