import { useContext, useState } from "react";
import { SERVER_URL } from "../../config/config";
import CartContext from "../../store/cart-context";
import HTTPRequest from "../../utils/request";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isOrderClicked, setOrderClicked] = useState(false);
  const [isError, setError] = useState(false);
  const [isOrderConfirmed, setOrderConfirmed] = useState(false);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const submitOrderHandler = async (userCheckoutInfo) => {
    setError(false);
    try {
      const orderResponse = await HTTPRequest.post(
        SERVER_URL + "/orders.json",
        JSON.stringify({ user: userCheckoutInfo, order: cartCtx.items }),
        { "Content-Type": "application/json" }
      );
      if (orderResponse) {
        console.log("Order Placed");
        setOrderConfirmed(true);
        cartCtx.clearCart();
      } else {
        setError(true);
      }
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const orderClicked = (e) => {
    setOrderClicked(true);
  };

  const modalContent = () => {
    if (isOrderConfirmed) {
      return (
        <>
          <p className={classes["success-text"]}>Order confirmed</p>
          <div className={classes.actions}>
            <button className={classes.button} onClick={props.onClose}>
              Close
            </button>
          </div>
        </>
      );
    } else {
      return (
        <>
          {cartItems}
          <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
          </div>
          {!isOrderClicked && (
            <div className={classes.actions}>
              <button
                className={classes["button--alt"]}
                onClick={props.onClose}
              >
                Close
              </button>
              {hasItems && (
                <button className={classes.button} onClick={orderClicked}>
                  Order
                </button>
              )}
            </div>
          )}
          {isOrderClicked && (
            <Checkout onSubmit={submitOrderHandler} onClose={props.onClose} />
          )}
          {isError && (
            <p className={classes["error-text"]}>There was an error.</p>
          )}
        </>
      );
    }
  };
  return <Modal onClose={props.onClose}>{modalContent()}</Modal>;
};

export default Cart;
