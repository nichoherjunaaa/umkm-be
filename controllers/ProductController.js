import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
    try {
        const body = req.body;
        const product = new Product({
            name: body.name,
            description: body.description,
            price: body.price,
            category: body.category,
            stock: body.stock,
            image: body.image,
            reviews: body.reviews || []
        });
        await product.save();
        res.json({ data: product, message: "Product created" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

