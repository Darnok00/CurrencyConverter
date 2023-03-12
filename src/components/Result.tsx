import React from "react";
import { resultProps, currencyProps } from "../utils/types";
import styled from "styled-components";
import convertValue from "../logic/convertValue";

const Container = styled.div`
  display: flex;
  max-height: 9rem;
  flex-direction: column;
`;

const LabelStyled = styled.label`
  font-weight: 700;
  color: #b84042;
  margin-bottom: 0.5rem;
`;

const LabelResult = styled(LabelStyled)`
  font-size: 200%;
  margin-bottom: 2rem;
`;

const LabelRate = styled(LabelStyled)`
  font-weight: 600;
  font-size: 80%;
  color: #752a2b;
  margin: 0;
`;

const Result: React.FC<resultProps> = (props) => {
  const convertResult = convertValue(props.value, props.fromCurrency, props.toCurrency, props.rates);
  const outputValue = convertResult["outputValue"];
  const rate = convertResult["rate"];

  return (
    <Container>
      <LabelStyled>
        {String(props.value) + " " + props.fromCurrency.slice(0, 3) + " = "}
      </LabelStyled>

      <LabelResult>
        {outputValue + " " + props.toCurrency.slice(0, 3)}
      </LabelResult>

      <LabelRate>
        {"1 " +
          props.fromCurrency.slice(0, 3) +
          " = " +
          rate + " " +
          props.toCurrency.slice(0, 3)}
      </LabelRate>

      <LabelRate>
        {"1 " +
          props.toCurrency.slice(0, 3) +
          " = " +
          Math.round(100 / rate) / 100 + " " +
          props.fromCurrency.slice(0, 3)}
      </LabelRate>
    </Container>
  );
};

export default Result;
