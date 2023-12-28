import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import UpdateInfoUser from './update.info.user';
import Grid from '@mui/material/Grid';
import UpdatePasswordUser from './update.password.user';
import UpdateAvatar from './update.avatar';
import { Res_Orders, Res_UserInfoLogin } from '../../types/response.type';
import { getData } from '../../utils/api.services';
import { _MY_ORDER, _VERIFY_TOKEN } from '../../utils/constant.api';
import { Res_Error } from '../../types/error.res';
import { ToastContainer, toast } from 'react-toastify';
import PageHero from '../../components/PageHero';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/slice/auth.slice';
import MyOrder from './my.order';
import { displayError } from '../../utils/display-error';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function Account() {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);
  const [user, setUser] = React.useState<Res_UserInfoLogin | undefined>();
  const [flag, setFlag] = React.useState(false);
  const [myOrder, setMyOrder] = React.useState<Res_Orders[]>([]);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    getData(_VERIFY_TOKEN)
      .then((res) => {
        if (res) {
          setUser(res);
          dispatch(loginSuccess(res));
        }
      })
      .catch((error) => {
        displayError(error);
      });
  }, [flag]);

  React.useEffect(() => {
    getData(_MY_ORDER).then((res) => {
      if (res) setMyOrder(res);
    });
  }, [flag]);

  return (
    <>
      <PageHero title="Account" />
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: 'background.paper',
          display: 'flex',
          minHeight: '100vh',
          width: '100vw',
        }}
      >
        <ToastContainer />
        <Grid container>
          <Grid item xs={3}>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              sx={{ borderRight: 1, borderColor: 'divider' }}
            >
              <Tab label="Info User" {...a11yProps(0)} />
              <Tab label="Change Password" {...a11yProps(1)} />
              <Tab label="Avatar" {...a11yProps(2)} />
              <Tab label="MyOrder" {...a11yProps(2)} />
            </Tabs>
          </Grid>
          <Grid item xs={9}>
            <TabPanel value={value} index={0}>
              <UpdateInfoUser user={user} setFlag={setFlag} flag={flag} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <UpdatePasswordUser />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <UpdateAvatar flag={flag} setFlag={setFlag} />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <MyOrder myOrder={myOrder} />
            </TabPanel>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
