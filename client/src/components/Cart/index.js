import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import { useStoreContext } from '../../utils/GlobalState';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Cart = () => {
  const [state, dispatch] = useStoreContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    console.log(data);
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise('cart', 'get');
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    }

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  function submitCheckout() {
    const productIds = [];

    state.cart.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        productIds.push(item._id);
      }
    });

    getCheckout({
      variables: { products: productIds },
    });
  }

  if (!state.cartOpen) {
    return (
      <div className="cart-closed" onClick={toggleCart}>
        <span role="img" aria-label="trash">
          🛒
        </span>
      </div>
    );
  }

  return (
    <div
      className="cart border rounded p-3"
      style={{ backgroundColor: '#718099' }}
    >
      <div className="close" onClick={toggleCart}>
        [X]
      </div>
      <h2>Cart</h2>
      {state.cart.length ? (
        <div>
          {state.cart.map((item) => (
            <div key={item._id} className="row mb-3">
              <div className="col-3">
                <a href={`/products/${item._id}`}>
                  <img
                    className="img-fluid"
                    src={`/images/${item.image}`}
                    alt={item.name}
                    style={{ height: '200px', width: '200px' }}
                  />
                </a>
              </div>
              <div className="col-9">
                <CartItem item={item} />
              </div>
            </div>
          ))}

          <div className="d-flex justify-content-between align-items-center">
            <strong>Total: ${calculateTotal()}</strong>

            {Auth.loggedIn() ? (
              <button className="btn btn-primary" onClick={submitCheckout}>
                Checkout
              </button>
            ) : (
              <a href="/login">
                <button className="btn btn-primary">Login To Checkout</button>
              </a>
            )}
          </div>
        </div>
      ) : (
        <h3>Your cart is empty!</h3>
      )}
    </div>
  );
};

export default Cart;
