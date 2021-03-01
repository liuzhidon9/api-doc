## 自定义生成 Api 文档

`参考showdoc自动生成API文档：https://www.showdoc.com.cn/page/741656402509783`

`参考showdoc开放API：https://www.showdoc.com.cn/page/102098`

`showdoc官方：https://www.showdoc.com.cn/`

示例文件：test/api_demo.test

**运行示例：**

1. 进入 api-doc 目录下新建`config.yml`文件并复制以下配置信息到该文件：
   ```
   api_key: 4025902843df692d915d8d8881510800626236123
   api_token: c25c76a189126be16c3f2663505d5b2f1663873956
   server: https://www.showdoc.cc/server/api/item/updateByApi
   path: ./test
   output: ./api-doc
   exclude:
    - node_modules
   ```

2. `打开终端运行`

    ```
    npm install

    npm run start
    ```

**配置文件说明：**
`./config.yml，也可以通过运行app.js文件的时候指定配置文件路径,例如：node app.js -f ./xx/conf.yml`

| 参数名    | 必选 | 类型   | 说明                                                                                       |
| :-------- | :--- | :----- | ------------------------------------------------------------------------------------------ |
| api_key   | 否   | string | api_key，认证凭证。登录 showdoc，进入具体项目后，点击右上角的”项目设置”-“开放 API”便可看到 |
| api_token | 否   | string | 同上                                                                                       |
| server    | 否   | string | showdoc 服务器地址                                                                         |
| path      | 是   | string | 文件扫描的绝对或相对路径                                                                         |
| output    | 否   | string | 在本地生成文档的绝对或相对路径，默认在 ./api-doc 目录下生成                                      |
| exclude   | 否   | arrary | 需要要忽略的文件夹或文件                                                                   |

> ps：如果需要使用showdoc提供的线上文档管理服务，则api_key、api_token、server这三个参数是必填的。

**语法说明 ：**

```
/**
    api-doc
    @catalog 测试文档/用户相关
    @title 用户登录
    @description 用户登录的接口
    @method get
    @url https://www.showdoc.cc/home/user/login
    @header token 可选 string 设备token
    @param username 必选 string 用户名
    @param password 必选 string 密码
    @param name 可选 string 用户昵称
    @return {"error_code":0,"data":{"uid":"1",  "username":"12154545","name":"吴系挂","groupid":2,    "reg_time":"1436864169","last_login_time":"0"}}
    @return_param groupid int 用户组id
    @return_param name string 用户昵称
    @remark 这里是备注信息
    @error_code 10000 success
    @number 99
*/
```

| 关键字        | 说明                                                                                                                                 |
| :------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| @catalog      | 生成文档要放到哪个目录。如果只是二级目录，则直接写目录名字。如果是三级目录，而需要写二级目录/三级目录，即用/隔开。如”一层/二层/三层” |
| @title        | 表示生成的文档标题                                                                                                                   |
| @description  | 是文档内容中对接口的描述信息                                                                                                         |
| @method       | 接口请求方式。一般是 get 或者 post                                                                                                   |
| @url          | 接口 URL。不要在 URL 中使用&符号来传递参数。传递参数请写在参数表格中                                                                 |
| @header       | 可选。header 说明。一行注释对应着表格的一行。用空格或者 tab 符号来隔开每一列信息。                                                   |
| @param        | 参数表格说明。一行注释对应着表格的一行。用空格或者 tab 符号来隔开每一列信息。                                                        |
| @json_param   | 可选。当请求参数是 json 的时候，可增加此标签。请把 json 内容压缩在同一行内，注意：json 内容不能有注释                                |
| @return       | 返回内容。请把返回内容压缩在同一行内。如果是 json，程序会自动进行格式化展示。 如果是非 json 内容，则原样展示。                       |
| @return_param | 返回参数的表格说明。一行注释对应着表格的一行。用空格或者 tab 符号来隔开每一列信息。                                                  |
| @remark       | 备注信息                                                                                                                             |
| @error_code   | 错误码，一行注释对应着表格的一行，用空格来隔开每一列信息。                                                                           |
| @number       | 可选。文档的序号。                                                                                                                   |
