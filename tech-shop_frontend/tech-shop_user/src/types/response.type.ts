export interface Res_UserLogin {
  token: string;
  user: Res_UserInfoLogin;
}
export interface Res_UserInfoLogin {
  id: number;
  user_name: string;
  full_name: string;
  status: boolean;
  role: number;
  email: string;
  phone: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
}
export interface Res_Category {
  id: number;
  name: string;
  description: string;
  status: boolean;
  isDelete: boolean;
}
export interface Res_Image {
  id: number;
  imageUrl: string;
  productId: number;
}
export interface Res_Product {
  id: number;
  price: number;
  product_name: string;
  quantity_stock: number;
  description: string;
  categoryId: number;
  brandId: number;
  status: boolean;
  isDelete: boolean;
  createdAt: string;
  updatedAt: string;
  images: Res_Image[];
  category: Res_Category;
}
export interface Res_Comment {
  id: number;
  productId: number;
  userId: number;
  user_name: string;
  comment: string;
  rate: number;
  image_user: string;
  createdAt: string;
  updatedAt: string;
}

export interface Res_CartItem {
  id: number;
  quantity: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  product: Res_Product;
}
export interface Res_ShippingAddress {
  id: number;
  address: string;
  phone: string;
  useId?: number;
  name: string;
}
export interface Res_Orders {
  id: number;
  userId: number;
  user_name: string;
  status: false;
  all_price: number;
  createdAt: string;
  updatedAt: string;
  shippingAddressId: number;
  orderDetails: Res_OrderDetail[];
  shippingAddress: Res_ShippingAddress;
}
export interface Res_OrderDetail {
  id: number;
  name: string;
  image: string;
  quantity: number;
  productId: number;
  total_price: number;
  orderId: number;
}
