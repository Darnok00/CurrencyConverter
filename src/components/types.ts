export type currencyProps = {
    currency: string;
    code: string;
    mid: string;
};

export type selectProps = {
    rates: Array<currencyProps>;
    onChangeCureency: Function;
};

export type amountProps = {
    onChangeValue: Function;
}

export type resultProps = {
    rates: Array<currencyProps>;
    fromCurrency: string;
    toCurrency: string;
    value: Number;
}