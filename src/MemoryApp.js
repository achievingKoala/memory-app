import React, { useState } from 'react';

// { keyword: '努力', sentence: 'Hard work is the key to achieving your goals.' },
const data = [
  { id: 1, keyword: '财富', sentence: 'Seek wealth, not money or status. Wealth is having assets that earn while you sleep. Money is how we transfer time and wealth. Status is your place in the social hierarchy.' },
  { id: 2, keyword: '道德', sentence: 'Understand that ethical wealth creation is possible. If you secretly despise wealth, it will elude you.' },
  { id: 3, keyword: '忽视', sentence: 'Ignore people playing status games. They gain status by attacking people playing wealth creation games.' },
  { id: 4, keyword: '资产', sentence: 'You\'re not going to get rich renting out your time. You must own equity - a piece of a business - to gain your financial freedom.' },
  { id: 5, keyword: '需求', sentence: 'You will get rich by giving society what it wants but does not yet know how to get. At scale.' },
  { id: 6, keyword: '行业', sentence: 'Pick an industry where you can play long term games with long term people.' },
  { id: 7, keyword: '互联网', sentence: 'The Internet has massively broadened the possible space of careers. Most people haven\'t figured this out yet.' },
  { id: 8, keyword: '复利', sentence: 'Play iterated games. All the returns in life, whether in wealth, relationships, or knowledge, come from compound interest.' },
  { id: 9, keyword: '正直', sentence: 'Pick business partners with high intelligence, energy, and, above all, integrity.' },
  { id: 10, keyword: '犬儒', sentence: "Don't partner with cynics and pessimists. Their beliefs are self-fulfilling." },
  { id: 11, keyword: '学习', sentence: "Learn to sell. Learn to build. If you can do both, you will be unstoppable." },
  { id: 12, keyword: '武装', sentence: "Arm yourself with specific knowledge, accountability, and leverage." },
  { id: 13, keyword: '独特', sentence: "Specific knowledge is knowledge that you cannot be trained for. If society can train you, it can train someone else, and replace you." },
  { id: 14, keyword: '追求', sentence: "Specific knowledge is found by pursuing your genuine curiosity and passion rather than whatever is hot right now." },
  { id: 15, keyword: '玩耍', sentence: "Building specific knowledge will feel like play to you but will look like work to others." },
  { id: 16, keyword: '学徒', sentence: "When specific knowledge is taught, it's through apprenticeships, not schools." },
  { id: 17, keyword: '创造', sentence: "Specific knowledge is often highly technical or creative. It cannot be outsourced or automated." },
  { id: 18, keyword: '责任', sentence: "Embrace accountability, and take business risks under your own name. Society will reward you with responsibility, equity, and leverage." },
  { id: 19, keyword: '风险', sentence: "The most accountable people have singular, public, and risky brands: Oprah, Trump, Kanye, Elon." },
  { id: 20, keyword: '支点', sentence: "\"Give me a lever long enough, and a place to stand, and I will move the earth.\"  - Archimedes" },
  { id: 21, keyword: '杠杆', sentence: "Fortunes require leverage. Business leverage comes from capital, people, and products with no marginal cost of replication (code and media)." },
  { id: 22, keyword: '资本', sentence: "Capital means money. To raise money, apply your specific knowledge, with accountability, and show resulting good judgment." },
  { id: 23, keyword: '劳动', sentence: "Labor means people working for you. It's the oldest and most fought-over form of leverage. Labor leverage will impress your parents, but don’t waste your life chasing it." },
  { id: 24, keyword: '授权', sentence: "Capital and labor are permissioned leverage. Everyone is chasing capital, but someone has to give it to you. Everyone is trying to lead, but someone has to follow you." },
  { id: 25, keyword: '未授权', sentence: "Code and media are permissionless leverage. They're the leverage behind the newly rich. You can create software and media that works for you while you sleep." },
  { id: 26, keyword: '机器人', sentence: "An army of robots is freely available - it's just packed in data centers for heat and space efficiency. Use it." },
  { id: 27, keyword: '写书', sentence: "If you can't code, write books and blogs, record videos and podcasts." },
  { id: 28, keyword: '倍增', sentence: "Leverage is a force multiplier for your judgement." },
  { id: 29, keyword: '判断', sentence: "Judgment requires experience but can be built faster by learning foundational skills." },
  { id: 30, keyword: '商业', sentence: "There is no skill called \"business.\" Avoid business magazines and business classes." },
  { id: 31, keyword: '学习', sentence: "Study microeconomics, game theory, psychology, persuasion, ethics, mathematics, and computers." },
  { id: 32, keyword: '做事', sentence: "Reading is faster than listening. Doing is faster than watching." },
  { id: 33, keyword: '日程', sentence: "You should be too busy to \"do coffee\" while still keeping an uncluttered calendar." },
  { id: 34, keyword: '外包', sentence: "Set and enforce an aspirational personal hourly rate. If fixing a problem will save less than your hourly rate, ignore it. If outsourcing a task will cost less than your hourly rate, outsource it." },
  { id: 35, keyword: '努力', sentence: "Work as hard as you can. Even though who you work with and what you work on are more important than how hard you work." },
  { id: 36, keyword: '最好', sentence: "Become the best in the world at what you do. Keep redefining what you do until this is true." },
  { id: 37, keyword: '速成', sentence: "There are no get-rich-quick schemes. Those are just someone else getting rich off you." },
  { id: 38, keyword: '专长', sentence: "Apply specific knowledge, with leverage, and eventually you will get what you deserve." },
  { id: 39, keyword: '最终', sentence: "When you're finally wealthy, you'll realize it wasn't what you were seeking in the first place. But that is for another day." },
  { id: 40, keyword: '总结 ', sentence: "Summary: Productize Yourself" },
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
      <h1 style={{ marginTop: '60px' }}>纳瓦尔宝典</h1>
      {feedbackMessage && <div>
        <p>{feedbackMessage}</p></div>} {/* Adjusted top position */}
      {currentItems.map((item, index) => (
        <div key={index}>
          <p>{item.id} . {item.keyword}</p>
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
