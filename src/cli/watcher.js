
const fs = require('fs');
const chokidar = require('chokidar');
const {sendQuestion} = require('../logic/send.js');

const watcherCommand = () => {
  const watcher = chokidar.watch(process.cwd(), {
    ignored: /node_modules/,
  });
  
  watcher.on('change', async (filepath) => {
    let file = fs.readFileSync(filepath, 'utf-8') + '';
    
    const commentPattern = /\/\*( |\n)*@ai ((.|\n)+?)\*\//;
    const codePattern = /```((.|\n)+)```/;
    const blackboxFlagsPattern = /\$\@\$(.+?)\$\@\$/g;
    let match;

    while ((match = commentPattern.exec(file)) !== null) { 
      console.log(match);
      let response = await sendQuestion(match[2]);
      
      let code;
      code = (code = codePattern.exec(response)) ? code[1] : '/* \n' + response + '\n */';
      
      file = file.replace(match[0], code.replace(blackboxFlagsPattern, '')); 
    } 
    
    fs.writeFileSync(filepath, file, 'utf-8');
  });
  
  console.log('\n( 0-0) Watching for ai files request...');
  console.log('( ◕‿◕) Write: \n\n```\n/* @ai This is my amazing question! */\n```\n\nin any part of your code and wait for the magic!');
}

module.exports = watcherCommand;