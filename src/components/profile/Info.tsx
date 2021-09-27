import React from "react";
import { Button, Card, CardContent, CardMedia, Grid, IconButton, TextField, Typography } from "@material-ui/core";
import EmailIcon from '@material-ui/icons/Email';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import ContactsIcon from '@material-ui/icons/Contacts';
import EditLocationRoundedIcon from '@material-ui/icons/EditLocationRounded';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
// import StoreContextProvider from "../../reducer/StoreReducer";
import { auth } from "../../service/Firebase";
import { Formik, Form, FormikProps } from "formik";
import * as Yup from 'yup'
import { useStyles } from "./ProfileComponents.styles";

interface UserInfo {
    displayName?: string,
    email?: string,
    // phoneNumber?: string | null,
    photoURL?: string | undefined,
    providerId?: string,
    // uid?: string,
}

interface User extends UserInfo {
    emailVerified: boolean
    providerData: UserInfo[]
}



interface FormStatus {
    message: string
    type: string
}

interface FormStatusProps {
    [key: string]: FormStatus
}

const formStatusProps: FormStatusProps = {
    success: {
        message: 'Profile Update is Successfully',
        type: 'success',
    },
    error: {
        message: 'Something went wrong. Please try again.',
        type: 'error',
    },
}

const Info = () => {
    const classes = useStyles();
    const [userDetails] = React.useState(auth.currentUser as User);
    // const { isLoading } = React.useContext(StoreContextProvider);
    const [displayFormStatus, setDisplayFormStatus] = React.useState(false);
    const [editMode, setEditMode] = React.useState(false);
    const [formStatus, setFormStatus] = React.useState<FormStatus>({
        message: '',
        type: '',
    })

    console.log(userDetails);

    const ChangeInfoRequest = async (data: UserInfo) => {
        auth.currentUser?.updateProfile({ displayName: data.displayName }).then(() => {
            setFormStatus(formStatusProps.success)
            setDisplayFormStatus(true)
            setEditMode(false)
        }).catch((error) => {
            setFormStatus(formStatusProps.error)
        });
        setDisplayFormStatus(true)
    }


    const editSection = () => {
        return (
            <Formik
                initialValues={{
                    displayName: userDetails?.displayName,
                    email: userDetails?.email,
                    // confirmPassword: '',
                }}

                onSubmit={(values: UserInfo, actions) => {
                    ChangeInfoRequest(values)
                    setTimeout(() => {
                        actions.setSubmitting(false)
                    }, 1500)

                }}

                validationSchema={Yup.object().shape({
                    displayName: Yup.string().required('Required'),
                })}
            >
                {(props: FormikProps<UserInfo>) => {
                    const { values, touched, errors, handleBlur, handleChange, isSubmitting, } = props
                    return (
                        <Form>
                            <Grid container justify="space-around" direction="row"  >

                                <Grid item  >
                                    <TextField name="displayName" id="displayName"
                                        label="display Name" value={values.displayName} variant="filled"
                                        type="text"
                                        helperText={errors.displayName && touched.displayName ? errors.displayName : 'name most be more than 3 character.'}
                                        error={errors.displayName && touched.displayName ? true : false}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>

                                <Grid item lg={11} md={11} sm={11} xs={11} container justifyContent="space-around">
                                    <Button type="submit" variant="contained" color="secondary" disabled={isSubmitting}  >
                                        submit
                                    </Button>
                                    <Button onClick={() => { setEditMode(false) }}
                                        variant="contained"
                                        color="secondary"
                                        disabled={isSubmitting}  >
                                        Cancel
                                    </Button>
                                    {displayFormStatus && (
                                        <div className="formStatus">
                                            {
                                                formStatus.type === 'error'
                                                    ? (<Typography color="primary">{formStatus.message}</Typography>)
                                                    : formStatus.type === 'success'
                                                        ? (<Typography color="primary">{formStatus.message} </Typography>)
                                                        : null
                                            }
                                        </div>
                                    )}
                                </Grid>
                            </Grid>
                        </Form>
                    )
                }}
            </Formik>
        )
    }

    return (
        <Card>
            <CardContent>
                {!editMode ?
                    <Grid container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="flex-start">

                        <Grid className={classes.textField} item>
                            <EmailIcon />
                            <Typography variant="body1">
                                {`Email: ${userDetails?.email}`}
                            </Typography>
                        </Grid>
                        <Grid className={classes.textField} item>
                            <ContactsIcon />
                            <Typography variant="body1">
                                {`Display Name: ${userDetails?.displayName ? userDetails?.displayName : 'Name not yet set'}`}
                            </Typography>
                        </Grid>
                        <Grid className={classes.textField} item>
                            <FingerprintIcon />
                            <Typography variant="body1">
                                {`providerId: ${userDetails?.providerId}`}
                            </Typography>
                        </Grid>
                        <Grid className={classes.textField} item>
                            <VerifiedUserIcon />
                            <Typography variant="body1">
                                Email verified?:{userDetails?.emailVerified ? "Yes" : "No"}
                            </Typography>
                        </Grid>
                        <Grid className={classes.textField} item>
                            <VerifiedUserIcon />
                            <CardMedia
                                className={classes.media}
                                image={userDetails?.photoURL}
                                title="Paella dish"
                            />
                        </Grid>
                        <Grid item >
                            <IconButton onClick={() => { setEditMode(true) }} color="default" aria-label="add to shopping cart">
                                <EditLocationRoundedIcon />
                            </IconButton>
                        </Grid>

                    </Grid>
                    : editSection()
                }
            </CardContent>
        </Card>
    )
}
export default Info;