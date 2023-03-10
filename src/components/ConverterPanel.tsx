import React, { useEffect, useState } from "react";
import CurrencySelector from "./CurrencySelector";
import Amount from "./Amount";
import Result from "./Result";
import { currencyProps, selectProps } from "./types";

const defaultInputValue = 1;
const defaultCurrency = "PLN - złotówka";

const CurrencyConverter: React.FC = () => {
  const [currencyArray, setCurrencyArray] = useState<currencyProps[]>([]);
  const [fromCurrency, setFromCurrency] = useState<string>(defaultCurrency);
  const [toCurrency, setToCurrency] = useState<string>(defaultCurrency);
  const [inputValue, setInputValue] = useState<Number>(defaultInputValue);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        "http://api.nbp.pl/api/exchangerates/tables/a/",
        {
          method: "GET",
        }
      );
      const jsonData = await data.json();
      console.log(jsonData[0].rates);
      jsonData[0].rates.push({ code: "PLN", currency: "złotówka", mid: "1" });
      console.log(jsonData[0].rates);
      setCurrencyArray(jsonData[0].rates);
    };

    fetchData();
  }, []);

  return (
    <div>
      <CurrencySelector
        rates={currencyArray}
        onChangeCureency={(actualCurrency: string) => {
          setFromCurrency(actualCurrency);
        }}
        defaultCurrency={defaultCurrency}
      />
      <CurrencySelector
        rates={currencyArray}
        onChangeCureency={(actualCurrency: string) => {
          setToCurrency(actualCurrency);
        }}
        defaultCurrency={defaultCurrency}
      />

      <Amount
        onChangeValue={(actualAmount: Number) => {
          setInputValue(actualAmount);
        }}
        defaultInputValue={defaultInputValue}
      />

      <Result
        value={inputValue}
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
        rates={currencyArray}
      />
    </div>
  );
};

export default CurrencyConverter;
