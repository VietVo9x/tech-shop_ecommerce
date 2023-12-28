import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import { config } from 'dotenv';
import { I_Login, User_Res } from './response-interface/login.res';

import { Message_Res } from '../../utils/message.res';
import { SearchConditions_Req } from './request-interface/seach-conditions.req';
import { Like } from 'typeorm';
import { User } from './entity/user.entity';
import { CreateUserDTO } from './dto/register-user.dto';
import { ProfileRepository } from '../profile/profile.repository';
import { GetAllUser_Res } from './response-interface/user.res';
import { LoginUserDto } from './dto/login-user.dto';
import { StatusUserDto } from './dto/status-user.dto';
import { PasswordService } from 'src/utils/hassPass';
import { UpdatePasswordUserDto } from './dto/update-password-user.dto';
config();

@Injectable()
export class UsersService {
  constructor(
    private userRepository: UserRepository,
    private profileRepository: ProfileRepository,
    private passwordService: PasswordService,
  ) {}

  async register(createUserDTO: CreateUserDTO): Promise<Message_Res> {
    const checkMail = await this.userRepository.findByEmail(createUserDTO.email);
    if (checkMail) throw new BadRequestException('Email already exists');
    const checkName = await this.userRepository.findByName(createUserDTO.user_name);
    if (checkName) throw new BadRequestException('User Name already exists');
    try {
      const hashPassword = await this.passwordService.hashPassword(createUserDTO.password, 12);
      createUserDTO.password = hashPassword;
      const insertUser = await this.userRepository.save(createUserDTO);
      const profile = {
        full_name: '',
        phone: '',
        avatar:
          'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
        userId: insertUser.id,
      };
      await this.profileRepository.save(profile);
      return { message: 'register successfully' };
    } catch (error) {
      throw error;
    }
  }
  async login(loginUserDto: LoginUserDto): Promise<I_Login> {
    const user = await this.userRepository.findByEmail(loginUserDto.email);
    if (!user) throw new NotFoundException('Email not found');
    if (user.status == false) throw new BadRequestException('User is Logged');
    if (!(await bcrypt.compare(loginUserDto.password, user.password)))
      throw new BadRequestException('Password incorrect');
    try {
      const payload = {
        id: user.id,
        role: user.role,
      };
      const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY);
      delete user.password;
      const result = {
        id: user.id,
        user_name: user.user_name,
        email: user.email,
        status: user.status,
        role: user.role,
        full_name: user.profile.full_name,
        phone: user.profile.phone,
        avatar: user.profile.avatar,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        deletedAt: user.deletedAt,
      };
      return {
        token: accessToken,
        user: result,
      };
    } catch (error) {
      throw error;
    }
  }
  async getAllUser(model: SearchConditions_Req): Promise<GetAllUser_Res> {
    try {
      const pageNumber = model.page || 1;
      const perPage = model.limit || 10;
      const offset = (pageNumber - 1) * perPage;
      const searchConditions: any = {
        where: {},
        order: {},
        take: perPage, // Số lượng bản ghi mỗi trang
        skip: offset, // Vị trí bắt đầu lấy bản ghi
      };

      if (model.search_name) {
        searchConditions.where.user_name = Like(`%${model.search_name}%`);
      }

      if (model.sort_name) {
        if (model.sort_name == 'date') {
          searchConditions.order.createdAt =
            model.sort_order.toUpperCase() == 'DESC' ? 'DESC' : 'ASC';
        }
        if (model.sort_name == 'name') {
          searchConditions.order.user_name =
            model.sort_order.toUpperCase() == 'DESC' ? 'DESC' : 'ASC';
        }
      }

      const res = await this.userRepository.getAllUser(searchConditions);

      return res;
    } catch (error) {
      throw error;
    }
  }
  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.getUserById(id);
    if (!user) throw new NotFoundException('User not found');
    try {
      return user;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(id: number, userUpdate: StatusUserDto): Promise<Message_Res> {
    try {
      const user = await this.userRepository.findUserById(id);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      user.status = userUpdate.status;

      await this.userRepository.save(user);

      return {
        message: 'change status successfully',
      };
    } catch (error) {
      throw error;
    }
  }

  async changePassword(id: number, updatePassWord: UpdatePasswordUserDto) {
    const user = await this.userRepository.findUserById(id);
    if (!user) throw new NotFoundException(`User ${id} does not exist`);
    const checkPass = await this.passwordService.comparePasswords(
      updatePassWord.oldPassword,
      user.password,
    );
    if (!checkPass) throw new BadRequestException('Passwords do not match');
    try {
      const hassPass = await this.passwordService.hashPassword(updatePassWord.newPassword, 12);
      user.password = hassPass;
      await this.userRepository.save(user);
      return {
        message: 'change password successfully',
      };
    } catch (error) {
      throw error;
    }
  }

  async verifyToken(id: number): Promise<User_Res> {
    const user = await this.userRepository.findUserById(id);
    if (!user) throw new NotFoundException('User not found');
    try {
      const result = {
        id: user.id,
        user_name: user.user_name,
        email: user.email,
        status: user.status,
        role: user.role,
        full_name: user.profile.full_name,
        phone: user.profile.phone,
        avatar: user.profile.avatar,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        deletedAt: user.deletedAt,
      };

      return result;
    } catch (error) {
      throw new error();
    }
  }
}
