import React, { useEffect, useState } from "react";
import CurrencySelector from "./CurrencySelector";
import Amount from "./Amount";
import Result from "./Result";
import { currencyProps } from "../utils/types";
import styled from "styled-components";

const defaultCurrency = "PLN - złotówka";

const MainContainer = styled.div`
  background-image: linear-gradient(
    164deg,
    rgba(48, 71, 94, 1) 48%,
    rgba(240, 84, 84, 1) 31%
  );
  padding: 4.5rem;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Title = styled.p`
  font-weight: 900;
  font-size: 30px;
  margin: 2rem;
  color: #f5f5f5;
`;

const InputContainer = styled.div`
  width: 80%;
  border: 0.05rem solid;
  border-radius: 0.5rem;
  margin-bottom: 2rem;
  padding: 2rem;
  display: flex;
  justify-content: center;
  background-color: #ffffff;
  position: relative;
  box-shadow: 0px 0px 19px -1px rgba(59, 59, 59, 1);
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
  const [inputValue, setInputValue] = useState<Number>(0);

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
      <Title>Przelicznik walut</Title>

      <InputContainer>
        <AmountContainer>
          <LabelText>Kwota</LabelText>
          <Amount
            onChangeValue={(actualAmount: Number) => {
              setInputValue(actualAmount);
            }}
          />
        </AmountContainer>

        <CurrencyContainer>
          <LabelText>Waluta wejściowa</LabelText>
          <CurrencySelector
            rates={currencyArray}
            onChangeCurrency={(actualCurrency: string) => {
              setFromCurrency(actualCurrency);
            }}
            defaultCurrency={defaultCurrency}
          />
        </CurrencyContainer>

        <CurrencyContainer>
          <LabelText>Waluta oczekiwana</LabelText>
          <CurrencySelector
            rates={currencyArray}
            onChangeCurrency={(actualCurrency: string) => {
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
