import { Module } from '@nestjs/common';
import { UploadFileController } from './upload-file.controller';
import { UploadFileService } from './upload-file.service';
import { MulterModule } from '@nestjs/platform-express/multer/multer.module';
import { cloudinaryConfig, multerConfig } from 'src/config/file.config';

@Module({
  imports: [MulterModule.registerAsync({ useFactory: multerConfig })],
  controllers: [UploadFileController],
  providers: [UploadFileService],
})
export class UploadFileModule {
  constructor() {
    cloudinaryConfig();
  }
}
