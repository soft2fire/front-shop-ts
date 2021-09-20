import { useContext, useState, useEffect } from 'react'
import Drawer from '@material-ui/core/Drawer'
import Badge from '@material-ui/core/Badge'
import Product from '../components/products/Product'
import AddShoppingCart from '@material-ui/icons/AddShoppingCart'
import PregnantWomanIcon from '@material-ui/icons/PregnantWoman';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import ComputerIcon from '@material-ui/icons/Computer';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import CircularProgress from '@material-ui/core/CircularProgress';
//my style
import { useStyles } from "./Shop.styles";
import Grid from '@material-ui/core/Grid';
import Cart from '../components/Cart/Cart'
//my types
import { ProductItemType } from "../components/types";
//get product from api
import { Backdrop, BottomNavigation, BottomNavigationAction, IconButton } from '@material-ui/core'
import StoreContextProvider from '../reducer/StoreReducer'

const Shop = () => {
  const classes = useStyles();
  const [cartOpen, setCartOpen] = useState(false);
  const [category, setCategory] = useState<string>('all');
  const [productsItems, setProductsItems] = useState([] as ProductItemType[]);
  const { products, isLoading, error, cartItems } = useContext(StoreContextProvider);

  useEffect(() => {
    if (!isLoading) {
      if (category !== 'all') {
        setProductsItems(products.filter((prevItem) => prevItem.category === category))
      } else {
        setProductsItems(products as ProductItemType[])
      }
    }
  }, [productsItems, products, category, isLoading])

  function getTotalItems(items: ProductItemType[]) {
    return (
      items.reduce((count: number, item) => count + item.amount, 0)
    )
  };

  const LengthItem: string = getTotalItems(cartItems).toString();

  if (isLoading) return <Backdrop className={classes.backdrop} open={isLoading} onClick={() => isLoading ? true : false}>
    <CircularProgress color="inherit" />
  </Backdrop>;
  if (error) return <div>something went wrong...</div>

  return (
    <div className={classes.root}>

      <BottomNavigation
        value={category}
        showLabels
      >
        <BottomNavigationAction onClick={() => setCategory("all")} label="All" icon={<AllInclusiveIcon />} />
        <BottomNavigationAction onClick={() => setCategory("men's clothing")} label="men's clothing" icon={<EmojiPeopleIcon />} />
        <BottomNavigationAction onClick={() => setCategory("women's clothing")} label="women's clothing" icon={<PregnantWomanIcon />} />
        <BottomNavigationAction onClick={() => setCategory("electronics")} label="electronics" icon={<ComputerIcon />} />
      </BottomNavigation>

      <Grid container
        direction="row"
        justifyContent="center"
        alignItems="center"
        className={classes.productSession} spacing={1}>
        {/* <RecipeReviewCard/> */}
        {productsItems?.map(item => (
          <Grid item xs={12} sm={6} md={3} key={item.id}>
            <Product products={item} />
          </Grid>
        ))}
      </Grid>

      <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart />
      </Drawer>

      <IconButton className={classes.fixedButton} onClick={() => setCartOpen(true)}>
        <Badge badgeContent={LengthItem} color='error'>
          <AddShoppingCart />
        </Badge>
      </IconButton>

    </div>
  );
}

export default Shop;
