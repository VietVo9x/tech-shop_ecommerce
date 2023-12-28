import * as React from 'react';
import PageHero from '../../components/PageHero';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import './style.scss';
import { useState } from 'react';
import { getData } from '../../utils/api.services';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { _CATEGORY, _PRODUCT } from '../../utils/constant.api';
import { Res_Category, Res_Product } from '../../types/response.type';
import { formatCurrency, perPage } from '../../utils/constant';
import ScrollToTopButton from '../../components/ScrollToTopButton';
import CustomizedInputBase from '../../components/InputSearch';
import { NativeSelect } from '@mui/material';
export default function Products() {
  const [categories, setCategories] = useState<Res_Category[]>([]);
  const [category, setCategory] = useState<string>('');
  const [products, setProducts] = useState<Res_Product[]>([]);
  const [age, setAge] = React.useState('');

  //filter data start
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState<string>('');
  const [count, setCount] = useState(0);

  const page = Number(searchParams.get('page')) || 1;
  const params = React.useRef<{ [key: string]: any }>({ limit: 9 });
  React.useEffect(() => {
    searchParams.forEach((value, key) => {
      params.current[key] = value;
    });
    getData(_PRODUCT, params.current).then((res: any) => {
      setProducts(res?.products);
      setCount(Math.ceil(res?.total / perPage));
    });
  }, [searchParams]);
  React.useEffect(() => {
    getData(_CATEGORY).then((res) => {
      setCategories(res.categories);
    });
  }, [searchParams]);
  //thay doi trang
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setSearchParams({ ...params.current, page: value.toString() });
  };
  //tim kiem
  const handleSearch = () => {
    setSearchParams({ ...params.current, search_name: searchValue, page: '1' });
  };
  const clearSearch = () => {
    setSearchParams({ ...params.current, search_name: '' });
    setSearchValue('');
  };
  //sort
  const handleChangeSelect: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    setAge(event.target.value);
    switch (event.target.value.toString()) {
      case '1':
        setSearchParams({
          ...params.current,
          page: '1',
          sort: 'name',
          order: 'ASC',
        });
        break;
      case '2':
        setSearchParams({
          ...params.current,
          page: '1',
          sort: 'name',
          order: 'DESC',
        });

        break;

      case '3':
        setSearchParams({ ...params.current, page: '1', sort: 'price', order: 'ASC' });
        break;
      case '4':
        setSearchParams({ ...params.current, page: '1', sort: 'price', order: 'DESC' });
        break;
      default:
        setSearchParams({ ...params.current, page: '1', sort: '', order: '' });
        break;
    }
  };
  //filter data end

  //filter
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ ...params.current, category: event.target.value, page: '1' });
    setCount(Math.ceil(products.length / perPage));
    setCategory(event.target.value);
  };

  //handle view
  const navigate = useNavigate();
  const handleView = (id: number) => {
    navigate('/products/' + id);
  };

  return (
    <div>
      <ScrollToTopButton />
      <PageHero title="Products" />
      <div className="products">
        <div className="products--side-bar">
          <FormGroup>
            <CustomizedInputBase
              onClearSearch={clearSearch}
              onSearch={handleSearch}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            />
            <Typography component={'h3'} variant="h5" pb={1} color={'primary'}>
              {' '}
              Category
            </Typography>
            <RadioGroup
              aria-labelledby="demo-error-radios"
              name="quiz"
              value={category}
              onChange={handleRadioChange}
            >
              <FormControlLabel value="" control={<Radio />} label="All" />

              {categories &&
                categories.map((element: Res_Category, index: number) => (
                  <FormControlLabel
                    value={element.id}
                    control={<Radio />}
                    label={element.name}
                    key={index}
                  />
                ))}
            </RadioGroup>
          </FormGroup>
        </div>
        <div>
          <Box sx={{ minWidth: 150, marginRight: 10, marginBottom: '20px', textAlign: 'right' }}>
            <FormControl>
              <NativeSelect
                defaultValue={age}
                inputProps={{
                  name: 'age',
                  id: 'uncontrolled-native',
                }}
                onChange={handleChangeSelect}
              >
                <option value={''}>Sort</option>
                <option value={1}>Name (A - Z)</option>
                <option value={2}>Name (Z - A)</option>
                <option value={3}>Price(Lowest)</option>
                <option value={4}>Thirty(Highest)</option>
              </NativeSelect>
            </FormControl>
          </Box>

          <div className="products--content">
            {products &&
              products.map((product) => (
                <div className="products--content__item" key={product.id}>
                  <div className="products--content__item--image">
                    {product.images.map((image, index) => (
                      <img src={image.imageUrl} alt={image.imageUrl} key={index} />
                    ))}
                  </div>
                  <h5
                    className="products--content__item--title"
                    onClick={() => handleView(product.id)}
                  >
                    {product.product_name}
                  </h5>

                  <div className="products--content__item--action">
                    <div className="products--content__item--price">
                      <p>{formatCurrency(product.price)}</p>
                    </div>

                    <Tooltip
                      title=" Add to cart"
                      placement="top"
                      onClick={() => handleView(product.id)}
                    >
                      <Button>
                        {' '}
                        <ShoppingCartOutlinedIcon />
                      </Button>
                    </Tooltip>
                  </div>
                </div>
              ))}
          </div>
          {/* phan trang */}
          <Stack spacing={2} mt={2}>
            <Pagination count={count} page={page || 1} onChange={handleChangePage} />
          </Stack>
        </div>
      </div>
    </div>
  );
}
