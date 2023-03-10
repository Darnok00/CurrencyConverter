import { selectProps } from "./types";
import Select from "react-select";

const CurrencySelector: React.FC<selectProps> = (props) => {
  const nameCurrencyArray = props.rates
    .map((currency) => currency.code + " - " + currency.currency)
    .map((name) =>
      name.includes("(") ? name.slice(0, name.indexOf("(") - 1) : name
    );

  const optionsCurrency = nameCurrencyArray.map(
    (value) => [{ value: value, label: value }][0]
  );

  return (
    <Select
      options={optionsCurrency}
      onChange={(event) => props.onChangeCureency(event?.value)}
      defaultValue={[{ value: props.defaultCurrency, label: props.defaultCurrency }][0]}
    />
  );
};

export default CurrencySelector;
