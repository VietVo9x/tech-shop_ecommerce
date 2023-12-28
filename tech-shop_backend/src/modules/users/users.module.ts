import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserRepository } from './users.repository';
import { EmailService } from 'src/utils/mail.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Profile } from '../profile/entity/profile.entity';
import { FormatDateService } from 'src/utils/formatDate.service';
import { ProfileRepository } from '../profile/profile.repository';
import { PasswordService } from 'src/utils/hassPass';

@Module({
  imports: [TypeOrmModule.forFeature([Profile, User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    UserRepository,
    EmailService,
    FormatDateService,
    ProfileRepository,
    PasswordService,
  ],
  exports: [UsersService, UserRepository],
})
export class UsersModule {}
