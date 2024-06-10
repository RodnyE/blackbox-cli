
const readline = require('readline');
const {sendQuestion} = require('../logic/send.js');

/**
 * 
 */
const questionCommand = async () => {
 
  let input = process.argv[2] || '';

  if (input) {
    const response = await sendQuestion(input);
    if (!response) return process.exit(1);
    
    console.log(response);
    return process.exit(0);
  }
  
  console.log('\nWrite your question. Press Ctrl+D to finish...\n');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.setPrompt('> ');
  rl.prompt();
 
  rl.on('line', (line) => {
    if (rl.isClosed) return;
    input += line + '\n';
    rl.prompt();
  });
  
  rl.on('close', async () => {
    rl.isClosed = true;
    console.log('\n\nSending question, wait...');
    let response = await sendQuestion(input);
    if (!response) return process.exit(1);
    
    console.log(response);
    return process.exit(0);
  });

}

module.exports = questionCommand;