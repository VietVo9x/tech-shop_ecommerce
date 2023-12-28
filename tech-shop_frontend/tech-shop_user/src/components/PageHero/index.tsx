import { Box, Breadcrumbs, Stack, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Link from '@mui/material/Link';

interface Props {
  title: string;
  subtitle?: string;
  path?: string;
}
export default function PageHero(props: Props) {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/" variant={'h6'}>
      HOME
    </Link>,
    <Link underline="hover" key="2" color="inherit" href={props.path} variant={'h6'}>
      {props.title}
    </Link>,
    props.subtitle ? (
      <Typography key="3" color="text.primary" variant={'h6'}>
        {props.subtitle}
      </Typography>
    ) : null,
  ];
  return (
    <Box sx={{ padding: '100px 10px 0' }} justifyContent={'center'} margin={'0 auto'}>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="medium" />} aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs>
    </Box>
  );
}
