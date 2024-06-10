
const axios = require('axios');
const { getConfig } = require('./store.js');
const { prompt } = require('../utils/prompt.js');
const blackboxApiUrl = 'https://www.blackbox.ai/api/chat';

/**
 * 
 */
const sendQuestion = async (question) => {
  const store = await getConfig();
  
  const data = {
    messages: [{
      id: store.chatId,
      content: question,
      role: 'user'
    }],
    id: store.chatId,
    previewToken: null,
    userId: store.userId,
    codeModelMode: true,
    agentMode: {},
    trendingAgentMode: {},
    isMicMode: false,
    isChromeExt: false,
    githubToken: null
  };

  const headers = {
    'Content-Type': 'application/json',
    Referer: 'https://www.blackbox.ai/'
  };

  try {
    const response = await axios.post(blackboxApiUrl, data, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

module.exports = {
  sendQuestion,
}; 