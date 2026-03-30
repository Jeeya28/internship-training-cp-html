const jwt = require('jsonwebtoken')

const authMiddleware = async (req, res, next) => {
    try{
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if(!token){
            return res.status(401).json({ 
                success: false,
                message: 'No token, Authorization denie' 
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    }catch(err){
        res.status(401).json({ 
            success: false,
            message: 'Unauthorized' 
        })
    }
};

module.exports = authMiddleware;