import OptionList from "../entities/optionList";

export class CreateProductDto {
  name: string;
  description: string;
  imagesURL: string[];
  available: boolean;
  basePrice: number;
  options?: OptionList[];
}
