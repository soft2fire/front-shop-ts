import React from 'react'
import { auth, db } from '../../service/Firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import SendIcon from '@material-ui/icons/Send';
import firebase from 'firebase/compat/app';
import { useStyles } from './Chat.styles';
import { MessageLeft, MessageRight } from './Message';
import { Button, Card, Paper, TextField } from '@material-ui/core';
import { useAuthState } from 'react-firebase-hooks/auth';

// interface MessagesProps {
//     text: string,
//     value: string,
//     uid: string,
//     photoURL: string
// }

const Chats = () => {

    const classes = useStyles();
    const [userCheck] = useAuthState(auth)
    const dummy = React.useRef<any>();
    const messagesRef = db.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(25);

    const [messages] = useCollectionData(query, { idField: 'id' });

    const [formValue, setFormValue] = React.useState('');

    const sendMessage = async (event: any) => {
        event.preventDefault();

        const { uid, photoURL, displayName }: any = auth.currentUser;
        console.log(displayName);

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
        const { text, uid, photoURL, displayName }: any = props.message;

        const messageClass = uid === auth.currentUser?.uid ? 'send' : 'received';

        if (messageClass === 'received') {
            return (<MessageLeft
                message={text}
                timestamp="MM/DD 00:00"
                photoURL={photoURL || 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png'}
                displayName={displayName}
                avatarDisp={true}
            />)
        }
        if (messageClass === 'send') {
            return (<MessageRight
                message={text}
                timestamp="MM/DD 00:00"
                photoURL={photoURL || 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png'}
                displayName={displayName}
                avatarDisp={true}
            />)
        }
        return <></>
    }

    return (
        <Card >
            <div className={classes.container}>
                <Paper className={classes.paper}>
                    <Paper id="style-1" className={classes.messagesBody}>
                        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
                        <span ref={dummy}></span>
                    </Paper>
                    {
                        userCheck
                            ? <form onSubmit={sendMessage} className={classes.wrapForm} noValidate autoComplete="off">
                                <TextField
                                    id="standard-text"
                                    label="Say something"
                                    className={classes.wrapText}
                                    value={formValue}
                                    onChange={(e) => setFormValue(e.target.value)}
                                />
                                <Button type="submit" disabled={!formValue} variant="contained" color="primary" className={classes.button}>
                                    <SendIcon />
                                </Button>
                            </form>

                            : "You most be login for chat"
                    }

                </Paper>
            </div>
        </Card>
    )

}
export default Chats