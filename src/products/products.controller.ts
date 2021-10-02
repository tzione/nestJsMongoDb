
import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { title } from "process";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) { }
    @Post()
    async addProduct(
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: string,
    ) {
        const generatedId = await this.productsService.insertProduct(prodTitle, prodDesc, prodPrice);
        return { id: generatedId as string};
    }
    @Get()
    getAllProcucts() {
        return this.productsService.getProducts();
    }

    @Get(':id')
    async getProduct(@Param('id') prodId: string) {
        const products = await this.productsService.getSingleProduct(prodId);
        return products;
    }

    @Patch(':id')
    async updateProduct(
        @Param('id') prodId: string,
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number,

    ) {
      await  this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
        return null;
    }

    @Delete(':id')
    async removeProduct(@Param('id') prodId: string) {
        await this.productsService.deleteProduct(prodId);
        return null;
    }
};