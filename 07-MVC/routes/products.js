// This is the structure of a view.
// As you can see, the routes don't know anything about http status code, processing data or business logic.
// The routes only know what the path is, what the request's http method is, and which controller to call to continue.
import { Router } from 'express';
import { ProductController } from '../controllers/products.js';

export const productsRouter = Router();

productsRouter.get('/', ProductController.getAllProducts);
productsRouter.get('/:id', ProductController.getProductById);
productsRouter.post('/', ProductController.createProduct);
productsRouter.put('/:id', ProductController.updateProduct);
productsRouter.patch('/:id', ProductController.partialProductUpdate);
productsRouter.delete('/:id', ProductController.deleteProduct);