const jwt = require('jsonwebtoken')
const config = require('config')

module.exports=(req,res,next)=>{
    if(req.method === 'OPTIONS'){
        return next()
    }
    try{
        const token=req.headers.authorization.split(' ')[1]

        if(!token){
            console.log('token error')
            return res.status(401).json('Нет авторизации')
        }


        const decoded = jwt.verify(token, config.get('tokenSecret'))
        req.user=decoded
        next()
    }
    catch(err){
        return res.status(401).json('Нет авторизации')
    }
}