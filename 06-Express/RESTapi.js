// REST = Representational State Transfer
// A REST api is an api that conforms to the design principles of its arquitectural style. It has six principles:
    // 1. Uniform Interface --> The interface must uniquely identify each resource involved in the interaction. Resources should have a uniform representation (commonly json), have self-descriptive messages and they should have only the initial URI.
    // 2. Client-Server     --> The clien-server design patter enforces the separation of concerns.
    // 3. Stateless         --> Each request from the client to the server must contain all of the information neccesary to understand and complete the request.
    // 4. Cacheable         --> The response should implicitly or explicitly label itself as cacheable or non-cacheable.
    // 5. Layered System    --> The layered system style allows an architecture to be composed of hierarchical layers by constraining component behavior.
    // 6. Code on Demand (opitonal) --> REST api could allows client functionality to be extended.
import express from 'express';
import cors from 'cors';
import products from './products.json' with { type: 'json' };

const PORT = 3000;
const app = express();
// A common error is CORS policy. CORS means Cross-Origin Resource Sharing and it's a restriction of the browsers that block request from distinct origins.
// It considers port, domain and protocol to identify if the request comes from the same origin or not.
// To solve it, we can set the allowed origins and create a middleware that processes the request and verify if the origin is allowed.
// Express has a library named 'cors', so the easier way to handle CORS error is installing it. Otherwise, we should set the header 'Access-Control-Allow-Origin manually in each endpoint.
const ALLOWED_ORIGINS = [
    'http:localhost:3000',
    'http:localhost:1234'
]
// This middleware check the request's origin and verify that it is included in our allowed origins. If it's the case, it returns true and processes the request on the browser. 
app.use(cors({
    origin: (origin, callback) => {
        if (ALLOWED_ORIGINS.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error("Origin not allowed"));
    }
}));
// Middleware to parses incoming requests with JSON
app.use(express.json());
// See how we use the resource as pathname and http method to define what the endpoint does.
app.get('/products', (req, res) => {
    return res.json(products);
});

app.get('/products/:id', (req, res) => {
    const { id } = req.params;    
    const product = products.find(p => p.id === Number(id));

    if (!product) {
        return res.status(404).json({ error: "404 Product not found" });
    }
    return res.json(product);
});
// Each endpoint work independently, which means that the request contains all the neccesary information.
// An important thing to consider is that Express doesn't provide a request body in JSON by default, so processing the data required a middleware to parse the body.
app.post('/products', (req, res) => {
    const { name, description, category, hasDelivery, stock } = req.body;
    const newProduct = {
        id: crypto.randomUUID(),
        name,
        description,
        category,
        hasDelivery,
        stock
    }

    products.push(newProduct);

    return res.status(201).json(newProduct);
});
// It's important to know that PUT method replace the resource completely. That's why it's important send the id to preserve it.
app.put('/products/:id', (req, res) => {
    const { id } = req.params;
    const productId = Number(id);
    const { name, description, category, hasDelivery, stock } = req.body;
    const productIndex = products.findIndex(p => p.id === productId);

    if (productIndex === -1) {
        return res.status(404).json({ error: "User not found" });
    }

    products[productIndex] = {
        id: productId,
        name,
        description,
        category,
        hasDelivery,
        stock,
    }
    return res.status(200).json(products[productIndex]);
});
// On the other hand, PATCH method updates the resource partially (only the data sended in the request).
app.patch('/products/:id', (req, res) => {
    const { id } = req.params;
    const productId = Number(id);
    const body = req.body;
    const productIndex = products.findIndex(p => p.id === productId);

    if (productIndex === -1) {
        return res.status(404).json({ error: "User not found"});
    }

    const updatedProduct = {
        ...products[productIndex],
        ...body
    }

    products[productIndex] = updatedProduct;
    return res.status(200).json(products[productIndex]);
});

app.delete('/products/:id', (req, res) => {
    const { id } = req.params;
    const productId = Number(id);
    const productIndex = products.findIndex(p => p.id === productId);

    if (productIndex === -1) {
        return res.status(404).json({ error: "Product not found"});
    }

    products.splice(productIndex, 1);

    return res.status(204).json({ message: "Product deleted successfully" });
});

app.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
});