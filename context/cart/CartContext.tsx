import { createContext } from "react";
import { ICartProduct } from "../../interfaces";

interface ContextProps {
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  taxRate: number;
  total: number;
  addProductToCart: (product: ICartProduct) => void;
  updateCartQuantity: (product: ICartProduct) => void; 
  removeCartProduct:  (product: ICartProduct) => void; 
}

export const CartContext = createContext({} as ContextProps);
