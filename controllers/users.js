const {response}=require("express")


const userGet=(req,res=response)=>{

    const {edad,altura="no name"}=req.query

    res.json({
        msg:"Get Api - controller",
        edad,
        altura
    })
}
const userPost=(req,res=response)=>{
    
    const {nombre,edad}=req.body;

    res.json({
        msg:"Post Api - controller",
        nombre,edad
    })
}
const userPut=(req,res=response)=>{
       const id=req.params.id


    res.json(
        {msg:"Put Api - controller",
        id
    
    }
        
        )
}
const userDelete=(req,res=response)=>{
    res.json({msg:"Delete Api - controller"})
}


module.exports={
    userGet,
    userPost,
    userPut,
    userDelete
}