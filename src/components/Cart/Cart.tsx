import CartItem from "../CartItem/CartItem";
//my styled
import { useStyles } from "./Cart.styled";
import { useContext } from "react";
//my context
import StoreContextProvider from "../../reducer/StoreReducer";
import { calculateTotal } from "../../utils/Utils";

const Cart = () => {
    const { cartItems, handleAddToCart, handleRemoveCart } = useContext(StoreContextProvider);
    const classes = useStyles();

    // function calculateTotal(items: ProductItemType[]) {
    //     return items.reduce((count: number, item) => count + item.amount * item.price, 0);
    // }

    return (
        <div className={classes.Wrapper}>
            <h2>your shopping cart</h2>
            {cartItems.length === 0 ? <p>No items in cart</p> : null}
            {cartItems.map((item) => (
                <CartItem
                    key={item.id}
                    item={item}
                    addToCart={handleAddToCart}
                    removeFromCart={handleRemoveCart}
                />
            ))}
            <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
        </div>
    )
}

export default Cart;