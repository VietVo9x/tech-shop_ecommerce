import { Box, Button, Rating, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/configureStore';
import { displayError } from '../../utils/display-error';
import { ToastContainer } from 'react-toastify';
import { SingleProductServices } from './singleproduct.service';
import { Res_Product } from '../../types/response.type';
import { displaySuccessMessage } from '../../utils/display-success';

interface Props {
  product: Res_Product;
  reload: boolean;
  setReload: Function;
}
function Comment(props: Props) {
  const user = useSelector((state: RootState) => state.auth.user);
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [error, setError] = useState({
    isError: false,
    msgError: '',
  });
  const singleProductService = new SingleProductServices();
  const handleCommentChange = (event: any) => {
    setComment(event.target.value);
  };

  const handleRatingChange = (event: any, newValue: any) => {
    setRating(newValue);
  };

  const handleSubmit = async () => {
    if (!user || !isLogin) {
      displayError({ message: 'Please login in to comment' });
      return;
    }
    try {
      if (user.id > 0) {
        const insertComment = {
          productId: props.product.id,
          userId: user.id,
          user_name: user.user_name,
          comment: comment,
          rate: rating,
          image_user: user.avatar,
        };
        const resultError = singleProductService.validateComment(insertComment);
        setError(resultError);
        if (resultError.isError) return;
        await singleProductService.insertComment(insertComment);
        displaySuccessMessage('Comment successfully');
        setComment('');
        setRating(0);
        props.setReload(!props.reload);
      }
    } catch (error) {
      displayError(error);
    }
  };
  return (
    <Box component={'div'}>
      <ToastContainer />
      <Typography component="legend">Rating</Typography>

      <Rating
        name="rating"
        value={rating}
        onChange={handleRatingChange}
        precision={0.5} // Nếu muốn cho phép chọn giá trị không bắt buộc là số nguyên
      />
      <TextField
        label="Comment"
        multiline
        rows={4}
        sx={{ marginTop: 1 }}
        value={comment}
        onChange={handleCommentChange}
        fullWidth
        helperText={error.msgError}
        error={Boolean(error.msgError)}
      />

      <Button variant="contained" onClick={handleSubmit} sx={{ marginTop: 5 }}>
        Submit
      </Button>
    </Box>
  );
}

export default Comment;
