import * as React from 'react';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';

import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { SingleProductServices } from './singleproduct.service';
import PageHero from '../../components/PageHero';
import { Res_Comment, Res_Product } from '../../types/response.type';
import { calculateTotalQuantity, formatCurrency } from '../../utils/constant';
import { setTotalCart } from '../../redux/slice/cart.slice';
import { displayError } from '../../utils/display-error';
import { displaySuccessMessage } from '../../utils/display-success';
import ScrollToTopButton from '../../components/ScrollToTopButton';
import ListComment from './list-comment';
import Comment from './comment';
import { Stack } from '@mui/material';
import { RootState } from '../../redux/store/configureStore';
import { initialProduct } from '../../utils/common/initial-state';

export default function SingleProduct() {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const singleProductService = new SingleProductServices();
  const [quantityInput, setQuantityInput] = useState(1);
  const [product, setProduct] = useState<Res_Product>(initialProduct);
  const [image, setImage] = useState<string>();
  const [comments, setComments] = useState<Res_Comment[]>([]);
  const [reload, setReload] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.auth.user);
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    singleProductService.getProduct(Number(id)).then((res) => {
      setProduct(res);
      setImage(res.images[0].imageUrl);
    });
  }, [reload]);

  useEffect(() => {
    setIsLoading(true);
    singleProductService.getCommentsByProduct(Number(id)).then((res) => {
      setComments(res);
      setIsLoading(false);
    });
  }, [reload]);

  const setBigImageProduct = (url: string) => {
    setImage(url);
  };
  const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const enteredValue = e.target.value;

    // Kiểm tra nếu giá trị là số và lớn hơn 0
    const isNumber = /^[1-9]\d*$/;
    if (isNumber.test(enteredValue)) {
      setQuantityInput(Number(enteredValue));
    }
  };

  const handleQuantity = (action: 'up' | 'down') => {
    if (action === 'up' && quantityInput < product.quantity_stock) {
      setQuantityInput((x) => x + 1);
    } else if (action === 'down') {
      setQuantityInput((x) => x - 1);
    }
  };
  const handleAddToCart = async () => {
    if (!isLogin) {
      displayError({ message: 'Please login add to cart' });
      return;
    }
    try {
      const cart = {
        productId: product.id,
        userId: user.id,
        quantity: quantityInput,
      };
      await singleProductService.createCart(cart);
      const newCart = await singleProductService.getCart();
      dispatch(setTotalCart(calculateTotalQuantity(newCart)));
      displaySuccessMessage('Product added successfully');
    } catch (error) {
      displayError(error);
    }
  };

  const calAverageRating = () => {
    const totalRating = comments.reduce((total, comment) => {
      return total + comment.rate;
    }, 0);
    const avenrageRating = totalRating / comments.length;
    return avenrageRating;
  };
  const ratingValue = calAverageRating();

  return (
    <div>
      {product.id > 0 && (
        <>
          <ScrollToTopButton />
          <ToastContainer />
          <PageHero path="/products" title={`Products`} subtitle={product.product_name} />
          <section className="container">
            <div className="btn--back">
              <Link to="/products">BACK TO PRODUCTS</Link>
            </div>
            <div className="product">
              <div className="product__images">
                <div className="product__images--main">
                  <img src={image} alt="anh chinh" />
                </div>
                <div className="product__images--sub">
                  {product &&
                    product.images.map((image, index) => (
                      <img
                        key={index}
                        src={image.imageUrl}
                        alt={image.imageUrl}
                        onClick={() => {
                          setBigImageProduct(image.imageUrl);
                        }}
                      />
                    ))}
                </div>
              </div>
              <div className="product__content">
                <Typography component={'h4'} variant="h5">
                  {product?.product_name}
                </Typography>
                <div className="product__content--rating">
                  <span>
                    {ratingValue === 0 ? (
                      <Rating name="read-only" value={5} readOnly />
                    ) : (
                      <Rating name="read-only" value={ratingValue} readOnly />
                    )}
                  </span>
                  <span>({comments.length} customer reviews)</span>
                </div>
                <Typography component={'h2'} variant="h5" pt={2}>
                  {formatCurrency(product.price)}
                </Typography>
                <p className="product__content--desc"> {product?.description}</p>
                <p className="product__content--info">
                  <span>Available :</span>
                  {product?.quantity_stock}
                </p>
                <p className="product__content--info">
                  <span>Category :</span>
                  {product.category.name}
                </p>
                <div className="product__content--action">
                  <button onClick={() => handleQuantity('down')} disabled={quantityInput === 1}>
                    -
                  </button>
                  {quantityInput && (
                    <input
                      type="text"
                      value={
                        quantityInput > product.quantity_stock
                          ? product.quantity_stock
                          : quantityInput
                      }
                      onChange={(e) => handleChangeQuantity(e)}
                    />
                  )}
                  <button onClick={() => handleQuantity('up')}>+</button>
                </div>
                <button onClick={handleAddToCart} disabled={product.quantity_stock === 0}>
                  ADD TO CART
                </button>
              </div>
            </div>
          </section>
          <Stack sx={{ maxWidth: '1200px', margin: '0 auto' }}>
            <Comment product={product} reload={reload} setReload={setReload} />
            <ListComment comments={comments} />
          </Stack>
        </>
      )}
    </div>
  );
}
