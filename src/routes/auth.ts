//Nos permitirá crear URL ponemos los GET y todo eso
import {Router} from 'express'
import { signin, signup, profile} from '../controllers/auth.controller'
const router: Router = Router();

//router.get('/', (req,res)=>{  //esta ya pre fabrciado de express 
  //  console.log("hola mundo")
    //res.send("hola mundo web")  //enviamos como respuesta a una peticion GET hello Word
//})

//rutas que no necesitan validacion 
router.post('/signup', signup ); //que cada ruta lo maneje con el metodo sinup.. etc etc
router.post('/signin', signin );

import {TokenValidation} from '../libs/verifyToken'

//antes que llegue a profile hará esta validacion
router.get('/profile', TokenValidation, profile ); //ruta proteccion



export default router;