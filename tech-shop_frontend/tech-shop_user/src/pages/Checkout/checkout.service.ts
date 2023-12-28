import { error } from 'console';
import { Err_Shipping_AddressForm } from '../../types/error.type';
import { Req_ShippingAddress, Req_ShoppingCartOrder } from '../../types/request.type';
import { postData } from '../../utils/api.services';
import { _ORDER } from '../../utils/constant.api';

export default class CheckoutService {
  createOrder(shippingAddress: Req_ShippingAddress, cartOrder: Req_ShoppingCartOrder[]) {
    try {
      const order = {
        cart: cartOrder,
        shippingAddress: shippingAddress,
      };
      return postData(_ORDER, order);
    } catch (error) {
      throw error;
    }
  }
  validate(formData: Req_ShippingAddress) {
    const errors = {
      isError: false,
      msgName: '',
      msgAddress: '',
      msgPhone: '',
    };
    if (!formData.address) {
      errors.isError = true;
      errors.msgAddress = 'address is required';
    } else if (formData.address.length > 255) {
      errors.isError = true;
      errors.msgAddress = 'address must be at least 255 characters';
    }
    if (!formData.name) {
      errors.isError = true;
      errors.msgName = 'Name is required';
    } else if (formData.name.length > 255) {
      errors.isError = true;
      errors.msgName = 'Name must be at least 255 characters';
    }
    if (!formData.phone) {
      errors.isError = true;
      errors.msgPhone = 'Phone is required';
    } else if (formData.phone.length > 255) {
      errors.isError = true;
      errors.msgPhone = 'Phone must be at least 255 characters';
    }
    return errors;
  }
}
