//funciones para loggearse y todo eso asi que tiene que tener acceso a user
import{Request,Response} from'express'
import User, {IUser} from '../models/User';
import jwt from 'jsonwebtoken';
import { setRandomFallback } from 'bcryptjs';



export const signup = async (req: Request,res: Response) => {   //lo que nos va a llegar darle un token USUARIO NUEVO   
    console.log(req.body);
    //guardando nuevo usuario
    const user: IUser = new User ({
        username: req.body.username, 
        email: req.body.email,
        password: req.body.password

    });
 
    // si crea un usuario, vamos a tomar su contraseña sin cifrar, va a ser cifrada y esa sería la nueva contraseña del usuario
  user.password = await user.encryptPassword(user.password);
  const savedUser = await user.save ();


 //generamos tokens
  const token: string = jwt.sign({_id: savedUser._id}, process.env.TOKEN_SECRET || 'tokenTEST') //usar doten para el secret key, para que podamos leer variables de entorno, si es un valor indefinido que coja tokentest, 

  
  res.header('token',token).json(savedUser); //le devolvemos al que consulta en fomra de cabecera el token y de cuerpo el usuario
};











export const signin = async (req: Request,res: Response) => {
 const user = await User.findOne({email: req.body.email}); //voy a buscar un mail en mi base de datos y me de el usuario

 if(!user) return res.status(400).json("Hay errores en el logearse, o no estas registrado o te has equivocado");
   const correctPassword: boolean =await user.validatePassword(req.body.password);

   if(!correctPassword) return res.status(404).json('invalid Password');
   //genero token
   const token: string =jwt.sign({_id: user._id},process.env.TOKEN_SECRET || 'tokenTEST', {expiresIn: 60*60*24}  ) //despues de un dia expira
   
   res.header('auth-token', token).json(user); //mandamos en el header el token 

   console.log(req.body);
   res.send('login') //le ppintamos al que viene solo unos strings para verificar


   
};
export const profile = async (req: Request,res: Response) => { //es como mi getf
  
  const user = await User.findById(req.userId, {password : 0}); //enviamos todo menos el password
  if(!user) return res.status
  res.json(user); 
  
  return res.status(404).json('no hemos encontrado al usuario')
  
  


}

;