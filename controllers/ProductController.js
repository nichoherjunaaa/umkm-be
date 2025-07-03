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

export const getProductById = async (req, res) => {
    try {
        const productId = req.params && req.params.id;
        if (!productId) {
            throw new Error("Product ID is required");
        }
        const product = await Product.findById(productId).exec();
        if (!product) {
            throw new Error("Product not found");
        }
        res.json({ data: product, message: "Product found" });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message || "An error occurred" });
    }
}

export const updateProduct = async (req, res) => {
    try {
        const productId = req.params && req.params.id;
        if (!productId) {
            throw new Error("Product ID is required");
        }
        const body = req.body;
        if (!body) {
            throw new Error("Request body is empty");
        }
        const product = await Product.findByIdAndUpdate(productId, body, { new: true }).exec();
        if (!product) {
            throw new Error("Product not found");
        }
        if (!product._id) {
            throw new Error("Product ID is invalid");
        }
        res.json({ data: product, message: "Product updated" });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message || "An error occurred" });
    }
}



