import { makeStyles, Theme, createStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: '450px',
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
            marginTop: '20%',
        },
        title: { textAlign: 'center' },
        successMessage: { color: 'green' },
        errorMessage: { color: 'red' },
    })
)