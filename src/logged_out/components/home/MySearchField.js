import withStyles from "@mui/styles/withStyles";
import {alpha} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';

const styles = (theme) => ({
  searchContainer: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 'auto',
    },
    border: "1px solid rgba(0, 0, 0, 0.12)",
  },
  searchIconWrapper: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }
});


function MySearchField(props) {
  const {classes} = props;
  return (
    <div className={classes.searchContainer}>
      <div className={classes.searchIconWrapper}>
        <SearchIcon/>
      </div>
      <InputBase
        className={classes.searchInput}
        placeholder={"Search..."}
        inputProps={{'aria-label': 'search'}}
      />
    </div>
  );
}

export default withStyles(styles, { withTheme: true })(MySearchField);