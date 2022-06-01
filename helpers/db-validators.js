const {response}=require("express");
const Categoria = require("../models/categoria");
const Role=require("../models/role");
const usuario = require("../models/usuario");
const Producto=require("../models/producto")

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
const existeCategoria=async(id)=>{
        const existeCategoria=await Categoria.findById(id)
        if(!existeCategoria){
            throw new Error(`El id ${id} no existe`)
        }
}
const existeProducto=async(id)=>{
    const existeProducto=await Producto.findById(id)
    if(!existeProducto){
        throw new Error(`El id ${id} no existe`)
    }
}


module.exports={
    esRolValido,
    emailExiste,
    existeUserId,
    existeCategoria,
    existeProducto
}