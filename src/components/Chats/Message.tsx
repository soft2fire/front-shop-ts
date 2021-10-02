import { Avatar } from "@material-ui/core";
import { useStyles } from "./Messages.styles";


export const MessageLeft = (props: any) => {
    const message = props.message ? props.message : "no message";
    // const timestamp = props.timestamp ? props.timestamp : "";
    const photoURL = props.photoURL ? props.photoURL : "set in profile";
    const displayName = props.displayName ? props.displayName : "SenderName";
    const classes = useStyles();
    return (
        <div className={classes.messageRow}>
            <Avatar
                alt={displayName}
                className={classes.orange}
                src={photoURL}
            ></Avatar>
            <div>
                <div className={classes.displayName}>{displayName}</div>
                <div className={classes.messageBlue}>
                    <div>
                        <p className={classes.messageContent}>{message}</p>
                    </div>
                    {/* <div className={classes.messageTimeStampRight}>{timestamp}</div> */}
                </div>
            </div>
        </div>
    );
};

export const MessageRight = (props: any) => {
    const classes = useStyles();
    const message = props.message ? props.message : "no message";
    // const timestamp = props.timestamp ? props.timestamp : "";
    return (
        <div className={classes.messageRowRight}>
            <div className={classes.messageOrange}>
                <p className={classes.messageContent}>{message}</p>
                {/* <div className={classes.messageTimeStampRight}>{timestamp}</div> */}
            </div>
        </div>
    );
};
