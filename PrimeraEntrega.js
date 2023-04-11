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
      for (const product of this.products) {
        if (product.code === code) {
          throw new Error("El código del producto ya lo tiene otro producto");
        }
      }
      const product = new Product(title, description, price, thumbnail, code, stock);
      product.id = this.products.length + 1; // Generamos un ID automáticamente
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
  console.log(productManager.getProducts());
  
  // Llamar a addProduct para agregar el nuevo producto
  const product = productManager.addProduct("producto prueba", "Este es un produto prueba", 200, "Sin imagen", "abc123", 25);
  console.log(product);
  
  // Llamar a getProducts nuevamente para ver el producto recién agregado
  console.log(productManager.getProducts());
  
  // Intentar agregar un producto con el mismo código
  try {
    productManager.addProduct("producto duplicado", "Este es un producto duplicado", 150, "Sin imagen", "abc123", 10);
  } catch (error) {
    console.error(error.message);
  }
  
  // Obtener un producto por ID
  const productById = productManager.getProductById(1);
  console.log(productById);
  
  // Intentar obtener un producto con un ID inválido 
  try {
    const invalidProduct = productManager.getProductById(999);
  } catch (error) {
    console.error(error.message);
  }
  