const jwt = require('jsonwebtoken')

const authenticate = (req, res, next)=> {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if(!token){
            return res.status(400).json({message: 'Please login first..!!!'})
        }
    
        let decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded
        next();
    
    } catch (err) {
        return res.status(400).json({message: 'Invalid Token'})
    }
}

module.exports = authenticate;