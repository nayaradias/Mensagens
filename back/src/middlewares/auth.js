const jwt =  require('jsonwebtoken');

const auth = (req,res,next)=>{
    let token = req.headers['x-access-token']|| req.headers['authorization'];
    if(!token)
        return res.status(401).json({mensagem:"Informe o token"});
    if(token.toString().startsWith('Bearer ')){
        token = token.slice(7,token.toString().length);
    }
    if(token){
        jwt.verify(token,'najuleflix',(err,decoded)=>{
            if(err){
                return res.json({
                    success:false,
                    mensagem:"Token invalido"
                })
            }else{
                res.locals.auth_data = decoded;
                req.decoded = decoded;
                next();
            }
        })
    }
    else{
        return res.json({
            success:false,
            mensagem:"Token não informado"
        })
    }
  
}
module.exports = auth;