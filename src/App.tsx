import React from 'react';
import {
  BrowserRouter as Router, Switch, Route, RouteComponentProps
} from "react-router-dom";
import { ProductItemType } from "./components/types";
import StoreContextProvider from "./reducer/StoreReducer";
import { useQuery } from 'react-query'
import { getProducts } from "./service/api";
import AppDrawer from "./components/Header/shop/AppDrawer";
import routes from "./config/routes";
import { auth } from "./service/Firebase";
import logging from "./config/logging";
import AuthRoute from "./components/AuthRoute";
import { useHistory } from 'react-router'
import { useStyles } from './App.styles';

const App = () => {
  const classes = useStyles();
  const history = useHistory();
  const [products, setProducts] = React.useState<ProductItemType[]>([]);
  const [checkAuthUser, setCheckAuthUser] = React.useState<boolean>(true);
  const [cartItems, setCartItems] = React.useState([] as ProductItemType[]);
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
        setCheckAuthUser(true)
        logging.info('User detected.');
      }
      else {
        setCheckAuthUser(false)
        logging.warn('No user detected.');
      }
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
  const handleLogout = () => {
    auth.signOut()
        .then(() => {
            history.push('/login')
            localStorage.setItem('userState', 'logout')
        }
        )
        .catch(error => logging.error(error));
}
  // if (loading) return <LinearProgress />;

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
        handleRemoveCart,
        checkAuthUser,
        handleLogout
      }}>
        <Router>
          <AppDrawer />
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
    </div>
  );
}

export default App;
