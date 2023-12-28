import { CircularProgress } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';

interface Props {
  isLoading: boolean;
}

const Loading = (props: Props) => {
  const { isLoading } = props;
  return (
    <Backdrop
      sx={{
        color: '#fff',
        zIndex: (theme: { zIndex: { drawer: number } }) => theme.zIndex.drawer + 1,
      }}
      open={isLoading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
export default Loading;
