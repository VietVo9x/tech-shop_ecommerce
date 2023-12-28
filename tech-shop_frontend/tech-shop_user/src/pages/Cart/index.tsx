import {
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  makeStyles,
} from '@mui/material';
import PageHero from '../../components/PageHero';
import './style.scss';
import { useDispatch } from 'react-redux';
import { CartServices } from './cart.service';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Res_CartItem } from '../../types/response.type';
import { calculateTotalQuantity, formatCurrency, totalPriceCart } from '../../utils/constant';
import { setTotalCart } from '../../redux/slice/cart.slice';
import { displayError } from '../../utils/display-error';
import CartEmpty from '../../components/CartEmpty';

export default function Cart() {
  const [cart, setCart] = useState<Res_CartItem[]>([]);

  const dispatch = useDispatch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const cartServices = new CartServices();
  //tang giam so luong
  const handleUpdateQty = async (condition: 'up' | 'down', id: number, qty: number) => {
    const cartUpdate = {
      quantity: qty,
    };
    try {
      if (condition == 'up') {
        cartUpdate.quantity = qty + 1;
      } else if (condition == 'down') {
        if (qty === 1) return;
        cartUpdate.quantity = qty - 1;
      }

      const resUpdateCart = await cartServices.updateProductCart(id, cartUpdate);
      const updatedCart = cart.map((item) =>
        item.id == id ? { ...item, quantity: resUpdateCart.quantity } : item,
      );
      const totalQuantity = calculateTotalQuantity(updatedCart);
      dispatch(setTotalCart(totalQuantity));
      setCart(updatedCart);
    } catch (error) {
      displayError(error);
    }
  };

  // xoa 1 product
  const handleDelete = async (id: number) => {
    const isDelete = window.confirm('Are you sure you want to delete this product?');
    if (!isDelete) return;

    try {
      await cartServices.deleteProductCart(id);
      const updatedCart = cart.filter((item) => item.id !== id);
      const totalQuantity = calculateTotalQuantity(updatedCart);
      dispatch(setTotalCart(totalQuantity));
      setCart(updatedCart);
    } catch (error) {
      displayError(error);
    }
  };
  //clear cart
  const handleClearCart = async () => {
    const isClearCart = window.confirm('Are you sure you want to clear the cart?');
    if (!isClearCart) return;

    try {
      await cartServices.clearCart();
      const totalQuantity = calculateTotalQuantity([]);
      dispatch(setTotalCart(totalQuantity));
      setCart([]);
    } catch (error) {
      displayError(error);
    }
  };

  useEffect(() => {
    cartServices
      .getCart()
      .then((res) => {
        setCart(res);
        const totalQuantity = calculateTotalQuantity(res);
        dispatch(setTotalCart(totalQuantity));
      })
      .catch((error) => {
        displayError(error);
      });
  }, []);

  return (
    <div>
      <PageHero title="Cart" />
      {cart && cart.length > 0 ? (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow className={'custom-row'}>
                  <TableCell scope="center">Image</TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Price</TableCell>
                  <TableCell align="center">Quantity</TableCell>
                  <TableCell align="center">Subtitle</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart &&
                  cart.map((item, index) => (
                    <TableRow key={index} style={{ tableLayout: 'fixed' }}>
                      <TableCell align="center">
                        <img
                          src={item.product.images[0].imageUrl}
                          alt=""
                          width={100}
                          height={100}
                        />
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          width: '30%',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                        width={'33%'}
                      >
                        {item.product.product_name}
                      </TableCell>
                      <TableCell align="center" width={'20%'}>
                        {formatCurrency(item.product.price)}
                      </TableCell>
                      <TableCell align="center" valign="middle" width={'20%'}>
                        <Stack alignItems={'center'} justifyContent={'center'} direction={'row'}>
                          <Button
                            variant="text"
                            style={{ flex: '1', height: '56px', fontSize: '30px' }}
                            onClick={() => handleUpdateQty('down', item.id, item.quantity)}
                          >
                            -
                          </Button>
                          <TextField
                            fullWidth
                            value={item.quantity}
                            style={{ flex: '2' }}
                            InputProps={{ style: { flex: '2' } }}
                          />
                          <Button
                            variant="text"
                            style={{ flex: '1', height: '56px', fontSize: '30px' }}
                            onClick={() => handleUpdateQty('up', item.id, item.quantity)}
                          >
                            +
                          </Button>
                        </Stack>
                      </TableCell>
                      <TableCell align="center" width={'20%'}>
                        {formatCurrency(item.quantity * item.product.price)}
                      </TableCell>

                      <TableCell align="center">
                        <Button variant="text" color="error" onClick={() => handleDelete(item.id)}>
                          <DeleteIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="cart__btns">
            <Button variant="contained" color="secondary">
              <Link to={'/products'}>Continue Shopping</Link>
            </Button>
            <Button variant="contained" color="warning" onClick={handleClearCart}>
              Clear Shopping Cart
            </Button>
          </div>
          <div className="cart__checkout">
            <h4
              className="
         cart__checkout--item"
            >
              Order Total : <span>{formatCurrency(totalPriceCart(cart))}</span>
            </h4>
            <div className="cart__checkout--btn">
              <Button variant="contained" color="success" fullWidth>
                <Link to="/checkout">checkout</Link>
              </Button>
            </div>
          </div>
        </>
      ) : (
        <CartEmpty title="Your Cart Empty" />
      )}
    </div>
  );
}
