import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDocument } from "src/users/entities/user.entity";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { Order } from "./entities/order.entity";

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<UserDocument>) {}

  async create(createOrderDto: CreateOrderDto) {
    const orderModel = new this.orderModel(createOrderDto);
    try {
      await orderModel.save();
    } catch {
      throw new HttpException("bad_format", HttpStatus.BAD_REQUEST);
    }
    return new this.orderModel(createOrderDto);
  }

  findAll() {
    return this.orderModel.find();
  }

  findOne(id: number) {
    return this.orderModel.findById(id);
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return this.orderModel.findByIdAndUpdate({ _id: id }, { $set: updateOrderDto }, { new: true });
  }

  remove(id: number) {
    return this.orderModel.deleteOne({ id });
  }
}
