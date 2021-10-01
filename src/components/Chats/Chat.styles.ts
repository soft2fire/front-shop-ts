import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';


// export const useStyles = makeStyles((theme: Theme) =>
//     createStyles({
//         body: {
//             backgroundColor: theme.palette.background.paper
//         },
//         main: {
//             padding: 8,
//             height: '80vh',
//             margin: '10vh 0 10vh',
//             overflow: 'scroll',
//             display: 'flex',
//             flexDirection: 'column'
//         },
//         form: {
//             height: '80vh',
//             position: 'fixed',
//             bottom: 0,
//             backgroundColor: theme.palette.background.default,
//             width: '100%',
//             maxWidth: 728,
//             display: 'flex',
//         },
//     }),
// );

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            height: "80vh",
            maxWidth: "500px",
            maxHeight: "700px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            position: "relative"
        },
        paper2: {
            width: "80vw",
            maxWidth: "500px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            position: "relative"
        },
        container: {
            width: "100vw",
            height: "100vh",
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
            margin: `${theme.spacing(0)} auto`
        },
        wrapText: {
            width: "100%"
        },
        button: {
            //margin: theme.spacing(1),
        },
    })
);