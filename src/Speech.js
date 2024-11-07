import React, { useState } from "react";

const TextToSpeech = () => {
  const [text, setText] = useState("");

  const speakText = (text) => {
    if (text.trim() === "") return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US"; // 设置为英语
    speechSynthesis.speak(utterance);
  };

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleSpeakClick = () => {
    speakText(text);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Text to Speech</h2>
      <textarea
        rows="4"
        cols="50"
        placeholder="Enter text to speak..."
        value={text}
        onChange={handleInputChange}
      />
      <br />
      <button onClick={handleSpeakClick} style={{ marginTop: "10px" }}>
        Speak
      </button>
    </div>
  );
};

export default TextToSpeech;
