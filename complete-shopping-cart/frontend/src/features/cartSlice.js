import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
  cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;

        toast.info(`increased ${state.cartItems[itemIndex].name} cart quantity`, {
          position: "bottom-left",
          textTransform: "uppercase",
        })
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);

        toast.success(`${action.payload.name} added to the cart`, {
          position: "bottom-left",
          textTransform: "uppercase",
        })
      }

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    removeCartItem(state, action) {
      const restCartItems = state.cartItems.filter((item) => item.id !== action.payload.id);

      state.cartItems = restCartItems;
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    
      toast.error(`${action.payload.name} removed from cart`, {
        position: 'bottom-left',
      })

    },
    decreaseCart(state, action) {
      const cartIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);

      if (state.cartItems[cartIndex].cartQuantity > 1) {
        state.cartItems[cartIndex].cartQuantity -= 1;

        toast.info(`Decreased ${action.payload.name} cart quantity by 1`, {
          position: 'bottom-left'
        })

      } else if (state.cartItems[cartIndex].cartQuantity === 1) {
        const restCartItems = state.cartItems.filter((item) => item.id !== action.payload.id);

        state.cartItems = restCartItems;

        toast.error(`${action.payload.name} was removed from cart`, {
          position: 'bottom-left',
        })
      }

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    clearCart(state, action) {
      state.cartItems = [];

      toast.error('Cart cleared', {
        position: 'bottom-left',
      })

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    getTotals(state, action) {
      let { total, quantity} = state.cartItems.reduce((cartTotal, cartItem) => {
        const { price, cartQuantity } = cartItem
        const itemTotal = price * cartQuantity;

        cartTotal.total += itemTotal;
        cartTotal.quantity += cartQuantity;

        return cartTotal;
      }, {
        total: 0,
        quantity: 0
      })

      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    }
  }
})

export const { addToCart, clearCart, removeCartItem, decreaseCart, getTotals } = cartSlice.actions;

export default cartSlice.reducer;
