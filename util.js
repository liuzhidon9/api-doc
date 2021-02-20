const ulTemplateGen = function (title) {
    let template = `**${title}：** \n\r`
    let markdown = template
    return {
        set(description = '') {
            markdown += `- ${description}\n`
        },
        get() {
            if (markdown === template) return ''
            return markdown + '\r\n'
        },
        clear() {
            markdown = template
        }
    }
}

let jsonTemplateGen = function (title) {
    let template = `**${title}：** \n\r`
    let markdown = template
    return {
        set: function (json = '') {
            markdown += '```json\n' + json + '\n```\n'
        },
        get: function () {
            if (markdown === template) return ''
            return markdown + '\r\n'
        },
        clear() {
            markdown = template
        }
    }
}

let codeTemplateGen = function (title) {
    let template = `**${title}：** \n\r|Code|说明|\n|:---- |----- | \n`
    let markdown = template
    return {
        set: function (name, description = '') {

            let lineTemplate = `|${name} |${description}   | \n`
            markdown += lineTemplate
        },
        get: function () {
            if (markdown === template) return ''
            return markdown + '\r\n'
        },
        clear() {
            markdown = template
        }
    }
}
let paramTemplateGen = function (title) {
    let template = `**${title}：** \n\r|参数名|必选|类型|说明|\n|:---- |:---|:----- |----- | \n`
    let markdown = template
    return {
        set: function (name, require = '可选', type = '', description = '') {
            let lineTemplate = `|${name} |${require}  |${type} |${description}   | \n`
            markdown += lineTemplate
        },
        get: function () {
            if (markdown === template) return ''
            return markdown + '\r\n'
        },
        clear() {
            markdown = template
        }
    }
}
exports.requestParamTemplate = paramTemplateGen("请求参数说明")
exports.headerParamTemplate = paramTemplateGen("Header")
exports.descriptionTemplate = ulTemplateGen("简要描述")
exports.urlTemplate = ulTemplateGen("请求URL")
exports.methodTemplate = ulTemplateGen("请求方式")
exports.remarkTemplate = ulTemplateGen("备注")
exports.jsonRequestTemplate = jsonTemplateGen('请求示例')
exports.jsonReturnTemplate = jsonTemplateGen('返回示例')
exports.errorCodeTemplate = codeTemplateGen('错误码')
exports.returnParamTemplate = (function () {
    let template = `**返回参数说明：** \n\r|参数名|类型|说明|\n|:----|:----- |----- | \n`
    let markdown = template
    return {
        set: function (name, type = '', description = '') {
            let lineTemplate = `|${name} |${type} |${description}   | \n`
            markdown += lineTemplate
        },
        get: function () {
            if (markdown === template) return ''
            return markdown + '\r\n'
        },
        clear() {
            markdown = template
        }
    }
})()

// const fs = require('fs')

// if (fs.existsSync('./showdoc.md')) {
//     fs.unlinkSync('./showdoc.md');
// }
// let desTemplate = ulTemplateGen("简要描述")
// let urlTemplate = ulTemplateGen("请求URL")
// let methodTemplate = ulTemplateGen("请求方式")
// desTemplate.set("用户注册接口")
// urlTemplate.set("http://xx.com/api/user/register")
// methodTemplate.set("POST")
// console.log(desTemplate.get());
// console.log(urlTemplate.get());
// console.log(methodTemplate.get());
// fs.appendFileSync('showdoc.md', desTemplate.get())
// fs.appendFileSync('showdoc.md', urlTemplate.get())
// fs.appendFileSync('showdoc.md', methodTemplate.get())
// paramTemplate.set('username', '必选', 'string', '')
// paramTemplate.set('password', '必选', 'string', '')
// paramTemplate.set('token', '必选', 'string', '')
// paramTemplate.set('name')
// console.log(paramTemplate.get());
// fs.appendFileSync('showdoc.md', paramTemplate.get())
// let jsonParam = jsonTemplateGen('请求示例')
// let jsonReturn = jsonTemplateGen('返回示例')
// jsonParam.set('{"error_code":0,"data":{"uid":"1","username":"12154545","name":"吴系挂","groupid":2,"reg_time":"1436864169","last_login_time":"0"}}')
// jsonReturn.set('{"error_code":0,"data":{"uid":"1","username":"12154545","name":"吴系挂","groupid":2,"reg_time":"1436864169","last_login_time":"0"}}')
// console.log(jsonParam.get());
// console.log(jsonReturn.get());
// fs.appendFileSync('showdoc.md', jsonParam.get())
// fs.appendFileSync('showdoc.md', jsonReturn.get())
// returnParamTemplate.set('groupid', 'int', '用户组id，1：超级管理员；2：普通用户 ')
// console.log(returnParamTemplate.get());
// fs.appendFileSync('showdoc.md', returnParamTemplate.get())
// let errCodeTemplate = codeTemplateGen('错误码')
// errCodeTemplate.set('10000', 'success')
// console.log(errCodeTemplate.get());
// fs.appendFileSync('showdoc.md', errCodeTemplate.get())


