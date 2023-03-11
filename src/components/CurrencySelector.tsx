import { selectProps } from "../utils/types";
import Select from "react-select";
import styled from "styled-components";

const StyledSelect = styled(Select)`
  width: 90%;
  margin-top: 2%;
  border: solid 0.1rem #b51618;
  border-radius: 0.4rem;
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
      // temporary any
      onChange={(event: any) => props.onChangeCurency((event?.value))}
      defaultValue={
        [{ value: props.defaultCurrency, label: props.defaultCurrency }][0]
      }
    />
  );
};

export default CurrencySelector;
