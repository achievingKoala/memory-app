// import {data as jsData} from './andyData';
// import {data as jsData} from './sentenceData';
// import {data as jsData} from './reframe';
// import {data as jsData} from './wordData';
import {data as jsData} from './readData';
// import {data as jsData} from './random1';
// import {data as jsData} from './random2';


import React, { useState } from 'react';
import {speakText} from './AzureTextToSpeech';
const audioPath = require("./new-note.mp3");

// const jsData = data;

const MemoryApp = () => {

  const [data, setData] = useState(jsData.filter(item => item.hide !== 1));
  const [currentPage, setCurrentPage] = useState(0);
  const [userInputs, setUserInputs] = useState(Array(data.length).fill(''));
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const itemsPerPage = 5;
  const successSound = new Audio(audioPath);
  const [isSpeaking, setIsSpeaking] = useState(false); // 播放状态
  const [isFocused, setIsFocused] = useState(null);


  const handleRandomLoad = () => {
    // const randomIndex = Math.floor(Math.random() * data.length);
    // setCurrentPage(randomIndex % itemsPerPage === 0 ? randomIndex : Math.floor(randomIndex / itemsPerPage));
    const shuffledData = data.sort(() => Math.random() - 0.5); // 打乱data的顺序
    setCurrentPage(0); // 重置当前页面为0
    // 这里可以选择更新userInputs以匹配新的数据顺序
    setUserInputs(Array(shuffledData.length).fill('')); // 重置用户输入
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, Math.floor(data.length / itemsPerPage)));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  
  
  const recordCorrect = (id) => {
    successSound.play().catch((error) => {
      console.error('Error playing audio:', error);
    });
    console.log('--->', id);
    const storedCounts = JSON.parse(localStorage.getItem('idCounts')) || {};
    storedCounts[id] = (storedCounts[id] || 0) + 1;
    localStorage.setItem('idCounts', JSON.stringify(storedCounts));
  };
  
  const handleInputChange = (index, value) => {
    console.log('index:', index);
    // console.log('--->v', value);
    // console.log('--->u', data[index].sentence);
    if (value == data[index].sentence) {
      recordCorrect(data[index].id);
    }
    setUserInputs((prev) => {
      const newInputs = [...prev];
      newInputs[index] = value;
      return newInputs;
    });
  };

  const handleKeyDown = (index, event) => {
    if (event.key === '=') {
      event.preventDefault(); // Prevent default behavior
      if (feedbackMessage) {
        setFeedbackMessage('');
      } else {
        const correctSentence = data[index].sentence;
        setFeedbackMessage(correctSentence); // Set feedback message
      }
    } else if (event.key === ']') {
      event.preventDefault(); // Prevent default behavior
      handleNextPage();
    } else if (event.key === '[') {
      event.preventDefault(); // Prevent default behavior
      handlePrevPage(); // Corrected to handlePrevPage
    } else if (event.key === '\\') {
      event.preventDefault(); // Prevent default behavior
      playTextWithStatus(data[index].sentence);
    }
  };

  const playTextWithStatus = async (text) => {
    if (isSpeaking) {
      console.warn("Already speaking...");
      return;
    }
    setIsSpeaking(true);
    try {
      await speakText(text);
    } catch (error) {
      console.error("Error while speaking text:", error);
    } finally {
      setIsSpeaking(false);
    }
  };

  const currentItems = data.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );
  
  const sortDataByIdCount = () => {
    const storedCounts = JSON.parse(localStorage.getItem('idCounts')) || {};
    const sortedData = data.sort((a, b) => {
      const countA = storedCounts[a.id] || 0;
      const countB = storedCounts[b.id] || 0;
      return countB - countA; // Sort in descending order
    });
    setCurrentPage(0); // Reset to the first page
    setUserInputs(Array(sortedData.length).fill('')); // Reset user inputs
  };
  
  const sortDataByIdCountDescending = () => {
    const storedCounts = JSON.parse(localStorage.getItem('idCounts')) || {};
    const sortedData = data.sort((a, b) => {
      const countA = storedCounts[a.id] || 0;
      const countB = storedCounts[b.id] || 0;
      return countA - countB; // Sort in ascending order
    });
    setCurrentPage(0); // Reset to the first page
    setUserInputs(Array(sortedData.length).fill('')); // Reset user inputs
    // Update the data state if you have a state for it, otherwise update the currentItems directly
  };
  
  const storedCounts = JSON.parse(localStorage.getItem('idCounts')) || {};
  // const idCount = storedCounts[item.id] || 0; // Get the count for the current item
  
  const commonStyle = {
    fontSize: '22px',
    width: '60%',
    margin: 'auto',
    textAlign: 'left',
  };

  return (
    <div>
      <h1 style={{ marginTop: '60px' }}>纳瓦尔：如何不靠运气致富</h1>
      {currentItems      
        .map((item, index) => (
        <div key={index} style={{ margin: '20px' }}>
          <p style={{ fontSize: '20px' }}> {item.id} . {item.chinese} <span style={{ fontSize: '24px' }}>  正确次数：{storedCounts[item.id] || 0}</span> </p>
           { (feedbackMessage && item.sentence == feedbackMessage) ? 
           <div style={{ ...commonStyle, wordSpacing: 'normal', fontFamily: 'monospace' }} >
             {feedbackMessage}</div> 
             : ''}        
          <div style={{ ...commonStyle, wordSpacing: 'normal', fontFamily: 'monospace' }}>
            {userInputs[currentPage * itemsPerPage + index].split(' ').map((word, wordIndex) => {
              const isCorrectWord = item.sentence.split(' ').includes(word);
              return (
                <span key={wordIndex} style={{ color: isCorrectWord ? 'green' : 'black' }}>
                  {word}{' '}
                </span>
              );
            })}
          </div>

          <textarea
            type="text"
            placeholder="默写英文句子..."
            value={userInputs[currentPage * itemsPerPage + index]}
            onFocus={() => setIsFocused(index)} // 光标聚焦事件
            onBlur={() => setIsFocused(null)} // 光标移出事件
            onChange={(e) => handleInputChange(currentPage * itemsPerPage + index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(currentPage * itemsPerPage + index, e)}
            style={{ margin: '20px', fontSize: '22px', width: '60%', height: '80px', wordSpacing: 'normal', fontFamily: 'monospace' }} // Adjusted word spacing and font
          />
          <div style={{ margin: '20px', color: isSpeaking ? 'green' : 'black' }}>
            {isSpeaking && isFocused  === index ? 'Sending request...' : ''}
          </div>
          {userInputs[currentPage * itemsPerPage + index] === item.sentence && (
            <>
              <p style={{ color: 'green' }}>Correct!</p>
            </>
          )}
        </div>
      ))}

      
        <p>当前页: {currentPage + 1}</p> {/* Display current page number */}
        <button onClick={handlePrevPage} disabled={currentPage === 0} style={{ margin: '10px' }}>
          上一页
        </button>
        <button onClick={handleNextPage} disabled={currentPage >= Math.floor(data.length / itemsPerPage)} style={{ margin: '10px' }}>
          下一页
        </button>
        <button onClick={handleRandomLoad} style={{ margin: '10px' }}>
          随机加载句子
        </button>
        <button onClick={sortDataByIdCount} style={{ margin: '10px' }}>
          根据练习次数倒序
        </button>
        <button onClick={sortDataByIdCountDescending} style={{ margin: '10px' }}>
          根据练习次数正序
        </button>
      
    </div>
  );
};

export default MemoryApp;
