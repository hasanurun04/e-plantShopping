import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice'; // hint: removeItem(item.name)
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Toplam tutarı hesapla
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach((item) => {
      const price = parseFloat(item.cost.substring(1)); // "$10" → 10
      total += price * item.quantity;
    });
    return total.toFixed(2);
  };

  // Ürün bazında subtotal
  const calculateTotalCost = (item) => {
    const price = parseFloat(item.cost.substring(1));
    return (price * item.quantity).toFixed(2);
  };

  // Quantity artır
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Quantity azalt (0 olursa tamamen sil)
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name)); // 🔑 hint
    }
  };

  // Ürün sil
  const handleRemove = (item) => {
    dispatch(removeItem(item.name)); // 🔑 hint
  };

  return (
    <div className="cart-container">
      {cart.map((item) => (
        <div className="cart-item" key={item.name}>
          <img src={item.image} alt={item.name} className="cart-item-image" />
          <div className="cart-item-details">
            <div className="cart-item-name">{item.name}</div>
            <div className="cart-item-cost">{item.cost}</div>

            <div className="cart-item-quantity">
              <button
                className="cart-item-button"
                onClick={() => handleDecrement(item)}
              >
                –
              </button>
              <span className="cart-item-quantity-value">{item.quantity}</span>
              <button
                className="cart-item-button"
                onClick={() => handleIncrement(item)}
              >
                +
              </button>
            </div>

            <div className="cart-item-total">
              Subtotal: ${calculateTotalCost(item)}
            </div>

            <button
              className="cart-item-delete"
              onClick={() => handleRemove(item)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {cart.length > 0 && (
        <>
          <div className="total_cart_amount">
            Total Amount: ${calculateTotalAmount()}
          </div>
          <button
            className="continue_shopping_btn get-started-button1"
            onClick={onContinueShopping}
          >
            Continue Shopping
          </button>
          <button
            className="get-started-button1"
            onClick={() => alert('Functionality to be added for future reference')}
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default CartItem;
