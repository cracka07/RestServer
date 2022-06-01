const express=require("express")
const cors=require("cors")
const {dbConn}=require("../database/config")
//patron singleton
class Server{

    constructor() {
        this.app=express();
        this.port=process.env.PORT;
        this.path={
            auth: "/user/auth",
            buscar:"/user/buscar",
            categorias:"/user/categorias",
            productos:"/user/productos",
            usuario:"/user",
        }
    

        //Conectar a base de datos 
        this.connectDb();
        //Middlewares
        this.middlewares();//primero los middleware y luego las rutas
        //Rutas
        this.routes();
    }

    async connectDb(){
        await dbConn();
    }


    middlewares(){

        //cors
        this.app.use(cors())
        //lectura y parseo del body
        this.app.use(express.json())
        //directorio público
        this.app.use(express.static("public"));
    }

    //rutas
    routes(){ 
       this.app.use(this.path.auth,require("../routes/auth"))
       this.app.use(this.path.usuario, require("../routes/user"))
       this.app.use(this.path.categorias, require("../routes/categorias"))
       this.app.use(this.path.productos, require("../routes/productos"))
       this.app.use(this.path.buscar,require("../routes/buscar"))
    }
    //listen on port
    listen(){
        this.app.listen(this.port,()=>{
            console.log("Listening on port", this.port)
        });
    }
}



module.exports=Server
