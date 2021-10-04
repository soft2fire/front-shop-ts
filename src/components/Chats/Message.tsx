import { Avatar, Typography } from "@material-ui/core";
import { useStyles } from "./Messages.styles";

export const MessageLeft = (props: any) => {

    const message = props.message ? props.message : "no message";
    const timestamp = props.timestamp ? props.timestamp : "";
    const photoURL = props.photoURL ? props.photoURL : "set in profile";
    const displayName = props.displayName ? props.displayName : props.email;
    const classes = useStyles();


    return (
        <div className={classes.messageRow}>
            <Avatar
                alt={displayName}
                className={classes.orange}
                src={photoURL}
            />
            <div>
                <div className={classes.displayName}>{displayName}</div>
                <div className={classes.messageBlue}>
                    <div>
                        <Typography className={classes.messageContent}>{message}</Typography>
                    </div>
                    <Typography variant="body2" className={classes.messageTimeStampLeft}>{timestamp}</Typography>
                </div>
            </div>

        </div>
    );
};

export const MessageRight = (props: any) => {

    const classes = useStyles();
    const message = props.message ? props.message : "no message";
    const timestamp = props.timestamp ? props.timestamp : "";

    return (
        <div className={classes.messageRowRight}>
            <div className={classes.messageOrange}>
                <Typography variant="body2">You</Typography>
                <Typography className={classes.messageContent}>{message}</Typography>
                <Typography variant="body2" className={classes.messageTimeStampRight}>{timestamp}</Typography>
            </div>
        </div>
    );
};
