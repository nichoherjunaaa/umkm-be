import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
    try {
        const body = req.body;
        if (!body || !body.name || !body.description || !body.price || !body.category || !body.stock || !body.image) {
            throw new Error("Invalid request body");
        }
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
        console.error(error);
        res.status(400).json({ message: error.message });
    }
}

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find().exec();
        if (!products) {
            throw new Error("No products found");
        }
        res.json({ data: products, message: "Products found" });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
}



