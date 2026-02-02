// Express is a framework that simplify the way to create a server and manage both methods and routes.
// With express we can avoid repetitive code, be more expressive, ensure code maintainability and more...
import express from 'express';

const PORT = process.env.PORT ?? 3000;
const app = express();

let products = [
    {
        "id": 1,
        "product": "Notebook",
        "stock": 100
    },
    {
        "id": 2,
        "product": "Mouse",
        "stock": 90
    },
    {
        "id": 3,
        "product": "Keyboard",
        "stock": 75
    },
    {
        "id": 4,
        "product": "Webcam",
        "stock": 23
    },
    {
        "id": 5,
        "product": "Headphones",
        "stock": 55
    },
    {
        "id": 6,
        "product": "Iphone",
        "stock": 67
    },
    {
        "id": 7,
        "product": "Memory RAM",
        "stock": 70
    },
    {
        "id": 8,
        "product": "Microphone",
        "stock": 120
    },
    {
        "id": 9,
        "product": "Desktop",
        "stock": 12
    },
    {
        "id": 10,
        "product": "Chair",
        "stock": 5
    },
    {
        "id": 11,
        "product": "Charger",
        "stock": 7
    }
];
// Middleware: it is a function executed in the middle of the request/response cycle. We can create two types of middlewares.
// A general middleware is created with the 'use' method. It means that the middleware will run regardless of the request/route.
app.use((request, response, next) => {
    const time = new Date().toLocaleTimeString();
    console.log(`Route ${request.url} with method ${request.method} visited at ${time}`);
    next();
});
// A specific middleware function is created when we want to run a middleware considering the request/route.
const middlewareFunction = (request, response, next) => {
    console.log(`Middleware executed before go to ${request.url}`);
    next();
}
// Express provides us utilities to manage the methods in the request making easier handle different methods for the same url.
app.get('/', (request, response) => {
    // Other benefit is that with express is not neccesary end the response because 'send' method takes care of this. 
    return response.send("Hello from express");
});
// Express has different ways to handle dynamic params. The most useful is using colon, it means that the value of this part of the pathname changes.
app.get('/products/:id', (request, response) => {
    // With this line we extract the parameter required. It's important to know that all params are read as string, so we need to convert it into a number.
    const { id } = request.params;
    const idProduct = Number(id);
    // With 'find' we can take advantage of our params to search in the array and recover the desired element.
    const product = products.find(p => p.id === idProduct);

    return response.send(product);    
});

app.get('/health', middlewareFunction, (request, response) => {
    // Additionally, if we want to send a json, with express is easy without specify headers or parse data.
    return response.json({
        status: "OK",
        uptime: process.uptime()
    });
});

app.listen(PORT, () => {
    console.log(`Server running with express in port http://localhost:${PORT}`);
});