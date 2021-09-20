import React from 'react';
import clsx from 'clsx';
import {
    Drawer, AppBar, Toolbar, List, CssBaseline, Typography,
    Divider, IconButton, ListItem, ListItemIcon, ListItemText, useTheme, Grid,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import PaymentIcon from '@material-ui/icons/Payment';
import AppsIcon from '@material-ui/icons/Apps';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { useChangeTheme } from '../../../reducer/ThemeReducer';
import LinkSession from '../../elements/LinkSession';
// import StoreContextProvider from '../../../reducer/StoreReducer';
import useStyles from './LeftBar.style';
import { auth } from "../../../service/Firebase";
import { useHistory } from 'react-router'
import logging from '../../../config/logging';

export default function LeftBar() {
    const classes = useStyles();
    const theme = useTheme();
    const history = useHistory();
    const [open, setOpen] = React.useState(false);
    const changeTheme = useChangeTheme();
    // const { cartItems } = React.useContext(StoreContextProvider);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const Logout = () => {
        auth.signOut()
            .then(() => history.push('/login'))
            .catch(error => logging.error(error));
    }
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>My-Shop</Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }} >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <Grid container direction="column" justifyContent="space-between" className={classes.bottomItem}>
                    <Grid item>
                        <List>
                            <ListItem button>
                                <ListItemIcon onClick={() => changeTheme()}>
                                    {theme.palette.type === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
                                </ListItemIcon>
                                <ListItemText onClick={() => changeTheme()} primary="Toggle Theme" />
                            </ListItem>
                        </List>
                        <Divider />
                        <List>
                            {[{ name: 'Home Page', link: '/home', icon: <AppsIcon /> },
                            { name: 'Shop', link: '/shop', icon: <AddShoppingCartIcon /> },
                            { name: 'Invoice', link: '/invoice', icon: <PaymentIcon /> },
                            ].map((item) => (
                                <LinkSession link={item.link}>
                                    <ListItem button key={item.name}>
                                        <ListItemIcon>{item.icon}</ListItemIcon>
                                        <ListItemText primary={item.name} />
                                    </ListItem>
                                </LinkSession>
                            ))}
                        </List>
                    </Grid>
                    <Grid item>
                        {auth.currentUser ?
                            <ListItem button>
                                <ListItemIcon onClick={() => Logout()}>
                                    <ExitToAppIcon />
                                </ListItemIcon>
                                <ListItemText primary="Logout" />
                            </ListItem>
                            :
                            <LinkSession link="/login">
                                <ListItem button>
                                    <ListItemIcon>
                                        <VpnKeyIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="login" />
                                </ListItem>
                            </LinkSession>
                        }
                    </Grid>
                </Grid>
                {/*  <List>
                    <LinkSession link='/invoice'>
                        <ListItem button>
                            <ListItemIcon>
                                <Badge badgeContent={cartItems.length} color='error'>
                                    <PaymentIcon />
                                </Badge>
                            </ListItemIcon>
                            <ListItemText primary="Invoice" />
                        </ListItem>
                    </LinkSession>
                </List> */}
            </Drawer>
        </div>
    );
}