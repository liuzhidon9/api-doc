const jsonFormat = require('json-format')
function formatJsonStr(jsonStr) {
  let json = JSON.parse(jsonStr)
  let formatJson = jsonFormat(json)
  return formatJson
}
console.log(formatJsonStr('{ "phone_num": "13826031871" }'));