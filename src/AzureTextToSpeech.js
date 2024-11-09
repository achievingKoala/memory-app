import React, { useState } from "react";

const API_KEY = "BxmaEznl4foxzzjLNTxmZ7F8ibK9tNtmm1Cbsyo7Yi45KdebV0oPJQQJ99AKACYeBjFXJ3w3AAAYACOGd5KZ";
const REGION = "eastus"; // e.g., "eastus"

export const speakText = async (text) => {
  if (text.trim() === "") return;

  // 请求头信息
  const headers = {
    "Content-Type": "application/ssml+xml",
    "X-Microsoft-OutputFormat": "audio-16khz-32kbitrate-mono-mp3",
    "Ocp-Apim-Subscription-Key": API_KEY,
  };

  // 请求体内容（SSML 格式）
  const body = `
    <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US">
      <voice name="en-US-JennyNeural">${text}</voice>
    </speak>`;

  try {
    const response = await fetch(`https://${REGION}.tts.speech.microsoft.com/cognitiveservices/v1`, {
      method: "POST",
      headers,
      body,
    });

    if (!response.ok) {
      throw new Error("Text-to-speech request failed");
    }

    // 将音频文件转为 blob 并播放
    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audio.play();
  } catch (error) {
    console.error("Error in Text-to-Speech:", error);
  }
};
const AzureTextToSpeech = () => {
  const [text, setText] = useState("");

  // 在这里设置你的 Azure API 密钥和区域
  

  return (
    <div style={{ padding: "20px" }}>
      <h2>Azure Text to Speech</h2>
      <textarea
        rows="4"
        cols="50"
        placeholder="Enter text to speak..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <br />
      <button onClick={() => speakText(text)} style={{ marginTop: "10px" }}>
        Speak
      </button>
    </div>
  );
};

export default AzureTextToSpeech;
