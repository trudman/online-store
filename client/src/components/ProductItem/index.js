import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers";
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

function ProductItem(item) {
  const [state, dispatch] = useStoreContext();

  const { image, name, _id, price, quantity } = item;

  const { cart } = state;

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise("cart", "put", {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 },
      });
      idbPromise("cart", "put", { ...item, purchaseQuantity: 1 });
    }
  };

  return (
    <div className="col-lg-6 col-md-12 mb-4">
      <div className="card">
        <Link
          to={`/products/${_id}`}
          className="d-flex flex-column align-items-center justify-content-center text-decoration-none"
        >
          <img
            alt={name}
            src={`/images/${image}`}
            className="img-fluid rounded m-2"
            style={{ height: "200px" }} // Set a fixed height for all images
          />
          <div className="mt-2 text-center">
            <h5 className="text-dark">{name}</h5>
            <div className="mb-2 text-dark">
              {quantity} {pluralize("item", quantity)} in stock
            </div>
            <h6 className="text-dark">${price}</h6>
            <button className="btn btn-primary mt-2 mx-auto d-block mb-3" onClick={addToCart}>
              Add to cart
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default ProductItem;
