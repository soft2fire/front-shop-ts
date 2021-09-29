import { Box, Backdrop, Tabs, Tab, Typography, AppBar } from '@material-ui/core';
import React from "react";
import StoreContextProvider from "../reducer/StoreReducer";
import { useStyles } from './profile.styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import ContactMailRoundedIcon from '@material-ui/icons/ContactMailRounded';
import ChangePassword from './auth/Change';
import Info from '../components/profile/Info';

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-force-tabpanel-${index}`}
            aria-labelledby={`scrollable-force-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: any) {
    return {
        id: `tab-${index}`,
        'aria-controls': `tabpanel-${index}`,
    };
}

const Profile = () => {
    const classes = useStyles();
    const { isLoading } = React.useContext(StoreContextProvider);
    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    if (isLoading) return <Backdrop open={isLoading} onClick={() => isLoading ? true : false}>
        <CircularProgress color="inherit" />
    </Backdrop>;

    return (
        <div className={classes.root}>

            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="on"
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="scrollable force tabs example"
                >
                    <Tab label="user info" icon={<ContactMailRoundedIcon />} {...a11yProps(0)} />
                    <Tab label="change password" icon={<FingerprintIcon />} {...a11yProps(1)} />
                    <Tab label="Item Three" icon={<CircularProgress />} {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <Info />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ChangePassword />
            </TabPanel>
            <TabPanel value={value} index={2}>
                Item three
            </TabPanel>
        </div>
    )
}
export default Profile;