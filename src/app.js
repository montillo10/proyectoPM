import express from "express";
import ProductManager from './ProductManager.js';

//al importar una clase que se exporta como default, ProductManager no debe ir entre {}
//si se exportara sin el default, deberia ser:
//import { ProductManager } from './ProductManager.js';

//definimos el puerto
const port = 8080;
const app = express();

//definimos la app
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//ejecutamos y levantamos el servidor
app.listen(port, ()=>console.log(`Server listening on port ${port}`));

let productManager = new ProductManager('./products.json');
productManager.addProduct({
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25
});

productManager.addProduct({
    title: "producto prueba numero 2",
    description: "Este es un producto prueba 2",
    price: 500,
    thumbnail: "con imagen",
    code: "hola1234",
    stock: 50
});

productManager.addProduct({
    title: "producto prueba numero 3",
    description: "Este es un producto prueba 3",
    price: 500,
    thumbnail: "con y sin imagen",
    code: "adios4321",
    stock: 1
});

productManager.addProduct({
    title: "producto prueba numero 4",
    description: "Este es un producto prueba 4",
    price: 502,
    thumbnail: "con y sin imagen",
    code: "234",
    stock: 1
});

productManager.addProduct({
    title: "producto prueba numero 5",
    description: "Este es un producto prueba 5",
    price: 500,
    thumbnail: "con y sin imagen",
    code: "2345",
    stock: 1
});
productManager.addProduct({
    title: "producto prueba numero 6",
    description: "Este es un producto prueba 6",
    price: 1,
    thumbnail: "con y sin imagen",
    code: "345",
    stock: 100
});
productManager.addProduct({
    title: "producto prueba numero 7",
    description: "Este es un producto prueba 7",
    price: 20,
    thumbnail: "con y sin imagen",
    code: "3456",
    stock: 20
});
productManager.addProduct({
    title: "producto prueba numero 8",
    description: "Este es un producto prueba 8",
    price: 12,
    thumbnail: "con y sin imagen",
    code: "456",
    stock: 44
});
productManager.addProduct({
    title: "producto prueba numero 9",
    description: "Este es un producto prueba 9",
    price: 12,
    thumbnail: "con y sin imagen",
    code: "4567",
    stock: 1
});
productManager.addProduct({
    title: "producto prueba numero 10",
    description: "Este es un producto prueba 10",
    price: 1234,
    thumbnail: "con y sin imagen",
    code: "567",
    stock: 33
});


console.log("El producto agregado es: ", productManager.getProducts())

//**creamos las rutas:
//get: obtener un recurso

app.get("/productos",async(req,res) =>{
    try{
        const result = await productManager.getProducts();
        res.send(result);
    }catch(error){
        console.error(error);
    }
});

//post: crear un recurso
app.post("/productos",async(req,res)=>{
    try{
        const product = req.body;
        console.log("product: ",product);
        await productManager.addProduct(product);
        console.log("Usuario creado!!!");
        res.json({status:"Success",message:"Usuario creado correctamente!"});
    }catch(error){
        console.error(error);
        res.status(500).send("Ocurrio un error al crear el producto!!!");
    }
});
//obtener un recurso en especifico a traves de su id
app.get("/productos/:pid",async (req,res)=>{
    const productId = parseInt(req.params.pid);
    try{
        const findProduct = await productManager.getProductById(productId);
        if(findProduct){
            //res.send(findProduct);
            //juntamos el json con el send, para que no genere un error al cambiar el header( al enviar mas de 1 respuesta HTTP)
            //pd: perdi varias horas tratando de encontrar este error ._.
            res.json({status:"Success", message:"Producto actualizado!", product: findProduct});
        }
        else{
            res.status(404).json({status:"Error",message:"El producto no existe!!!"});
        }
    }
    catch(error){
        console.error(error);
        res.status(500).send('Hubo un error al obtener el producto');
    }
    
});

//put: actualizar o modificar un recurso
app.put("/productos/:pid",async (req,res)=>{
    const productId = req.params.pid;
    const newInfo = req.body;
    try{
        const updatedProduct = await productManager.updateProduct(productId, newInfo);
            if(updatedProduct){
                res.json({status:"Success",message:"Producto actualizado!"});
            }
            else{
                res.status(404).json({status:"Error",message:"El producto no existe!!!"});
        }
    }catch(error){
        console.error(error);
        res.status(500).send('Hubo un error al obtener el producto');
    }
    
});


// DELETE NO alcance a terminarlo, estara listo para la proxima entrega
//los limites de recursos tampoco alcance a terminarlos, estaran listos para la prox entrega










