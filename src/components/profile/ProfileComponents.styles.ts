import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        media: {
            width: 40,
            height: 40,
            borderRadius: 8
        },
        textField: {
            padding: theme.spacing(1),
            borderRadius: 8,
            background: theme.palette.background.default
        },
    })
);