const jwt = require("jsonwebtoken");
const config = require("../config/index")

const{JWT_SECRET} = config;

const auth = (req,res,next) => {
    const token = req.header("x-auth-token");    

    if(!token){
        return res.status(401).json({msg: "토큰이 존재하지 않아 인증 거부"})
    
    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        //id + secretkey = token
        req.user = decoded;
        next();


    } catch(e){
        console.log(e);
        res.status(400).json({msg: "토큰 유효하지 않음"});
        

    }}
}

module.exports = { auth };