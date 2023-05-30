import express from 'express';
import { addToCart, getCartItemsByUserId, removeAll, removeFromCart, updateCart } from '../controllers/cart.controller.js';

const router = express.Router();

router.post('/add', addToCart);
router.put('/update', updateCart);
router.delete("/:id", removeFromCart);
router.delete('/delete/remove-all', removeAll);
router.get("/:id", getCartItemsByUserId);


export default router;