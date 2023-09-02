import ProductManager from '../productManager.js';
import { Router } from 'express';


const productManager = new ProductManager('./data/products.json')

const router = Router();

router.get('/', async (req, res) => {
    try {
        const productsList = await productManager.getProducts();
        const limit = req.query.limit; // Obtener el valor de "limit" de la consulta
        
        let newList = [];

        // Verificar si el parámetro "limit" es válido y procesar la lista de productos
        if (limit && !isNaN(parseInt(limit))) {
            for (let i = 0; i < Math.min(productsList.length, parseInt(limit)); i++) {
                newList.push(productsList[i]);
            }
        } else {
            // Si "limit" no es válido o no se proporciona, devolver la lista completa
            newList = productsList;
        }

        res.status(201).json({status: 'success', payload: newList});
    } catch (error) {
        console.error('Error:', error);
        res.json({status: 'error', error: 'Internal server error'});

    }
});

router.get('/:pid', async (req, res) => {
    const id = parseInt(req.params.pid);
    const productId = await productManager.getProductById(id);
    if(!productId){
        res.status(404).json({status: 'error', error: 'No Se Encontro El Producto'});

    }else{
        res.json({status: 'success', payload: productId});
    }   
    
})

router.post('/', async( req, res) =>{
    const product = req.body;
    const productAdd = await  productManager.addProduct(product);
    if(typeof productAdd == 'string'){
        res.status(404).json({status: 'error', error: 'No Se Pudo Agregar El Producto'});
    }else{
        res.json({status: 'success', payload: productAdd});
    }
})

router.put('/:pid', async( req, res ) => {
    const id = parseInt(req.params.pid);
    const product = req.body;
    const updateProduct = await productManager.updateProduct(id, product);
    if(typeof updateProduct == 'string'){
        res.status(404).json({status: 'error', error: 'No Se Encontro El Producto'});
    }else{
        res.json({status: 'success', payload: updateProduct});
    }
})

router.delete('/:pid', async( req, res ) => {
    const id = parseInt(req.params.pid);
    const deletProduct = await productManager.deleteProduct(id)
    if(!deletProduct){
        res.status(404).json({status: 'error', error: 'No Se Encontro El Producto'});
    }else{
        res.json({status: 'success', payload: 'Se elimino el producto'});
    }
})

export default router