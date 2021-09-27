import { green, grey } from '@material-ui/core/colors';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({

        backButton: {
            margin: theme.spacing(1),
            width: 'fit-content',
            marginTop: theme.spacing(2.5),
            fontWeight: 'bold',
            background: theme.palette.background.default
        },
        card: {
            alignContent: 'center',
            color: grey[100],
            margin: theme.spacing(1),
        },
        media: {
            width: 400,
            height: 400,
            float: 'right'
        },
        description: {
            height: 1000,
        },
        price: {
            marginBottom: 2,
            fontWeight: 'bold',
        },
        title: {
            fontWeight: 'bold',
        },
        CheckOut: {
            background: green[400],
            borderRadius: 5,
            margin: 4,
            padding: 4
        },
    })
);