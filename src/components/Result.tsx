import React from "react";
import { resultProps, currencyProps } from "./types";
import { useState } from "react";

const Result: React.FC<resultProps> = (props) => {
  const code2mid: Record<string, string> = {};
  props.rates.forEach((currency: currencyProps) => {
    code2mid[currency.code] = currency.mid;
  });
  
  const codeFrom = props.fromCurrency.slice(0,3);
  const codeTo = props.toCurrency.slice(0,3);
  const rate = Number(code2mid[codeFrom])/Number(code2mid[codeTo])
  const outputValue = Math.round(rate * Number(props.value) * 100)/100;

  return <label>{String(outputValue)}</label>;
};

export default Result;
