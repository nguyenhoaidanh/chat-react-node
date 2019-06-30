/* eslint-disable */
var exec = require('child_process').exec;

exec('node -v', function (err, stdout) {
  if (err) throw err;

  if (parseFloat(stdout.slice(1)) < 4) {
    throw new Error('ZJS Framework requires node 6.0 or greater.');
  } else {
    console.log('ZJS Framework start installation ...')
  }
});
