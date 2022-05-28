const {Router}=require("express");
const {check}=require("express-validator")


const {validarCampos}=require("../middleware/validar-campos")
const {userGet,userPost,userPut,userDelete}=require("../controllers/users");
const { esRolValido, emailExiste, existeUserId } = require("../helpers/db-validators");
const { privateJWT } = require("../middleware/ruta-private"); //sólo el admin tiene acceso
const { esAdminRole, tieneRol } = require("../middleware/validar-roles");

const router=Router();

// el middleware se ubica antes de la funcion userGet/userPost ...
//Si vamos a mandar muchos middleware , usar []
 //cambiar de dirección puesto que el home esta con el index.html
router.get("/",[
    check("desde",`El parámetro "desde" debe ser numérico`).optional().isNumeric(),
    check("limite",`El parámetro "limite" debe ser numérico`).optional().isNumeric(), 
    validarCampos
],userGet);
router.post("/",[
    check("nombre","El nombre es obligatorio").not().isEmpty(), //le digo que no esté vació
    check("password","El password debe de ser más de 6 letras").isLength({min:6}),
    check("correo","El correo no es válido").isEmail(), //le digo sea un email,
    check("correo").custom(emailExiste),
    // check("rol","No es un rol válido").isIn(["ADMIN_ROLE","USER_ROLE"]),
    check("rol").custom(esRolValido),
    validarCampos
],userPost);
router.put("/:id",[
    check("id","No es un id válido").isMongoId(),
    check("id").custom(existeUserId),
    check("rol").custom(esRolValido), //opcional, se puede poner tantas validaciones según necesidad
    validarCampos
],userPut);
router.delete("/:id",[
    privateJWT,
   esAdminRole, //fuerza a que tenga que ser administrador
  // tieneRol("ADMIN_ROLE","VENTAS_ROLE","OTRO_ROLE"),
    check("id","No es un id válido").isMongoId(),
    check("id").custom(existeUserId),
    validarCampos
],userDelete);








module.exports=router