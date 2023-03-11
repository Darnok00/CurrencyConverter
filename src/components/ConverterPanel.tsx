import React, { useEffect, useState } from "react";
import CurrencySelector from "./CurrencySelector";
import Amount from "./Amount";
import Result from "./Result";
import { currencyProps, selectProps } from "./types";
import styled from "styled-components";

const defaultInputValue = 1;
const defaultCurrency = "PLN - złotówka";

const MainContainer = styled.div`
  background-color: #1a9edb;
  padding: 4.5rem;
  display: flex;
  flex-direction: column;
  height: 60rem;
`;

const InputContainer = styled.div`
  width: 80%;
  border: 0.2rem solid #b51618;
  border-radius: 2rem;
  margin-bottom: 2rem;
  padding: 2rem;
  display: flex;
  justify-content: center;
  background-color: #e6e8f0;
  position: relative;
`;

const OutputContainer = styled(InputContainer)`
  width: 30%;
  height: 9rem;
`;

const AmountContainer = styled.div`
  justify-content: center;
  align-items: center;
  position: relative;
  display: inline-block;
  min-height: 6em;
  width: 20%;
  vertical-align: middle;
  display: flex;
  flex-direction: column;
`;

const CurrencyContainer = styled(AmountContainer)`
  width: 40%;
`;

const LabelText = styled.label`
  font-weight: 700;
`;

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
    <MainContainer>
      <InputContainer>
        <AmountContainer>
          <LabelText>Amount</LabelText>
          <Amount
            onChangeValue={(actualAmount: Number) => {
              setInputValue(actualAmount);
            }}
            defaultInputValue={defaultInputValue}
          />
        </AmountContainer>

        <CurrencyContainer>
          <LabelText>From</LabelText>
          <CurrencySelector
            rates={currencyArray}
            onChangeCurency={(actualCurrency: string) => {
              setFromCurrency(actualCurrency);
            }}
            defaultCurrency={defaultCurrency}
          />
        </CurrencyContainer>

        <CurrencyContainer>
          <LabelText>To</LabelText>
          <CurrencySelector
            rates={currencyArray}
            onChangeCurency={(actualCurrency: string) => {
              setToCurrency(actualCurrency);
            }}
            defaultCurrency={defaultCurrency}
          />
        </CurrencyContainer>
      </InputContainer>

      <OutputContainer>
        <Result
          value={inputValue}
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          rates={currencyArray}
        />
      </OutputContainer>
    </MainContainer>
  );
};

export default CurrencyConverter;
