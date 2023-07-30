const fs = require('fs');

class ProductManager {
  #path = '';
  #products = [];
  
  constructor() {
    this.#path = (process.cwd() + '/src/products/files/products.json');
    this.#products = fs.existsSync(this.#path) ? JSON.parse(fs.readFileSync(this.#path, 'utf-8')) : [{idProduct: 0}];
  }

  async addProduct ({title, description, price, thumbnail = [], code, status = true, category, stock}) {
    if(!title || !description || !price || !code || !category || !stock) {
      return 'Los únicos campos que no son obligatorios son:  thumbnail y status.';
    }

    if(this.#products.find(p => p.code === code)) {
      return 'El código ingresado ya existe.';      
    }
    
    const newProduct = {
      id: ++this.#products[0].idProduct,
      title,
      description,
      price,
      thumbnail,
      code,
      status,
      category,
      stock,
    }
    console.log(newProduct);
    this.#products.push(newProduct);

    try {
      await fs.promises.writeFile(this.#path, JSON.stringify(this.#products));
      return 'El producto se ha guardado exitosamente!'
    } catch (error) {
      return 'El producto no se pudo guardar correctamente';
    }
  }
  
  async getProducts() {
    return JSON.parse(await fs.promises.readFile(this.#path, 'utf-8'));
  }

  getProductById(id) {
    const product = this.#products.find(p => p.id === id);
    if(product) {
        console.log('Producto encontrado: ', product);
    } else {
        console.log(`El producto con id ${id} no ha sido encontrado.`);
    }
  }

  async updateProduct (id, field, value){
    const index = this.#products.findIndex(p => p.id === id);
    
    if(index >= 0) {
      this.#products[index][field] = value;
      try {
        await fs.promises.writeFile(this.#path, JSON.stringify(this.#products));

      } catch (error) {
        console.log('El producto no se pudo guardar correctamente');
      }
    } else {
      console.log('El producto que intenta editar no existe en la lista.');
      return;
    }

  }

  async deleteProduct(id) {
    const index = this.#products.findIndex(p => p.id === id);

    if(index >= 0) {  
      this.#products.splice(index, 1);

      try {
        await fs.promises.unlink(this.#path);
        await fs.promises.writeFile(this.#path, JSON.stringify(this.#products));
  
      } catch (error) {
        console.log('Error en la actualización del archivo');
      }

    } else {
      console.log('El producto que intenta eliminar no existe.');
    }

  }
}

module.exports = ProductManager;
