import React, { useState, useEffect } from 'react';

const QuoteDisplay = ({ quote }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    console.log("Received quote in QuoteDisplay:", quote);

    // Display the quote for 10 seconds
    setVisible(true);

    // Clear the display after 10 seconds
    const timeoutId = setTimeout(() => {
      setVisible(false);
    }, 1000000);

    return () => clearTimeout(timeoutId); // Clear the timeout on component unmount or quote change
  }, [quote]);

  return (
      <div>
      {visible && (
        <div>
          <br/>
          <br/>
          <br/>
          Here is the friendly Quote from your pet:<br/>{quote}
        </div>
      )} 
      </div>

  );
};

export default QuoteDisplay;