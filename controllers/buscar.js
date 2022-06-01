const { response } = require("express");
const Categoria = require("../models/categoria");
const Producto = require("../models/producto");

const Usuario = require("../models/usuario");
const {ObjectId}=require("mongoose").Types;

const coleccionesPermitidas=[
    "usuarios",
    "categorias",
    "productos",
    "roles"
];
    
const buscarUsuarios = async( termino = '', res = response ) => {

    const esMongoID = ObjectId.isValid( termino ); // TRUE 

    if ( esMongoID ) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: ( usuario ) ? [ usuario ] : []
        });
    }

    const regex=new RegExp(termino, "i")// no es sensible a las mayus y minus

    const usuarios=await Usuario.find({
        $or: [{nombre:regex}, {correo:regex}],//buscame por el nombre o el correo
        $and: [{estado:true}] // y los activos
    })

    res.json({
        results:usuarios
    })

}
const buscarCategorias=async( termino = '', res = response ) => {

    const esMongoID = ObjectId.isValid( termino ); // TRUE 

    if ( esMongoID ) {
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: ( categoria ) ? [ categoria ] : []
        });
    }
    const regex=new RegExp(termino, "i")
    const categoria=await Categoria.find({nombre:regex,estado:true})

    res.json({
        results:categoria
    })
}
const buscarProductos=async( termino = '', res = response ) => {

    const esMongoID = ObjectId.isValid( termino ); // TRUE 

    if ( esMongoID ) {
        const producto = await Producto.findById(termino)
                                .populate("categoria","nombre");
        return res.json({
            results: ( producto ) ? [ producto ] : []
        });
    }
    const regex=new RegExp(termino, "i")
    const producto=await Producto.find({nombre:regex,estado:true})
                                .populate("categoria","nombre");
    res.json({
        results:producto
    })
}



const buscar=(req,res=response)=>{

    const {coleccion, termino}=req.params

    if(!coleccionesPermitidas.includes(coleccion)){
        return res.status(404).json({
            msg:`Las colecciones permitidas son: ${coleccionesPermitidas}`
        })
    }

    switch(coleccion){
        case "usuarios":
            buscarUsuarios(termino,res);
          break;         
        case "categorias":
            buscarCategorias(termino,res)
         break;     
        case "productos":
            buscarProductos(termino,res)
        break;
        default:
           res.status(500).json({
                msg:"Busqueda no encontrada"
            })
  
    }
   
    
}


module.exports={buscar}