import React, { useState } from 'react';
// import {speakText} from './Speech';
import {speakText} from './AzureTextToSpeech';

const data = [
  {
    id: 1, keyword: '财富', sentence: 'Seek wealth, not money or status. Wealth is having assets that earn while you sleep. Money is how we transfer time and wealth. Status is your place in the social hierarchy.',
    chinese: '追求财富，而不是金钱或地位。财富是拥有在你睡觉时赚钱的资产。金钱是我们转移时间和财富的方式。地位是你在社会等级中的位置。'
  },
  {
    id: 2, keyword: '道德', sentence: 'Understand that ethical wealth creation is possible. If you secretly despise wealth, it will elude you.',
    chinese: '理解道德财富创造是可能的。如果你秘密地鄙视财富，它将会避开你。'
  },
  {
    id: 3, keyword: '忽视', sentence: 'Ignore people playing status games. They gain status by attacking people playing wealth creation games.',
    chinese: '忽视玩地位游戏的人们。他们通过攻击玩财富创造游戏的人来获得地位。'
  },
  {
    id: 4, keyword: '资产', sentence: 'You\'re not going to get rich renting out your time. You must own equity - a piece of a business - to gain your financial freedom.',
    chinese: '你不会通过出租时间变得富有。你必须拥有股权——一家企业的一部分——以获得财务自由。'
  },
  {
    id: 5, keyword: '需求', sentence: 'You will get rich by giving society what it wants but does not yet know how to get. At scale.',
    chinese: '你将通过给予社会想要但还不知道如何得到的东西变得富有。在规模上。'
  },
  {
    id: 6, keyword: '行业', sentence: 'Pick an industry where you can play long term games with long term people.',
    chinese: '选择一个你可以与长期的人一起玩长期游戏的行业。'
  },
  {
    id: 7, keyword: '互联网', sentence: 'The Internet has massively broadened the possible space of careers. Most people haven\'t figured this out yet.',
    chinese: '互联网已经大大扩展了职业可能的空间。大多数人还没有弄明白这点。'
  },
  {
    id: 8, keyword: '复利', sentence: 'Play iterated games. All the returns in life, whether in wealth, relationships, or knowledge, come from compound interest.',
    chinese: '玩迭代游戏。生命中所有的回报，无论是财富、关系还是知识，都来自复利。'
  },
  {
    id: 9, keyword: '正直', sentence: 'Pick business partners with high intelligence, energy, and, above all, integrity.',
    chinese: '选择具有高智商、能量和最重要的正直的商业合作伙伴。'
  },
  {
    id: 10, keyword: '犬儒', sentence: "Don't partner with cynics and pessimists. Their beliefs are self-fulfilling.",
    chinese: '不要与犬儒和悲观者合作。他们的信仰是自我实现的。'
  },
  {
    id: 11, keyword: '学习', sentence: "Learn to sell. Learn to build. If you can do both, you will be unstoppable.",
    chinese: '学习销售。学习建设。如果你能做到这两点，你将是不可阻挡的。'
  },
  {
    id: 12, keyword: '武装', sentence: "Arm yourself with specific knowledge, accountability, and leverage.",
    chinese: '武装自己具备特定知识、责任感和杠杆。'
  },
  {
    id: 13, keyword: '独特', sentence: "Specific knowledge is knowledge that you cannot be trained for. If society can train you, it can train someone else, and replace you.",
    chinese: '特定知识是你不能被训练的知识。如果社会能训练你，它也能训练别人，并取代你。'
  },
  {
    id: 14, keyword: '追求', sentence: "Specific knowledge is found by pursuing your genuine curiosity and passion rather than whatever is hot right now.",
    chinese: '特定知识是通过追求你真正的好奇和热情，而不是当前流行的任何事物。'
  },
  {
    id: 15, keyword: '玩耍', sentence: "Building specific knowledge will feel like play to you but will look like work to others.",
    chinese: '建立特定知识对你来说会像游戏一样，但对他人来说会像工作一样。'
  },
  {
    id: 16, keyword: '学徒', sentence: "When specific knowledge is taught, it's through apprenticeships, not schools.",
    chinese: '当特定知识被教授时，是通过学徒制，而不是学校。'
  },
  {
    id: 17, keyword: '创造', sentence: "Specific knowledge is often highly technical or creative. It cannot be outsourced or automated.",
    chinese: '特定知识通常是高度技术化或创造性的。它不能被外包或自动化。'
  },
  {
    id: 18, keyword: '责任', sentence: "Embrace accountability, and take business risks under your own name. Society will reward you with responsibility, equity, and leverage.",
    chinese: '拥抱责任感，并以自己的名字承担商业风险。社会将以责任感、股权和杠杆回报你。'
  },
  {
    id: 19, keyword: '风险', sentence: "The most accountable people have singular, public, and risky brands: Oprah, Trump, Kanye, Elon.",
    chinese: '最负责任的人拥有单一的、公开的和有风险的品牌：奥普拉、特朗普、卡内、埃隆。'
  },
  {
    id: 20, keyword: '支点', sentence: "\"Give me a lever long enough, and a place to stand, and I will move the earth.\"  - Archimedes",
    chinese: '「给我一个足够长的杠杆和一个站立的地方，我将会移动地球。\"  - 阿基米德'
  },
  {
    id: 21, keyword: '杠杆', sentence: "Fortunes require leverage. Business leverage comes from capital, people, and products with no marginal cost of replication (code and media).",
    chinese: '财富需要杠杆。商业杠杆来自于资本、人力和复制边际成本为零的产品（代码和媒体）。'
  },
  {
    id: 22, keyword: '资本', sentence: "Capital means money. To raise money, apply your specific knowledge, with accountability, and show resulting good judgement.",
    chinese: '资本意味着金钱。要筹集资金，应用你的特定知识，带有责任感，并展示出好的判断力。'
  },
  {
    id: 23, keyword: '劳动', sentence: "Labor means people working for you. It's the oldest and most fought-over form of leverage. Labor leverage will impress your parents, but don't waste your life chasing it.",
    chinese: '劳动意味着为你工作的人。这是最古老和最激烈争夺的杠杆形式之一。劳动杠杆会让你的父母印象深刻，但不要浪费生命追求它。'
  },
  {
    id: 24, keyword: '授权', sentence: "Capital and labor are permissioned leverage. Everyone is chasing capital, but someone has to give it to you. Everyone is trying to lead, but someone has to follow you.",
    chinese: '资本和劳动是授权的杠杆。每个人都在追求资本，但有人必须给你。每个人都想领导，但有人必须跟随你。'
  },
  {
    id: 25, keyword: '未授权', sentence: "Code and media are permissionless leverage. They're the leverage behind the newly rich. You can create software and media that works for you while you sleep.",
    chinese: '代码和媒体是无需授权的杠杆。它们是新富阶层背后的杠杆。你可以创建在你睡觉时为你工作的软件和媒体。'
  },
  {
    id: 26, keyword: '机器人', sentence: "An army of robots is freely available - it's just packed in data centers for heat and space efficiency. Use it.",
    chinese: '一支机器人军队是免费提供的——只是为了数据中心的热效率和空间效率而被打包。使用它。'
  },
  {
    id: 27, keyword: '写书', sentence: "If you can't code, write books and blogs, record videos and podcasts.",
    chinese: '如果你不能编码，写书和博客，录制视频和播客。'
  },
  {
    id: 28, keyword: '倍增', sentence: "Leverage is a force multiplier for your judgement.",
    chinese: '杠杆是你判断力的倍增器。'
  },
  {
    id: 29, keyword: '判断', sentence: "Judgement requires experience but can be built faster by learning foundational skills.",
    chinese: '判断需要经验，但可以通过学习基础技能更快地建立。'
  },
  {
    id: 30, keyword: '商业', sentence: "There is no skill called \"business\". Avoid business magazines and business classes.",
    chinese: '没有叫做「商业」的技能。避免商业杂志和商业课程。'
  },
  {
    id: 31, keyword: '学习', sentence: "Study microeconomics, game theory, psychology, persuasion, ethics, mathematics, and computers.",
    chinese: '学习微观经济学、博弈论、心理学、说服术、伦理学、数学和计算机。'
  },
  {
    id: 32, keyword: '做事', sentence: "Reading is faster than listening. Doing is faster than watching.",
    chinese: '阅读比听力更快。做事比观看更快。'
  },
  {
    id: 33, keyword: '日程', sentence: "You should be too busy to \"do coffee\" while still keeping an uncluttered calendar.",
    chinese: '你应该太忙了，不会有时间「喝咖啡」，同时还能保持一个不混乱的日程。'
  },
  {
    id: 34, keyword: '外包', sentence: "Set and enforce an aspirational personal hourly rate. If fixing a problem will save less than your hourly rate, ignore it. If outsourcing a task will cost less than your hourly rate, outsource it.",
    chinese: '设定并执行一个理想的个人小时工资。如果解决一个问题将会比你的小时工资少，忽视它。如果外包一项任务将会比你的小时工资少，外包它。'
  },
  {
    id: 35, keyword: '努力', sentence: "Work as hard as you can. Even though who you work with and what you work on are more important than how hard you work.",
    chinese: '尽你所能地工作。即使你与谁一起工作和你工作的内容比你工作的努力程度更重要。'
  },
  {
    id: 36, keyword: '最好', sentence: "Become the best in the world at what you do. Keep redefining what you do until this is true.",
    chinese: '在你所做的事情上成为世界最好的人。继续重新定义你所做的事情，直到这成为真实。'
  },
  {
    id: 37, keyword: '速成', sentence: "There are no get-rich-quick schemes. Those are just someone else getting rich off you.",
    chinese: '没有速成致富的方案。那些只是别人通过你致富。'
  },
  {
    id: 38, keyword: '专长', sentence: "Apply specific knowledge, with leverage, and eventually you will get what you deserve.",
    chinese: '应用特定知识，带有杠杆，最终你将得到你应得的。'
  },
  {
    id: 39, keyword: '最终', sentence: "When you're finally wealthy, you'll realize it wasn't what you were seeking in the first place. But that is for another day.",
    chinese: '当你最终富有时，你会意识到这不是你最初寻找的东西。但那是另一个日子的事。'
  },
  {
    id: 40, keyword: '总结 ', sentence: "Summary: Productize Yourself",
    chinese: '总结：产品化自己'
  },
  // 添加更多句子
];

const MemoryApp = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [userInputs, setUserInputs] = useState(Array(data.length).fill(''));
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const itemsPerPage = 5;

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
    console.log('--->', id);
    const storedCounts = JSON.parse(localStorage.getItem('idCounts')) || {};
    storedCounts[id] = (storedCounts[id] || 0) + 1;
    localStorage.setItem('idCounts', JSON.stringify(storedCounts));
  };
  
  const handleInputChange = (index, value) => {
    console.log('index:', index);
    if (value == data[index].sentence) {
      // console.log('--->u', userInputs);
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
      speakText(data[index].sentence);
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
  
  return (
    <div>
      <h1 style={{ marginTop: '60px' }}>纳瓦尔：如何不靠运气致富</h1>
      {currentItems.map((item, index) => (      
        <div key={index} style={{ margin: '20px' }}>
          <p>{item.id} . {item.chinese} 正确次数：{storedCounts[item.id] || 0} </p>
           { (feedbackMessage && item.sentence == feedbackMessage) ? 
           <div style={{ width: '60%', margin: 'auto', fontSize: '22px' }} >
             {feedbackMessage}</div> 
             : ''}        
          <div style={{ width: '60%', margin: 'auto', fontSize: '22px' }}>
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
            onChange={(e) => handleInputChange(currentPage * itemsPerPage + index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(currentPage * itemsPerPage + index, e)}
            style={{ margin: '20px', fontSize: '22px', width: '80%', height: '80px' }} // Increased font size and textarea dimensions
          />

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
