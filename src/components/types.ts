export type currencyProps = {
    currency: String;
    code: String;
    mid: Float32Array;
};

export type selectProps = {
    rates: Array<currencyProps>;
    onChangeCureency: Function;
};