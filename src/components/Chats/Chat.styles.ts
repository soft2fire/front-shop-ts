import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        '@global': {
            '*::-webkit-scrollbar': {
                width: 6,
                cursor: 'pointer'
            },
            '*::-webkit-scrollbar-track': {
                '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00),cursor: pointer'
            },
            '*::-webkit-scrollbar-thumb': {
                backgroundColor: theme.palette.background.default,
                outline: '1px solid slategrey',
            }
        },
        paper: {
            display: "flex",
            maxHeight: "600px",
            alignItems: "center",
            flexDirection: "column",
            position: "relative",
        },
        messagesBody: {
            width: "calc( 100% - 20px )",
            margin: 10,
            overflowY: "scroll",
            height: "calc( 100% - 80px )"
        },
        wrapForm: {
            display: "flex",
            justifyContent: "center",
            width: "95%",
            margin: 8
        },
        wrapText: {
            width: "100%"
        },
        button: {
            margin: theme.spacing(0),
        },
        registerLinkButton: {
            margin: theme.spacing(1),
            width: 'fit-content',
            marginTop: theme.spacing(2.5),
            fontWeight: 'bold',
            background: theme.palette.background.default
        },
    })
);