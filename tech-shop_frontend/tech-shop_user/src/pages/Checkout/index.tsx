import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  NativeSelect,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Res_CartItem, Res_ShippingAddress } from '../../types/response.type';
import './style.scss';
import { getData } from '../../utils/api.services';
import { _CART, _SHIPPING_ADDRESS } from '../../utils/constant.api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store/configureStore';
import { initialShippingAddress } from '../../utils/common/initial-state';
import { displayError } from '../../utils/display-error';
import CheckoutService from './checkout.service';
import CartEmpty from '../../components/CartEmpty';
import PageHero from '../../components/PageHero';
import { Err_Shipping_AddressForm } from '../../types/error.type';
import { error } from 'console';
import { formatCurrency, totalPriceCart } from '../../utils/constant';
import { ToastContainer } from 'react-toastify';
import { displaySuccessMessage } from '../../utils/display-success';
import { setTotalCart } from '../../redux/slice/cart.slice';

export default function Checkout() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const [cart, setCart] = useState<Res_CartItem[]>([]);
  const [shippingAddress, setShippingAddress] = useState<Res_ShippingAddress[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<number>();
  const [formAddress, setFormAddress] = useState<Res_ShippingAddress>(initialShippingAddress);
  const [flag, setFlag] = useState(false);
  const [errors, setErrors] = useState<Err_Shipping_AddressForm>({
    isError: false,
    msgName: '',
    msgAddress: '',
    msgPhone: '',
  });
  const checkoutService = new CheckoutService();
  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormAddress({ ...formAddress, [name]: value });
  };
  const handleSelectChange = (event: any) => {
    const selectedValue = event.target.value;
    setSelectedAddress(selectedValue);
    const formValue = shippingAddress.find((address) => address.id == Number(selectedValue));
    if (formValue) {
      setFormAddress(formValue);
      setErrors({ isError: false, msgName: '', msgAddress: '', msgPhone: '' });
    } else {
      setFormAddress(initialShippingAddress);
    }
  };
  const handleSubmit = async () => {
    try {
      const validator = checkoutService.validate(formAddress);
      setErrors(validator);
      if (validator.isError) return;
      const shoppingCart = cart.map((item) => ({
        name: item.product.product_name,
        image: item.product.images[0].imageUrl,
        quantity: item.quantity,
        productId: item.product.id,
        total_price: item.quantity * item.product.price,
      }));
      await checkoutService.createOrder(formAddress, shoppingCart);
      dispatch(setTotalCart(0));
      setFlag(!flag);
      displaySuccessMessage('Order created successfully');
    } catch (error) {
      displayError(error);
    }
  };
  useEffect(() => {
    getData(_SHIPPING_ADDRESS, { userId: user.id }).then((res) => setShippingAddress(res));
  }, [flag]);
  useEffect(() => {
    getData(_CART).then((res) => {
      setCart(res);
    });
  }, [flag]);
  return (
    <>
      <ToastContainer />
      <PageHero title="Checkout" />
      {cart.length === 0 ? (
        <CartEmpty title="Your Order Empty" />
      ) : (
        <Grid container spacing={2} p={2}>
          <Grid item xs={4} padding={'10px'}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Shipping Address
                </InputLabel>
                <NativeSelect
                  inputProps={{
                    name: 'age',
                    id: 'uncontrolled-native',
                  }}
                  onChange={handleSelectChange}
                  value={selectedAddress}
                >
                  {' '}
                  <option value="new">New address</option>
                  {shippingAddress &&
                    shippingAddress.map((address, index) => {
                      return (
                        <option key={index} value={address.id}>
                          {address.address}
                        </option>
                      );
                    })}
                </NativeSelect>
              </FormControl>
            </Box>
            <Box
              component="form"
              sx={{
                '& > :not(style)': { mt: 2, mb: 2 },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-basic"
                label="address"
                variant="outlined"
                fullWidth
                value={formAddress.address}
                disabled={Boolean(formAddress.id)}
                onChange={handleChange}
                name="address"
                error={Boolean(errors.msgAddress)}
                helperText={errors.msgAddress}
              />
              <TextField
                id="outlined-basic"
                label="phone"
                variant="outlined"
                name="phone"
                fullWidth
                value={formAddress.phone}
                disabled={Boolean(formAddress.id)}
                onChange={handleChange}
                error={Boolean(errors.msgPhone)}
                helperText={errors.msgPhone}
              />
              <TextField
                id="outlined-basic"
                label="name"
                variant="outlined"
                name="name"
                fullWidth
                value={formAddress.name}
                disabled={Boolean(formAddress.id)}
                onChange={handleChange}
                error={Boolean(errors.msgName)}
                helperText={errors.msgName}
              />
            </Box>
            <Button variant={'contained'} onClick={handleSubmit}>
              Checkout
            </Button>
          </Grid>
          <Grid item xs={8}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow sx={{ backgroundColor: 'grey', color: '#ccc' }}>
                    <TableCell align="center">Product</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    <TableCell align="center">Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cart &&
                    cart.length > 0 &&
                    cart.map((item, index: number) => (
                      <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        key={index}
                      >
                        <TableCell component="th" scope="row" align="center" sx={{ flexGrow: 2 }}>
                          {item.product.product_name}
                        </TableCell>
                        <TableCell component="th" scope="row" align="center" sx={{ flexGrow: 1 }}>
                          {item.quantity}
                        </TableCell>
                        <TableCell component="th" scope="row" align="center" sx={{ flexGrow: 1 }}>
                          {formatCurrency(item.quantity * item.product.price)}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box mt={3} mb={3}>
              <Typography component={'h1'} variant="h3">
                Total : {formatCurrency(totalPriceCart(cart))}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  );
}
