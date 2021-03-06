import React from 'react';
import clsx from 'clsx';
import {
    Drawer, AppBar, Toolbar, List, CssBaseline, Typography,
    Divider, IconButton, ListItem, ListItemIcon, ListItemText, useTheme, Grid, Badge,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import PaymentIcon from '@material-ui/icons/Payment';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import { useChangeTheme } from '../../../reducer/ThemeReducer';
import LinkSession from '../../elements/LinkSession';
import StoreContextProvider from '../../../reducer/StoreReducer';
import useStyles from './AppDrawer.styles';

export default function AppDrawer({ children }: any) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const changeTheme = useChangeTheme();
    const { cartItems, checkAuthUser, handleLogout } = React.useContext(StoreContextProvider);

    const handleDrawerClick = () => {
        setOpen(!open);
    };


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
                        onClick={handleDrawerClick}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography variant="h6" noWrap>My-App</Typography>
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
                    <IconButton onClick={handleDrawerClick}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <Grid container direction="column" justifyContent="space-between" className={classes.bottomItem}>
                    <Grid item>
                        <ListItem button>
                            <ListItemIcon onClick={() => changeTheme()}>
                                {theme.palette.type === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
                            </ListItemIcon>
                            <ListItemText onClick={() => changeTheme()} primary="Toggle Theme" />
                        </ListItem>
                        <Divider />
                        <List>
                            {[{ name: 'Home Page', link: '/', icon: <SpeakerNotesIcon /> },
                            { name: 'Shop', link: '/shop', icon: <AddShoppingCartIcon /> },
                            { name: 'profile', link: '/profile', icon: <AccountBoxIcon /> },
                            ].map((item) => (
                                <LinkSession link={item.link}>
                                    <ListItem button key={item.name}>
                                        <ListItemIcon>{item.icon}</ListItemIcon>
                                        <ListItemText primary={item.name} />
                                    </ListItem>
                                </LinkSession>
                            ))}
                        </List>
                        {/* <List> */}
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
                        {/* </List> */}
                    </Grid>
                    <Grid item>
                        {
                            checkAuthUser === true ?
                                <ListItem button>
                                    <ListItemIcon onClick={handleLogout}>
                                        <ExitToAppIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Logout" />
                                </ListItem>
                                : <LinkSession link="/login">
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
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Typography paragraph>
                    {children}
                </Typography>
            </main>

        </div>
    );
}