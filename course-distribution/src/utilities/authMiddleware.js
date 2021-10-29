const jwt=require("jsonwebtoken");
//const cookies=require("js-cookies");
const requireAuth=(req,res,next)=>{
    const token=req.headers.authorization;
  
        if(!token)
        {
           res.send("error");
        }
        jwt.verify(token,"XYZABC3366",(err,decodedToken)=>{
            if(err){
                res.send("error")
            }
            else{
                next();
            }
        }
        )
    
}
module.exports={requireAuth};