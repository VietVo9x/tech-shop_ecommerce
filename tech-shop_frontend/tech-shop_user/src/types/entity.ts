export interface ChangePasswordEntity {
  oldPassword: string;
  newPassword: string;
}
export interface UserRegisterEntity {
  user_name: string;
  email: string;
  password: string;
}
export interface CommentEntity {
  productId: number;
  userId: number;
  user_name: string;
  comment: string;
  rate: number;
  image_user: string;
}
export interface CreateCartEntity {
  productId: number;
  userId: number;
  quantity: number;
}
