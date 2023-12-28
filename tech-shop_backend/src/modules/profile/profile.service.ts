import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ProfileRepository } from './profile.repository';
import { I_Update_Info_Profile } from './interface/update-info.interface';
import { I_Update_Avatar_Profile } from './interface/update-avatar.interface';
import { InfoProfileDTO } from './dto/profile.dto';

@Injectable()
export class ProfileService {
  constructor(private profileRepository: ProfileRepository) {}
  async updateAvatar(userId: number, avatarUpdate: string): Promise<{ message: string }> {
    const profile = await this.profileRepository.getProfile(userId);
    if (!profile) throw new NotFoundException(`Profile ${userId} not found`);
    try {
      profile.avatar = avatarUpdate;
      await this.profileRepository.save(profile);
      return { message: 'Avatar updated successfully' };
    } catch (error) {
      throw error;
    }
  }
  async updateInfo(userId: number, updateProfile: InfoProfileDTO) {
    const profile = await this.profileRepository.getProfile(userId);
    if (!profile) throw new NotFoundException('User not found');
    try {
      const newInfo = Object.assign(profile, updateProfile);
      await this.profileRepository.save(newInfo);
      return { message: 'Info update successfully' };
    } catch (error) {
      throw error;
    }
  }
}
