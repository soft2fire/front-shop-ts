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
// import firebase from 'firebase/compat/app';
// import { useCollectionData } from 'react-firebase-hooks/firestore';
import logging from "./config/logging";
import AuthRoute from "./components/AuthRoute";
import { useHistory } from 'react-router'
import { useStyles } from './App.styles';

const App = () => {

  const classes = useStyles();
  const history = useHistory();
  //firebase 
  // const cartItemRef = db.collection('cartsItem');
  // const query = cartItemRef.orderBy('createdAt', 'asc');
  // const [userCartItem] = useCollectionData(query);
  // //give user cart item from data base
  // const cartItem = userCartItem?.filter((item) => item.uid === auth.currentUser?.uid);

  const [products, setProducts] = React.useState<ProductItemType[]>([]);
  const [checkAuthUser, setCheckAuthUser] = React.useState<boolean>(true);
  const getCartItemFromLocalstorage = JSON.parse(localStorage.getItem("userCartItem") || "[]");
  const [cartItems, setCartItems] = React.useState(getCartItemFromLocalstorage as ProductItemType[]);
  const { data, isLoading, error } = useQuery<ProductItemType[]>(
    'products',
    getProducts
  );

  React.useEffect(() => {
    setProducts(data as ProductItemType[]);
    localStorage.setItem('userCartItem', JSON.stringify(cartItems));
  }, [data, cartItems, getCartItemFromLocalstorage]);

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

  // const handleAddToCart = async (clickedItem: ProductItemType) => {

  //   const { uid }: any = auth.currentUser;
  //   await cartItemRef.add({
  //     productId: clickedItem.id,
  //     createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  //     uid,
  //   })
  // }

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
    setCartItems([])
    auth.signOut()
      .then(() => {
        history.push('/login')
      }
      )
      .catch(error => logging.error(error));
  }

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
          <AppDrawer >
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
                  />
                )
              }
            </Switch>
          </AppDrawer>
        </Router>
      </StoreContextProvider.Provider>
    </div>
  );
}

export default App;
