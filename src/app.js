import express from "express";
import handlebars from "express-handlebars";
import { Server } from 'socket.io';
import productsRouter from './routers/products.router.js'
import cartsRouter from './routers/cart.router.js'
import viewsRouter from './routers/view.router.js'

const app = express();

app.engine('handlebars', handlebars.engine());
app.set('views', './src/views');
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.static('./src/public'));
app.use('/api/products', productsRouter);
app.use('/api/cart', cartsRouter);
app.use('/products', viewsRouter);

const httpServer = app.listen(8080, ()=> console.log('Server up on port 8080')) 
const io = new Server(httpServer);

io.on("connection", socket => {
    console.log(`New Client Connected`)
    socket.on('productList', (data) => {
        io.emit('updateProducts', data)
        console.log('Datos enviados al cliente:', data);
    })
})