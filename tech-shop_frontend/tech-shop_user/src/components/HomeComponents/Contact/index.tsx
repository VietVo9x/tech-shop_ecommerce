import './style.scss';
import { Typography } from '@mui/material';
export default function Contact() {
  return (
    <section className=" contact ">
      <Typography variant="h3" component={'h5'} align="center" p={5}>
        Join Our Newsletter
      </Typography>

      <div className="contact__content">
        <p>
          A wonderful serenity has taken possession of my entire soul, like these sweet mornings of
          spring which I enjoy with my whole heart.
        </p>
        <form className="contact__content--form">
          <input type="text" placeholder="Enter Email" />
          <button type="submit" className="btn">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
