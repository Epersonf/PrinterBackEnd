import { PartialType } from "@nestjs/mapped-types";
import OptionList from "../entities/optionList";
import { CreateProductDto } from "./create-product.dto";

export class UpdateProductDto extends PartialType(CreateProductDto) {
  options?: OptionList[];
}
