import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.Model'

@Injectable()
export class ProductsService {
    private products: Product[] = [];
    insertProduct(title, description, price) {
        const {
            v1: uuidv1,
            v4: uuidv4,
        } = require('uuid');
        let prodId = uuidv4();
        const newProduct = new Product(prodId, title, description, price)
        this.products.push(newProduct);
        return prodId;
    }

    getProcucts() {
        return [...this.products];
    }

    getSingleProduct(productId: string) {
        const product = this.findProduct(productId)[0];
        return { ...product };
    }

    updateProduct(productId: string, title: string, desc: string, price: number) {
        const [product, index] = this.findProduct(productId);
        const updatedProduct = {... product};
        if (title){
            updatedProduct.title = title;
        }
        if (desc){
            updatedProduct.description = desc;
        }
        if (price){
            updatedProduct.price = price;
        }
        this.products[index] = updatedProduct;
    }

    deleteProduct(productId: string){
        const [_, index] = this.findProduct(productId);
        this.products.splice(index, 1);
    }

    private findProduct(id: string): [Product, number] {
        const productIndex = this.products.findIndex(prod => prod.id === id)
        const product = this.products[productIndex];
        if (!product) {
            throw new NotFoundException('Could not find procuct');
        }
        return [product, productIndex];
    }
}

