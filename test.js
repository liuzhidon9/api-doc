 
const { ArgumentParser } = require('argparse');
const { version } = require('./package.json');
 
const parser = new ArgumentParser({
  description: 'Argparse example'
});
 
parser.add_argument('-v', '--version', { action: 'version', version });
parser.add_argument('-f', '--file', { help: 'config file path' });
 
console.dir(parser.parse_args().file);