// src/modules/products/components/SearchBar.tsx

import { useState, useEffect } from 'react';
import { Search, Mic } from 'lucide-react';
import { Input } from '@/shared/components/ui/input';
import { searchProducts } from '../api';

export function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  // Fetch suggestions when query changes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        searchProducts(query)
          .then(res => setSuggestions(res.data))
          .catch(err => console.error(err));
      } else {
        setSuggestions([]);
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, [query]);
  
  // Voice search function
  const startVoiceSearch = () => {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      alert("Voice search not supported in your browser");
      return;
    }
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    setIsListening(true);
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      onSearch(transcript);
      setIsListening(false);
    };
    
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    
    recognition.start();
  };
  
  return (
    <div className="relative w-full">
      <div className="relative flex">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSearch(query)}
          placeholder="Search products..."
          className="pr-16"
        />
        
        <div className="absolute right-0 h-full flex items-center pr-1">
          <button 
            type="button"
            onClick={startVoiceSearch}
            className={`p-1 ${isListening ? "text-red-500" : ""}`}
          >
            <Mic size={16} />
          </button>
          
          <button 
            type="button"
            onClick={() => onSearch(query)}
            className="p-1"
          >
            <Search size={16} />
          </button>
        </div>
      </div>

      {/* Suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white shadow border rounded-md">
          {suggestions.map(product => (
            <div
              key={product._id}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setQuery(product.title);
                onSearch(product.title);
                setShowSuggestions(false);
              }}
            >
              <div>{product.title}</div>
              <div className="text-sm text-gray-500">${product.price.toFixed(2)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}