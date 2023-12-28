import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { ProfileRepository } from './profile.repository';
import { UploadFileService } from '../upload-file/upload-file.service';
import { MulterModule } from '@nestjs/platform-express';
import { cloudinaryConfig, multerConfig } from 'src/config/file.config';
import { UserRepository } from '../users/users.repository';
import { Profile } from './entity/profile.entity';
import { User } from '../users/entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Profile, User]),
    MulterModule.registerAsync({ useFactory: multerConfig }),
  ],
  controllers: [ProfileController],
  providers: [ProfileService, ProfileRepository, UploadFileService, UserRepository],
})
export class ProfileModule {
  constructor() {
    cloudinaryConfig();
  }
}
