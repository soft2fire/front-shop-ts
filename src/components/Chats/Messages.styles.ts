import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { deepOrange } from "@material-ui/core/colors";

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        messageRow: {
            display: "flex"
        },
        messageRowRight: {
            display: "flex",
            justifyContent: "flex-end"
        },

        messageBlue: {
            position: "relative",
            marginLeft: 14,
            marginBottom: 10,
            padding: 8,
            backgroundColor: "#66bcf6",
            width: "60%",
            minWidth: 40,
            // height: 50,
            textAlign: "left",
            border: "1px solid #97C6E3",
            borderRadius: 4,
            "&:after": {
                content: "''",
                position: "absolute",
                width: "0",
                height: "0",
                borderTop: "15px solid #66bcf6",
                borderLeft: "15px solid transparent",
                borderRight: "15px solid transparent",
                top: "0",
                left: "-15px"
            },
            "&:before": {
                content: "''",
                position: "absolute",
                width: "0",
                height: "0",
                borderTop: "17px solid #97C6E3",
                borderLeft: "16px solid transparent",
                borderRight: "16px solid transparent",
                top: "-1px",
                left: "-17px"
            }
        },
        messageOrange: {
            position: "relative",
            marginRight: "20px",
            marginBottom: "10px",
            padding: "10px",
            backgroundColor: "#AEA43E",
            width: "60%",
            //height: "50px",
            textAlign: "left",
            border: "1px solid #dfd087",
            borderRadius: "10px",
            "&:after": {
                content: "''",
                position: "absolute",
                width: "0",
                height: "0",
                borderTop: "15px solid #AEA43E",
                borderLeft: "15px solid transparent",
                borderRight: "15px solid transparent",
                top: "0",
                right: "-15px"
            },
            "&:before": {
                content: "''",
                position: "absolute",
                width: "0",
                height: "0",
                borderTop: "17px solid #dfd087",
                borderLeft: "16px solid transparent",
                borderRight: "16px solid transparent",
                top: "-1px",
                right: "-17px"
            }
        },

        messageContent: {
            padding: 0,
            margin: 0
        },
        // messageTimeStampRight: {
        //     position: "absolute",
        //     fontWeight: "bold",
        //     marginTop: "10px",
        //     bottom: "-3px",
        //     right: "5px"
        // },
        orange: {
            color: theme.palette.getContrastText(deepOrange[500]),
            backgroundColor: deepOrange[500],
            width: theme.spacing(4),
            margin: 4,
            height: theme.spacing(4)
        },
        avatarNothing: {
            color: "transparent",
            backgroundColor: "transparent",
            width: theme.spacing(4),
            height: theme.spacing(4)
        },
        displayName: {
            marginLeft: 4
        }
    })
);
