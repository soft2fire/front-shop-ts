import { grey } from '@material-ui/core/colors';
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
            height: 400,
        },
        addToCart: {
            backgroundColor:theme.palette.success.dark,
            margin:8
        },
        description: {
            height:300,
        },
        price: {
            marginBottom: 2,
            fontWeight: 'bold',
        },
        title: {
            fontWeight: 'bold',
        },
    })
);