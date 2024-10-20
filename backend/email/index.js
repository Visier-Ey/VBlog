const nodemailer = require("nodemailer");
const serverBaseUrl = require('../config/index.js').serverBaseUrl;

let nodeMail = nodemailer.createTransport({
    service: 'qq',
    port: 465,
    secure: true,
    // 我们需要登录到网页邮箱中，然后配置SMTP和POP3服务器的密码
    auth: {
        user: '3146088404@qq.com',
        pass: 'turzquvwqsbtdcgj'  //这里是授权密码而不是邮件密码
    }
});

exports.sendVisitorApplication = async (email, other) => {
    const code = String(Math.floor(Math.random() * 1000000)).padEnd(6, '0');
    const mail = {
        from: `"浮生百态访客申请"<3146088404@qq.com>`,
        subject: 'Visitor Application',
        to: email,
        html: `  
            <form action="${serverBaseUrl}/visitors/register" method="post">
            <p>VisitorAccount:<input type="text" name="account" value="${other.account}"></p>
            <p>VisitorPassword:<input type="text" name="password" value="${other.password}"></p>
            <button type="submit">Approve</button>
            </form>       
            `
    };

    try {
        await new Promise((resolve, reject) => {
            nodeMail.sendMail(mail, (err, info) => {
                if (!err) {
                    resolve("Application send success");
                } else {
                    reject("Application send fail");
                }
            });
        });
        console.log("Application send success");
    } catch (error) {
        console.error(error);
    }
}