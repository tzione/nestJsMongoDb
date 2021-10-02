import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.Model';

@Injectable()
export class ProductsService {
    
    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) { }

    async insertProduct(title, description, price) {
        const {
            v1: uuidv1,
            v4: uuidv4,
        } = require('uuid');
        let prodId = uuidv4();
        const newProduct = new this.productModel({
            title,
            description,
            price
        });
        const result = await newProduct.save();
        return result.id;
    }

    async getProducts() {
        const products = await this.productModel.find().exec();
        return products.map(prod => ({
            id: prod.id,
            title: prod.title,
            description: prod.description,
            price: prod.price
        }));;
    }

    async getSingleProduct(productId: string) {
        const product = await this.findProduct(productId);
        return {
            id:product.id,
            title: product.title,
            description: product.description,
            price: product.price
        };
    }

   async updateProduct(productId: string, title: string, desc: string, price: number) {
        const updatedProduct = await this.findProduct(productId);
        if (title) {
            updatedProduct.title = title;
        }
        if (desc) {
            updatedProduct.description = desc;
        }
        if (price) {
            updatedProduct.price = price;
        }
        updatedProduct.save();
    }

    async deleteProduct(productId: string) {
        const res = await this.productModel.deleteOne({_id: productId}).exec();
        if(res.deletedCount === 0){
            throw new NotFoundException('Could not find procuct');
        }
        console.log(res)
    }

    private async findProduct(id: string): Promise<Product> {
        let product;
        try{
            product = await this.productModel.findById(id).exec();
        } catch (error) {
            throw new NotFoundException('Could not find procuct');
        }
         
       if (!product) {
            throw new NotFoundException('Could not find procuct');
        }
        return product;
    }
}

