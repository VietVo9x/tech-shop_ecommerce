import { Injectable } from '@nestjs/common';
import { User } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/register-user.dto';

import { GetAllUser_Res } from './response-interface/user.res';
import { StatusUserDto } from './dto/status-user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private userDB: Repository<User>,
  ) {}
  async findByEmail(email: string): Promise<User> {
    try {
      return await this.userDB.findOne({ relations: { profile: true }, where: { email } });
    } catch (error) {
      throw error;
    }
  }
  async findByName(user_name: string) {
    try {
      return await this.userDB.findOne({ relations: { profile: true }, where: { user_name } });
    } catch (error) {
      throw error;
    }
  }
  async findUserById(id: number): Promise<User> {
    try {
      return await this.userDB.findOne({ relations: { profile: true }, where: { id } });
    } catch (error) {
      throw error;
    }
  }
  async getAllUser(searchConditions: any): Promise<GetAllUser_Res> {
    try {
      const { where, order, skip, take } = searchConditions;
      // Tính toán số lượng người dùng
      const totalUsers = await this.userDB.count({ where: { ...where, role: 0 } });

      // Lấy danh sách người dùng
      const users = await this.userDB.find({
        relations: { profile: true },
        where: { ...where, role: 0 },
        order,
        skip,
        take,
      });

      return { totalUsers, users };
    } catch (error) {
      throw error;
    }
  }
  async getUserById(id: number): Promise<User> {
    try {
      return await this.userDB.findOne({
        relations: { profile: true },
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }
  async save(user: CreateUserDTO): Promise<User> {
    try {
      return await this.userDB.save(user);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async update(updateUser: StatusUserDto): Promise<User> {
    try {
      return await this.userDB.save(updateUser);
    } catch (error) {
      throw error;
    }
  }
}
