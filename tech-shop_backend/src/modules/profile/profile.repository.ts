import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entity/user.entity';
import { Repository } from 'typeorm';
import { Profile } from './entity/profile.entity';
import { I_Update_Info_Profile } from './interface/update-info.interface';

@Injectable()
export class ProfileRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Profile)
    private profileDB: Repository<Profile>,
  ) {}
  async save(model: any) {
    try {
      return await this.profileDB.save(model);
    } catch (error) {
      throw error;
    }
  }
  async getProfile(id: number): Promise<Profile> {
    return await this.profileDB.findOne({ where: { userId: id } });
  }
}
