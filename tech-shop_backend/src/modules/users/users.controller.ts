import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/register-user.dto';
import { EmailService } from 'src/utils/mail.service';
import { User } from './entity/user.entity';
import { RolesGuard } from 'src/guards/role.guard';
import { LoginUserDto } from './dto/login-user.dto';
import { I_Login, User_Res } from './response-interface/login.res';
import { Message_Res } from '../../utils/message.res';
import { SendMailDTO } from './dto/send-mail.dto';
import { SearchConditions_Req } from './request-interface/seach-conditions.req';
import { GetAllUser_Res } from './response-interface/user.res';
import { StatusUserDto } from './dto/status-user.dto';
import { UpdatePasswordUserDto } from './dto/update-password-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService,
    private email: EmailService,
  ) {}

  @Post('register')
  async register(@Body() createUserDTO: CreateUserDTO) {
    try {
      const insertUser = await this.userService.register(createUserDTO);
      return insertUser;
    } catch (error) {
      throw error;
    }
  }
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<I_Login> {
    try {
      const auth = await this.userService.login(loginUserDto);
      return auth;
    } catch (error) {
      throw error;
    }
  }
  @Get()
  @UseGuards(new RolesGuard(1))
  async getUsers(@Query() query: SearchConditions_Req): Promise<GetAllUser_Res> {
    try {
      const users = await this.userService.getAllUser(query);
      return users;
    } catch (error) {
      throw error;
    }
  }
  @Get('verify-token')
  async verifyToken(@Req() req: Request): Promise<User_Res> {
    try {
      const user = (req as any).user;
      return await this.userService.verifyToken(user.id);
    } catch (error) {
      throw error;
    }
  }
  @Post('send-mail')
  @UseGuards(new RolesGuard(1))
  sendMail(@Body() body: SendMailDTO) {
    return this.email.sendMail(body.email, 'Hello');
  }

  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<User> {
    try {
      return await this.userService.getUserById(id);
    } catch (error) {
      throw error;
    }
  }

  @Patch('change-status/:id')
  @UseGuards(new RolesGuard(1))
  async updateStatus(
    @Param('id') id: number,
    @Body() updateUser: StatusUserDto,
  ): Promise<Message_Res> {
    try {
      return await this.userService.updateUser(id, updateUser);
    } catch (error) {
      throw error;
    }
  }
  @Patch('change-password/:id')
  async changePassword(@Param('id') id: number, @Body() updatePassWord: UpdatePasswordUserDto) {
    try {
      return await this.userService.changePassword(id, updatePassWord);
    } catch (error) {
      throw error;
    }
  }
}
