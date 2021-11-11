import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import OptionList from "./optionList";

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ required: true })
  name: string;
  @Prop({ default: "" })
  description: string;
  @Prop({ default: [] })
  imagesURL: string[];
  @Prop({ required: true })
  available: boolean;
  @Prop({ required: true })
  basePrice: number;
  @Prop({})
  options: OptionList[];
  @Prop({ default: 0 })
  boughtCounter: number;

  public static calculatePrice(product: Product, selection: number[]): number {
    let currentPrice = product.basePrice;
    if (product.options == undefined) return currentPrice;
    product.options.forEach((e, i) => {
      currentPrice = OptionList.calculatePrice(e, currentPrice, selection[i]);
    });
    return currentPrice;
  }
}

export const ProductSchema = SchemaFactory.createForClass(Product);