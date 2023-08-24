const ProductManager = require( './products.dao' );
const fs = require('fs');

const pM = new ProductManager;

class CartManager {
    #path = '';
    #cart = [];

    constructor() {
        this.#path = (process.cwd() + '/src/cart/files/cart.json');
        this.#cart = fs.existsSync(this.#path) ? JSON.parse(fs.readFileSync(this.#path, 'utf-8')) : [{ idCart: 0 }];
    }
    

    async createCart() {
        const newProduct = {
            id: ++this.#cart[0].idCart,
            products: [],
        }

        this.#cart.push(newProduct);

        try {
            await fs.promises.writeFile(this.#path, JSON.stringify(this.#cart));
            return 'El carrito se ha creado exitosamente';
        } catch (error) {
            return 'No se ha podido crear el carrito.';                    
        }
    }

    async insertOne( cid, pid ) {
        cid = Number(cid);
        pid = Number(pid);
        if(this.#cart.length > 1) {

            const cartProduct = this.#cart.find(p => p.id === cid);
            const idProduct = await pM.getProductById(pid);

            if(!idProduct) {
                return 'El producto que desea agregar, no existe';

            } else if (!cartProduct) {
                return 'El carrito no existe.'

            } else if(cartProduct) {
                const product = cartProduct.products.find(p => p.pid === pid);

                if(product) {
                    try {
                        if(idProduct.stock > 0) {
                        product.quantity += 1;
                        await fs.promises.writeFile(this.#path, JSON.stringify(this.#cart))
                        .then(await pM.updateProduct( pid, 'stock', idProduct.stock -1));
                        return 'El producto se ha agregado exitosamente.';
                    } else {
                        return 'Lo sentimos. El producto está sin stock.';
                    }
                    } catch (error) {
                        console.log(error, 'El producto no se pudo agregar correctamente');                   
                    }
                } else {
                    try {
                        if(idProduct.stock > 0) {
                            const newProduct = {
                                pid,
                                quantity: 1,
                            }

                            cartProduct.products.push(newProduct);

                            await fs.promises.writeFile(this.#path, JSON.stringify(this.#cart))
                            .then(await pM.updateProduct( pid, 'stock', idProduct.stock -1));
                            return 'El producto se ha agregado exitosamente.';
                        } else {
                            return 'Lo sentimos. El producto está sin stock.';
                        }
                    } catch (error) {
                        console.log(error, 'El producto no se pudo agregar correctamente');                    
                    }
                }
            }
        }
    }


    async findAllRaw() {
        return JSON.parse(await fs.promises.readFile(this.#path, 'utf-8'));
    }

    async findId(id) {
        const product = this.#cart.find(p => p.id === id);
        if(product) {
            return product.products;
        } else {
            return;
        }
    }
}

module.exports = CartManager;