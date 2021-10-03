import React from 'react'
import { auth, db } from '../../service/Firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import SendIcon from '@material-ui/icons/Send';
import firebase from 'firebase/compat/app';
import { useStyles } from './Chat.styles';
import { MessageLeft, MessageRight } from './Message';
import { Button, Card, Grid, Paper, TextField } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { useAuthState } from 'react-firebase-hooks/auth';
import LinkSession from '../elements/LinkSession';

// interface MessagesProps {
//     text: string | null,
//     value: string | null,
//     uid: string,
//     displayName: string,
//     photoURL: string | null
// }

const Chats = () => {

    const classes = useStyles();
    const [userCheck] = useAuthState(auth)
    const dummy = React.useRef<any>();
    const messagesRef = db.collection('messages');
    const query = messagesRef.orderBy('createdAt', 'asc');
    const [messages] = useCollectionData(query);
    const [formValue, setFormValue] = React.useState('');

    console.log(messagesRef);

    const sendMessage = async (event: any) => {
        event.preventDefault();

        const { uid, photoURL, displayName }: any = auth.currentUser;

        await messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL,
            displayName,
        })
        setFormValue('');
        dummy.current.scrollIntoView({ behavior: 'smooth' });
    }

    function ChatMessage(props: any) {

        const { text, uid, photoURL, displayName }: any = props.messages;
        const messageClass = uid === auth.currentUser?.uid ? 'send' : 'received';

        if (messageClass === 'received') {
            return <MessageLeft
                message={text}
                // timestamp="MM/DD 00:00"
                photoURL={photoURL}
                displayName={displayName}
            // avatarDisp={false}
            />
        } else {
            return <MessageRight
                message={text}
                // timestamp="MM/DD 00:00"
                photoURL={photoURL}
                displayName={displayName}
            // avatarDisp={true}
            />
        }
    }

    return (
        <Card >
            <Paper className={classes.paper}>

                <Paper id="style-1" className={classes.messagesBody}>
                    {
                        messages
                            ? messages.map(msg => <ChatMessage key={msg.id} messages={msg} />)
                            : <Grid container direction="row" justifyContent="center" alignItems="center">
                                <CircularProgress color="inherit" />
                            </Grid>
                    }
                    <span ref={dummy}></span>
                </Paper>

                <form onSubmit={sendMessage} className={classes.wrapForm} noValidate autoComplete="off">
                    <TextField
                        id="chatInput"
                        label={userCheck ? "say something..." : "you first most be login for chat :("}
                        className={classes.wrapText}
                        value={formValue}
                        onChange={(e) => setFormValue(e.target.value)}
                        disabled={userCheck ? false : true}
                    />
                    <Button type="submit" disabled={!formValue} variant="contained" color="primary" className={classes.button}>
                        <SendIcon />
                    </Button>
                </form>

                {
                    !userCheck &&
                    <LinkSession link={'/register'}>
                        <Button
                            className={classes.registerLinkButton}
                            startIcon={<LockOpenIcon />}
                        >
                            Haven't account ?
                        </Button>
                    </LinkSession>
                }

            </Paper>
        </Card>
    )
}

export default Chats