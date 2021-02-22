const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml');
const DocGenPolicy = require('./DocGenPolicy')
const { ArgumentParser } = require('argparse');
const { stringify } = require('querystring');
// 读取命令行参数
const parser = new ArgumentParser({
    description: 'Argparse example'
});
parser.add_argument('-f', '--file', { type: 'string', help: 'config file path' });
// 获取配置文件数据
let configFilePath = parser.parse_args().file ? parser.parse_args().file : 'config.yml'
let config 
try {
    config = yaml.load(fs.readFileSync(configFilePath, 'utf8'));
    config.exclude = config.exclude ? config.exclude : []
} catch (e) {
     console.log(e);
}

DocGenPolicy.clearLocalDoc()//每次运行都删除之前的本地文档
let docGenPolicy = new DocGenPolicy(config.api_key, config.api_token, config.server)

function scanFiles(relativePath) {
    let files = fs.readdirSync(relativePath);
    files.forEach(file => {
        let fPath = path.join(relativePath, file)
        let stat = fs.statSync(fPath)

        // 检测需要忽略的文件
        if (config.exclude.indexOf(file) !== -1) return

        //如果是目录则继续递归扫描
        if (stat.isDirectory()) {
            scanFiles(fPath)
            return
        }
        console.log('正在解析'+file+'文件');
        docGenPolicy._generator(fPath)
    })

}
scanFiles(config.path)


