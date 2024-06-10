
const path = require('path');
const fs = require('fs');
const { prompt } = require('../utils/prompt.js');
const configFilePath = require('../../config.js').CONFIGJSON;

let store = null;

/** 
 * setup store
 */
const initConfig = async () => {
  // try read config file
  try { 
    const json = JSON.parse(
      fs.readFileSync(configFilePath, 'utf8')
    );
    store = {
      userId: json.userId,
      chatId: json.chatId,
    }
  } catch (err) {
    store = {
      userId: (await prompt('Insert your blackbox user id: ')).trim(),
      chatId: (await prompt('Insert your chat id (optional): ')).trim(),
    }
    if (!store.chatId) store.chatId = store.userId;
    fs.writeFileSync(configFilePath, JSON.stringify(store, null, 2));
  }
  
  return store;
}

/**
 * 
 */
const getConfig = async () => {
  if (!store) await initConfig();
  return store;
}

module.exports = {
  initConfig,
  getConfig,
}