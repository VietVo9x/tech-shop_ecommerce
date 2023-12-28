import { Req_CartUpdate } from '../../types/request.type';
import { deleteData, getData, patchData } from '../../utils/api.services';
import { _CART, _CART_CLEAR_ALL, _CART_DELETE_ITEM } from '../../utils/constant.api';

export class CartServices {
  async getCart() {
    return await getData(_CART);
  }
  async updateProductCart(id: number, cartUpdate: Req_CartUpdate) {
    try {
      return await patchData(_CART, id, cartUpdate);
    } catch (error) {
      throw error;
    }
  }
  async deleteProductCart(cartId: number) {
    try {
      return await deleteData(_CART_DELETE_ITEM, cartId);
    } catch (error) {
      throw error;
    }
  }
  async clearCart() {
    try {
      return await getData(_CART_CLEAR_ALL);
    } catch (error) {
      throw error;
    }
  }
}
