import OptionList from "../entities/optionList";

export class CreateProductDto {
  name: string;
  available: boolean;
  basePrice: number;
  options?: OptionList[];
}
