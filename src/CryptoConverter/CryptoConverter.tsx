import React, { ChangeEvent, useEffect } from "react";

interface cryptoDataType {
  amount: number;
  prevConvertedAmount: number;
  convertedAmount: number;
  priceChange: number;
}

const CryptoConverter = () => {
  const CURRENCY = ["USD", "EUR", "GBP", "CNY"];

  const API = "https://api.frontendeval.com/fake/crypto/";

  const [cryptoData, setCryptoData] = React.useState<cryptoDataType>({
    amount: 0,
    prevConvertedAmount: 0,
    convertedAmount: 0,
    priceChange: 0,
  });

  const [currency, setCurrency] = React.useState<string>(CURRENCY[0]);

  useEffect(() => {
    async function fetchCurrency() {
      try {
        const req = await fetch(`${API}${currency}`);
        const data = await req.json();
        setCryptoData((prev) => {
          const newConvertedAmount = prev.amount * data.value;
          return {
            ...prev,
            prevConvertedAmound: prev.convertedAmount,
            convertedAmount: newConvertedAmount,
            priceChange: newConvertedAmount - prev.convertedAmount,
          };
        });
      } catch (error) {
        console.log("error", error);
        alert(error);
      }
    }

    const interval = setInterval(() => fetchCurrency(), 2000);

    return () => {
      clearInterval(interval);
    };
  }, [currency]);

  return (
    <div
      style={{
        color: "#fff",
        flex: "1",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "30px"
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "40px",
        }}
      >
        <div>
          <p>Amount to Convert</p>
          <input
            type="number"
            onChange={(e) => {
              setCryptoData((prev) => {
                return {
                  ...prev,
                  amount: parseInt(e.target.value),
                };
              });
            }}
          />
        </div>
        <div>
          <p>Currency :</p>
          <select
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setCurrency(e.target.value)
            }
          >
            {CURRENCY.map((currency, index) => {
              return (
                <option value={currency} key={index}>
                  {currency}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <p>WUC Crypto Equivalent: {cryptoData.convertedAmount}</p>
        <p>
          Change : <span></span> {cryptoData.priceChange}
        </p>
      </div>
    </div>
  );
};

export default CryptoConverter;
