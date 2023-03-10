import React, { useEffect, useState, useId } from "react";
import CurrencySelector from "./CurrencySelector";
import Amount from "./Amount";
import { currencyProps, selectProps } from "./types";

const CurrencyConverter: React.FC = () => {
  const [currencyArray, setCurrencyArray] = useState<currencyProps[]>([]);
  const [fromCurrency, setFromCurrency] = useState<String>("USD - dolar amerykański");
  const [toCurrency, setToCurrency] = useState<String>();
  // strange error during typing as Number
  const [inputValue, setInputValue] = useState<any>(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        "http://api.nbp.pl/api/exchangerates/tables/a/",
        {
          method: "GET",
        }
      );
      const jsonData = await data.json();
      setCurrencyArray(jsonData[0].rates);
    };

    fetchData();
  }, []);

  return (
    <div>
      <CurrencySelector
        rates={currencyArray}
        onChangeCureency={(actualCurrency: String) => {
          setFromCurrency(actualCurrency);
        }}
      />
      <Amount onChangeValue={(actualAmount: Number) => {
          setInputValue(actualAmount);
        }}/>
      <p>{fromCurrency}</p>
      <p>{inputValue}</p>
    </div>
  );
};

export default CurrencyConverter;
