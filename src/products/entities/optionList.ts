import Operation from "./operation";
import Option from "./option";

class OptionList {
  name: string;
  options: Option[];

  public calculatePrice(currentPrice: number, index: number): number {
    let editedPrice = currentPrice;
    const selectedOption = this.options[index];
    switch (selectedOption.operation) {
    case Operation.ADD:
      editedPrice += selectedOption.value;
      break;
    case Operation.MULTIPLY:
      editedPrice *= selectedOption.value;
      break;
    }
    return editedPrice;
  }
}

export default OptionList;