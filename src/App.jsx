import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [allCurrencies, setAllCurrencies] = useState([]);
  // const [fromCurrency, setFromCurrency] = useState();
  // const [toCurrency, setToCurrency] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json"
        );
        if (!response.ok) {
          throw new Error("HTTP Error: ${response.status}");
        }
        let data = await response.json();
        setAllCurrencies(data);
      } catch (err) {
        console.log(err);
        setAllCurrencies(null);
      }
    };
    fetchData();
  }, [allCurrencies]);

  return (
    <div>
      <h1>Currency Converter</h1>
      <h3>Input the amount to be converted</h3>
      <div className="initial-currency">
        <select>
          {allCurrencies.map((currency) => {
            <option key={currency} value={currency}>
              {currency}
            </option>;
          })}
          <option value="AUD">AUD</option>
          <option value="USD">USD</option>
        </select>
        <input placeholder="Input amount"></input>
      </div>
      <button className="convert-btn">Convert</button>
      <div className="converted-currency">
        <select>
          <option value="AUD">AUD</option>
          <option value="USD">USD</option>
        </select>
        <input placeholder="Output amount"></input>
      </div>
    </div>
  );
}

export default App;
