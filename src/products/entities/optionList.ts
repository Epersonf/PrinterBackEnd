import Operation from "./operation";
import Option from "./option";

class OptionList {
  name: string;
  options: Option[];

  public static calculatePrice(optionList: OptionList, currentPrice: number, index: number): number {
    let editedPrice = currentPrice;
    const selectedOption = optionList.options[index];
    if (selectedOption == undefined) return currentPrice;
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