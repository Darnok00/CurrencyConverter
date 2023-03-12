export type currencyProps = {
  currency: string;
  code: string;
  mid: string;
};

export type selectProps = {
  rates: Array<currencyProps>;
  onChangeCurrency: Function;
  defaultCurrency: string;
};

export type amountProps = {
  onChangeValue: Function;
};

export type resultProps = {
  rates: Array<currencyProps>;
  fromCurrency: string;
  toCurrency: string;
  value: Number;
};
