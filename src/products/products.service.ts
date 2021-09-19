import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.Model'

@Injectable()
export class ProductsService {
    private products: Product[] = [];
    insertProduct(title, description, price){
        const { 
            v1: uuidv1,
            v4: uuidv4,
          } = require('uuid');
        let prodId = uuidv4();  
        const newProduct = new Product(prodId, title, description, price)
        this.products.push(newProduct);
        return prodId;
    }

    getProcucts(){
        return [...this.products];
    }

    getSingleProduct(productId: string){
        const product = this.products.find(prod => prod.id === productId);
        if (!product) {
          throw new NotFoundException(' Could not find procuct ');
        }
        return { ...product };
    }
   
}