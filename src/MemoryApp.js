import React, { useState } from 'react';

const data = [
  { keyword: '财富', sentence: 'Seek wealth, not money or status. Wealth is having assets that earn while you sleep. Money is how we transfer time and wealth. Status is your place in the social hierarchy.' },
  { keyword: '道德', sentence: 'Understand that ethical wealth creation is possible. If you secretly despise wealth, it will elude you.' },
  { keyword: '忽视', sentence: 'Ignore people playing status games. They gain status by attacking people playing wealth creation games.' },
  { keyword: '资产', sentence: 'You\'re not going to get rich renting out your time. You must own equity - a piece of a business - to gain your financial freedom.' },
  { keyword: '需求', sentence: 'You will get rich by giving society what it wants but does not yet know how to get. At scale.' },
  { keyword: '努力', sentence: 'Hard work is the key to achieving your goals.' },
  { keyword: '努力', sentence: 'Hard work is the key to achieving your goals.' },
  { keyword: '努力', sentence: 'Hard work is the key to achieving your goals.' },
  { keyword: '努力', sentence: 'Hard work is the key to achieving your goals.' },
  { keyword: '努力', sentence: 'Hard work is the key to achieving your goals.' },
  // 添加更多句子
];

const MemoryApp = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [userInputs, setUserInputs] = useState(Array(data.length).fill(''));
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const itemsPerPage = 3;

  const handleRandomLoad = () => {
    const randomIndex = Math.floor(Math.random() * data.length);
    setCurrentPage(randomIndex % itemsPerPage === 0 ? randomIndex : Math.floor(randomIndex / itemsPerPage));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, Math.floor(data.length / itemsPerPage)));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleInputChange = (index, value) => {
    setUserInputs((prev) => {
      const newInputs = [...prev];
      newInputs[index] = value;
      return newInputs;
    });
  };

  const handleKeyDown = (index, event) => {
    if (event.key === '=') {
      const correctSentence = data[index].sentence;
      setFeedbackMessage(`正确句子: ${correctSentence}`); // Set feedback message
    }
  };

  const currentItems = data.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  return (
    <div>
      <h1>记忆纳瓦尔的句子</h1>
      {feedbackMessage && <p>{feedbackMessage}</p>} {/* Display feedback message */}
      {currentItems.map((item, index) => (
        <div key={index}>
          <p>{item.keyword}</p>
          <textarea
            type="text"
            placeholder="默写英文句子..."
            value={userInputs[currentPage * itemsPerPage + index]}
            onChange={(e) => handleInputChange(currentPage * itemsPerPage + index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(currentPage * itemsPerPage + index, e)}
            style={{ fontSize: '18px', width: '100%', height: '150px' }} // Increased font size and textarea dimensions
          />
          {userInputs[currentPage * itemsPerPage + index] === item.sentence && <p style={{color: 'green'}}>Correct!</p>}
        </div>
      ))}
      
      <button onClick={handlePrevPage} disabled={currentPage === 0}>
        上一页
      </button>
      <button onClick={handleNextPage} disabled={currentPage >= Math.floor(data.length / itemsPerPage)}>
        下一页
      </button>
      <button onClick={handleRandomLoad}>
        随机加载句子
      </button>
    </div>
  );
};

export default MemoryApp;
