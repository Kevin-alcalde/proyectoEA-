import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'

//para darle propiedades al payload
interface IPayload {
    _id: string;
    iat: number; 
    exp: number;
}


//programita para ayudarme con las validaciones
//actuaciones cuando me llegue el token al servidor
export const TokenValidation = (req: Request,  res: Response, next: NextFunction)  => {

const token = req.header('token');

if(!token) return res.status(401).json('no tienes token, denegado!')

const payload = jwt.verify(token, process.env.TOKEN_SECRET || 'token test') as IPayload//tenemos que verificar este token y le damos propiedades

req.userId= payload._id;

console.log(payload)
next();

}  //middleware  una función que se ejecuta antes de alguna ruta.