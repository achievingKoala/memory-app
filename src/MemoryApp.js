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
import {data as allReframeData} from './all-reframe';
import {data as adviceData} from './adviceData';
import {data as readingData} from './reading';

import React, { useState, useEffect } from 'react';
import {speakText} from './AzureTextToSpeech';
import SentenceItem from './SentenceItem';
const audioPath = require("./new-note.mp3");

const commonStyle = {
  fontSize: '22px',
  width: '80%',
  margin: 'auto',
  textAlign: 'left',
  wordSpacing: 'normal',
  fontFamily: 'monospace',
};
const correctCountStyle = { fontSize: '24px' };
const mainContentStyle = {
  width: '95%',
  margin: '0 auto',
  background: '#f3f6fa',
  minHeight: '100vh',
  padding: '0 0 40px 0',
  boxSizing: 'border-box',
};
const itemContainerStyle = {
  margin: '24px 0',
  background: '#fff',
  borderRadius: '14px',
  boxShadow: '0 2px 12px rgba(37,99,235,0.10)',
  padding: '10px',
  border: '1.5px solid #e0e7ef',
  transition: 'box-shadow 0.2s',
  maxWidth: '90%',
  width: '100%',
  marginLeft: 'auto',
  marginRight: 'auto',
};
const textareaStyle = {
  margin: '20px',
  fontSize: '22px',
  width: '80%',
  height: '80px',
  wordSpacing: 'normal',
  fontFamily: 'monospace',
};

const buttonStyle = {
  padding: '8px 18px',
  borderRadius: '8px',
  border: 'none',
  background: '#2563eb',
  color: '#fff',
  fontWeight: 600,
  fontSize: '16px',
  boxShadow: '0 2px 8px rgba(37,99,235,0.08)',
  cursor: 'pointer',
  transition: 'background 0.2s, transform 0.1s',
  marginLeft: '0',
};
// 生成所有chapter列表（去重, 保持顺序）
const allChapters = [];
allReframeData.forEach(item => {
  if (!allChapters.includes(item.chapter)) {
    allChapters.push(item.chapter);
  }
});

// 构造dataSources: 每个chapter一个选项，加上“All”
const dataSources = [
  { label: 'Reading', value: 'reading', data: readingData},
  { label: 'Random 2025', value: 'random2025', data: random2025Data },
  { label: 'Naval Quotes', value: 'navalQuotes', data: navalQuotesData },
  { label: 'Advice', value: 'advice', data: adviceData },
  { label: 'All', value: 'all', data: allReframeData },
  ...allChapters.map(chap => ({
    label: chap,
    value: chap,
    data: allReframeData.filter(item => item.chapter === chap),
  })),
  // 修正：adviceData.map 是对 adviceData 的每一条都 map，并且 chap 实际上是 adviceData 的 item
  // 所以实际应该和 allChapters 那部分一样，先收到 adviceData 里所有的 chapter 并去重，再 map
  ...Array.from(new Set(adviceData.map(item => item.chapter))).map(chap => ({
    label: chap,
    value: chap,
    data: adviceData.filter(item => item.chapter === chap),
  })),
];

// 收藏样式
const favoriteButtonStyle = {
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
  fontSize: '1.6em',
  marginLeft: '12px',
  verticalAlign: 'middle',
  userSelect: 'none',
};

function getFavoriteIds() {
  let favIds = JSON.parse(localStorage.getItem('favoriteIds') || 'null');
  if (!favIds) {
    // 第一次访问，还未存储，默认全收藏
    // 假定全局 allReframeData 有所有题目
    favIds = allReframeData.map(item => item.id);
    localStorage.setItem('favoriteIds', JSON.stringify(favIds));
  }
  return favIds;
}

function setFavoriteIds(favIds) {
  localStorage.setItem('favoriteIds', JSON.stringify(favIds));
}

const MemoryApp = () => {
  const [selectedSource, setSelectedSource] = useState(dataSources[0].value);
  const [showChinese, setShowChinese] = useState(true); // 添加这行
  const [data, setData] = useState(dataSources[0].data.filter(item => item.hide !== 1));
  const [currentPage, setCurrentPage] = useState(0);
  const [userInputs, setUserInputs] = useState(Array(data.length).fill(''));
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const itemsPerPage = 5;
  const successSound = new Audio(audioPath);
  const [isSpeaking, setIsSpeaking] = useState(false); // 播放状态
  const [isFocused, setIsFocused] = useState(null);
  const textareaRefs = React.useRef([]);
  // 在MemoryApp组件内
  const [targetPage, setTargetPage] = useState(1); // 新增目标页状态

  const handleJumpToPage = () => {
    const page = Number(targetPage);
    if (page > 0 && page <= Math.ceil(filteredCurrentData.length / itemsPerPage)) {
      setCurrentPage(page - 1); // page是从1开始的，currentPage是从0开始的
      setUserInputs(Array(filteredCurrentData.length).fill('')); // 重置用户输入
    }
  };

  // 收藏相关
  const [favoriteIds, setFavoriteIdsState] = useState(getFavoriteIds());
  const [showOnlyFavorite, setShowOnlyFavorite] = useState(false);

  // 收藏按钮handler
  const toggleFavorite = (id) => {
    setFavoriteIdsState((prevIds) => {
      let updated;
      if (prevIds.includes(id)) {
        updated = prevIds.filter(f => f !== id);
      } else {
        updated = [...prevIds, id];
      }
      setFavoriteIds(updated);
      return updated;
    });
  };

  const handleSourceChange = (e) => {
    const newSource = e.target.value;
    const sourceObj = dataSources.find(ds => ds.value === newSource);
    const filteredData = sourceObj.data.filter(item => item.hide !== 1);
    setSelectedSource(newSource);
    setData(filteredData);
    setCurrentPage(0);
    setUserInputs(Array(filteredData.length).fill(''));
    setFeedbackMessage('');
    setShowOnlyFavorite(false);
  };

  const handleRandomLoad = () => {
    const shuffledData = [...data].sort(() => Math.random() - 0.5); // 打乱data的顺序
    setData(shuffledData);
    setCurrentPage(0); // 重置当前页面为0
    setUserInputs(Array(shuffledData.length).fill('')); // 重置用户输入
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, Math.floor(filteredCurrentData.length / itemsPerPage)));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const recordCorrect = (id) => {
    successSound.play().catch((error) => {
      console.error('Error playing audio:', error);
    });
    const storedCounts = JSON.parse(localStorage.getItem('idCounts')) || {};
    storedCounts[id] = (storedCounts[id] || 0) + 1;
    localStorage.setItem('idCounts', JSON.stringify(storedCounts));
  };

  const handleInputChange = (index, value) => {
    if (value == filteredCurrentData[index].sentence) {
      recordCorrect(filteredCurrentData[index].id);
      // 自动聚焦下一个输入框
      setTimeout(() => {
        if (textareaRefs.current[index + 1]) {
          textareaRefs.current[index + 1].focus();
        }
      }, 100); // 延迟以确保禁用生效
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
      const correctSentence = filteredCurrentData[index].sentence;
      if (feedbackMessage === correctSentence) {
        setFeedbackMessage('');
      } else {
        setFeedbackMessage(correctSentence);
      }
    } else if (event.key === '\\') {
      event.preventDefault(); // Prevent default behavior
      playTextWithStatus(filteredCurrentData[index].sentence);
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

  // 先根据 showOnlyFavorite 过滤
  const filteredCurrentData = showOnlyFavorite
    ? data.filter(item => favoriteIds.includes(item.id))
    : data;

  const currentItems = filteredCurrentData.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  const sortDataByIdCount = () => {
    const storedCounts = JSON.parse(localStorage.getItem('idCounts')) || {};
    const sortedData = [...filteredCurrentData].sort((a, b) => {
      const countA = storedCounts[a.id] || 0;
      const countB = storedCounts[b.id] || 0;
      return countB - countA; // Sort in descending order
    });
    setData(showOnlyFavorite ? data : sortedData);
    setCurrentPage(0);
    setUserInputs(Array(sortedData.length).fill(''));
  };

  const sortDataByIdCountDescending = () => {
    const storedCounts = JSON.parse(localStorage.getItem('idCounts')) || {};
    const sortedData = [...filteredCurrentData].sort((a, b) => {
      const countA = storedCounts[a.id] || 0;
      const countB = storedCounts[b.id] || 0;
      return countA - countB; // Sort in ascending order
    });
    setData(showOnlyFavorite ? data : sortedData);
    setCurrentPage(0);
    setUserInputs(Array(sortedData.length).fill(''));
  };

  const storedCounts = JSON.parse(localStorage.getItem('idCounts')) || {};

  // 全局键盘事件监听器
  useEffect(() => {
    const handleGlobalKeyDown = (event) => {
      if (event.key === ']') {
        event.preventDefault();
        setCurrentPage((prev) => Math.min(prev + 1, Math.floor(filteredCurrentData.length / itemsPerPage)));
      } else if (event.key === '[') {
        event.preventDefault();
        setCurrentPage((prev) => Math.max(prev - 1, 0));
      }
    };

    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => {
      document.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [filteredCurrentData.length, itemsPerPage]);

  return (
    <div style={mainContentStyle}>
      <h1 style={{
        textAlign: 'center',
        fontSize: '2.2rem',
        fontWeight: 700,
        margin: '32px 0 16px 0',
        letterSpacing: '2px',
        color: '#2563eb'
      }}>
        英文默写练习
      </h1>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '16px',
        marginBottom: '32px'
      }}>
        <label htmlFor="data-source-select" style={{ fontSize: '18px' }}>切换数据源：</label>
        <select id="data-source-select" value={selectedSource} onChange={handleSourceChange} style={{ fontSize: '18px', borderRadius: '6px', padding: '6px 12px', border: '1.5px solid #cbd5e1', background: '#f1f5f9', outline: 'none' }}>
          {dataSources.map(ds => (
            <option key={ds.value} value={ds.value}>{ds.label}</option>
          ))}
        </select>
        <span style={{ fontSize: "18px", color: "#888" }}>
          共 {filteredCurrentData.length} 题
        </span>
        <button onClick={handleRandomLoad} style={buttonStyle}>随机加载句子</button>
        <button onClick={sortDataByIdCount} style={buttonStyle}>根据练习次数倒序</button>
        <button onClick={sortDataByIdCountDescending} style={buttonStyle}>根据练习次数正序</button>
        <button
          onClick={() => {
            setShowOnlyFavorite(val => {
              if (!val) setCurrentPage(0);
              return !val;
            });
          }}
          style={{
            ...buttonStyle,
            background: showOnlyFavorite ? "#facc15" : "#2563eb",
            color: showOnlyFavorite ? "#000" : "#fff",
            marginLeft: "10px"
          }}
        >
          {showOnlyFavorite ? '显示全部' : '仅看收藏'}
        </button>
        <button
          onClick={() => setShowChinese(val => !val)}
          style={{
            ...buttonStyle,
            background: showChinese ? "#facc15" : "#2563eb",
            color: showChinese ? "#000" : "#fff",
            marginLeft: "10px"
          }}
        >
          {showChinese ? '显示关键词' : '显示中文'}
        </button>
      </div>
      {currentItems.length === 0 ? (
        <div style={{ textAlign: 'center', fontSize: '20px', color: '#888', margin: '40px 0' }}>
          {showOnlyFavorite ? '暂无收藏内容。' : '暂无句子。'}
        </div>
      ) : (
        currentItems.map((item, index) => (
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
            favorite={favoriteIds.includes(item.id)}
            onFavoriteClick={() => toggleFavorite(item.id)}
            onFocus={() => setIsFocused(index)}
            onBlur={() => setIsFocused(null)}
            textareaRef={el => textareaRefs.current[currentPage * itemsPerPage + index] = el}
            showChinese={showChinese}
          />
        ))
      )}

      {/* 优化后的底部导航 */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '24px',
        margin: '40px 0 24px 0',
      }}>
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 0}
          style={{
            ...buttonStyle,
            opacity: currentPage === 0 ? 0.5 : 1,
            cursor: currentPage === 0 ? 'not-allowed' : 'pointer',
            margin: 0,
          }}
        >
          上一页
        </button>
        <span style={{ fontSize: '18px', fontWeight: 600, minWidth: '90px', textAlign: 'center' }}>
          第 {currentPage + 1} / {Math.max(1, Math.ceil(filteredCurrentData.length / itemsPerPage))} 页
        </span>
        
        <div>
          <input
            type="number"
            value={targetPage}
            onChange={(e) => setTargetPage(e.target.value)}
            min={1}
            max={Math.ceil(filteredCurrentData.length / itemsPerPage)}
            style={{
              ...buttonStyle,
              marginRight: '10px',
              width: '60px',
              height: '36px',
              color: '#222',
              background: '#fff',
              border: '1.5px solid #cbd5e1',
              fontSize: '16px',
              fontWeight: 500,
              padding: '0 10px',
              borderRadius: '6px',
              boxShadow: 'none',
              appearance: 'textfield'
            }}
          />
          <button onClick={handleJumpToPage} style={buttonStyle}>跳转</button>
        </div>
        <button
          onClick={handleNextPage}
          disabled={currentPage >= Math.floor(filteredCurrentData.length / itemsPerPage)}
          style={{
            ...buttonStyle,
            opacity: currentPage >= Math.floor(filteredCurrentData.length / itemsPerPage) ? 0.5 : 1,
            cursor: currentPage >= Math.floor(filteredCurrentData.length / itemsPerPage) ? 'not-allowed' : 'pointer',
            margin: 0,
          }}
        >
          下一页
        </button>
      </div>
    </div>
  );
};



export default MemoryApp;
