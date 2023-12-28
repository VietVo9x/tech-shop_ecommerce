export interface Err_UserRegister {
  isError: boolean;
  msgEmail: string;
  msgUserName: string;
  msgPassword: string;
  msgPasswordConfirm: string;
}
export interface Err_UserLogin {
  isError: boolean;
  msgEmail: string;
  msgPassword: string;
}
export interface Err_Checkout_AddressForm {
  isError: boolean;
  msgFullName: string;
  msgAddress: string;
  msgPhone: string;
  msgProvince: string;
  msgCity: string;
}
export interface Err_Update_PasswordForm {
  isError: boolean;
  msgOldPassword: string;
  msgNewPassword: string;
  msgConfirmPassword: string;
}
export interface Err_Shipping_AddressForm {
  isError: boolean;
  msgName: string;
  msgPhone: string;
  msgAddress: string;
}
