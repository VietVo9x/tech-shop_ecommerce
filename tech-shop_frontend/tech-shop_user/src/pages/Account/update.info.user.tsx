import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';
import { Res_UserInfoLogin } from '../../types/response.type';
import { Req_UserUpdate } from '../../types/request.type';
import { ToastContainer } from 'react-toastify';
import AccountService from './account.service';
import { displayError } from '../../utils/display-error';
import { displaySuccessMessage } from '../../utils/display-success';

interface Props {
  user: Res_UserInfoLogin | undefined;
  setFlag: Function;
  flag: boolean;
}
export default function UpdateInfoUser(props: Props) {
  const accountService = new AccountService();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [userUpdate, setUserUpdate] = useState<Req_UserUpdate>({
    email: '',
    user_name: '',
    full_name: '',
    phone: '',
  });

  useEffect(() => {
    if (props.user) {
      setUserUpdate({
        email: props.user?.email || '',
        user_name: props.user?.user_name || '',
        full_name: props.user?.full_name || '',
        phone: props.user?.phone || '',
      });
    }
  }, [props.user]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setUserUpdate({ ...userUpdate, [name]: value });
  };
  const handleEditClick = () => {
    setEditing(true);
  };
  const handleSaveClick = async () => {
    setEditing(false);
    setIsLoading(true);
    try {
      if (props.user) {
        await accountService.UpdateInfo(props.user.id, userUpdate);
        setIsLoading(false);
        displaySuccessMessage('Updated info successfully');
        props.setFlag(!props.flag);
        setEditing(false);
      }
    } catch (error) {
      setIsLoading(false);
      displayError(error);
    }
  };

  return (
    <Box maxWidth={'450px'}>
      <ToastContainer />
      <TextField id="email" label="Email" fullWidth disabled value={userUpdate.email} />
      <TextField
        id="user_name"
        label="User Name"
        name="user_name"
        fullWidth
        style={{ marginTop: '16px' }}
        value={userUpdate.user_name}
        disabled
      />
      <TextField
        id="full_name"
        label="Full name"
        name="full_name"
        fullWidth
        style={{ marginTop: '16px' }}
        value={userUpdate.full_name}
        onChange={handleOnChange}
        disabled={!isEditing}
      />

      <TextField
        id="phone"
        label="Phone Number"
        name="phone"
        fullWidth
        style={{ marginTop: '16px', marginBottom: '16px' }}
        value={userUpdate.phone}
        onChange={handleOnChange}
        disabled={!isEditing}
      />
      {!isEditing ? (
        <Button fullWidth variant="contained" onClick={handleEditClick}>
          Edit
        </Button>
      ) : (
        <Button
          disabled={isLoading}
          fullWidth
          variant="contained"
          onClick={handleSaveClick}
          color="success"
        >
          Save
        </Button>
      )}
    </Box>
  );
}
