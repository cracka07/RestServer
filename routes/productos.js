const { Router}=require("express")
const {check} =require("express-validator");
const { privateJWT } = require("../middleware/ruta-private");
const { validarCampos } = require("../middleware/validar-campos");
const { existeCategoria, existeProducto } = require("../helpers/db-validators");
const { esAdminRole } = require("../middleware/validar-roles");
const { obtenerProductos, obtenerProductoId, crearProducto, actualizarProducto, borrarProducto } = require("../controllers/productos");

const router=Router();

/*
*{{url}}/user/productos
*/

//Obtener todas los productos - publico
router.get("/",obtenerProductos)


//Obtener un producto por id
router.get("/:id",[
    check("id","No es un id válido").isMongoId(),
     check("id").custom(existeProducto),
    validarCampos
], obtenerProductoId)

//Crear producto - privado - cualquier persona con un token válido
router.post("/",[
    privateJWT,
    check("nombre","El nombre es obligatorio").not().isEmpty(),
     check("categoria","No es un id válido").isMongoId(),
     check("categoria").custom(existeCategoria),
    validarCampos
],crearProducto)

//Actualizar - privado - cualquiera con token válido
router.put("/:id",[
    privateJWT,
    // check("categoria","No es un id válido").isMongoId(),
    check("id").custom(existeProducto),
    validarCampos
],actualizarProducto)

//Borrar un producto - Admin
router.delete("/:id",[
    privateJWT,
    esAdminRole,
    check("id","No es un id válido").isMongoId(),
    check("id").custom(existeProducto),
    validarCampos

],borrarProducto)
module.exports=router