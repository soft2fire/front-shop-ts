import React, { useState } from 'react'
import { Grid, TextField, Button, Card, CardContent } from '@material-ui/core'
import { Formik, Form, FormikProps } from 'formik'
import * as Yup from 'yup'
import { useStyles } from './Register.styles'
import { auth } from '../../service/Firebase'
// import { useHistory } from 'react-router'

interface ISignUpForm {
    fullName: string
    password: string
    confirmPassword: string
    email: string
}

interface IFormStatus {
    message: string
    type: string
}

interface IFormStatusProps {
    [key: string]: IFormStatus
}

const formStatusProps: IFormStatusProps = {
    success: {
        message: 'Signed up successfully.',
        type: 'success',
    },
    duplicate: {
        message: 'Email-id already exist. Please use different email-id.',
        type: 'error',
    },
    error: {
        message: 'Something went wrong. Please try again.',
        type: 'error',
    },
}

const Register: React.FunctionComponent = () => {
    // const history = useHistory();
    const classes = useStyles()
    const [displayFormStatus, setDisplayFormStatus] = useState(false)
    const [formStatus, setFormStatus] = useState<IFormStatus>({
        message: '',
        type: '',
    })

    const createNewUser = async (data: ISignUpForm, resetForm: Function) => {
        
        auth.createUserWithEmailAndPassword(data.email, data.password)
            .then(() => {
                if (data) {
                    setFormStatus(formStatusProps.success)
                    resetForm({})
                }
            })
            .catch(error => {
                const response = error;
                if (response.code === 'auth/email-already-in-use') {
                    setFormStatus(formStatusProps.duplicate)
                } else {
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
                            fullName: '',
                            password: '',
                            confirmPassword: '',
                            email: '',
                        }}

                        onSubmit={(values: ISignUpForm, actions) => {
                            createNewUser(values, actions.resetForm)
                            setTimeout(() => {
                                actions.setSubmitting(false)
                            }, 1000)
                        }}

                        validationSchema={Yup.object().shape({
                            email: Yup.string().email().required('Enter valid email-id'),
                            fullName: Yup.string().required('Please enter full name'),
                            password: Yup.string().matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,20}\S$/).required('Required'),
                            confirmPassword: Yup.string().required('Required')
                                .test(
                                    'password-match',
                                    'Password musth match',
                                    function (value) {
                                        return this.parent.password === value
                                    }
                                ),
                        })}
                    >
                        {(props: FormikProps<ISignUpForm>) => {
                            const { values, touched, errors, handleBlur, handleChange, isSubmitting, } = props
                            return (
                                <Form>
                                    <h1 className={classes.title}>Sign up</h1>
                                    <Grid container justify="space-around" direction="row"  >

                                        <Grid item lg={11} md={11} sm={11} xs={11} className={classes.textField} >
                                            <TextField name="fullName" id="fullNam
                                            e" label="Full Name" value={values.fullName} variant="filled"
                                                type="text"
                                                helperText={errors.fullName && touched.fullName
                                                    ? errors.fullName
                                                    : 'Enter your full name.'
                                                }
                                                error={errors.fullName && touched.fullName
                                                    ? true
                                                    : false
                                                }
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
                                        <Grid item lg={11} md={11} sm={11} xs={11} className={classes.textField}  >
                                            <TextField name="confirmPassword" id="confirmPassword" label="Confirm password" variant="filled" value={values.confirmPassword} type="password"
                                                helperText={errors.confirmPassword && touched.confirmPassword ? errors.confirmPassword : 'Re-enter password to confirm'}
                                                error={errors.confirmPassword && touched.confirmPassword ? true : false}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </Grid>
                                        <Grid item lg={11} md={11} sm={11} xs={11} className={classes.textField} >
                                            <TextField name="email" id="email" label="Email-id" value={values.email} type="email" variant="filled"
                                                helperText={errors.email && touched.email ? errors.email : 'Enter email-id'}
                                                error={errors.email && touched.email ? true : false}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </Grid>

                                        <Grid item lg={11} md={11} sm={11} xs={11} className={classes.submitButton}  >
                                            <Button type="submit" variant="contained" color="secondary" disabled={isSubmitting}  >
                                                Submit
                                            </Button>
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
                                </Form>
                            )
                        }}
                    </Formik>
                </CardContent>
            </Card>
        </div>
    )
}

export default Register