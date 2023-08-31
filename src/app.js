import express from "express";
import handlebars from "express-handlebars";
import productsRouter from './routers/products.router.js'
import cartsRouter from './routers/cart.router.js'

const app = express();

app.engine('handlebars', handlebars.engine());
app.set('views', './src/views');
app.set('view engine', 'handlebars');

app.use(express.json());
app.use('/api/products', productsRouter);
app.use('/api/cart', cartsRouter)

app.listen(8080, ()=> console.log('Server up on port 8080'))