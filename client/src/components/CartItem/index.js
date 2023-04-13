import React from 'react';
import { useStoreContext } from "../../utils/GlobalState";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import './CartItem.css';

const CartItem = ({ item }) => {
  const [, dispatch] = useStoreContext();

  const removeItem = item => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id
    });
    idbPromise('cart', 'delete', { ...item });
  };

  const onChange = (e) => {
    const value = e.target.value;
    if (value === '0') {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: item._id
      });
      idbPromise('cart', 'delete', { ...item });
    } else {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: item._id,
        purchaseQuantity: parseInt(value)
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });
    }
  }

  return (
    <div className="card rounded" style={{ backgroundColor: '#c5cad4' }}>
      <div className="card-body">
        <div className="flex-row">
          <div>
            <div>{item.name}, ${item.price}</div>
            <div>
              <span>Qty:</span>
              <input
                type="number"
                placeholder="1"
                min="1"
                max="99"
                value={item.purchaseQuantity}
                onChange={onChange}
                className="form-control form-control-sm"
                style={{ width: '50px' }}
              />
              <span
                role="img"
                aria-label="trash"
                onClick={() => removeItem(item)}
                className="trash-icon"
              >
                🗑️
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
