import Home from "./view/Home";
import Shop from './view/Shop';
import { useStyles } from './App.styles';
import DetailProduct from "./components/products/DetailProduct";
import {
  BrowserRouter as Router, Switch, Route, RouteComponentProps
} from "react-router-dom";
import React from 'react';
import { ProductItemType } from "./components/types";
import Invoice from "./view/Invoices";
import StoreContextProvider from "./reducer/StoreReducer";
import { useQuery } from 'react-query'
import { getProducts } from "./service/api";
import LeftBar from "./components/Header/shop/LeftBar";
import Register from "./view/auth/Register";
import routes from "./config/routes";
import { auth } from "./service/Firebase";
import logging from "./config/logging";
import AuthRoute from "./components/AuthRoute";
import { LinearProgress } from "@material-ui/core";
// import { LinearProgress } from "@material-ui/core";

const App = () => {
  const classes = useStyles();
  const [products, setProducts] = React.useState<ProductItemType[]>([]);
  const [cartItems, setCartItems] = React.useState([] as ProductItemType[]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const { data, isLoading, error } = useQuery<ProductItemType[]>(
    'products',
    getProducts
  );

  React.useEffect(() => {
    getProducts();
    setProducts(data as ProductItemType[]);
  }, [data]);

  React.useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        logging.info('User detected.');
      }
      else {
        logging.info('No user detected');
      }
      setLoading(false);
    })
  }, []);

  function handleAddToCart(clickedItem: ProductItemType) {
    setCartItems(prev => {

      const isExist = prev.find(item => item.id === clickedItem.id);

      if (isExist) {
        return prev.map((item) => (
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        ));
      }
      // first time item added
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  function handleResetCart() {
    setCartItems([])
  };

  function handleRemoveCart(id: number) {
    setCartItems((prev) => (
      prev.reduce((count, item) => {
        if (item.id === id) {
          if (item.amount === 1) return count;
          return [...count, { ...item, amount: item.amount - 1 }]
        } else {
          return [...count, item]
        }
      }, [] as ProductItemType[])
    ));
  };

  if (loading) return <LinearProgress />;

  return (
    <div className={classes.root}>
      <StoreContextProvider.Provider value={{
        handleResetCart,
        getProducts,
        cartItems,
        products,
        isLoading,
        error,
        handleAddToCart,
        handleRemoveCart
      }}>
        <Router>
          <LeftBar />
          <Switch>
            {
              routes.map((route, index) =>
                <Route
                  key={index}
                  exact={route.exact}
                  path={route.path}
                  render={(routeProps: RouteComponentProps<any>) => {
                    if (route.protected)
                      return <AuthRoute><route.component  {...routeProps} /></AuthRoute>;

                    return <route.component  {...routeProps} />;
                  }}
                />)
            }
          </Switch>
        </Router>
      </StoreContextProvider.Provider>
      {/* <ReactQueryDevtools initialIsOpen /> */}
    </div>
  );
}

export default App;
