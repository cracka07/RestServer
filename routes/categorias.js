const { Router,response}=require("express")
const {check} =require("express-validator");
const { privateJWT } = require("../middleware/ruta-private");
const { validarCampos } = require("../middleware/validar-campos");
const {crearCategoria, obtenerCategorias, obtenerCategoriaId, actualizarCategoria, borrarCategoria}=require("../controllers/categorias");
const { existeCategoria } = require("../helpers/db-validators");
const { esAdminRole } = require("../middleware/validar-roles");

const router=Router();

/*
*{{url}}/user/categorias
*/

//Obtener todas las categorias - publico
router.get("/",obtenerCategorias)

//Obtener una categoria por id
router.get("/:id",[
    check("id","No es un id válido").isMongoId(),
    check("id").custom(existeCategoria),
    validarCampos
], obtenerCategoriaId)

//Crear categoria - privado - cualquier persona con un token válido
router.post("/",[
    privateJWT,
    check("nombre","El nombre es obligatorio").not().isEmpty(),
    validarCampos
],crearCategoria)

//Actualizar - privado - cualquiera con token válido
router.put("/:id",[
    privateJWT,
    check("nombre","El nombre es obligatorio").not().isEmpty(),
    check("id","No es un id válido").isMongoId(),
    check("id").custom(existeCategoria),
    validarCampos
],actualizarCategoria)

//Borrar una categoria - Admin
router.delete("/:id",[
    privateJWT,
    esAdminRole,
    check("id","No es un id válido").isMongoId(),
    check("id").custom(existeCategoria),
    validarCampos

],borrarCategoria)
module.exports=router