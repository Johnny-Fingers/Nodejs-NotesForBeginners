// This is the structure of a model.
// The model receives the data provided by the controller, since the model knows the business logic it is capable to handle and process the data following the rules.
// The model must return the data processed because that is what the controller will receive, and based on that, it'll send the final response.
import products from '../products.json' with { type: 'json' };

export class ProductModel {
    static async getAllProducts({ text, category, hasDelivery, limit, offset }) {
        let filteredProducts = products.filter(product => {

            if (text) {
                const searchTerm = text.toLowerCase();
                const matchesText = product.name.toLowerCase().includes(searchTerm) ||
                    product.description.toLowerCase().includes(searchTerm);
                if (!matchesText) return false;
            }

            if (category) {
                const searchTerm = category.toLowerCase();
                const matchesCategory = product.category.toLowerCase().includes(searchTerm);

                if (!matchesCategory) return false;
            }

            if (hasDelivery) {
                const hasDeliveryBool = hasDelivery === 'true';
                if (product.hasDelivery !== hasDeliveryBool) return false;
            }
            return true;
        });

        limit = Number(limit);
        offset = Number(offset);

        const paginatedProducts = filteredProducts.slice(offset, offset + limit);

        return paginatedProducts;
    }

    static async getProductById({ id }) {
        const product = products.find(p => p.id === Number(id));

        return product;
    }

    static async createProduct({ name, description, category, hasDelivery, stock }) {
        const newProduct = {
            id: crypto.randomUUID(),
            name,
            description,
            category,
            hasDelivery,
            stock
        }

        products.push(newProduct);

        return newProduct;
    }

    static async updateProduct({ id, name, description, category, hasDelivery, stock }) {
        const productId = Number(id);
        const productIndex = products.findIndex(product => product.id === productId);
        
        if (productIndex === -1) {
            return null;
        }
        
        const productUpdated = products[productIndex] = {
            id: productId,
            name,
            description,
            category,
            hasDelivery,
            stock,
        }
        return productUpdated;
    }

    static async partialProductUpdate({ id, body }) {
        const productId = Number(id);
        const productIndex = products.findIndex(product => product.id === productId);

        if (productIndex === -1) {
            return null;
        }

        const updatedProduct = {
            ...products[productIndex],
            ...body
        }

        products[productIndex] = updatedProduct;
        return products[productIndex];
    }

    static async deleteProduct({ id }) {
        const productId = Number(id);
        const productIndex = products.findIndex(product => product.id === productId);

        if (productIndex === -1) {
            return null;
        }
        products.splice(productIndex, 1);
        
        return { message: `Product ${products[productIndex].name} deleted successfully` };
    }
}