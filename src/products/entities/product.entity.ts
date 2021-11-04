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

  public calculatePrice(selection: number[]): number {
    let currentPrice = this.basePrice;
    if (this.options == undefined) return currentPrice;
    this.options.forEach((e, i) => currentPrice = e.calculatePrice(currentPrice, selection[i]));
    return currentPrice;
  }
}

export const ProductSchema = SchemaFactory.createForClass(Product);