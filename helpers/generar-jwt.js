const jwt=require("jsonwebtoken");

//uid: identificador único del usuario
const generarJWT=(uid="")=>{
    
    return new Promise((resolve,reject)=>{
        
        //payload, manejo sólo uid
        const payload={uid};
        //firma
        jwt.sign(payload,process.env.SECRETORPRIVATEKEY,{
            expiresIn:"4h"
        },(err,token)=>{
            if(err){
                console.log(err);
                reject("No se pudo genera el token")
            }else{
                resolve(token);
            }
        })
    })
}


module.exports={
    generarJWT
}