const {response}=require("express")
const Role=require("../models/role");
const usuario = require("../models/usuario");

const esRolValido=async(rol="")=>{

    const existeRol=await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no está registrado en la DB`)
    }
}

const emailExiste=async(correo="")=>{
    const existeEmail=await usuario.findOne({correo});
    if(existeEmail){
        throw new Error(`El email ${correo} ya existe`)
        }
   
}
const existeUserId=async(id)=>{
    const existeUser=await usuario.findById(id);
    if(!existeUser){
        throw new Error(`El id ${id} no existe`)
        }
   
}


module.exports={
    esRolValido,
    emailExiste,
    existeUserId
}