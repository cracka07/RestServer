const {Router}=require("express");
const {userGet,userPost,userPut,userDelete}=require("../controllers/users")

const router=Router();


 //cambiar de dirección puesto que el home esta con el index.html
router.get("/", userGet);
router.post("/",userPost);
router.put("/:id",userPut);
router.delete("/",userDelete);








module.exports=router