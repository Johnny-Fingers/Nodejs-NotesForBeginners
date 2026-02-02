// Commonly, we use to use frameworks to create or work with servers, however, it's good to know that only using node.js is possible create a server.
import { randomUUID } from 'node:crypto';
import { createServer } from 'node:http';
import { json } from 'node:stream/consumers';

// The server needs a port where it can run. We can declare as a constant our port, but it's very useful define it as an environment variable.
// With 'loadEnvFile' we can read a .env file and its variables.
process.loadEnvFile();

const PORT = process.env.PORT ?? 3000
// This function is a way to avoid repetitive code because in more than one ocassion we're going to send the information as a JSON.
function sendJson(res, statusCode, data) {
    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify(data));
}

let products = [
    {
        "id": "f7bfcb80-f4df-4e9b-8bfc-3d5b4ceee87f",
        "product": "Notebook",
        "stock": 100
    },
    {
        "id": "2b3870ea-de60-4ee7-8c6f-58a1ca01666d",
        "product": "Mouse",
        "stock": 90
    },
    {
        "id": "25143c04-5f8b-4e0b-8615-800e21494866",
        "product": "Keyboard",
        "stock": 75
    },
    {
        "id": "b4785260-7c84-4cb8-9aa6-75474364f834",
        "product": "Webcam",
        "stock": 23
    },
    {
        "id": "4431bdbf-afca-4ce6-bfec-acad93e5fdd3",
        "product": "Headphones",
        "stock": 55
    },
    {
        "id": "adf13aab-362c-45d1-82fc-e3bf5f1df0cf",
        "product": "Iphone",
        "stock": 67
    },
    {
        "id": "64f11092-9d7e-4dbb-a34b-c1fd5e33275c",
        "product": "Memory RAM",
        "stock": 70
    },
    {
        "id": "b4dc60de-861e-4a92-b4d7-213d5235ecc7",
        "product": "Microphone",
        "stock": 120
    },
    {
        "id": "e4a03cfa-9161-4462-9ee5-0dcd1a80127b",
        "product": "Desktop",
        "stock": 12
    },
    {
        "id": "ba1d51bd-2b59-4bc6-9de1-42131550e0ad",
        "product": "Chair",
        "stock": 5
    },
    {
        "id": "cc633535-5a17-4adf-9c19-d651e47dfefd",
        "product": "Charger",
        "stock": 7
    }
];
// Two indispensable things that every server needs is a request and a response. At the end of the day, a server is always listening the user's request to give a response.
// Aditionally, the hearders provide important information about the request or the response between the client and the server.
const server = createServer(async (req, res) => {
    // At the beginning our server responds to any method, so we have to limit it indicating what has it do in each case.
    // An easy way to do it is destructuring the request and extracting the method (the most common methods are 'GET', 'POST', 'DELETE', 'PATCH', 'UPDATE').
    const { method, url } = req;
    // Beside, it's possible to indicate to the server the specific information we are requesting. To do that we must use Query Strings.
    // Query Strings are key-value pairs at the end of the URL and they transmit specific information to the server (filter, order, find values).
    const [pathname, queryString] = url.split('?');
    const searchParams = new URLSearchParams(queryString);
    // If the method is a 'GET' the server can check the url to know how to respond.
    if (method === 'GET') {
        // Every 'if' is a way to handle the url routes and avoid that our server responds to any request with the same information.
        if (pathname === '/') {
            res.setHeader('Content-Type', 'text/plain; charset=utf-8');
            return res.end("Server connected ✅");
        }

        if (pathname === '/login') {
            return sendJson(res, 200, {
                message: "Authentication page"
            });
        }

        if (pathname === '/products') {
            // To use the searchParams and filter the results, we defined variables with the filter rules and, finally, it shows the requested slice of data.
            const limit = Number(searchParams.get('limit')) || products.length;
            const offset = Number(searchParams.get('offset')) || 0;

            const paginatedProducts = products.slice(offset, offset + limit);

            return sendJson(res, 200, paginatedProducts);
        }
        // The 'health' endpoint is used to check the status of our API.
        if (pathname === '/health') {
            return sendJson(res, 200, {
                status: 'OK',
                enable: true,
                uptime: process.uptime()
            });
        }
    }
    // If the method is a 'POST' the server can check the url to know how to respond.
    if (method === 'POST') {
        if (pathname === '/products') {
            const data = await json(req);

            if (!data || !data.product || !data.stock) {
                return sendJson(res, 400, { error: "All fields are required" })
            }

            const newProduct = {
                id: randomUUID(),
                product: data.product,
                stock: data.stock
            }

            products.push(newProduct);

            return sendJson(res, 201, {
                message: "New product created successfully"
            });
        }
    }

    return sendJson(res, 404, {
        error: "404 not found"
    });
});
// And then, we indicate to the server that it must listen to. In other words, we are turning on the server here.
server.listen(PORT, () => {
    const address = server.address();
    console.log(`Server listening in http://localhost:${address.port}`);
});