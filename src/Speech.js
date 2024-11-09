import React from "react";

export const speakText = (text) => {
  if (text.trim() === "") return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US"; // 设置为英语
  speechSynthesis.speak(utterance);
};

const TextToSpeech = ({ text = 'hello world' }) => {

  const handleSpeakClick = () => {
    speakText(text);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Text to Speech</h2>
      <button onClick={handleSpeakClick} style={{ marginTop: "10px" }}>
        Speak
      </button>
    </div>
  );
};

export default TextToSpeech;