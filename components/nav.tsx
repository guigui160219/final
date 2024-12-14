import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { Avatar, AvatarGroup } from '@mui/material';

type Page = {
  label: string,
  route: string,
  isAdmin: boolean
}

const drawerWidth = 240;
const navItems: Page[] = [
  {
    label: 'Accueil',
    route: '/',
    isAdmin: false  
  },
  {
    label: 'Admin',
    route: '/admin',
    isAdmin: true
  }
];

function DrawerAppBar(props: any) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const { data: session } = useSession();

  return (
    <AppBar position='relative' sx={{backgroundColor: '#001331'}}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ display: { xs: 'none', sm: 'block' } }} color='#bdf8fd'>
            Groupe 2
        </Typography>

        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <AvatarGroup max={3} sx={{ ml: 2 }}>
            <Avatar alt="Emeric" src="/images/Emeric.jpg" />
            <Avatar alt="Florian" src="/images/Florian1.jpg" />
            <Avatar alt="Guillaume" src="/images/Guillaume.jpg" />
          </AvatarGroup>
        </Box>

        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          {navItems.map((item) => (
            <Link href={item.route} key={item.label}>
              <Button key={item.label} sx={{ color: '#bdf8fd' }} style={{ display: session?.user.isAdmin || !item.isAdmin ? '' : 'none' }}>
                {item.label}
              </Button>
            </Link>
          ))}

          {session ?
            <Button onClick={() => signOut()} sx={{ color: '#000' }}>
              Déconnexion
            </Button> : <></>}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;