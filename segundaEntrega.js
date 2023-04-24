const fs = require('fs');

class Product {
    constructor(title, description, price, thumbnail, code, stock, id) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
        this.id = id;
    }
}

class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
        this.loadProducts();
    }

    generateId() {
        let id;
        if (this.products.length === 0) {
            id = 1;
        } else {
            const ids = this.products.map(product => product.id);
            id = Math.max(...ids) + 1;
        }
        return id;
    }

    async loadProducts() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf8');
            this.products = JSON.parse(data);
        } catch (error) {
            // Si el archivo no existe, se creará automáticamente cuando se agregue el primer producto
        }
    }

    async saveProducts() {
        await fs.promises.writeFile(this.path, JSON.stringify(this.products), 'utf8');
    }

    getProducts() {
        return this.products;
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        const id = this.generateId();
        const product = new Product(title, description, price, thumbnail, code, stock, id);
        this.products.push(product);
        this.saveProducts();
        return product;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (!product) {
            throw new Error(`No se encontró un producto con el id ${id}`);
        }
        return product;
    }

    updateProduct(id, field, value) {
        const product = this.getProductById(id);
        product[field] = value;
        this.saveProducts();
        return product;
    }

    deleteProduct(id) {
        const index = this.products.findIndex(product => product.id === id);
        if (index === -1) {
            throw new Error(`No se encontró un producto con el id ${id}`);
        }
        const product = this.products.splice(index, 1)[0];
        this.saveProducts();
        return product;
    }
}

// Creación de instancia de ProductManager con la ruta del archivo de persistencia
const productManager = new ProductManager('products.json');

// Llamada a getProducts, debe devolver un arreglo vacío
console.log(productManager.getProducts()); // []

// Llamada a addProduct para agregar un producto
const product = productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
console.log(product); // Producto agregado

// Llamada a getProducts, debe devolver el producto recién agregado
