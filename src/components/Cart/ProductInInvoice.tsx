import { CardMedia, Grid, IconButton, Paper, Typography } from "@material-ui/core";
import { maxWord } from "../../utils/Utils";
import { useStyles } from "./ProductInInvoice.styles";
import ExposureNeg1RoundedIcon from '@material-ui/icons/ExposureNeg1Rounded';
import PlusOneRoundedIcon from '@material-ui/icons/PlusOneRounded';
import { ProductItemType } from "../types"

type ProductInInvoiceProps = {
    item: ProductItemType;
    addToCart: (clickedItem: ProductItemType) => void;
    removeFromCart: (id: number) => void
}

export const ProductInInvoice = ({ item, addToCart, removeFromCart }: ProductInInvoiceProps) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item>
                        <CardMedia
                            className={classes.image}
                            image={item.image}
                            title={item.title}
                        />
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1">
                                    {maxWord(item.title, 7)}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    {maxWord(item.description, 15)}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    ID: {item.id}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Total: ${(item.amount * item.price).toFixed(2)}
                                </Typography>
                            </Grid>
                            <Grid container spacing={1} item justifyContent="center">
                                <IconButton onClick={() => { removeFromCart(item.id) }} aria-label="delete">
                                    <ExposureNeg1RoundedIcon />
                                </IconButton>
                                <Typography variant="body1" className={classes.margin}> {item.amount} </Typography>
                                <IconButton onClick={() => { addToCart(item) }} aria-label="delete">
                                    <PlusOneRoundedIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle1">${item.price}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}