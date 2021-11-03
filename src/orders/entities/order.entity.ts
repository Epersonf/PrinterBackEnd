import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { User } from "src/users/entities/user.entity";

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ required: true, ref: User.name})
  user: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);