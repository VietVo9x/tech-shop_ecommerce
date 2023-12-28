import { Req_UserLogin } from '../../../types/request.type';
import { getData, postData } from '../../../utils/api.services';
import { _CART, _USER_LOGIN, _VERIFY_TOKEN } from '../../../utils/constant.api';
export class LoginServices {
  async onLogin(dataForm: Req_UserLogin) {
    try {
      const result = await postData(_USER_LOGIN, dataForm);
      localStorage.setItem('token', result.token);
      return result.user;
    } catch (error) {
      throw error;
    }
  }
  async getCart(userId: number) {
    try {
      const cart = await getData(_CART, { id: userId });
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async validator(dataForm: Req_UserLogin) {
    const error = {
      isError: false,
      msgEmail: '',
      msgPassword: '',
    };

    //check mail
    const validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!validRegex.test(dataForm.email)) {
      error.isError = true;
      error.msgEmail = 'Email is not in the correct format';
    }

    //check password
    if (!dataForm.password) {
      error.isError = true;
      error.msgPassword = 'Password cannot be empty';
    } else if (dataForm.password.length < 8) {
      error.isError = true;
      error.msgPassword = 'Password must be at least 8 characters long';
    } else if (dataForm.password.length > 20) {
      error.isError = true;
      error.msgPassword = 'Password must not be longer than 20 characters';
    }

    // return all error
    return error;
  }
}
