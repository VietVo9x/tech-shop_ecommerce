/* eslint-disable no-restricted-globals */
import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import './style.scss';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUserPlus, FaBars, FaWindowClose } from 'react-icons/fa';
import { links } from '../../../routes';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { logout } from '../../../redux/slice/auth.slice';
import { RootState } from '../../../redux/store/configureStore';
import { setTotalCart } from '../../../redux/slice/cart.slice';

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Button, ClickAwayListener, Grow, MenuList, Paper, Popper } from '@mui/material';

export default function Header() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showNavMobile, setShowNavMobile] = useState(false);
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);
  const user = useSelector((state: RootState) => state.auth.user);
  const quantityCart = useSelector((state: RootState) => state.cart.quantity);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // mui
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (anchorRef.current) {
      anchorRef.current.focus(); // Tránh lỗi "Cannot read properties of null (reading 'focus')"
    }

    prevOpen.current = open;
  }, [open]);

  // Mui menu account start

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  const handleLogout = async () => {
    localStorage.removeItem('token');
    dispatch(logout());
    dispatch(setTotalCart(0));
    navigate('/login');
  };

  return (
    <>
      <nav className="nav">
        <div className="nav__logo">
          <Link to="/">
            <i>
              Tech<span>Shop</span>
            </i>
          </Link>
          <button onClick={() => setShowNavMobile(true)}>
            <FaBars />
          </button>
        </div>

        <ul className="nav__menu--pc">
          {links.map((element) => (
            <li key={element.id}>
              <Link to={element.link}>{element.text}</Link>
            </li>
          ))}
        </ul>
        <div className={showNavMobile ? 'nav__menu--mobile show' : 'nav__menu--mobile'}>
          <button onClick={() => setShowNavMobile(false)}>
            <FaWindowClose />
          </button>
          <ul>
            {links.map((element) => (
              <li key={element.id} onClick={() => setShowNavMobile(false)}>
                <Link to={element.link}>{element.text}</Link>
              </li>
            ))}
          </ul>
          <div className="nav__menu--mobile-btns">
            <Link to="/cart" className="nav__btns--cart" onClick={() => setShowNavMobile(false)}>
              Cart
              <span className="nav__btns--cart-icon">
                <FaShoppingCart />
                <span>0</span>
              </span>
            </Link>
            {isLogin ? (
              <>
                <Link
                  to="/account"
                  className="nav__btns--login"
                  onClick={() => setShowNavMobile(false)}
                >
                  Account
                  <SettingsOutlinedIcon />
                </Link>
                <Link
                  to={'/login'}
                  className="nav__btns--login"
                  onClick={() => {
                    handleLogout();
                    setShowNavMobile(false);
                  }}
                >
                  Logout
                  <ExitToAppIcon />
                </Link>
              </>
            ) : (
              <Link
                to="/login"
                className="nav__btns--login"
                onClick={() => setShowNavMobile(false)}
              >
                Login
                <FaUserPlus />
              </Link>
            )}
          </div>
        </div>

        <div className="nav__btns">
          <Link to="/cart" className="nav__btns--cart">
            Cart
            <span className="nav__btns--cart-icon">
              <FaShoppingCart />
              <span>{quantityCart >= 100 ? '99+' : quantityCart}</span>
            </span>
          </Link>
          {isLogin ? (
            <Stack direction="row" spacing={2}>
              <div>
                <Button
                  ref={anchorRef}
                  id="composition-button"
                  aria-controls={open ? 'composition-menu' : undefined}
                  aria-expanded={open ? 'true' : undefined}
                  aria-haspopup="true"
                  onClick={handleToggle}
                >
                  <Avatar alt="Remy Sharp" src={user.avatar} />
                </Button>
                <Popper
                  open={open}
                  anchorEl={anchorRef.current}
                  role={undefined}
                  placement="bottom-start"
                  transition
                  disablePortal
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom',
                      }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                          <MenuList
                            autoFocusItem={open}
                            id="composition-menu"
                            aria-labelledby="composition-button"
                            onKeyDown={handleListKeyDown}
                          >
                            <MenuItem onClick={handleClose}>
                              <Link to={'/account'} style={{ color: 'inherit' }}>
                                My account
                              </Link>
                            </MenuItem>
                            <MenuItem
                              onClick={(event) => {
                                handleClose(event);
                                handleLogout();
                              }}
                            >
                              Logout
                            </MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </div>
            </Stack>
          ) : (
            <Link to="/login" className="nav__btns--login">
              Login
              <FaUserPlus />
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}
