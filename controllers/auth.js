const { response, request } = require("express"); //ayuda con el tipado
const bcryptjs=require("bcryptjs")
const Usuario=require("../models/usuario");
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");

const login=async(req,res=response)=>{
    
    const {correo,password}=req.body;

    try{
        //Verificar si email existe
        const usuario=await Usuario.findOne({correo})
        if(!usuario){
            return res.status(400).json({
                msg:"Usuario / Password no son correctos - Correo"
            })
        }
        //Verificar si el user está activo si estado es true o false
        if(!usuario.estado){
            return res.status(400).json({
                msg:"Usuario / Password no son correctos - estado:false"
            })
        }
        //Verificar password de manera sincróna
        const validPassword=bcryptjs.compareSync(password,usuario.password)
        if(!validPassword){
            return res.status(400).json({
                msg:"Usuario / Password no son correctos - Password"
            })
        }
        //Generar JWT
        const token=await generarJWT(usuario.id)

        res.json({
             usuario,
             token
        })  
    }catch(e){
        console.log(e)
        res.status(500).json({msg:"Hable con el administrador"}) 
    }
    
}

const googleSignIn=async(req,res=response)=>{

    const {id_token}=req.body   

    try{
            const {correo,img,nombre}=await googleVerify(id_token)
            
            //verificar si correo existe
           let usuario=await Usuario.findOne({correo})
            if(!usuario){
                const data = {
                    nombre,
                    correo,
                    password: ";P",
                   img,
                    google: true,
                  };
                usuario=new Usuario(data);
                await usuario.save();            }
            //verificar estado=false
            if(!usuario.estado){
                return res.status(401).json({
                    msg:"Usuario bloqueado"
                })
            }
            //generar JWT
            const token=await generarJWT(usuario.id)


            res.json({
                usuario,
                token
            })

    }catch(e){
        res.status(400).json({
            ok:false,
            msg:"El token no es válido"
        })
    }

    
}

module.exports={
    login,
    googleSignIn
}