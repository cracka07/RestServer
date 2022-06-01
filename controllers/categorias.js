const { response } = require("express");
const Categoria = require("../models/categoria");


//obtCategorias - paginado - total -populate
const obtenerCategorias=async(req,res=response)=>{
    
    const {limite=2,desde=0}=req.query
    const [total,categoria]=await Promise.all([
        Categoria.countDocuments({estado: true}),
        Categoria.find({estado: true})
    .populate("usuario","nombre")
    .skip(Number(desde))
    .limit(Number(limite))
    ])
     
    
    //total categoría
    

    
    
    res.status(201).json({
       total,
       categoria
        
    })
}


//obtenerCategoria- populate {}
const obtenerCategoriaId=async(req,res=response)=>{
        const {id}=req.params

        const categoriaDb=await Categoria.findById(id)
        .populate("usuario","nombre")

        res.status(200).json(categoriaDb)
}


const crearCategoria=async(req,res=response)=>{

    //se graba todo en mayus
    const nombre=req.body.nombre.toUpperCase()

    //verificar existencia nombre
    const categoriaDb=await Categoria.findOne({nombre})
    if(categoriaDb){
        return res.status(400).json({
            msg:`La categoria ${categoriaDb.nombre}, ya existe`
        })
    }
    //generar data a guardar
    const data={
        nombre,
        usuario:req.usuario._id //guardo al usuario 
    }
    //guardo en db
    const categoria=new Categoria(data);
    await categoria.save()

    res.status(201).json(categoria);
}

//actualizarCategoria
const actualizarCategoria=async(req,res=response)=>{
        const {id}=req.params
        //TODO LO QUE LE PASE POR BODY PERO SOLO QUIERO ACTUALIZAR EL NOMBRE QUE VIENE EN EL RESTO
        const {estado,usuario,...resto}=req.body

        //Lo paso a mayuscula al nombre
        resto.nombre=resto.nombre.toUpperCase()
        //quien fue el que hizo la ultima modificación, a través del _id
        resto.usuario=req.usuario._id

// el new para que me m ande el nuevo archivo y el data para que me actuelice esos cambios
        const categoriaUpdate=await Categoria.findByIdAndUpdate(id,resto,{new:true})

        res.status(200).json(categoriaUpdate)
}
//borrarCategoria - estado:false
const borrarCategoria=async(req,res=response)=>{
        const {id}=req.params
        //new para que se miren los cambios reflejados
        const borrarCategoria=await Categoria.findByIdAndUpdate(id,{estado: false},{new:true})
        
        res.status(200).json(borrarCategoria)
    }

module.exports={
    crearCategoria,
    obtenerCategoriaId,
    obtenerCategorias,
    actualizarCategoria,
    borrarCategoria
}