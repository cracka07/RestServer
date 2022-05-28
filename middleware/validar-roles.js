const { response } = require("express");


const esAdminRole=(req,res=response, next)=>{

    //establece la info del nuevo usuario
    if(!req.usuario){ //si es undefined, 
        return res.status(500).json({
            msg:"Se quiere verificar el rol sin validar el token primero"
        })
    }
    const {rol,nombre}=req.usuario;
    if(rol !== "ADMIN_ROLE"){
        return res.status(401).json({
            msg:`El ${nombre} no es administrador, prohibido realizar esta acción`
        })
    }

    next()
}

const tieneRol=(...roles)=>{

    return (req,res=response, next)=>{
        if(!req.usuario){ //si es undefined, 
            return res.status(500).json({
                msg:"Se quiere verificar el rol sin validar el token primero"
            })
        }
        if(!roles.includes(req.usuario.rol)){
            return res.status(401).json({
                msg:`El servicio requiere uno de esos roles ${roles}`
            })
        }
        next()
    }
} 



module.exports={
    esAdminRole,
    tieneRol
}