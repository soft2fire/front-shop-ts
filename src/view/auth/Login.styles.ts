import { makeStyles, Theme, createStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: '450px',
            display: 'block',
            margin: '0 auto',
        },
        textField: {
            '& > *': {
                width: '100%',
            },
        },
        submitButton: {
            marginTop: '24px',
        },
        card: {
            marginTop: '25%',
        },
        googleChip: {
            marginTop: 8,
        },
        title: { textAlign: 'center' },
        successMessage: { color: 'green' },
        errorMessage: { color: 'red' },
    })
)