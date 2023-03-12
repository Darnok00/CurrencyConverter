import convertValue from "../logic/convertValue";

describe("Convert currency tests", () => {
  const currencyArray = [
    { currency: "euro", code: "EUR", mid: "4.6838" },
    { currency: "dolar Hongkongu", code: "HKD", mid: "0.5639" },
    { currency: "dolar amerykański", code: "USD", mid: "4.4266" },
    { currency: "lira turecka", code: "TRY", mid: "0.2334" },
    { currency: "dolar kanadyjski", code: "CAD", mid: "3.1992" },
    { currency: "jen", code: "JPY", mid: "0.03236" },
    { currency: "złotówka", code: "PLN", mid: "1" },
  ];

  test("Rate value PLN - JPY with input 1.", () => {
    const result = convertValue(
      1,
      "PLN - złotówka",
      "JPY - jen",
      currencyArray
    )["rate"];
    const expectedValue = 30.9;
    expect(result).toEqual(expectedValue);
  });

  test("Rate value USD - EUR with input as float.", () => {
    const result = convertValue(
      11.3,
      "EUR - euro",
      "USD - dolar amerykański",
      currencyArray
    )["rate"];
    const expectedValue = 1.06;
    expect(result).toEqual(expectedValue);
  });

  test("Rate value CAD - CAD (same currency).", () => {
    const result = convertValue(
      2,
      "CAD - dolar kanadyjski",
      "CAD - dolar kanadyjski",
      currencyArray
    )["rate"];
    const expectedValue = 1;
    expect(result).toEqual(expectedValue);
  });

  test("Convert EUR - PLN with integer input.", () => {
    const result = convertValue(
      14,
      "EUR - euro",
      "PLN - złotówka",
      currencyArray
    )["outputValue"];
    const expectedValue = "65.57";
    expect(result).toEqual(expectedValue);
  });

  test("Convert USD - HKD with integer input.", () => {
    const result = convertValue(
      140,
      "USD - dolar amerykański",
      "HKD - dolar Hongkongu",
      currencyArray
    )["outputValue"];
    const expectedValue = "1099";
    expect(result).toEqual(expectedValue);
  });

  test("Convert value TRY - EUR with input as float.", () => {
    const result = convertValue(
      15362.34,
      "TRY - lira turecka",
      "EUR - euro",
      currencyArray
    )["outputValue"];
    const expectedValue = "765.53";
    expect(result).toEqual(expectedValue);
  });

  test("Convert value USD - JPY with input as float.", () => {
    const result = convertValue(
      0.34,
      "USD - dolar amerykański",
      "JPY - jen",
      currencyArray
    )["outputValue"];
    const expectedValue = "46.51";
    expect(result).toEqual(expectedValue);
  });

  test("Convert TRY - TRY (same currency).", () => {
    const result = convertValue(
      2,
      "TRY - lira turecka",
      "TRY - lira turecka",
      currencyArray
    )["outputValue"];
    const expectedValue = "2";
    expect(result).toEqual(expectedValue);
  });
});
export {};
