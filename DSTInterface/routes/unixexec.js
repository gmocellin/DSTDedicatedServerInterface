var sys = require('sys')
var exec = require('child_process').exec;
var child;

// executes `pwd`
exec('pwd', (error, stdout, stderr) => {
  if (error) {
    console.error('exec error: ${error}');
    return;
  }
  console.log('stdout: ${stdout}');
  console.log('stderr: ${stderr}');
});
