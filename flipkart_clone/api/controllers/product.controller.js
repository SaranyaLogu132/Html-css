import db from '../models/index.js';
import { createError } from '../utils/error.js';
import { createSuccess } from '../utils/success.js';

const ProductTable = db.products;
export const getAllProducts = async (req, res)=>{
    let products = await ProductTable.findAll({});
    res.status(200).json(products);
}

export const getProductById = async( req, res, next)=>{
    const product = await ProductTable.findOne(
        {where:{id: req.params.id}});
    if(!product)
        return next(createError(404, "Product doesn't exist!"));
    return next(createSuccess(200, "Products Fetched by ID", product))
}