import db from "../models/index.js";
import { createError } from "../utils/error.js";
import { createSuccess } from "../utils/success.js";
const cartTable = db.cart;
const userTable = db.user;

export const addToCart = async (req, res, next) => {
  try {
    const user = await userTable.findOne({ where: { id: req.body.userId } });
    if (!user) next(createError(403, "Invalid User Logged In!"));
    let cartObj = {
      title: req.body.title,
      image: req.body.image,
      description: req.body.description,
      price: req.body.price,
      quantity: req.body.quantity,
      userId: req.body.userId,
      productId: req.body.productId,
    };
    const savedCartItem = await cartTable.create(cartObj);
    res.status(201).json({ message: "Item added to cart!" });
  } catch (error) {
    next(error);
  }
};

export const updateCart = async (req, res, next) => {
  try {
    const user = await userTable.findOne({ where: { id: req.body.userId } });
    if (!user) next(createError(403, "Invalid User Logged In!"));

    let cartObj = {
      title: req.body.title,
      image: req.body.image,
      description: req.body.description,
      price: req.body.price,
      quantity: req.body.quantity,
      userId: req.body.userId,
      productId: req.body.productId,
    };
    const updatedCartItem = await cartTable.update(cartObj, {
      where: { id: req.body.productId, userId: Number(req.body.userId) },
    });
    res.status(201).json({ message: "Item Updated in cart!" });
  } catch (error) {
    next(error);
  }
};

export const removeFromCart = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const cartExist = await cartTable.findOne({where:{id:id}});
        if(!cartExist){
            next(createError(404, "Cart Item doesn't exist!"));
        }else{
            await cartTable.destroy({ where: { id: id } });
            res.status(201).json({ message: "Item Deleted from cart!" });
        }

    } catch (error) {
        next(error);
    }
};

export const removeAll = async (req,res, next)=>{
    const ids = req.body.ids;
    await cartTable
      .destroy({
        where: { id: ids },
        force: true,
      })
      .then(() => {
        res.status(200).json({ message: "Cart items deleted successfully" });
      })
      .catch((error) => {
        console.error("Error deleting cart items:", error);
        res.status(500).json({ message: "Error deleting cart items" });
      });
}

export const getCartItemsByUserId = async (req, res, next)=>{
  const cartItems = await cartTable.findAll({ where: { userId: Number(req.params.id)}});
  return next(createSuccess(200, "Success", cartItems));
}
