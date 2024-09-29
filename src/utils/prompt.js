
const readline = require('readline');

/**
 * 
 */
const prompt = (text) => {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.question(text, (answer) => {
      rl.close();
      resolve(answer);
    });
  })
}

module.exports = {
  prompt,
}