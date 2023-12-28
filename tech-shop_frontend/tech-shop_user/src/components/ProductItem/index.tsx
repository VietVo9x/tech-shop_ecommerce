import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { formatCurrency } from '../../utils/constant';
import { Res_Product } from '../../types/response.type';

interface Props {
  product: Res_Product;
  handleView: Function;
}
const ProductItem = (props: Props) => {
  const { product, handleView } = props;
  return (
    <Card sx={{ maxWidth: '100%', padding: '10px' }}>
      <CardMedia
        sx={{ height: 250, objectFit: 'contain', marginTop: '10px' }}
        image={product.images[0].imageUrl}
        title="green iguana"
      />
      <CardContent>
        <Typography
          gutterBottom
          component="h1"
          variant="h6"
          color={'secondary'}
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: '1',
            WebkitBoxOrient: 'vertical',
            cursor: 'pointer',
          }}
          onClick={() => handleView(product.id)}
        >
          {product.product_name}
        </Typography>
        <Typography gutterBottom component="h4" noWrap>
          {formatCurrency(product.price)}
        </Typography>
      </CardContent>
    </Card>
  );
};
export default ProductItem;
