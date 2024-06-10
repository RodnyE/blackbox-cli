
const questionCommand = require('./cli/question.js');
const watcherCommand = require('./cli/watcher.js');

const arg = process.argv[2];

/**
 * Main activity
 */
const main = () => {
  if (arg === '-w' || arg === '--watch') {
    watcherCommand();
    return;
  }
  
  questionCommand();
}

main();