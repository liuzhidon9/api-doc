const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml');
const DocGenerator = require('./DocGenerator')
const { ArgumentParser } = require('argparse');

// 读取命令行参数
const parser = new ArgumentParser({
    description: 'Argparse example'
});
parser.add_argument('-f', '--file', { type: 'string', help: 'config file path' });
// 获取配置文件数据
let configFilePath = parser.parse_args().file ? parser.parse_args().file : 'config.yml'
let config
try {
    config = yaml.load(fs.readFileSync(path.resolve(process.cwd(), configFilePath), 'utf8'));
    config.exclude = config.exclude ? config.exclude : []
    config.output = config.output ? config.output : './api-doc'
} catch (e) {
    console.log(e);
}
//每次运行都删除之前的本地文档
// if (fs.existsSync(config.output)) {
//     fs.rmdirSync(config.output, { recursive: true })
// }

let docGenerator = new DocGenerator(config.api_key, config.api_token, config.server, config.output)
class ApiDoc {
    constructor(dirPath) {
        this.dirPath = dirPath

    }
    scanFilesSync(dirPath) {
        let filePathArr = []
        function recursiveScan(dirPath) {
            let files = fs.readdirSync(dirPath);
            files.forEach(file => {
                let fPath = path.join(dirPath, file)
                let stat = fs.statSync(fPath)

                // 检测需要忽略的文件
                if (config.exclude.indexOf(file) !== -1) return

                //如果是目录则继续递归扫描
                if (stat.isDirectory()) {
                    recursiveScan(fPath)
                    return
                }
                console.log('正在扫描' + file + '文件');
                filePathArr.push(fPath)
            })
        }
        recursiveScan(dirPath)
        console.log('=====================================扫描完成！=====================================');
        return filePathArr
    }
    async start() {
        let filePathArr = this.scanFilesSync(this.dirPath)
        for (const filePath of filePathArr) {
            await docGenerator.generateByFile(filePath)
        }
        console.log('更新完毕！');

    }
}

new ApiDoc(config.path).start()

