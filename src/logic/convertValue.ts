import { resultProps, currencyProps } from "../utils/types";

function convertValue(
  value: Number,
  fromCurrency: string,
  toCurrency: string,
  rates: Array<currencyProps>
) {
  const code2mid: Record<string, string> = {};
  rates.forEach((currency: currencyProps) => {
    code2mid[currency.code] = currency.mid;
  });

  const codeFrom = fromCurrency.slice(0, 3);
  const codeTo = toCurrency.slice(0, 3);
  const rate = Number(code2mid[codeFrom]) / Number(code2mid[codeTo]);
  const outputValue = String(Math.round(rate * Number(value) * 100) / 100);

  return {"outputValue": outputValue, "rate": Math.round(rate  * 100) / 100};
}

export default convertValue;
