import { FaMoneyBillWave, FaWhatsapp, FaBusinessTime } from 'react-icons/fa';
import Typography from '@mui/material/Typography';
import './style.scss';
export default function Services() {
  return (
    <section className="services-wrapper">
      <Typography variant="h3" component={'h5'} align="center" pt={10}>
        Services
      </Typography>
      <div className="services container">
        <div className="services__item">
          <div className="services__item-icon">
            <FaMoneyBillWave />
          </div>
          <h3>MONEY BACK</h3>
          <p>A small river named Duden flows by their supplies necessary regelialia.</p>
        </div>
        <div className="services__item">
          <div className="services__item-icon">
            <FaBusinessTime />
          </div>
          <h3>99.9 UPTIME</h3>
          <p>A small river named Duden flows by their supplies necessary regelialia.</p>
        </div>
        <div className="services__item">
          <div className="services__item-icon">
            <FaWhatsapp />
          </div>
          <h3>24/7 SUPPORT</h3>
          <p>A small river named Duden flows by their supplies necessary regelialia.</p>
        </div>
      </div>
    </section>
  );
}
