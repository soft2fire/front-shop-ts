import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
//my types
import { ProductItemType } from "../types";
//my styles
import { useStyles } from "./Product.styles";
import { Grid } from '@material-ui/core';
import { maxWord } from '../../utils/Utils';
import StoreContextProvider from '../../reducer/StoreReducer';
import { useContext } from 'react';
import LinkSession from '../elements/LinkSession';

type ProductProps = {
    products: ProductItemType
}

function Product({ products }: ProductProps) {
    const classes = useStyles();
    const { handleAddToCart } = useContext(StoreContextProvider);

    return (
        <Card >
            <CardActionArea>
                <Grid container
                    direction="column"
                    justifyContent="space-between"
                    alignItems="center"
                    className={classes.root}
                >

                    <LinkSession link={`/Product/${products.id}`}>
                        <CardContent>
                            <CardMedia
                                className={classes.media}
                                image={products.image}
                                title={products.title}
                            />
                            <Typography className={classes.title} variant="body2">
                                {maxWord(products.title, 4)}
                            </Typography>
                            <Typography className={classes.description} variant="body2">
                                {maxWord(products.description, 18)}
                                <Typography color="error" variant="inherit">Click More...</Typography>
                            </Typography>
                        </CardContent>
                    </LinkSession>

                    <Grid container
                        direction="row"
                        justifyContent="space-around"
                        spacing={1}
                        alignItems="center">
                        <Grid item>
                            <Button onClick={() => { handleAddToCart(products) }} size="small">
                                Add To Cart
                            </Button>
                        </Grid>
                        <Grid item>
                            <Typography className={classes.price}>$ {products.price}</Typography>
                        </Grid>
                    </Grid>

                </Grid>
            </CardActionArea>
        </Card>
    )
}

export default Product;