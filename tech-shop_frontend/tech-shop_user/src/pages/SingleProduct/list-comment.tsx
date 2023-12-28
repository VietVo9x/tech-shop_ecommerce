import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Rating,
  Typography,
} from '@mui/material';
import React from 'react';
import { Res_Comment } from '../../types/response.type';
interface Props {
  comments: Res_Comment[];
}
function ListComment(props: Props) {
  return (
    <List sx={{ maxWidth: '1200px' }}>
      {props.comments.map((comment: Res_Comment, index: number) => (
        <ListItem key={index}>
          <ListItemAvatar>
            <Avatar alt="Avatar" src={comment.image_user} />
          </ListItemAvatar>
          <ListItemText
            primary={<Rating name={`rating-${index}`} value={comment.rate} readOnly />}
            secondary={
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ maxHeight: '60px', overflow: 'hidden' }}
              >
                {comment.comment}
              </Typography>
            }
          />
        </ListItem>
      ))}
    </List>
  );
}

export default ListComment;
