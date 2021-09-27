import React, { useState } from 'react'
import { Grid, TextField, Button, Card, CardContent, Typography } from '@material-ui/core'
import { Formik, Form, FormikProps } from 'formik'
import * as Yup from 'yup'
import { useStyles } from './Register.styles'
import { auth } from '../../service/Firebase'
import logging from '../../config/logging'

interface ChangePasswordForm {
    currentPassword: string
    newPassword: string
    confirmPassword: string
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
        message: 'change up successfully. please wait,you redirect to login page be soon',
        type: 'success',
    },
    error: {
        message: 'Something went wrong. Please try again.',
        type: 'error',
    },
}

const ChangePassword: React.FunctionComponent = () => {
    const classes = useStyles()
    const [displayFormStatus, setDisplayFormStatus] = useState(false);
    const [formStatus, setFormStatus] = useState<FormStatus>({
        message: '',
        type: '',
    })

    const ChangePasswordRequest = async (data: ChangePasswordForm, resetForm: Function) => {
        auth.currentUser?.updatePassword(data.newPassword).then(() => {
            setFormStatus(formStatusProps.success)
            resetForm({})
            setDisplayFormStatus(true)
        }).catch((error) => {
            logging.error(error)
            setFormStatus(formStatusProps.error)
        });
        setDisplayFormStatus(true)
    }

    return (
        <div className={classes.root}>
            <Card >
                <CardContent>
                    <Formik
                        initialValues={{
                            currentPassword: '',
                            newPassword: '',
                            confirmPassword: '',
                        }}
                        onSubmit={(values: ChangePasswordForm, actions) => {
                            ChangePasswordRequest(values, actions.resetForm)
                            setTimeout(() => {
                                actions.setSubmitting(false)
                            }, 1500)
                        }}
                        validationSchema={Yup.object().shape({
                            currentPassword: Yup.string().required('Required'),
                            newPassword: Yup.string().matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,20}\S$/).required('Required'),
                            confirmPassword: Yup.string().required('Required')
                                .test(
                                    'password-match',
                                    'Password musth match',
                                    function (value) {
                                        return this.parent.newPassword === value
                                    }
                                ),
                        })}
                    >
                        {(props: FormikProps<ChangePasswordForm>) => {
                            const { values, touched, errors, handleBlur, handleChange, isSubmitting, } = props
                            return (
                                <Form>
                                    <h1 className={classes.title}>ChangePassword</h1>
                                    <Grid container justify="space-around" direction="row"  >

                                        <Grid item lg={11} md={11} sm={11} xs={11} className={classes.textField}>
                                            <Typography>{auth.currentUser?.email}</Typography>

                                            <TextField name="currentPassword" id="currentPassword"
                                                label="Current password" value={values.currentPassword} variant="filled"
                                                type="password"
                                                helperText={errors.currentPassword && touched.currentPassword
                                                    ? errors.currentPassword
                                                    : 'Enter your current password.'
                                                }
                                                error={errors.currentPassword && touched.currentPassword
                                                    ? true
                                                    : false
                                                }
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </Grid>

                                        <Grid item lg={11} md={11} sm={11} xs={11} className={classes.textField} >
                                            <TextField name="newPassword" id="newPassword" label="new Password" value={values.newPassword} type="password" variant="filled"
                                                helperText={
                                                    errors.newPassword && touched.newPassword
                                                        ? 'Please valid password. One uppercase, one lowercase, one number and no spaces'
                                                        : 'One uppercase, one lowercase, one number and no spaces'
                                                }
                                                error={errors.newPassword && touched.newPassword ? true : false}
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

                                        <Grid item lg={11} md={11} sm={11} xs={11} className={classes.submitButton}  >
                                            <Button type="submit" variant="contained" color="secondary" disabled={isSubmitting}  >
                                                Change Password
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

export default ChangePassword