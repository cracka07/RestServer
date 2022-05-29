const {Schema,model}=require("mongoose");

const UsuarioSchema=Schema({


    nombre:{
        type:String,
        required:[true,"El nombre es requerido"]
    },
    correo:{
        type:String,
        required:[true,"El correo es obligatorio"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"El password es requerido"]
    },
    img:{
        type:String
    },
    rol:{
        type:String,
        required:true,
        default:"USER_ROLE"
        // enum:["ADMIN_ROLE","USER_ROLE"]
    },
    estado:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:false
    }
})
UsuarioSchema.methods.toJSON=function(){
    const{__v,password,_id,...usuario}=this.toObject(); //referencia al objeto usuario
    //destructuring de los atributos que quiero sacar y guardarlos en usuarios
    usuario.uid=_id
    return usuario
}

module.exports=model("Usuario",UsuarioSchema)