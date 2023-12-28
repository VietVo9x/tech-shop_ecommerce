import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { displayError } from '../../utils/display-error';
import { Err_Update_PasswordForm } from '../../types/error.type';
import { Req_UpdatePassword } from '../../types/request.type';
import { Res_UserInfoLogin } from '../../types/response.type';
import AccountService from './account.service';
import { displaySuccessMessage } from '../../utils/display-success';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/configureStore';

export default function UpdatePasswordUser() {
  const accountSerview = new AccountService();
  const user = useSelector((state: RootState) => state.auth.user);
  const [isLoading, setIsLoading] = useState(false);
  const [updatePassword, setUpdatePassword] = useState<Req_UpdatePassword>({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Err_Update_PasswordForm>({
    isError: false,
    msgOldPassword: '',
    msgNewPassword: '',
    msgConfirmPassword: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setUpdatePassword({ ...updatePassword, [name]: value });
  };
  const handleSaveClick = async () => {
    setIsLoading(true);
    try {
      const result = accountSerview.validateUpdatePassword(updatePassword);
      setErrors(result);
      if (result.isError) {
        setIsLoading(false);
        return;
      }
      const updatePasswordEntity = {
        oldPassword: updatePassword.oldPassword,
        newPassword: updatePassword.newPassword,
      };
      if (user)
        await accountSerview.UpdatePassword(updatePasswordEntity, (user as Res_UserInfoLogin).id);
      setIsLoading(false);
      displaySuccessMessage('update password successfully');
    } catch (error) {
      setIsLoading(false);
      displayError(error);
    }
  };
  return (
    <Box component={'form'} maxWidth={'450px'}>
      <ToastContainer />
      <TextField
        id="outlined-basic"
        label="Old Password"
        variant="outlined"
        name={'oldPassword'}
        fullWidth
        style={{ marginTop: '16px' }}
        value={updatePassword.oldPassword}
        onChange={handleChange}
        error={Boolean(errors.msgOldPassword)}
        helperText={errors.msgOldPassword}
        type="password"
      />
      <TextField
        id="outlined-basic"
        label="New Password"
        variant="outlined"
        fullWidth
        name="newPassword"
        style={{ marginTop: '16px' }}
        value={updatePassword.newPassword}
        onChange={handleChange}
        error={Boolean(errors.msgNewPassword)}
        helperText={errors.msgNewPassword}
        type="password"
      />
      <TextField
        id="outlined-basic"
        label="Comfirm Password"
        variant="outlined"
        fullWidth
        name="confirmPassword"
        style={{ marginTop: '16px', marginBottom: '16px' }}
        value={updatePassword.confirmPassword}
        onChange={handleChange}
        error={Boolean(errors.msgConfirmPassword)}
        helperText={errors.msgConfirmPassword}
        type="password"
      />

      <Button
        fullWidth
        variant="contained"
        onClick={handleSaveClick}
        color="success"
        disabled={isLoading}
      >
        Save
      </Button>
    </Box>
  );
}
