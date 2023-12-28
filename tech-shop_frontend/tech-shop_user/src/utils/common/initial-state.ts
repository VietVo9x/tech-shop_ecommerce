export const initialUser = {
  id: 0,
  user_name: '',
  full_name: '',
  status: false,
  role: 0,
  email: '',
  phone: '',
  address: '',
  avatar: '',
  createdAt: '',
  updatedAt: '',
  deletedAt: null,
};
export const initialImageProduct = {
  id: 0,
  imageUrl: '',
  productId: 0,
};
export const initialProduct = {
  id: 0,
  price: 0,
  product_name: '',
  quantity_stock: 0,
  description: '',
  categoryId: 0,
  brandId: 0,
  status: false,
  isDelete: false,
  createdAt: '',
  updatedAt: '',
  images: [],
  category: { id: 0, name: '', description: '', status: false, isDelete: false },
};
export const initialShippingAddress = {
  id: 0,
  address: '',
  phone: '',
  useId: 0,
  name: '',
};
