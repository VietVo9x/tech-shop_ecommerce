import { User } from '../entity/user.entity';

export interface I_Login {
  token: string;
  user: User_Res;
}
export interface User_Res {
  id: number;
  user_name: string;
  email: string;
  status: boolean;
  role: number;
  full_name: string;
  phone: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
