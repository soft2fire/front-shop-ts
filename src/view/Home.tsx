import { Box, Grid, Typography } from '@material-ui/core';
import Chats from '../components/Chats/Chats';
import IAccordion from '../components/elements/Accordion';
import { useStyles } from './Home.styles';

const Home = () => {
    const classes = useStyles()

    const Options = [
        {
            descriptions: "Make with react and typescript template styled with material ui v4 and custom way for capsulate elements and components style",
            expandedId: "panel1",
            name: "#1 selected technology"
        }, {
            descriptions: "authenticate with google token and firebase database ,route protected with live token and rejected all unregistered users and some future on this section",
            expandedId: "panel2",
            name: "#2 protected route & authenticate"
        }, {
            descriptions: " all product come as fakeStoreApi ,products and product functions like add to cart and total price provided in project,users cart and users stage saved in firebase storage,some where local storage ",
            expandedId: "panel3",
            name: "#3 simple shop"
        }
        , {
            descriptions: "chat box connected to real time database(firestore) users most be registered for use that and thats have option but not deployed in front-end",
            expandedId: "panel4",
            name: "#4 chat box"
        }
    ]


    return (
        <div className={classes.root}>
            <Box color="text.primary">
                <Typography >Please turn on your vpn :( for show data</Typography>
            </Box>
            <Grid container direction="row" spacing={1}>
                <Grid item md={4} sm={12}><Chats /></Grid>
                <Grid item md={8} sm={12}><IAccordion options={Options} /></Grid>
            </Grid>
        </div>
    )
}

export default Home;