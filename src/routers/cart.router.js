import { Router } from 'express';
import CartManager from '../cartManager.js';

const cartManager = new CartManager('./data/carritos.json');

const router = Router();

router.post('/', async( req, res) =>{
    const cart = await  cartManager.createCart();
    if(!cart){
        res.status(404).json({status: 'error', error: 'No Se Pudo Agregar El Producto'});
    }else{
        res.json({status: 'success', payload: cart});
    }
});

router.get('/:cid', async (req, res) => {
    const id = parseInt(req.params.cid);
    const cartId = await cartManager.getProductFromCart(id);
    if(!cartId){
        res.status(404).json({status: 'error', error: 'No Se Encontro El Producto'});
    }else{
        res.json({status: 'success', payload: cartId});
    }
});

router.post('/:cid/product/:pid', async (req, res) => {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);

    const productAdd = await cartManager.addProductToCart(cartId, productId);
    
    if (typeof productAdd === 'string' && productAdd.startsWith('ERROR')) {
        res.status(404).json({ status: 'error', error: productAdd });
    } else if (!productAdd) {
        res.status(500).json({ status: 'error', error: 'No Se Pudo Agregar El Producto' });
    } else {
        res.json({ status: 'success', payload: productAdd });
    }
});

export default router