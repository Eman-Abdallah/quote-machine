import React, { useState, useEffect } from 'react';
import './App.css';
import quoteImage from './images/iconmonstr-quote-1.svg'; // Adjust the path based on your image location

const App = () => {
  const [quote, setQuote] = useState({ text: '', author: '' });
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const response = await fetch('https://type.fit/api/quotes');
      const data = await response.json();
      const formattedData = data.map(quote => ({
        ...quote,
        author: formatAuthorName(quote.author)
      }));
      setQuotes(formattedData);
      setQuote(getRandomQuote(formattedData));
    } catch (error) {
      console.error('Error fetching quotes:', error);
    }
  };

  const formatAuthorName = (author) => {
    if (!author) return 'Unknown';
    const authorWithoutComma = author.replace(/,/g, ''); // Remove commas
    const authorWords = authorWithoutComma.split(' ');
    return authorWords.slice(0, 2).join(' ');
  };

  const getRandomQuote = (quotesArray) => {
    const randomIndex = Math.floor(Math.random() * quotesArray.length);
    return quotesArray[randomIndex];
  };

  const handleNewQuote = () => {
    setQuote(getRandomQuote(quotes));
  };

  return (
    <div id="quote-box">
      <img src={quoteImage} alt="Quote" id="quote-img" />
      <div id="text">{quote.text}</div>
      <div id="author">{quote.author}</div>
      <button id="new-quote" onClick={handleNewQuote}>New Quote</button>
      <a
        id="tweet-quote"
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote.text}" - ${quote.author}`)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Tweet Quote
      </a>
    </div>
  );
};

export default App;
