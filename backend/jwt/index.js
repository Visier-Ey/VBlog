const jwt = require('jsonwebtoken');

const secretKey = 'hahahahaha';
const tokenExpiration = '12h';


const generateJWT = (user) => {
    return jwt.sign({account:user.account,password:user.password}, secretKey, {expiresIn: tokenExpiration});
};

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.sendStatus(401);
    }
    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
};


const jwtMiddleware = (req, res, next) => {

    const shouldAuthenticate = req.path === '/visitors/profile';

    if (shouldAuthenticate) {
        return authenticateJWT(req, res, next);
    }
    next();
};

module.exports = {secretKey, generateJWT, authenticateJWT, jwtMiddleware};