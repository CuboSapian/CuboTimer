var jwt = require('jsonwebtoken');
const tempKi = 'CuboTimer#Global';

const fetchuser = (req, res, next) => {
    // Get the user from JWT token 
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token!" })
    }
    try {
        const data = jwt.verify(token, tempKi);
        req.user = data.user;
        next();

    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token!" })
    }
}


module.exports = fetchuser;