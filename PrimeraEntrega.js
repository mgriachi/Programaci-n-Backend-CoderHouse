class Product {
  constructor(title, description, price, thumbnail, code, stock) {
    this.id = null;
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
  }
}

class ProductManager {
  constructor() {
    this.products = [];
  }

  getProducts() {
    return this.products;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    // Verificar que todos los campos sean proporcionados
    if (!title ?? !description ?? !price ?? !thumbnail ?? !code ?? !stock) {
      throw new Error("Todos los campos son requeridos");
    }

    for (const product of this.products) {
      if (product.code === code) {
        throw new Error("El código del producto ya lo tiene otro producto");
      }
    }

    const product = new Product(title, description, price, thumbnail, code, stock);

    // Generar automáticamente el ID del producto
    if (this.products.length) {
      product.id = this.products[this.products.length - 1].id + 1;
    } else {
      product.id = 1;
    }

    this.products.push(product);
    return product;
  }

  getProductById(product_id) {
    const product = this.products.find(product => product.id === product_id);
    if (!product) {
      throw new Error("Producto no encontrado");
    }
    return product;
  }
}

// Crear instancia de ProductManager
const productManager = new ProductManager();

// Llamar a getProducts obtener arreglo vacío []
console.log(productManager.getProducts())

// Llamar a addProduct para agregar el nuevo producto
const product = productManager.addProduct("Producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
console.log(product);

// Llamar a getProducts nuevamente para ver el producto recién agregado
console.log(productManager.getProducts());

// Obtener un producto por ID
const productById = productManager.getProductById(1);
console.log(productById);
