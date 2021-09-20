import React from 'react';
import clsx from 'clsx';
import {
    Drawer, AppBar, Toolbar, List, CssBaseline, Typography,
    Divider, IconButton, ListItem, ListItemIcon, ListItemText, Badge, useTheme
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import PaymentIcon from '@material-ui/icons/Payment';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import { useChangeTheme } from '../../../reducer/ThemeReducer';
import LinkSession from '../../elements/LinkSession';
import StoreContextProvider from '../../../reducer/StoreReducer';
import useStyles from './LeftBar.style';

export default function LeftBar() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const changeTheme = useChangeTheme();
    const { cartItems } = React.useContext(StoreContextProvider);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
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
                <List>
                    <ListItem button>
                        <ListItemIcon onClick={() => changeTheme()}>
                            {theme.palette.type === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
                        </ListItemIcon>
                        <ListItemText onClick={() => changeTheme()} primary="Toggle Theme" />
                    </ListItem>
                </List>
                <Divider />
                <LinkSession link="/shop">
                    <List>
                        <ListItem button>
                            <ListItemIcon>
                                <AddShoppingCartIcon />
                            </ListItemIcon>
                            <ListItemText primary="shop" />
                        </ListItem>
                    </List>
                </LinkSession>
                <List>
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
                </List>
                <List>
                    <LinkSession link='/Home'>
                        <ListItem button>
                            <ListItemIcon >
                                <Brightness4Icon />
                            </ListItemIcon>
                            <ListItemText primary="Home page" />
                        </ListItem>
                    </LinkSession>
                </List>

                {/* <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List> */}
                <Divider />
                <List>
                    {['user', 'notification', 'profile'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>

            </Drawer>
        </div>
    );
}