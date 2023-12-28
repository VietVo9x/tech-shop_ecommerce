import { CommentEntity, CreateCartEntity } from '../../types/entity';
import { getData, getDataForID, postData } from '../../utils/api.services';
import {
  _CART,
  _COMMENT,
  _COMMENT_BY_PRODUCT,
  _PRODUCT,
  _PRODUCT_BY_ID,
} from '../../utils/constant.api';

export class SingleProductServices {
  async getProduct(id: string | number) {
    try {
      const product = await getDataForID(_PRODUCT_BY_ID, id);
      return product;
    } catch (error) {
      throw error;
    }
  }
  async getCommentsByProduct(id: number) {
    try {
      return await getDataForID(_COMMENT_BY_PRODUCT, id);
    } catch (error) {
      throw error;
    }
  }
  async createCart(cart: CreateCartEntity) {
    try {
      return await postData(_CART, cart);
    } catch (error) {
      throw error;
    }
  }
  async getCart() {
    try {
      return await getData(_CART);
    } catch (error) {
      throw error;
    }
  }
  validateComment(comment: CommentEntity) {
    const error = {
      isError: false,
      msgError: '',
    };
    if (!comment.comment || comment.rate == 0) {
      error.isError = true;
      error.msgError = 'Please enter rating and comment';
    }
    return error;
  }
  async insertComment(comment: CommentEntity) {
    try {
      return await postData(_COMMENT, comment);
    } catch (error) {
      throw error;
    }
  }
}
