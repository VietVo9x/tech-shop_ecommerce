import './style.scss';
import EmailIcon from '@mui/icons-material/Email';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__content--top">
          <p>
            <i>
              Tech<span>Shop</span>
            </i>{' '}
            Reactjs
          </p>
        </div>
        <div className="footer__content--bottom">
          <p>
            <EmailIcon />
            vietvonhu18@gmail.com
          </p>
          <p>© 2023 TechShop All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
