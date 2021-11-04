import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { showModelPagination } from "src/utility/pagination";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Product, ProductDocument } from "./entities/product.entity";

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

  async create(createProductDto: CreateProductDto) {
    const productModel = new this.productModel(createProductDto);
    try {
      await productModel.save();
    } catch {
      throw new HttpException("bad_format", HttpStatus.BAD_REQUEST);
    }
    return productModel;
  }

  async findAll(query: any) {
    const result = await showModelPagination<ProductDocument>(query, this.productModel);
    if (result == null) throw new HttpException("bad_format", HttpStatus.BAD_REQUEST);
    return result;
  }

  findOne(id: number) {
    return this.productModel.findById(id);
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.productModel.findByIdAndUpdate({ _id: id }, { $set: updateProductDto }, { new: true });
  }

  remove(id: number) {
    return this.productModel.deleteOne({ id });
  }
}
