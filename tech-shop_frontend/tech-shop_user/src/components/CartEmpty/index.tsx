import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
interface Props {
  title: string;
}
export default function CartEmpty(props: Props) {
  return (
    <section className="cart--empty">
      <h1>{props.title}</h1>
      <Button variant="contained" color="secondary">
        <Link to="/products">Back products page</Link>
      </Button>
    </section>
  );
}
