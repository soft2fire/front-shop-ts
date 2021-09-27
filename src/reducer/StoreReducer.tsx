import { createContext } from "react";
import { ProductItemType } from "../components/types";

export type CartAction = "add" | 'remove' | 'delete' | null

export interface StoreContextData {
  products: ProductItemType[];
  cartItems: ProductItemType[];
  isLoading: boolean;
  error: unknown;
  getProducts: () => void;
  cartDispatch?: CartAction;
  handleAddToCart: (clickedItem: ProductItemType) => void;
  handleResetCart: () => void;
  handleLogout: () => void;
  handleRemoveCart: (id: number) => void;
  checkAuthUser:boolean;
}

export const StoreContextDefaultValue: StoreContextData = {
  products: [],
  cartItems: [],
  isLoading: false,
  error: false,
  checkAuthUser:true,
  getProducts: () => null,
  handleAddToCart: () => { },
  handleLogout: () => { },
  handleRemoveCart: () => { },
  handleResetCart: () => { },
}

export const StoreContextProvider = createContext<StoreContextData>(StoreContextDefaultValue);

export default StoreContextProvider;
