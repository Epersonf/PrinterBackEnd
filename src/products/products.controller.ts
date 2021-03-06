import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post("create/")
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(@Query() query) {
    return this.productsService.findAll(query);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.productsService.findOne(id);
  }

  @Patch("patch/:id")
  update(@Param("id") id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete("delete/:id")
  remove(@Param("id") id: string) {
    return this.productsService.remove(id);
  }

  @Post("calculate_price/:id")
  calculatePrice(@Param("id") id: string, @Body("options") options) {
    return this.productsService.calculatePrice(id, options);
  }
}
