import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';

interface Props {
  setSearchValue: Function;
  searchValue: string;
  onSearch: Function;
  onClearSearch: Function;
}
export default function CustomizedInputBase(props: Props) {
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 250, marginBottom: '20px' }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Name"
        inputProps={{ 'aria-label': 'search google maps' }}
        onChange={(e) => props.setSearchValue(e.target.value)}
        value={props.searchValue}
      />
      <IconButton
        type="button"
        sx={{ p: '10px' }}
        aria-label="search"
        onClick={() => props.onSearch()}
      >
        <SearchIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton
        color="primary"
        sx={{ p: '10px' }}
        aria-label="directions"
        onClick={() => props.onClearSearch()}
      >
        <DirectionsIcon />
      </IconButton>
    </Paper>
  );
}
