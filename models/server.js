const express=require("express")
const cors=require("cors")
//patron singleton
class Server{

    constructor() {
        this.app=express();
        this.port=process.env.PORT;
        this.userRoute="/user"
        
        //Middlewares
        this.middlewares();//primero los middleware y luego las rutas
        //Rutas
        this.routes();
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
       this.app.use(this.userRoute, require("../routes/user"))
    }
    //listen on port
    listen(){
        this.app.listen(this.port,()=>{
            console.log("Listening on port", this.port)
        });
    }
}

module.exports=Server
