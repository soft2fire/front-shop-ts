import { Box, Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import IAccordion from '../components/elements/Accordion';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: theme.spacing(1),
        },
        vpn: {
            margin: 4,
        },
    }),
);

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
    ]


    return (
        <div className={classes.root}>
            <Box color="text.primary">
                <Typography >Please turn on your vpn :(</Typography>
            </Box>
            <IAccordion options={Options} />
        </div>
    )
}

export default Home;