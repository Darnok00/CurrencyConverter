import { selectProps } from "../utils/types";
import Select from "react-select";
import styled from "styled-components";

const StyledSelect = styled(Select)`
  width: 90%;
  margin-top: 2%;
  box-shadow: 0px 0px 25px -12px rgba(146, 146, 146, 1);
`;

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
    <StyledSelect
      options={optionsCurrency}
      // The react-select wrapper in styled components causes typing issues
      onChange={(event: any) => props.onChangeCurrency(event?.value)}
      defaultValue={
        [{ value: props.defaultCurrency, label: props.defaultCurrency }][0]
      }
    />
  );
};

export default CurrencySelector;
