// Import necessary dependencies

import { User, Product, Category, Order } from "../models/index.js";
import { signToken } from "../utils/auth.js";
// import stripe from 'stripe'('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

// Define resolvers
export default {
  Query: {
    // Define categories query which returns all categories
    categories: async () => {
      return await Category.find();
    },

    // Define products query which takes category and name as arguments and returns all matching products
    products: async (parent, { category, name }) => {
      const params = {};

      if (category) {
        params.category = category;
      }

      if (name) {
        params.name = {
          $regex: name,
        };
      }

      return await Product.find(params).populate("category");
    },

    // Define product query which takes _id as argument and returns the matching product
    product: async (parent, { _id }) => {
      return await Product.findById(_id).populate("category");
    },

    // Define user query which takes no arguments and returns the current user
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: "orders.products",
          populate: "category",
        });

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw new Error("Please Login");
    },

    // Define order query which takes _id as argument and returns the matching order
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: "orders.products",
          populate: "category",
        });

        return user.orders.id(_id);
      }

      throw new Error("Please Login");
    },

    // Define checkout query which takes no arguments and returns a Stripe session ID for checkout
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ products: args.products });
      const line_items = [];

      const { products } = await order.populate("products");

      for (let i = 0; i < products.length; i++) {
        const product = await stripe.products.create({
          name: products[i].name,
          description: products[i].description,
          images: [`${url}/images/${products[i].image}`],
        });

        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: products[i].price * 100,
          currency: "usd",
        });

        line_items.push({
          price: price.id,
          quantity: 1,
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });

      return { session: session.id };
    },
  },

  // Define Mutation object which contains mutation resolvers
  Mutation: {
    // Define addUser mutation which takes user data as arguments and returns a token and user object
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    // Define addOrder mutation which takes products and context objects as arguments, creates a new order and returns it
    addOrder: async (parent, { products }, context) => {
      console.log(context);
      if (context.user) {
        const order = new Order({ products });

        await User.findByIdAndUpdate(context.user._id, {
          $push: { orders: order },
        });

        return order;
      }

      throw new Error("Please Login");
    },

    // Define updateUser mutation which takes user data and context objects as arguments, updates a user and returns it
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw new Error("Please Login");
    },

    // Define updateProduct mutation which takes product data as arguments, updates a product and returns it
    updateProduct: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return await Product.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
    },

    // Define login mutation which takes email and password as arguments, validates the user and returns a token and user object
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error("Cannot Validate");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new Error("Cannot Validate");
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

// Export resolvers object
