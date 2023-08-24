const fs = require('fs');

class ProductManager {
  #path = '';
  #products = [];
  
  constructor() {
    this.#path = (process.cwd() + '/src/products/files/products.json');
    this.#products = fs.existsSync(this.#path) ? JSON.parse(fs.readFileSync(this.#path, 'utf-8')) : [{idProduct: 0}];
  }

  async insertOne ({title, description, price, thumbnail = [], code, status = true, category, stock}) {
    if(!title || !description || !price || !code || !category || !stock) {
      return 'Los únicos campos que no son obligatorios son:  thumbnail y status.';
    }

    if(this.#products.find(p => p.code === code)) {
      return 'El código ingresado ya existe.';      
    }

    if(status === 'on') {
      status = true;
    } else {
      status = false;
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
    
    this.#products.push(newProduct);

    try {
      await fs.promises.writeFile(this.#path, JSON.stringify(this.#products));
      return 'El producto se ha guardado exitosamente!'
    } catch (error) {
      return 'El producto no se pudo guardar correctamente';
    }
  }
  
  async findAllRaw() {
    try {
      const products = JSON.parse(await fs.promises.readFile(this.#path, 'utf-8'));
      products.splice(0, 1);
      return products;
  } catch (error) {
      console.log(error);
  }
  }

  findId(id) {
    const product = this.#products.find(p => p.id === id);
    if(product) {
        return product;
    } else {
        return;
    }
  }

  async updateOne (id, field, value){
    const index = this.#products.findIndex(p => p.id === id);
    
    if(index >= 0) {
      this.#products[index][field] = value;
      try {
        await fs.promises.writeFile(this.#path, JSON.stringify(this.#products));

      } catch (error) {
        console.log(error, 'El producto no se pudo guardar correctamente');
      }
    } else {
      console.log('El producto que intenta editar no existe en la lista.');
    }

  }

  async deleteOne( id ) {
    const index = this.#products.findIndex(p => p.id === id);

    if(index >= 0) {  
      this.#products.splice(index, 1);

      try {
        await fs.promises.unlink(this.#path);
        await fs.promises.writeFile(this.#path, JSON.stringify(this.#products));
  
      } catch (error) {
        console.log(error, 'Error en la actualización del archivo');
      }

    } else {
      console.log('El producto que intenta eliminar no existe.');
    }

  }
}

module.exports = ProductManager;
