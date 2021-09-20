import React, { useState } from 'react'
import { Grid, TextField, Button, Card, CardContent, Chip } from '@material-ui/core'
import { Formik, Form, FormikProps } from 'formik'
import * as Yup from 'yup'
import { useStyles } from './Login.styles'
import { auth } from '../../service/Firebase'
import LinkSession from '../../components/elements/LinkSession'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { useHistory } from 'react-router'

interface SignInForm {
    password: string
    email: string
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
        message: 'Signed In successfully.',
        type: 'success',
    },
    error: {
        message: 'User or password is wrong.',
        type: 'error',
    },
}

const Login: React.FunctionComponent = () => {
    const history = useHistory();
    const classes = useStyles()
    const [displayFormStatus, setDisplayFormStatus] = useState(false)
    const [formStatus, setFormStatus] = useState<FormStatus>({
        message: '',
        type: '',
    })
    const loginUser = async (data: SignInForm) => {

        auth.signInWithEmailAndPassword(data.email, data.password)
            .then(() => {
                if (data) {
                    setFormStatus(formStatusProps.success)
                    setDisplayFormStatus(true)
                }
                setTimeout(() => {
                    history.push('/shop')
                }, 1500)
            })
            .catch(error => {
                const response = error;
                if (response.code) {
                    setFormStatus(formStatusProps.error)
                }
                setDisplayFormStatus(true)
            }
            )
    }

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <CardContent>
                    <Formik
                        initialValues={{
                            password: '',
                            email: '',
                        }}
                        onSubmit={(values: SignInForm, actions) => {
                            loginUser(values)
                            setTimeout(() => {
                                actions.setSubmitting(false)
                            }, 1000);
                        }}
                        validationSchema={Yup.object().shape({
                            email: Yup.string().email().required('Enter valid email-id'),
                            password: Yup.string().matches(/^(?=.*[A-Z]).{8,20}\S$/).required('Required'),
                        })}
                    >
                        {(props: FormikProps<SignInForm>) => {
                            const { values, touched, errors, handleBlur, handleChange, isSubmitting, } = props
                            return (
                                <Form>
                                    <h1 className={classes.title}>Sign In</h1>
                                    <Grid container justify="space-around" direction="row">

                                        <Grid item lg={11} md={11} sm={11} xs={11} className={classes.textField} >
                                            <TextField name="email" id="email" label="Email-id" value={values.email} type="email" variant="filled"
                                                helperText={errors.email && touched.email ? errors.email : 'Enter email-id'}
                                                error={errors.email && touched.email ? true : false}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </Grid>
                                        <Grid item lg={11} md={11} sm={11} xs={11} className={classes.textField} >
                                            <TextField name="password" id="password" label="Password" value={values.password} type="password" variant="filled"
                                                helperText={
                                                    errors.password && touched.password
                                                        ? 'Please valid password. One uppercase, one lowercase, one number and no spaces'
                                                        : 'One uppercase, one lowercase, one number and no spaces'
                                                }
                                                error={errors.password && touched.password ? true : false}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </Grid>

                                        <Grid item lg={11} md={11} sm={11} xs={11} className={classes.submitButton} container
                                            direction="column" >
                                            <Grid item container justifyContent="space-between">
                                                <Button type="submit" variant="contained" color="secondary" disabled={isSubmitting}  >
                                                    Login
                                                </Button>
                                                <LinkSession link="/register">
                                                    <Chip clickable variant="outlined" label="create an account" icon={<AccountCircleIcon />} />
                                                </LinkSession>
                                            </Grid>
                                            <Grid item justifyContent="space-between">
                                                {displayFormStatus && (
                                                    <div className="formStatus">
                                                        {
                                                            formStatus.type === 'error'
                                                                ? (<p className={classes.errorMessage}>{formStatus.message}</p>)
                                                                : formStatus.type === 'success'
                                                                    ? (<p className={classes.successMessage} >{formStatus.message} </p>)
                                                                    : null
                                                        }
                                                    </div>
                                                )}
                                            </Grid>

                                        </Grid>

                                    </Grid>
                                </Form>
                            )
                        }}
                    </Formik>
                </CardContent>
            </Card>
        </div>
    )
}

export default Login