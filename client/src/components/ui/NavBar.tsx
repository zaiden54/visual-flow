import React from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/reduxHooks';
import { swapModal } from '../../redux/slices/modals/modalSlice';
import { logoutUserThunk } from '../../redux/slices/user/userThunks';

export default function NavBar(): JSX.Element {
  const user = useAppSelector((state) => state.user.data);
  // console.log(user);

  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = (): void => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = (): void => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>): void => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column' }} alignItems="center">
        <Avatar style={{ marginTop: '3vh' }} alt="avatar" title="userpic" />
        {user.status === 'logged' ? (
          <>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {user.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                много подпешникафф
              </Typography>
            </CardContent>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <ListItemButton onClick={handleMenuClose}>My Channel</ListItemButton>
              <Button
                onClick={() => {
                  void dispatch(logoutUserThunk());
                }}
              >
                Log Out
              </Button>
            </Box>
          </>
        ) : (
          <>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                User/Channel Name
              </Typography>
              <Typography variant="body2" color="text.secondary">
                много подпешникафф
              </Typography>
            </CardContent>
            <CardActions>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {/* <ListItemButton onClick={handleMenuClose}>My Channel</ListItemButton> */}
                <Link to="/auth/signin">
                  <Button
                    onClick={() => {
                      void dispatch(logoutUserThunk());
                    }}
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth/signup">
                  <Button
                    onClick={() => {
                      void dispatch(logoutUserThunk());
                    }}
                  >
                    Sign Up
                  </Button>
                </Link>
              </Box>
            </CardActions>
          </>
        )}
      </Box>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem onClick={() => dispatch(swapModal({ value: true }))}>
        <IconButton>
          <AddCircleOutlinedIcon />
        </IconButton>
        <p>Add video</p>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar position="fixed" style={{ minWidth: '600px' }}>
        <Toolbar
          sx={{ display: 'flex', justifyContent: 'space-between' }}
          style={{ flexWrap: 'nowrap' }}
        >
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Kinda Logo/Visual Flow
          </Typography>
          <Box component="form">
            <TextField
              id="outlined-basic"
              sx={{ width: '50vw', height: 40 }}
              variant="outlined"
              style={{}}
              size="small"
            />
            <Button variant="outlined" style={{ height: 40 }} type="submit">
              <SearchIcon />
            </Button>
          </Box>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <IconButton type="button" onClick={() => dispatch(swapModal({ value: true }))}>
              <AddCircleOutlinedIcon />
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </>
  );
}
