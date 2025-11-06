import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

//get cart items
export const getCartItems = async (req, res) => {
  try {
    const cartItems = await Cart.find({}).populate("productId");
    let total = 0;
    const items = cartItems.map((item) => {
      const subtotal = item.qty * item.productId.price;
      total += subtotal;
      return {
        id: item._id,
        productId: item.productId._id,
        name: item.productId.name,
        price: item.productId.price,
        qty: item.qty,
        subtotal,
      };
    });
    res.json({ items, total });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// POST /api/cart - Add item to cart
export const addToCart = async (req, res) => {
  const { productId, qty } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    let cartItem = await Cart.findOne({ productId });
    if (cartItem) {
      cartItem.qty += qty;
      await cartItem.save();
      return res.json(cartItem);
    }

    cartItem = await Cart.create({ productId, qty });
    res.status(201).json(cartItem);
  } catch (err) {
    res.status(400).json({ error: "Could not add to cart" });
  }
};

// DELETE /api/cart/:id - Remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    const cartItem = await Cart.findByIdAndDelete(req.params.id);
    if (!cartItem) return res.status(404).json({ error: "Cart item not found" });
    res.json({ message: "Item removed" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// PUT /api/cart/:id - Update quantity
export const updateCartItem = async (req, res) => {
  const { qty } = req.body;
  try {
    const cartItem = await Cart.findById(req.params.id);
    if (!cartItem) return res.status(404).json({ error: "Cart item not found" });
    cartItem.qty = qty;
    await cartItem.save();
    res.json(cartItem);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
