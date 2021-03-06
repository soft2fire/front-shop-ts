import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { Backdrop, Chip, Grid, Tooltip } from '@material-ui/core';
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
import LinkSession from '../elements/LinkSession';

function DetailProduct() {

    const classes = useStyles();
    const { pageId }: { pageId: string } = useParams();
    const { products, handleAddToCart, isLoading, error } = React.useContext(StoreContextProvider);
    const [SingleProduct, setSingleProduct] = React.useState({} as ProductItemType);

    const getSingleProduct = React.useCallback(() => {

        const productItem: any = products?.find((prevItem) => prevItem.id === Number(pageId));
        if (!isLoading) {
            setSingleProduct(productItem);
        }

    }, [isLoading, pageId, products]);

    React.useEffect(() => {
        getSingleProduct()
    }, [getSingleProduct]);


    if (isLoading) return <Backdrop open={isLoading} onClick={() => isLoading ? true : false}>
        <CircularProgress color="inherit" />
    </Backdrop>;
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
                                    {SingleProduct?.description}
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
                                            label={SingleProduct?.price}
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