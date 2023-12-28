import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import CartEmpty from '../../components/CartEmpty';
import { Res_OrderDetail, Res_Orders } from '../../types/response.type';
import { formatCurrency } from '../../utils/constant';

interface Props {
  myOrder: Res_Orders[];
}
export default function MyOrder(props: Props) {
  const { myOrder } = props;
  return (
    <>
      {myOrder.length === 0 ? (
        <CartEmpty title="My Order Empty" />
      ) : (
        <List sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper', padding: 0 }}>
          {myOrder.map((item, index) => {
            return (
              <Box key={index} border={'1px solid #ccc'} mb={1}>
                {item.orderDetails.map((item2: Res_OrderDetail, index: number) => {
                  return (
                    <Box key={index}>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar alt={item2.image} src={item2.image} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={<Typography variant="body2">{item2.name}</Typography>}
                          secondary={
                            <React.Fragment>
                              <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                x{item2.quantity}
                              </Typography>
                              {` - total: ${formatCurrency(item2.total_price)}`}
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                    </Box>
                  );
                })}
                <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
                  <Typography p={1} sx={{ p: 1, color: item.status ? 'green' : 'red' }}>
                    {item.status ? 'Complete' : 'Pending'}{' '}
                  </Typography>
                  <Typography pb={1} pr={2}>
                    Total :{formatCurrency(item.all_price)}
                  </Typography>
                </Stack>
              </Box>
            );
          })}
        </List>
      )}
    </>
  );
}
