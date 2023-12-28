import { Link } from 'react-router-dom';
import './style.scss';
import accessBgImage from '../../../assets/images/hero-bg.avif';
import { Typography } from '@mui/material';

export default function Hero() {
  return (
    <section className="hero container">
      <div className="hero__content">
        <div className="hero__content--left">
          <Typography variant="h3" component={'h5'} pb={5}>
            New Collections 2023
          </Typography>
          <h3>
            Best Product
            <br />
            for Your Profession
          </h3>
          <Link to="products" className="btn">
            SHOP NOW
          </Link>
        </div>
        <div className="hero__content--image">
          <img src={accessBgImage} alt="access-bg" />
        </div>
      </div>
    </section>
  );
}
