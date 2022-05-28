const {response,request}=require("express")
const bcryptjs=require("bcryptjs")


const Usuario=require("../models/usuario") //U mayus porque me va a permitir
//crear instancias del modelo   


const userGet=async(req,res=response)=>{

    // const {edad,altura="no name"}=req.query
    const { limite=5,desde=0 }=req.query  //paginar de 5 en 5, obtengo 5 registros
    const filtro= {estado:true}
    

  //Las promesas.all se ejecutan de manera simultanea.
  //Si da error una promesa , la otra no se ejecuta.  
    
  
   const [total,usuarios]=await Promise.all([
    Usuario.countDocuments(filtro), //conteo registro total
    Usuario.find(filtro)    //filtrado
     .sort({nombre:"desc"}) //ordenamiento
    .skip(Number(desde))    //desde
    .limit(Number(limite)) // limite  //paginado
   ])

    res.json({
      total,
      usuarios
    })
}
const userPost=async(req=request,res=response)=>{
    //una vez declarado el middleware en routes/user
    //se usa conjuntamente con el middleware check
  
    
    const {nombre,correo,password,rol}=req.body;
    const usuario=new Usuario({nombre,correo,password,rol});

    //Verificar si correo existe
    
    //Encriptar contraseña 
        const salt=bcryptjs.genSaltSync() //hacer más complicado el método de encriptación 
        usuario.password=bcryptjs.hashSync(password,salt); //hash contraseña
       

    

    //Guardar en base de datos
    await usuario.save()

    res.json({
        usuario}
        )
}
const userPut=async(req,res=response)=>{
       const { id}=req.params
       const {_id,password, google, correo, ...resto}=req.body
// a google lo extraigo del ...resto porque no quiero que se actualice
// a password lo necesito extraer para poder encriptarlo
       if(password){
            
    //Encriptar contraseña , le establezco el password
        const salt=bcryptjs.genSaltSync() //hacer más complicado el método de encriptación 
        resto.password=bcryptjs.hashSync(password,salt); //hash contraseña
       }
    //Actualizo id y resto de atributos que me pasan en el body 
    const userUpdate=await Usuario.findByIdAndUpdate(id,resto);

    res.json({userUpdate})
}
const userDelete=async(req,res=response)=>{

    const {id}=req.params
    
    // //Fisicamente lo  borramos es una alternativa
    // const usuario=await Usuario.findByIdAndDelete(id)

    //Actualizamos el id y establecemos el estado=false
    const usuario=await Usuario.findByIdAndUpdate(id, {estado:false},{new:true})
    // const userAutenticado=req.usuario

    res.json({
      usuario
        
    })
}


module.exports={
    userGet,
    userPost,
    userPut,
    userDelete
}