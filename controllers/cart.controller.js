import CartModel from "../models/cart.model.js";
import ProductModel from "../models/product.model.js";

// Add item to cart
export const addToCart = async (req, res) => {
    try {
        const {productId, quantity} = req.body;

        const product = await ProductModel.findById(productId);

        if (!productId || !quantity) {
            return res.status(400).json({
                message: "Product ID and quantity required",
            });
        }

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        const cartItem = await CartModel.create({
            user: req.user.id,
            product: productId,
            quantity,
        });

        res.status(201).json(cartItem);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Get cart
export const getCart = async (req, res) => {
    try {
        const cart = await CartModel.find({
            user: req.user.id,
        }).populate("product");

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Update quantity in cart
export const updateCart = async (req, res) => {
    try {
        const {quantity} = req.body;
        
        if (!quantity || quantity < 1) {
            return res.status(400).json({
                message: "Quantity must be greater than 0",
            })
        }

        const item = await CartModel.findByIdAndUpdate(req.params.id, {quantity}, {new: true});

        if (!item) {
            return res.status(404).json({
                message: "Cart item not found",
            });
        }

        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
};

// Delete item from cart
export const deleteCartItem = async (req, res) => {
    try {
        const item = await CartModel.findByIdAndDelete(req.params.id);

        if (!item) {
            return res.status(404).json({
                message: "Item not found in cart",
            });
        }

        res.status(200).json({
            message: "Item removed successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};