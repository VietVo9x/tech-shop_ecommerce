import { User } from '../entity/user.entity';

export interface GetAllUser_Res {
  users: User[];
  totalUsers: number;
}
