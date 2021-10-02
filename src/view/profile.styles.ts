import { grey } from '@material-ui/core/colors';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.paper,
            // display: 'flex',
            height: 'auto',
            width: '99%',
            paddingTop: 4,
            margin: theme.spacing(1)
        },
        tabs: {
            borderRight: `1px solid ${theme.palette.divider}`,
            minWidth: 50
        },
        backButton: {
            margin: theme.spacing(1),
            width: 'fit-content',
            marginTop: theme.spacing(1),
            fontWeight: 'bold',
            background: theme.palette.background.default
        },
        paper: {
            alignContent: 'center',
            color: grey[100],
            margin: theme.spacing(1),
        },
    })
);