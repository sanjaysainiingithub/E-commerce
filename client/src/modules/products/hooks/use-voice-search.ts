// src/shared/hooks/use-voice-search.ts

import { useState, useCallback } from 'react';

type UseVoiceSearchProps = {
  onResult: (text: string) => void;
  onError?: (error: string) => void;
  lang?: string;
};

export function useVoiceSearch({ onResult, onError, lang = 'en-US' }: UseVoiceSearchProps) {
  const [isListening, setIsListening] = useState(false);

  const startListening = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      onError?.('Voice recognition is not supported in your browser');
      return;
    }

    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = lang;
      recognition.continuous = false;
      recognition.interimResults = false;
      
      recognition.onstart = () => {
        setIsListening(true);
      };
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        onResult(transcript);
        setIsListening(false);
      };
      
      recognition.onerror = (event) => {
        setIsListening(false);
        onError?.(event.error);
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognition.start();
    } catch (error) {
      onError?.('Failed to start voice recognition');
      setIsListening(false);
    }
  }, [onResult, onError, lang]);

  return {
    isListening,
    startListening
  };
}