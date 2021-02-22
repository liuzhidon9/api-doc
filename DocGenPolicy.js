const fs = require('fs')
const path = require('path')
const axios = require('axios');
const {
    descriptionTemplate,
    urlTemplate,
    methodTemplate,
    headerParamTemplate,
    jsonRequestTemplate,
    jsonReturnTemplate,
    requestParamTemplate,
    returnParamTemplate,
    errorCodeTemplate,
    remarkTemplate,
} = require("./util")

const jsonFormat = require('json-format')
// formatJsonStr 格式化json字符串
function formatJsonStr(jsonStr) {
    let json = JSON.parse(jsonStr)
    let formatJson = jsonFormat(json)
    return formatJson
}

class DocGenPolicy {
    constructor(api_key, api_token, server) {
        this.api_key = api_key
        this.api_token = api_token
        this.server = server
        this.cat_name = ''
        this.page_title = ''
        this.page_content = ''
        this.s_number = 0
        this.templates = []
    }
    catalog(paramArr) {
        this.cat_name = paramArr[1]

    }
    title(paramArr) {
        this.page_title = paramArr[1]
    }
    number(paramArr) {
        this.s_number = paramArr[1]
    }
    description(paramArr) {
        let des = paramArr[1]
        if (!this.templates.descriptionTemplate) {
            this.templates.descriptionTemplate = descriptionTemplate
        }
        this.templates.descriptionTemplate.set(des)
    }
    url(paramArr) {
        let des = paramArr[1]
        if (!this.templates.urlTemplate) {
            this.templates.urlTemplate = urlTemplate
        }
        this.templates.urlTemplate.set(des)
    }
    method(paramArr) {
        let des = paramArr[1]
        if (!this.templates.methodTemplate) {
            this.templates.methodTemplate = methodTemplate
        }
        this.templates.methodTemplate.set(des)
    }
    header(paramArr) {
        let name = paramArr[1]
        let require = paramArr[2]
        let type = paramArr[3]
        let description = paramArr[4]
        if (!this.templates.headerParamTemplate) {
            this.templates.headerParamTemplate = headerParamTemplate
        }
        this.templates.headerParamTemplate.set(name, require, type, description)
    }
    param(paramArr) {
        let name = paramArr[1]
        let require = paramArr[2]
        let type = paramArr[3]
        let description = paramArr[4]
        if (!this.templates.requestParamTemplate) {
            this.templates.requestParamTemplate = requestParamTemplate
        }
        this.templates.requestParamTemplate.set(name, require, type, description)
    }
    json_param(paramArr) {
        let jsonStr = paramArr[1]
        let json = formatJsonStr(jsonStr)
        if (!this.templates.jsonRequestTemplate) {
            this.templates.jsonRequestTemplate = jsonRequestTemplate
        }
        this.templates.jsonRequestTemplate.set(json)
    }
    return(paramArr) {
        let jsonStr = paramArr[1]
        let json = formatJsonStr(jsonStr)
        if (!this.templates.jsonReturnTemplate) {
            this.templates.jsonReturnTemplate = jsonReturnTemplate
        }
        this.templates.jsonReturnTemplate.set(json)
    }
    return_param(paramArr) {
        let name = paramArr[1]
        let type = paramArr[2]
        let description = paramArr[3]
        if (!this.templates.returnParamTemplate) {
            this.templates.returnParamTemplate = returnParamTemplate
        }
        this.templates.returnParamTemplate.set(name, type, description)
    }
    error_code(paramArr) {
        let code = paramArr[1]
        let des = paramArr[2]
        if (!this.templates.errorCodeTemplate) {
            this.templates.errorCodeTemplate = errorCodeTemplate
        }
        this.templates.errorCodeTemplate.set(code, des)
    }
    remark(paramArr) {
        let remark = paramArr[1]
        if (!this.templates.remarkTemplate) {
            this.templates.remarkTemplate = remarkTemplate
        }
        this.templates.remarkTemplate.set(remark)
    }
    //删除本地文档
    static clearLocalDoc() {
        if (fs.existsSync('api-doc')) {
            fs.rmdirSync('api-doc', { recursive: true })
        }
    }
    // 更新线上文档
    _updateOnlineDoc(page_title) {
        console.log(`正在更新线上文档：${page_title}`);
        axios.post(this.server, {
            api_key: this.api_key,
            api_token: this.api_token,
            cat_name: this.cat_name,
            page_title: this.page_title,
            page_content: this.page_content,
            s_number: this.s_number
        }).then(res => {
            if (res.data.error_code !== 0) { console.log(`线上文档：${page_title}>更新失败`); return }
            console.log(`线上文档：${page_title}>更新成功！`);
        }).catch(error => {
            console.log(`线上文档：${page_title}>更新失败`, error.message);
        })
    }
    _generator(filePath) {
        let docReg = /[/][*]{2}\s*api-doc\s*(@.*\s{1,2})*[*][/]/img
        let lineReg = /@.*/img
        fs.readFile(filePath, (err, data) => {
            if (err) throw err
            let docArr = data.toString().match(docReg)
            // console.log('docArr', docArr);
            if (!docArr) return
            let sectionArr = []
            docArr.forEach(doc => {
                sectionArr.push(doc.match(lineReg))
            })
            // console.log('sectionArr', sectionArr);
            sectionArr.forEach(section => {
                let lineArr = []
                lineArr = section
                lineArr.forEach(line => {
                    let paramArr = []
                    paramArr = line.split(' ')
                    let policyName = paramArr[0].substr(1)
                    this[policyName](paramArr)
                })

                let dir = path.resolve(process.cwd(), `api-doc`, this.cat_name)
                let filePath = path.resolve(dir, this.page_title + '.md')
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir, { recursive: true })
                }
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath)
                }
                //遍历templates里的事件，通过它们的get方法可以获取到根据注释生成的文档
                for (const key in this.templates) {
                    fs.appendFileSync(path.resolve(process.cwd(),filePath), this.templates[key].get())
                    this.page_content += this.templates[key].get()
                    this.templates[key].clear()
                }
                this._updateOnlineDoc(this.page_title)
                this.page_content = null
                this.templates = {}
            })

        })
    }
}



module.exports = DocGenPolicy
