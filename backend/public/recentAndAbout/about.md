# * FrameWork 😉

## ** 项目介绍

后端API已全部实现，可视化后台管理系统不打算开发，详细调用在GitHub中。本项目仅作为个人学习使用，不具备商用价值。 <br/>
本项目依赖 Nginx 作为反向代理，Express 作为后端服务，Mysql 作为数据库，Vue3+Vite 作为前端服务。<br/>
注:源码不包含Nginx部分,仅配置本地测试,如有需要Nginx请自行配置

## ** 依赖方面

后端使用bcryptjs对密码进行加密，使用jsonwebtoken生成token，使用express-jwt验证token，使用mysql操作数据库,
使用multer处理文件上传，使用cors解决跨域问题，<br/>
后端使用pm2守护进程，使用nodemon监听文件变化，使用morgan记录日
后端使用
<br/><br/>
前端使用axios请求后端API，使用pina管理状态,实际并没用到，使用vue-router进行路由管理，使用element-plus作为UI框架,实际基本手搓的,
使用marked解析markdown文件。

## ** 项目运行
### *** mysql 配置
数据结构已导出vblog.sql，导入即可。
请将具有相应权限的用户与数据库配置到backend目录下的config.js中
```javascript
module.exports = {
    mysql: {
        host: 'localhost',
        user:'',
        password:'',
        database:'',
    }
}
```

### *** 前后端 配置
若未安装node.js请先安装node.js <br/>
此后
分别进入backend目录和frontend目录使用命令
```shell
npm install
```

以安装依赖<br/>

### *** 本地测试
之后于
backend目录使用命令
```shell
pm2 start app.js
```
以守护进程的方式启用后端<br/>
进入frontend目录
使用命令
```shell
npm run dev
```
以启用前端<br/>