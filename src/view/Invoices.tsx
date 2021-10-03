import React from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import StoreIcon from '@material-ui/icons/Store';
import Payment from '@material-ui/icons/Payment';
import { Box, Button, Grid, Chip, Backdrop } from '@material-ui/core';
import { useStyles } from './Invoice.styles';
import { calculateTotal } from '../utils/Utils';
import { ProductInInvoice } from '../components/Cart/ProductInInvoice';
import LinkSession from '../components/elements/LinkSession';
import StoreContextProvider from "../reducer/StoreReducer";

const Invoice = () => {

    const { isLoading, cartItems, handleAddToCart, handleRemoveCart, handleResetCart } = React.useContext(StoreContextProvider);
    const classes = useStyles();


    if (isLoading) return <Backdrop open={isLoading} onClick={() => isLoading ? true : false}>
        <CircularProgress color="inherit" />
    </Backdrop>;

    return (
        <div>
            <LinkSession link={'/shop'}>
                <Button
                    className={classes.backButton}
                    startIcon={<ArrowBackIcon />}
                >
                    back To Shopping
                </Button>
            </LinkSession>

            <Card className={classes.card}>
                <CardContent>
                    <Grid container
                        direction="row"
                        justifyContent="space-around"
                        alignItems="flex-start"
                    >

                        <Grid container justifyContent="space-between" spacing={2} item xs={12}>
                            <Typography gutterBottom color="textSecondary" component="h2">
                                <Payment fontSize="large" />
                            </Typography>
                            <Chip
                                label="Click for Empty Basket"
                                onDelete={() => { handleResetCart() }}
                                deleteIcon={<DeleteForeverIcon />}
                                color="secondary"
                            />
                        </Grid>

                        <Grid container spacing={2} md={6} xs={12}>
                            {
                                cartItems.map(item => (
                                    <ProductInInvoice
                                        key={item.id}
                                        item={item}
                                        addToCart={handleAddToCart}
                                        removeFromCart={handleRemoveCart}
                                    />
                                ))
                            }
                        </Grid>

                        <Grid xs={12} md={6} >
                            <Box boxShadow={2}>
                                <Card>
                                    <CardContent >

                                        <CardActions>
                                            <Typography variant="subtitle1" color="textSecondary">
                                                Check Out
                                            </Typography>
                                        </CardActions>
                                        <Grid container className={classes.CheckOut}>
                                            <AddShoppingCartIcon />
                                            <Typography color="textSecondary">
                                                {cartItems.length ? 'Your order is eligible for Free Delivery' : 'Basket Is Empty'}
                                            </Typography>
                                        </Grid>
                                        <Typography style={{ paddingTop: 8 }} variant="h6" color="textSecondary">
                                            Sub-Total : ${calculateTotal(cartItems).toFixed(2)}
                                        </Typography>
                                        <Typography variant="subtitle1" color="textSecondary">
                                            Number of items : {cartItems.length}
                                        </Typography>
                                        <Typography variant="h6" color="textSecondary">
                                            This price is exclusive of taxes. GST will be added during checkout.
                                        </Typography>
                                        <CardActions>
                                            <Button variant="contained" color="secondary">
                                                Proceed to Payment
                                            </Button>
                                        </CardActions>

                                    </CardContent>
                                </Card>
                            </Box>
                        </Grid>

                    </Grid>

                    <CardActions>
                        <LinkSession link={'/shop'}>
                            <Button
                                className={classes.backButton}
                                startIcon={<StoreIcon />}
                            >
                                Resume Shopping
                            </Button>
                        </LinkSession>
                    </CardActions>

                </CardContent>
            </Card>
        </div>
    )
}
export default Invoice;