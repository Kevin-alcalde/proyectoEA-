"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Nos permitirá crear URL ponemos los GET y todo eso
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const router = express_1.Router();
//router.get('/', (req,res)=>{  //esta ya pre fabrciado de express 
//  console.log("hola mundo")
//res.send("hola mundo web")  //enviamos como respuesta a una peticion GET hello Word
//})
//rutas que no necesitan validacion 
router.post('/signup', auth_controller_1.signup); //que cada ruta lo maneje con el metodo sinup.. etc etc
router.post('/signin', auth_controller_1.signin);
const verifyToken_1 = require("../libs/verifyToken");
//antes que llegue a profile hará esta validacion
router.get('/profile', verifyToken_1.TokenValidation, auth_controller_1.profile); //ruta proteccion
exports.default = router;
//# sourceMappingURL=auth.js.map