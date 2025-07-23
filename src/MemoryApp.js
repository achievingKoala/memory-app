// import {data as jsData} from './andyData';
import {data as navalQuotesData} from './navalQuotes';
// import {data as jsData} from './reframe';
// import {data as jsData} from './wordData';
// import {data as jsData} from './readData';
// import {data as jsData} from './random1';
// import {data as jsData} from './random2';
import {data as random2025Data} from './random-2025';
import {data as successReframeData} from './success-reframe';
import {data as mentalReframeData} from './mental-reframe';
import {data as realityReframeData} from './reality-reframe';


import React, { useState } from 'react';
import {speakText} from './AzureTextToSpeech';
const audioPath = require("./new-note.mp3");

const commonStyle = {
  fontSize: '22px',
  width: '60%',
  margin: 'auto',
  textAlign: 'left',
  wordSpacing: 'normal',
  fontFamily: 'monospace',
};
const correctCountStyle = { fontSize: '24px' };
const itemContainerStyle = { margin: '20px' };
const textareaStyle = {
  margin: '20px',
  fontSize: '22px',
  width: '60%',
  height: '80px',
  wordSpacing: 'normal',
  fontFamily: 'monospace',
};

const dataSources = [
  { label: 'Success Reframe', value: 'successReframe', data: successReframeData },
  { label: 'Mental Reframe', value: 'mentalReframe', data: mentalReframeData },
  { label: 'Reality Reframe', value: 'realityReframe', data: realityReframeData },
  { label: 'Random 2025', value: 'random2025', data: random2025Data },
  { label: 'Naval Quotes', value: 'navalQuotes', data: navalQuotesData },
];

const MemoryApp = () => {
  const [selectedSource, setSelectedSource] = useState(dataSources[0].value);
  const [data, setData] = useState(dataSources[0].data.filter(item => item.hide !== 1));
  const [currentPage, setCurrentPage] = useState(0);
  const [userInputs, setUserInputs] = useState(Array(data.length).fill(''));
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const itemsPerPage = 5;
  const successSound = new Audio(audioPath);
  const [isSpeaking, setIsSpeaking] = useState(false); // 播放状态
  const [isFocused, setIsFocused] = useState(null);

  const handleSourceChange = (e) => {
    const newSource = e.target.value;
    const sourceObj = dataSources.find(ds => ds.value === newSource);
    const filteredData = sourceObj.data.filter(item => item.hide !== 1);
    setSelectedSource(newSource);
    setData(filteredData);
    setCurrentPage(0);
    setUserInputs(Array(filteredData.length).fill(''));
    setFeedbackMessage('');
  };

  const handleRandomLoad = () => {
    // const randomIndex = Math.floor(Math.random() * data.length);
    // setCurrentPage(randomIndex % itemsPerPage === 0 ? randomIndex : Math.floor(randomIndex / itemsPerPage));
    const shuffledData = [...data].sort(() => Math.random() - 0.5); // 打乱data的顺序
    setData(shuffledData);
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
      event.preventDefault();
      const correctSentence = data[index].sentence;
      if (feedbackMessage === correctSentence) {
        setFeedbackMessage('');
      } else {
        setFeedbackMessage(correctSentence);
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
    const sortedData = [...data].sort((a, b) => {
      const countA = storedCounts[a.id] || 0;
      const countB = storedCounts[b.id] || 0;
      return countB - countA; // Sort in descending order
    });
    setData(sortedData);
    setCurrentPage(0); // Reset to the first page
    setUserInputs(Array(sortedData.length).fill('')); // Reset user inputs
  };
  
  const sortDataByIdCountDescending = () => {
    const storedCounts = JSON.parse(localStorage.getItem('idCounts')) || {};
    const sortedData = [...data].sort((a, b) => {
      const countA = storedCounts[a.id] || 0;
      const countB = storedCounts[b.id] || 0;
      return countA - countB; // Sort in ascending order
    });
    setData(sortedData);
    setCurrentPage(0); // Reset to the first page
    setUserInputs(Array(sortedData.length).fill('')); // Reset user inputs
    // Update the data state if you have a state for it, otherwise update the currentItems directly
  };
  
  const storedCounts = JSON.parse(localStorage.getItem('idCounts')) || {};
  // const idCount = storedCounts[item.id] || 0; // Get the count for the current item
  
  return (
    <div>
      <div style={{ margin: '20px' }}>
        <label htmlFor="data-source-select">切换数据源：</label>
        <select id="data-source-select" value={selectedSource} onChange={handleSourceChange} style={{ fontSize: '18px', marginLeft: '10px' }}>
          {dataSources.map(ds => (
            <option key={ds.value} value={ds.value}>{ds.label}</option>
          ))}
        </select>
      </div>
      {/* <h1 style={{ marginTop: '60px' }}>纳瓦尔：如何不靠运气致富</h1> */}
      {currentItems.map((item, index) => (
        <SentenceItem
          key={item.id}
          item={item}
          index={index}
          userInput={userInputs[currentPage * itemsPerPage + index]}
          onInputChange={e => handleInputChange(currentPage * itemsPerPage + index, e.target.value)}
          onKeyDown={e => handleKeyDown(currentPage * itemsPerPage + index, e)}
          isSpeaking={isSpeaking}
          isFocused={isFocused === index}
          feedbackMessage={feedbackMessage}
          correctCount={storedCounts[item.id] || 0}
          onFocus={() => setIsFocused(index)}
          onBlur={() => setIsFocused(null)}
        />
      ))}

      <p>当前页: {currentPage + 1}</p>
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

function SentenceItem({
  item,
  index,
  userInput,
  onInputChange,
  onKeyDown,
  isSpeaking,
  isFocused,
  feedbackMessage,
  correctCount,
  onFocus,
  onBlur,
}) {
  const isCorrect = userInput === item.sentence;
  const showFeedback = feedbackMessage && item.sentence === feedbackMessage;

  return (
    <div style={itemContainerStyle}>
      <p style={{ fontSize: '20px' }}>
        {item.id} . {item.chinese}
        <span style={correctCountStyle}> 正确次数：{correctCount}</span>
      </p>
      {showFeedback && (
        <div style={commonStyle}>{feedbackMessage}</div>
      )}
      <div style={commonStyle}>
        {userInput.split(' ').map((word, wordIndex) => {
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
        value={userInput}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        style={textareaStyle}
      />
      <div style={{ margin: '20px', color: isSpeaking ? 'green' : 'black' }}>
        {isSpeaking && isFocused ? 'Sending request...' : ''}
      </div>
      {isCorrect && <p style={{ color: 'green' }}>Correct!</p>}
    </div>
  );
}

export default MemoryApp;
