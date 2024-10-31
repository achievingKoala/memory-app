import React, { useState } from 'react';

// { keyword: '努力', sentence: 'Hard work is the key to achieving your goals.' },
const data = [
  { keyword: '财富', sentence: 'Seek wealth, not money or status. Wealth is having assets that earn while you sleep. Money is how we transfer time and wealth. Status is your place in the social hierarchy.' },
  { keyword: '道德', sentence: 'Understand that ethical wealth creation is possible. If you secretly despise wealth, it will elude you.' },
  { keyword: '忽视', sentence: 'Ignore people playing status games. They gain status by attacking people playing wealth creation games.' },
  { keyword: '资产', sentence: 'You\'re not going to get rich renting out your time. You must own equity - a piece of a business - to gain your financial freedom.' },
  { keyword: '需求', sentence: 'You will get rich by giving society what it wants but does not yet know how to get. At scale.' },
  { keyword: '行业', sentence: 'Pick an industry where you can play long term games with long term people.' },
  { keyword: '互联网', sentence: 'The Internet has massively broadened the possible space of careers. Most people haven\'t figured this out yet.' },
  { keyword: '复利', sentence: 'Play iterated games. All the returns in life, whether in wealth, relationships, or knowledge, come from compound interest.' },
  { keyword: '正直', sentence: 'Pick business partners with high intelligence, energy, and, above all, integrity.' },
  { keyword: '犬儒', sentence: "Don't partner with cynics and pessimists. Their beliefs are self-fulfilling." },
  { keyword: '学习', sentence: "Learn to sell. Learn to build. If you can do both, you will be unstoppable." },
  { keyword: '独特', sentence: "Specific knowledge is knowledge that you cannot be trained for. If society can train you, it can train someone else, and replace you." },
  { keyword: '追求', sentence: "Specific knowledge is found by pursuing your genuine curiosity and passion rather than whatever is hot right now." },
  { keyword: '玩耍', sentence: "Building specific knowledge will feel like play to you but will look like work to others." },
  { keyword: '学徒', sentence: "When specific knowledge is taught, it's through apprenticeships, not schools." },
  { keyword: '创造', sentence: "Specific knowledge is often highly technical or creative. It cannot be outsourced or automated." },
  { keyword: '责任', sentence: "Embrace accountability, and take business risks under your own name. Society will reward you with responsibility, equity, and leverage." },
  { keyword: '风险', sentence: "The most accountable people have singular, public, and risky brands: Oprah, Trump, Kanye, Elon." },
  { keyword: '支点', sentence: "\"Give me a lever long enough, and a place to stand, and I will move the earth.\"  - Archimedes" },
  { keyword: '杠杆', sentence: "Fortunes require leverage. Business leverage comes from capital, people, and products with no marginal cost of replication (code and media)." },
  { keyword: '资本', sentence: "Capital means money. To raise money, apply your specific knowledge, with accountability, and show resulting good judgment." },
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
      event.preventDefault(); // Prevent default behavior
      const correctSentence = data[index].sentence;
      setFeedbackMessage(`正确句子: ${correctSentence}`); // Set feedback message
    } else if (event.key === ']') {
      event.preventDefault(); // Prevent default behavior
      handleNextPage();
    } else if (event.key === '[') {
      event.preventDefault(); // Prevent default behavior
      handlePrevPage(); // Corrected to handlePrevPage
    }
  };

  const currentItems = data.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  return (
    <div>
      <h1 style={{ marginTop: '60px' }}>记忆纳瓦尔的句子</h1>
      {feedbackMessage && <div style={{ position: 'fixed', top: '0px', width: '100%', backgroundColor: 'yellow', zIndex: 1000 }}><p>{feedbackMessage}</p></div>} {/* Adjusted top position */}
      {currentItems.map((item, index) => (
          <div key={index}>
          <p>{item.keyword}</p>
          <textarea
            type="text"
            placeholder="默写英文句子..."
            value={userInputs[currentPage * itemsPerPage + index]}
            onChange={(e) => handleInputChange(currentPage * itemsPerPage + index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(currentPage * itemsPerPage + index, e)}
            style={{ fontSize: '18px', width: '80%', height: '150px' }} // Increased font size and textarea dimensions
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
