import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Product } from "src/products/entities/product.entity";
import { User } from "src/users/entities/user.entity";
import OrderStep from "./orderSteps";

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ required: true, ref: User.name})
  user: User;

  @Prop({ required: true, ref: Product.name})
  product: Product[];

  @Prop({ required: true })
  finalPrice: number;

  @Prop({ default: OrderStep.PENDING })
  status: OrderStep;

  @Prop({ default: new Date() })
  purchaseDate: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);