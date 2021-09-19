
import { Controller, Post, Body, Get, Param} from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) { }
    @Post()
    addProduct(
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: string,
    ) {
        const generatedId = this.productsService.insertProduct(prodTitle, prodDesc, prodPrice);
        return { id: generatedId };
    }
    @Get()
    getAllProcucts(){
        return this.productsService.getProcucts();
    }
    
    @Get(':id')
    getProduct(@Param('id') prodId: string){
       return this.productsService.getSingleProduct(prodId);
  }
};