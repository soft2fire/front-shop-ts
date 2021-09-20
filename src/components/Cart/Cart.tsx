import CartItem from "../CartItem/CartItem";
//my styled
import { Wrapper } from "./Cart.styled";
import { useContext } from "react";
//my context
import StoreContextProvider from "../../reducer/StoreReducer";
import { calculateTotal } from "../../utils/Utils";

const Cart = () => {
    const { cartItems, handleAddToCart ,handleRemoveCart} = useContext(StoreContextProvider);

    // function calculateTotal(items: ProductItemType[]) {
    //     return items.reduce((count: number, item) => count + item.amount * item.price, 0);
    // }

    return (
        <Wrapper>
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
        </Wrapper>
    )
}

export default Cart;