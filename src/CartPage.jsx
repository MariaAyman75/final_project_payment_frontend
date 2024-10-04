// CartPage.js
import React, { useState } from 'react';
import PaymentPage from './PaymentPage';

function CartPage() {
  const [cartItems, setCartItems] = useState([
    { name: 'Item 1', price: 20, quantity: 1 },
    { name: 'Item 2', price: 50, quantity: 1 },
  ]);
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div>
      <h1>Your Cart</h1>
      {cartItems.map((item, index) => (
        <div key={index}>
          <h3>{item.name}</h3>
          <p>Price: ${item.price}</p>
          <p>Quantity: {item.quantity}</p>
        </div>
      ))}
      <PaymentPage cartItems={cartItems} totalPrice={totalPrice} />
    </div>
  );
}

export default CartPage;
