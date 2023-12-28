import { ChangePasswordEntity } from '../../types/entity';
import { Req_UpdatePassword, Req_UserUpdate } from '../../types/request.type';
import { patchData } from '../../utils/api.services';
import { isFileValidSize, isValidFileType } from '../../utils/common/validate-file';
import {
  _PROFILE_UPDATE_AVATAR,
  _PROFILE_UPDATE_INFO,
  _USER_LOGIN,
  _USER_UPDATE_PASSWORD,
} from '../../utils/constant.api';

export default class AccountService {
  async UpdateInfo(id: number, dataForm: Req_UserUpdate) {
    try {
      return await patchData(_PROFILE_UPDATE_INFO, id, dataForm);
    } catch (error) {
      throw error;
    }
  }
  validateUpdatePassword(updatePassword: Req_UpdatePassword) {
    try {
      const errors = {
        isError: false,
        msgOldPassword: '',
        msgNewPassword: '',
        msgConfirmPassword: '',
      };
      if (!updatePassword.oldPassword) {
        errors.isError = true;
        errors.msgOldPassword = 'old password is not empty';
      } else if (updatePassword.oldPassword.length < 8) {
        errors.isError = true;
        errors.msgOldPassword = 'old password must be greater than 8 characters';
      } else if (updatePassword.oldPassword.length > 20) {
        errors.isError = true;
        errors.msgOldPassword = 'old password must not be longer than 20 characters';
      }
      if (!updatePassword.newPassword) {
        errors.isError = true;
        errors.msgNewPassword = 'new password is not empty';
      } else if (updatePassword.newPassword.length < 8) {
        errors.isError = true;
        errors.msgNewPassword = 'new password must be greater than 8 characters';
      } else if (updatePassword.newPassword.length > 20) {
        errors.isError = true;
        errors.msgNewPassword = 'new password must not be longer than 20 characters';
      }
      if (!updatePassword.confirmPassword) {
        errors.isError = true;
        errors.msgConfirmPassword = 'confirm password is not empty';
      } else if (updatePassword.confirmPassword !== updatePassword.newPassword) {
        errors.isError = true;
        errors.msgConfirmPassword = 'confirm password is not the same as new password';
      }
      return errors;
    } catch (error) {
      throw error;
    }
  }
  async UpdatePassword(updatePassword: ChangePasswordEntity, id: number) {
    console.log(updatePassword);
    try {
      return await patchData(_USER_UPDATE_PASSWORD, id, updatePassword);
    } catch (error) {
      throw error;
    }
  }
  validateFile(file: File) {
    const error = {
      isError: false,
      msgFile: '',
    };

    if (!file) {
      error.isError = true;
      error.msgFile = 'File is not selected.';
    }

    const invalidFilesSize = isFileValidSize(file);
    const invalidFilesType = isValidFileType(file.name);
    if (!invalidFilesSize) {
      error.isError = true;
      error.msgFile = 'Image maximum size is 1MB';
    } else if (!invalidFilesType) {
      error.isError = true;
      error.msgFile = 'Image must be jpg,png,jpeg';
    }

    return error;
  }
  async UpdateAvatar(id: number, file: File) {
    try {
      const formData = new FormData();
      formData.append('avatar', file);
      return await patchData(_PROFILE_UPDATE_AVATAR, id, formData);
    } catch (error) {
      throw error;
    }
  }
}
