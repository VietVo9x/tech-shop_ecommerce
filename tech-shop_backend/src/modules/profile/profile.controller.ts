import { Body, Controller, Param, Patch, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadFileService } from '../upload-file/upload-file.service';
import { ProfileService } from './profile.service';
import { InfoProfileDTO } from './dto/profile.dto';
import { Message_Res } from 'src/utils/message.res';

@Controller('profile')
export class ProfileController {
  constructor(
    private uploadFileService: UploadFileService,
    private profileService: ProfileService,
  ) {}
  @Patch('update-avatar/:id')
  @UseInterceptors(FileInterceptor('avatar'))
  async updateAvatar(@UploadedFile() file, @Param('id') id: number): Promise<Message_Res> {
    try {
      const avatar = await this.uploadFileService.uploadFile(file, 'avatars');
      const updateAvatar = await this.profileService.updateAvatar(id, avatar);
      return updateAvatar;
    } catch (error) {
      throw error;
    }
  }
  @Patch('update-info/:id')
  async updateInfo(
    @Param('id') id: number,
    @Body() profileUpdate: InfoProfileDTO,
  ): Promise<{ message: string }> {
    try {
      const updateInfo = await this.profileService.updateInfo(id, profileUpdate);
      return updateInfo;
    } catch (error) {
      throw error;
    }
  }
}
