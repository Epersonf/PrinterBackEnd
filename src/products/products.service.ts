import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDocument } from "src/users/entities/user.entity";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Product } from "./entities/product.entity";

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<UserDocument>) {}

  create(createProductDto: CreateProductDto) {
    return new this.productModel(createProductDto);
  }

  findAll() {
    return this.productModel.find();
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
