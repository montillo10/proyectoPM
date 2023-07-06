import fs from 'fs/promises';

/**
 *  Version 3.0
 *  Se ha mejorado la entrega 2, reemplazando el 'require' por 'import'
 *  se agrego async / await
 *  se reemplazo los ciclos for por sus respectivos metodos
 */

export default class ProductManager{

    constructor(path){
        this.products = [];
        this.id = 1;
        this.path = path;

        // Cargar los productos desde el archivo

        this.loadProducts().catch(error =>{ 
            //este catch lo podemos omitir, u omitir el try - catch de loadProducts();
            console.error("Error: no se pudo cargar los productos desde el archivo: ", error);
        })
    }

    async loadProducts(){
        try{
            const productsData = await fs.readFile(this.path, 'utf-8');
            //this.products = productsData ? JSON.parse(productsData) : [];

            if(productsData){
                console.log(productsData);
                this.products = JSON.parse(productsData);
            }else{
                this.products = [];
            }



            if (this.products.length > 0) {
                // Para obtener el último producto
                const lastProduct = this.products[this.products.length - 1];
                
                // Para Establecer this.id como el id del último producto más uno
                this.id = lastProduct.id + 1;
            } else {
                // Si no hay productos, establecer this.id como 1
                this.id = 1;
            }
        }catch(error){
            console.error("Error: no se pudo cargar los productos desde el archivo: ", error);
        }
    }

    async saveProducts() {
        await fs.writeFile(this.path, JSON.stringify(this.products));
    }

    async addProduct(newProduct){
        if (!newProduct.title || !newProduct.description || !newProduct.price || !newProduct.thumbnail
            || !newProduct.code || !newProduct.stock) {
            console.error('Todos los campos deben estar llenos');
            return;
        }
     
        const ProductExist = this.products.find((product) => {return product.code === newProduct.code})

        if(ProductExist){
            console.error('El código del producto ya existe');
            this.showProduct(ProductExist);
            
        }
        else{
            newProduct.id = this.id++;
            this.products.push(newProduct);
            await this.saveProducts();
        }              
    }

    async updateProduct(id, updatedProduct){
        const findIndexProduct = this.products.findIndex((product)=>{return product.id === id})
        delete updatedProduct.id;
        //usamos spread operator para combinar las propiedades de 2 objetos
        this.products[findIndexProduct] = {...this.products[findIndexProduct], ...updatedProduct};
        await this.saveProducts();
        return this.products[findIndexProduct];
    }

    async getProducts(){
        return this.products;
    }

    async getProductById(id) {
        const findProduct = this.products.find((product)=>{return product.id === id})
        return findProduct;
        }

    showProduct(product){
        console.log("Este es el producto que coincide con el codigo ingresado: ",product);
    }
}

/*

let robertManager = new ProductManager('./products.json');
robertManager.addProduct({
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25
})

console.log(robertManager.getProducts()) //para mostrar los productos
let productoEncontrado = robertManager.getProductById(1);
console.log("El producto es: ",productoEncontrado);

robertManager.addProduct({
    title: "producto prueba 2",
    description: "Este es un producto prueba numero 2",
    price: 100,
    thumbnail: "Con imagen",
    code: "abc123",
    stock: 100
})

robertManager.addProduct({
    title: "producto prueba 3",
    description: "Este es un producto prueba numero 3",
    price: 100,
    thumbnail: "Con imagen",
    code: "xyz789",
    stock: 100
})

console.log(robertManager.getProducts());
console.log("Estoy aqui");

robertManager.updateProduct(1,{
    title: "producto prueba 3",
    description: "Este es un producto prueba numero 3",
    price: 100,
    thumbnail: "Con imagen",
    code: "hola1234",
    stock: 5000
})

console.log("Estoy aqui 2");
console.log(robertManager.getProducts());

*/