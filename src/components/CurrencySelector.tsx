import { selectProps } from "./types";
import Select from "react-select";

const CurrencySelector: React.FC<selectProps> = (props) => {
  const defaultCurrency = "USD - dolar amerykański";

  const nameCurrencyArray = props.rates
    .map((currency) => currency.code + " - " + currency.currency)
    .map((name) =>
      name.includes("(") ? name.slice(0, name.indexOf("(") - 1) : name
    );

  const options = nameCurrencyArray.map(
    (value) => [{ value: value, label: value }][0]
  );

  return (
    <Select
      options={options}
      defaultInputValue={defaultCurrency}
      onChange={(event) => props.onChangeCureency(event?.value)}
    />
  );
};

export default CurrencySelector;
