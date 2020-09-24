const JWT = require("jsonwebtoken");
exports.validate = (req, res, next) => {
    var token = req.headers['x-access-token'];
    if (!token){
        return res.status(401).json({auth: false, message: 'token not found'});
    }
    JWT.verify(token, process.env.SECRET, function(err, decoded){
        if(err) return res.status(401).json({auth: false, message: 'token not valid'});
        
        req.userId = decoded.id;
        next();
    })

}  