import { useState, useEffect } from "react";

function Kanye() {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.kanye.rest");
        if (!response.ok) {
          throw new Error("HTTP Error: ${response.status}");
        }
        let data = await response.json();
        setQuote(Object.values(data));
      } catch (err) {
        setQuote(null);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div>{quote}</div>
      <div className="kanye-west">- Kanye West</div>
    </div>
  );
}

export default Kanye;
