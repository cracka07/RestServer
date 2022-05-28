const { response, request } = require("express")
const jwt=require("jsonwebtoken")

const Usuario=require("../models/usuario")

const privateJWT=async(req=request,res=response,next)=>{
     
    //leer el header(me viene el token)
     const token=req.header("x-token")
        if(!token){
            return res.status(401).json({
                msg:"No hay token en la petición"
            })
        }
        try{
           const {uid}=jwt.verify(token,process.env.SECRETORPRIVATEKEY);
           //leer info del usuario que corresponde al uid
           const usuario=await Usuario.findById(uid)
           if(!usuario){
            return res.status(401).json({
                msg:"Token no válido - Usuario no existe en DB"
            })
           }

           //Verificar si el uid tiene estado=true
           if(!usuario.estado){
               return res.status(401).json({
                   msg:"Token no válido - estado: false"
               })
           }
           
           req.usuario=usuario
            next()
        }catch(e){
            console.log(e);
            res.status(401).json({
                msg:"Token no válido"
            })

        }
     console.log(token)

     
}

module.exports={
    privateJWT
}