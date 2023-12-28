import { Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { UploadFileService } from './upload-file.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadFileController {
  constructor(private uploadFileService: UploadFileService) {}

  @Post('single')
  @UseInterceptors(FileInterceptor('avatar'))
  async uploadFile(@UploadedFile() file): Promise<string> {
    return this.uploadFileService.uploadFile(file, 'avatars');
  }

  @Post('multiple')
  @UseInterceptors(FilesInterceptor('products', 4))
  async uploadFiles(@UploadedFiles() files): Promise<string[]> {
    const uploadedFileUrls: string[] = await Promise.all(
      files.map(async (file: any) => await this.uploadFileService.uploadFile(file, 'products')),
    );
    return uploadedFileUrls;
  }
}
