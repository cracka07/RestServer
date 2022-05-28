const {Schema,model}=require("mongoose");

const UsuarioSchema=Schema({

    uid:{
        type:String
    },
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
        // enum:["ADMIN_ROLE","USER_ROLE"]
    },
    estado:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:true
    }
})
UsuarioSchema.methods.toJSON=function(){
    const{__v,password,_id,...usuario}=this.toObject(); //referencia al objeto usuario
    //destructuring de los atributos que quiero sacar y guardarlos en usuarios
    usuario.uid=_id
    return usuario
}

module.exports=model("Usuario",UsuarioSchema)