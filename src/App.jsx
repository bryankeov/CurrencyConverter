import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [allCurrencies, setAllCurrencies] = useState([]);
  const [currData, setCurrData] = useState();
  const [exchangeRate, setExchangeRate] = useState(0);

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
        setAllCurrencies(null);
      }
    };
    fetchData();
  }, []);

  function getCurr(value) {
    if (value === "Select" || value === "undefined") {
      null;
    } else {
      fetch(
        `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${value}.json`
      )
        .then((response) => response.json())
        .then((data) => {
          setCurrData(data[value]);
        });
    }
  }

  function compareCurr(value) {
    Object.keys(currData).forEach((key) => {
      if (key === value) {
        setExchangeRate(currData[value]);
      }
    });
  }
  return (
    <div>
      <h1>Currency Converter</h1>
      <h3>Input the amount to be converted</h3>
      <div className="input-currency">
        <select onChange={(e) => getCurr(e.target.value)}>
          <option hidden disabled selected value>
            Select
          </option>
          {Object.keys(allCurrencies).map((value, key) => {
            return (
              <option key={`i + ${key}`} value={value}>
                {value.toUpperCase()}
              </option>
            );
          })}
        </select>
        <input placeholder="Input amount"></input>
      </div>
      <button className="convert-btn">Convert</button>
      <div>{exchangeRate}</div>
      <div className="output-currency" id="outputCurr">
        <select onChange={(e) => compareCurr(e.target.value)}>
          <option hidden disabled selected value>
            Select
          </option>
          {Object.keys(allCurrencies).map((value, key) => {
            return (
              <option key={`o + ${key}`} value={value}>
                {value.toUpperCase()}
              </option>
            );
          })}
        </select>
        <input placeholder="Output amount"></input>
      </div>
    </div>
  );
}

export default App;
