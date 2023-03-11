export type currencyProps = {
  currency: string;
  code: string;
  mid: string;
};

export type selectProps = {
  rates: Array<currencyProps>;
  onChangeCurency: Function;
  defaultCurrency: string;
};

export type amountProps = {
  onChangeValue: Function;
  defaultInputValue: Number;
};

export type resultProps = {
  rates: Array<currencyProps>;
  fromCurrency: string;
  toCurrency: string;
  value: Number;
};
