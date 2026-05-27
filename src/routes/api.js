const express = require("express");
const menu = require("../data/menu");

const router = express.Router();

let cart = [];
let nextCartId = 1;

router.get("/menu", (_req, res) => {
  res.json(menu);
});

router.get("/menu/:category", (req, res) => {
  const filtered = menu.filter((item) => item.category === req.params.category);
  if (filtered.length === 0) {
    return res.status(404).json({ error: "Category not found" });
  }
  res.json(filtered);
});

router.get("/cart", (_req, res) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  res.json({ items: cart, total: Math.round(total * 100) / 100 });
});

router.post("/cart", (req, res) => {
  const { menuItemId, quantity = 1 } = req.body;
  const menuItem = menu.find((item) => item.id === menuItemId);

  if (!menuItem) {
    return res.status(404).json({ error: "Menu item not found" });
  }

  const existing = cart.find((item) => item.menuItemId === menuItemId);
  if (existing) {
    existing.quantity += quantity;
    return res.json(existing);
  }

  const cartItem = {
    cartId: nextCartId++,
    menuItemId: menuItem.id,
    name: menuItem.name,
    price: menuItem.price,
    quantity,
  };
  cart.push(cartItem);
  res.status(201).json(cartItem);
});

router.delete("/cart/:cartId", (req, res) => {
  const cartId = parseInt(req.params.cartId, 10);
  const index = cart.findIndex((item) => item.cartId === cartId);
  if (index === -1) {
    return res.status(404).json({ error: "Cart item not found" });
  }
  cart.splice(index, 1);
  res.json({ message: "Item removed" });
});

router.post("/cart/checkout", (_req, res) => {
  if (cart.length === 0) {
    return res.status(400).json({ error: "Cart is empty" });
  }
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const order = {
    orderId: Date.now(),
    items: [...cart],
    total: Math.round(total * 100) / 100,
    status: "confirmed",
  };
  cart = [];
  nextCartId = 1;
  res.json(order);
});

module.exports = router;
