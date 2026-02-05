// In Node.js we can import json data, but we have to follow a particular rule.
// To import a json is neccesary indicate the type json for security reasons. Due to node.js is executed in runtime, we have to prevent malicious scripts.
import express from 'express';
import products from './products.json' with { type: 'json' };

const PORT = 3000;
const app = express();

app.get('/products', (req, res) => {
    // Express has an incredible way to get the query params with any effort. In express query params are stored in the request object.
    // So we can destructuring 'req.query' to obtain every query and manipulate it.
    const { text, category, hasDelivery } = req.query;
    // When we have different filters to apply, we can avoid writing repetitive code by grouping them together.
    // The following block of code shows only one filter with three different conditions.
    let filteredProducts = products.filter(product => {
        // Text search filter
        if (text) {
            const searchTerm = text.toLowerCase();
            const matchesText = product.name.toLowerCase().includes(searchTerm) ||
                                product.description.toLowerCase().includes(searchTerm);
            if (!matchesText) return false;
        }
        // Category filter
        if (category) {
            const searchTerm = category.toLowerCase();
            const matchesCategory = product.category.toLowerCase().includes(searchTerm);

            if (!matchesCategory) return false;
        }
        // Delivery filter
        if (hasDelivery) {
            const hasDeliveryBool = hasDelivery === 'true';
            if (product.hasDelivery !== hasDeliveryBool) return false;
        }
        return true;
    });
    // Pagination
    // Remember convert the querys in number because Express give you all querys as a string and we need numbers for math.
    const limit = Number(req.query.limit) || 5;
    const offset = Number(req.query.offset) || 0;
    // Get a slice of our array using offset and limit as parameters.
    const paginatedProducts = filteredProducts.slice(offset, offset + limit);

    return res.json(paginatedProducts);
});
// Additionally, another method to import data exists. In this case, we are importing dynamically the information.
// The difference is that in the first case the json is imported when the web is loaded. And in the second case the information is loaded
// only when this part of the code run.
app.get('/productsv2', async (req, res) => {
    const { default: productsList } = await import('./products.json', { with : { type: 'json' } });
    return res.json(productsList);
});

app.listen(PORT, () => {
    console.log(`Server running in PORT: http://localhost:${PORT} ✅`);
});