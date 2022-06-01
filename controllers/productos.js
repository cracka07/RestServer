const { response } = require("express");
const { body } = require("express-validator");
const Producto = require("../models/producto")


//obtProducto - paginado - total -populate
const obtenerProductos=async(req,res=response)=>{
    
    const {limite=2,desde=0}=req.query
    const [total,producto]=await Promise.all([
        Producto.countDocuments({estado: true}),
        Producto.find({estado: true})
    .populate("usuario","nombre")
    .populate("categoria","nombre")
    .skip(Number(desde))
    .limit(Number(limite))
    ])

    res.status(201).json({
       total,
       producto
        
    })
}


//obtenerProducto- populate {}
const obtenerProductoId=async(req,res=response)=>{
        const {id}=req.params

        const productoDb=await Producto.findById(id)
        .populate("usuario","nombre")
        .populate("categoria","nombre")

        res.status(200).json(productoDb)
}


const crearProducto=async(req,res=response)=>{

    const {estado,usuario,...resto}=req.body
   
    //verificar existencia nombre
    const productoDb=await Producto.findOne({nombre:resto.nombre.toUpperCase()})
    if(productoDb){
        return res.status(400).json({
            msg:`El producto ${productoDb.nombre}, ya existe`
        })
    }
    //generar data a guardar
    const data={
        ...resto,
        nombre:resto.nombre.toUpperCase(),
        usuario:req.usuario._id,
    }
    //guardo en 
    const producto=new Producto(data);
    await producto.save()

    res.status(201).json(producto);
}

//actualizarProducto
const actualizarProducto=async(req,res=response)=>{
        const {id}=req.params
        const {estado,usuario,...resto}=req.body

        // resto.nombre=resto.nombre.toUpperCase()
        if(resto.nombre){
            resto.nombre=resto.nombre.toUpperCase()
        }
        resto.usuario=req.usuario._id

        const productoUpdate=await Producto.findByIdAndUpdate(id,resto,{new:true})
        res.status(200).json(productoUpdate)
}
//borrarProducto- estado:false
const borrarProducto=async(req,res=response)=>{
        const {id}=req.params
        const borrarProducto=await Producto.findByIdAndUpdate(id,{estado: false},{new:true})
        
        res.status(200).json(borrarProducto)
    }

module.exports={
    crearProducto,
    obtenerProductos,
    obtenerProductoId,
    actualizarProducto,
    borrarProducto
}