// This is the structure of a controller.
// The controller receives the request's information provided by the route, get the data of the request, sends that data to the respective model and finally returns a response.
// The key point is handle the params, querys or properties in the request to inform what data the model will need.
// At the end, controllers return the data processed and the http status code respectively.
import { ProductModel } from '../models/product.js';

export class ProductController {
    static async getAllProducts(req, res) {
        const { text, category, hasDelivery, limit = 5, offset = 0 } = req.query;
        const paginatedProducts = await ProductModel.getAllProducts({ text, category, hasDelivery, limit, offset });

        return res.json(paginatedProducts);
    }

    static async getProductById(req, res) {
        const { id } = req.params;
        const product = await ProductModel.getProductById({ id });

        if (!product) {
            return res.status(404).json({ error: "404 Product not found" });
        }
        return res.json(product);
    }

    static async createProduct(req, res) {
        const { name, description, category, hasDelivery, stock } = req.body;
        const newProduct = await ProductModel.createProduct({ name, description, category, hasDelivery, stock });

        return res.status(201).json(newProduct);
    }

    static async updateProduct(req, res) {
        const { id } = req.params;
        const { name, description, category, hasDelivery, stock } = req.body;
        const productUpdated = await ProductModel.updateProduct({ id, name, description, category, hasDelivery, stock });

        if (!productUpdated) {
            return res.status(404).json({ error: "404 Product not found" });
        }
        return res.status(200).json(productUpdated);
    }

    static async partialProductUpdate(req, res) {
        const { id } = req.params;
        const body = req.body;
        const updatedProduct = await ProductModel.partialProductUpdate({ id, body });

        if (!updatedProduct) {
            return res.status(404).json({ error: "404 Product not found" });
        }
        return res.status(200).json(updatedProduct);
    }

    static async deleteProduct(req, res) {
        const { id } = req.params;
        const result = await ProductModel.deleteProduct({ id });

        if (!result) {
            return res.status(404).json({ error: "404 Product not found" });
        }

        return res.status(204).json(result);
    }
}