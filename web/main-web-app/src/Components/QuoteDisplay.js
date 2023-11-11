// QuoteDisplay.js
import React, { useState, useEffect } from 'react';

const QuoteDisplay = () => {
  const [quote, setQuote] = useState(null);

  const quotes = [
    "Quote 1",
    "Quote 2",
    "Quote 3",
    // Add more quotes as needed
  ];

  useEffect(() => {
    const showRandomQuote = () => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setQuote(quotes[randomIndex]);

      setTimeout(() => {
        setQuote(null);
      }, 10000);
    };

    const quoteInterval = setInterval(showRandomQuote, 10 * 60 * 1000);

    return () => clearInterval(quoteInterval);
  }, []);

  return (
    <div>
      {quote && (
        <div className="quote-container">
          <div className="quote-text">{quote}</div>
        </div>
      )}
    </div>
  );
}

export default QuoteDisplay;