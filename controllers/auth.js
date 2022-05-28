const { response } = require("express"); //ayuda con el tipado
const bcryptjs=require("bcryptjs")
const Usuario=require("../models/usuario");
const { generarJWT } = require("../helpers/generar-jwt");

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


module.exports={
    login
}