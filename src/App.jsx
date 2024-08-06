import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [allCurrencies, setAllCurrencies] = useState([]);
  const [currData, setCurrData] = useState();
  const [exchangeRate, setExchangeRate] = useState(0);
  const [outputCurr, setOutputCurr] = useState(0);

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

  function calcCurr(value) {
    let output = value * exchangeRate;
    setOutputCurr(output.toFixed(2));
  }

  return (
    <div>
      <h1>Currency Converter</h1>
      <h3>Input the amount to be converted</h3>
      <div className="input-currency">
        <input
          className="numeric-values"
          placeholder="Input amount"
          onChange={(e) => calcCurr(e.target.value)}
        ></input>
        <select className="drop-down" onChange={(e) => getCurr(e.target.value)}>
          <option hidden selected disabled>
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
      </div>
      <div className="output-currency">
        <div type="text" className="numeric-values">
          {outputCurr}
        </div>
        <select
          className="drop-down"
          onChange={(e) => compareCurr(e.target.value)}
        >
          <option hidden selected disabled>
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
      </div>
      <div className="xr-container">
        <h4>Exchange Rate</h4>
        <div className="numeric-values">{exchangeRate}</div>
      </div>
    </div>
  );
}

export default App;
