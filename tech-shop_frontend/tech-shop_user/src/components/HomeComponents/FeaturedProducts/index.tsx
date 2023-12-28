import * as React from 'react';
import Box from '@mui/material/Box';

import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Res_Product } from '../../../types/response.type';
import { getData } from '../../../utils/api.services';
import { _PRODUCT } from '../../../utils/constant.api';
import { formatCurrency } from '../../../utils/constant';
import ProductItem from '../../ProductItem';

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Res_Product[]>([]);
  const sortValue = 'createdAt';
  const sortOrder = 'DESC';

  //handle view
  const navigate = useNavigate();
  const handleView = (id: number) => {
    navigate('/products/' + id);
  };
  useEffect(() => {
    getData(`${_PRODUCT}?limit=8&sort=${sortValue}&order=${sortOrder}`).then((res) => {
      if (res) setProducts(res.products);
    });
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }} mb={5} p={2}>
      <Typography gutterBottom variant="h3" component={'h5'} textAlign={'center'} mb={5}>
        New Product
      </Typography>
      <Grid container spacing={2}>
        {products &&
          products.map((product) => (
            <Grid item xs={3}>
              <ProductItem product={product} handleView={handleView} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}
