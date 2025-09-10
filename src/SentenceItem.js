import React from 'react';

const commonStyle = {
  fontSize: '22px',
  width: '80%',
  margin: 'auto',
  textAlign: 'left',
  wordSpacing: 'normal',
  fontFamily: 'monospace',
};

const correctCountStyle = { fontSize: '24px' };

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

const favoriteButtonStyle = {
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
  fontSize: '1.6em',
  marginLeft: '12px',
  verticalAlign: 'middle',
  userSelect: 'none',
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
  favorite,
  onFavoriteClick,
  onFocus,
  onBlur,
  textareaRef,
  showChinese = true,
}) {
  const isCorrect = userInput === item.sentence;
  const showFeedback = feedbackMessage && item.sentence === feedbackMessage;

  let cardBorder = '#e0e7ef';
  if (isCorrect) cardBorder = '#22c55e';
  else if (isFocused) cardBorder = '#2563eb';
  else if (userInput && !isCorrect) cardBorder = '#ef4444';

  const dynamicStyle = {
    ...itemContainerStyle,
    border: `2.5px solid ${cardBorder}`,
    boxShadow: isFocused ? '0 4px 16px rgba(37,99,235,0.13)' : itemContainerStyle.boxShadow,
  };

  return (
    <div style={dynamicStyle}>
      <p style={{ fontSize: '20px' }}>
        {item.id} . {showChinese ? item.chinese : (item.keyword || item.chinese)}
        <span style={correctCountStyle}> 正确次数：{correctCount}</span>
        <button
          style={{
            ...buttonStyle,
            ...favoriteButtonStyle,
            color: favorite ? '#facc15' : '#aaa',
            outline: 'none',
            padding: '2px 12px',
            fontSize: '1.1em',
            marginLeft: '12px',
            marginRight: 0,
            background: 'transparent',
            border: 'none',
          }}
          onClick={onFavoriteClick}
          aria-label={favorite ? '取消收藏' : '收藏'}
          title={favorite ? '取消收藏' : '收藏'}
        >
          {favorite ? '取消收藏' : '收  藏'}
        </button>
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
        disabled={userInput === item.sentence}
        ref={textareaRef}
      />
      <div style={{ margin: '20px', color: isSpeaking ? 'green' : 'black' }}>
        {isSpeaking && isFocused ? 'Sending request...' : ''}
      </div>
      {isCorrect && <p style={{ color: 'green' }}>Correct!</p>}
    </div>
  );
}

export default SentenceItem;