const {Schema, model}=require("mongoose")


const CategoriaSchema=Schema({
     
  nombre:{
        type:String,
        required:[true,"El nombre es obligatorio"],
        unique:true
    },
    estado:{
        type:Boolean,
        default:true,
        required:true
    },
    //Toda categoria va ser creada por el usuario, apunta al usuario
    usuario:{
        type:Schema.Types.ObjectId,
        ref:"Usuario",
        required:true
    }
});
CategoriaSchema.methods.toJSON=function(){
    const{__v,estado,...data}=this.toObject(); //referencia al objeto usuario
    //destructuring de los atributos que quiero sacar y guardarlos en usuarios
    
    return data
}

module.exports=model("Categoria",CategoriaSchema)