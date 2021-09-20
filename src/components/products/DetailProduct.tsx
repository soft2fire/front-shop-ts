import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Chip, Grid, LinearProgress, Tooltip } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import StoreIcon from '@material-ui/icons/Store';
//my types
import { ProductItemType } from '../types';
// my styles
import { useStyles } from './DetailProduct.styles';
// import product api
import StoreContextProvider from '../../reducer/StoreReducer';
import { useParams } from "react-router";
import React from 'react';
import LinkSession from '../elements/LinkSession';

// const DetailProduct = () => {
function DetailProduct() {
    const classes = useStyles();
    const { pageId }: { pageId: string } = useParams()
    const { products, handleAddToCart, isLoading, error } = React.useContext(StoreContextProvider);
    const items = products.find((prevItem) => prevItem.id === Number(pageId));
    const [SingleProduct] = React.useState(items as ProductItemType)

    if (isLoading) return <LinearProgress />;
    if (error) return <div>something went wrong...</div>
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
                        justifyContent="space-between"
                        alignItems="flex-start"
                    >

                        <Grid md={8} xs={12} sm={6} item>
                            <Grid item container className={classes.description}
                                direction="column"
                                justifyContent="space-between"
                                alignItems="flex-start"
                            >
                                <Typography gutterBottom variant="h6" color="textPrimary" >
                                    {SingleProduct?.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Category : {SingleProduct?.category}
                                </Typography>
                                <Typography variant="body2" color="textPrimary">
                                    {items?.description}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Product ID : {SingleProduct?.id}
                                </Typography>
                                <Grid container direction="row"
                                    justifyContent="center"
                                    alignItems="center">
                                    <Tooltip title="Add To Cart" placement="bottom" arrow>
                                        <Chip clickable
                                            icon={<MonetizationOnIcon />}
                                            label={SingleProduct.price}
                                            onDelete={() => { handleAddToCart(SingleProduct) }}
                                            onClick={() => { handleAddToCart(SingleProduct) }}
                                            deleteIcon={<ShoppingBasketIcon />}
                                            className={classes.addToCart}
                                            color="primary"
                                        />
                                    </Tooltip>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid md={4} xs={12} sm={6} item >
                            <CardMedia
                                className={classes.media}
                                image={SingleProduct?.image}
                                title={SingleProduct?.title}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions>
                    <LinkSession link={'/shop'}>
                        <Button startIcon={<StoreIcon />} >
                            Shop
                        </Button>
                    </LinkSession>
                </CardActions>
            </Card>
        </div>
    )
}

export default DetailProduct;